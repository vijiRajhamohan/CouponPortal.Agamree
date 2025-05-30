/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, omitBy, zipObject } from 'lodash';
import * as moment from 'moment';

export class Mapper<Source, Destination = {}> {
    public static open<T>(model: IBaseModel<T>) {
        return new Mapper<T>(model);
    }
    private readonly typeMap: { [K in keyof Source]: IModelMapperTypeMap } = {} as any;
    private readonly properties: Array<keyof Source & keyof Destination> = [];
    private readonly propertyMappers: { [K in keyof Source | keyof Destination]?: IMapperMethod<any, any> } = {} as any;
    private readonly mappers: Array<IConfigureMapperMethod<Source, Destination>> = [];
    private constructor(private readonly modelType: IBaseModel<Source>) {
        const modelTypeMap = modelType.getAttributeTypeMap();
        this.typeMap = zipObject<IModelMapperTypeMap>(
            modelTypeMap.map(x => x.name) as Array<keyof Source>,
            modelTypeMap.map(x => ({ ...x, isArray: x.type.includes('Array<') }))
        ) as any;
        this.setupDefaultPropertyMapper();
    }

    public property<K extends ObjectPropNames<Source>, D>(
        key: K,
        mapper: IMapperMethod<Source[K], D>
    ): Mapper<Source, Destination & { [A in K]: D }>;
    public property<K extends ArrayObjectPropNames<Source>, D>(
        key: K,
        mapper: IMapperMethod<ElementType<Source[K]>, D>
    ): Mapper<Source, Destination & { [A in K]: D[] }>;
    public property<K extends ArraySimplePropNames<Source>>(key: K): Mapper<Source, Destination & Pick<Source, K>>;
    public property<K extends SimplePropNames<Source>>(key: K): Mapper<Source, Destination & Pick<Source, K>>;
    public property<K extends keyof Source>(key: K, mapper?: IMapperMethod<any, any>) {
        this.properties.push(key as any);
        if (mapper) {
            this.propertyMappers[key] = mapper;
        }
        return this as any;
    }

    public map<R>(
        to: (source: Source, typeMap: MapperTypeMap<Source>) => R,
        from: IConfigureMapperMethod<Source, Destination & R>['from']
    ): Mapper<Source, Destination & R> {
        if (!from) {
            throw new Error('from mapper is missing');
        }

        this.add({ to, from } as any);
        return this as any;
    }

    public create(): IMapperMethod<Source, Destination> {
        const mappers = this.mappers;
        const typeMap = this.typeMap;
        return {
            to(source: Source) {
                return mappers.reduce<Destination>(
                    (destination, reducer) => ({ ...destination, ...reducer.to(source, typeMap) }),
                    {} as Destination
                );
            },
            from(destination: Destination) {
                return mappers.reduce<Source>((source, reducer) => ({ ...source, ...reducer.from(destination, typeMap) }), {} as Source);
            },
        };
    }

    private add(method: IConfigureMapperMethod<Source, Destination>) {
        this.mappers.push(method);
        return this;
    }

    private setupDefaultPropertyMapper() {
        const innerMap = (value: any, key: string, method: 'from' | 'to') => {
            const tm = (this.typeMap as any)[key];
            if (tm.isArray) {
                if (!value[key]) {
                    return method === 'from' ? undefined : [];
                }
            }
            const pm = (this.propertyMappers as any)[key];
            if (pm) {
                const myValue = value[key];
                if (Array.isArray(myValue)) {
                    return myValue.map(v => pm[method].call(pm, v));
                } else {
                    if (method === 'from' && !myValue) {
                        return undefined;
                    }
                    const result = pm[method].call(pm, myValue || {});
                    if (method === 'from' && isEmpty(result)) {
                        return undefined;
                    }
                    return result;
                }
            } else {
                return value[key];
            }
        };

        this.mappers.push({
            to: source => {
                return zipObject(this.properties, this.properties.map(key => innerMap(source, key as any, 'to'))) as any;
            },
            from: destination => {
                return omitBy(
                    zipObject(this.properties, this.properties.map(key => innerMap(destination, key as any, 'from'))) as any,
                    x => x === null || x === undefined
                );
            },
        });
    }
}

type SimplePropNames<T> = {
    [K in keyof T]-?: NonNullable<T[K]> extends boolean
        ? K
        : NonNullable<T[K]> extends string
        ? K
        : NonNullable<T[K]> extends number
        ? K
        : NonNullable<T[K]> extends Date
        ? K
        : NonNullable<T[K]> extends moment.Moment
        ? K
        : never;
}[keyof T];
type ElementType<T> = T extends Array<infer U> ? U : never;
// type SimpleProps<T> = Pick<T, SimplePropNames<T>>;
type ArrayPropNames<T> = { [K in keyof T]-?: NonNullable<T[K]> extends unknown[] ? K : never }[keyof T];
// type ArrayProps<T> = Pick<T, ArrayPropNames<T>>;
type ArrayObjectPropNames<T> = {
    [K in keyof T]-?: NonNullable<T[K]> extends Array<infer U>
        ? U extends boolean
            ? never
            : U extends string
            ? never
            : U extends number
            ? never
            : U extends Date
            ? never
            : U extends moment.Moment
            ? never
            : U extends object
            ? K
            : never
        : never;
}[keyof T];
// type ArrayObjectProps<T> = Pick<T, ArrayObjectPropNames<T>>;
type ArraySimplePropNames<T> = {
    [K in keyof T]-?: NonNullable<T[K]> extends Array<infer U>
        ? U extends boolean
            ? K
            : U extends string
            ? K
            : U extends number
            ? K
            : U extends Date
            ? K
            : U extends moment.Moment
            ? K
            : never
        : never;
}[keyof T];
// type ArraySimpleProps<T> = Pick<T, ArraySimplePropNames<T>>;
type ObjectPropNames<T> = { [K in keyof T]-?: K extends ArrayPropNames<T> ? never : K extends SimplePropNames<T> ? never : K }[keyof T];
// type ObjectProps<T> = Pick<T, ObjectPropNames<T>>;

interface IModelTypeMap {
    name: string;
    baseName: string;
    type: string;
}
interface IModelMapperTypeMap extends IModelTypeMap {
    isArray: boolean;
}
type MapperTypeMap<Source> = { [K in keyof Source]: IModelMapperTypeMap };
interface IBaseModel<T> {
    discriminator?: string;
    new (...args: any[]): T;
    getAttributeTypeMap(): IModelTypeMap[];
}

interface IConfigureMapperMethod<Source, Destination> {
    to(source: Source, typeMap: MapperTypeMap<Source>): Partial<Destination>;
    from(destination: Destination, typeMap: MapperTypeMap<Source>): Partial<Source>;
}

interface IMapperMethod<Source, Destination> {
    to(source: Source): Destination;
    from(destination: Destination): Source;
}
