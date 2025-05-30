import { trimStart, defaults, each, endsWith, join, trimEnd } from 'lodash';
import { parse } from 'yargs';
import { ClientFunction } from 'testcafe';
import env from '../../envConfig';

interface IModel {
    url: string;
}

const argv: { serverUrl?: string } = parse(process.argv.slice(2)) as any;

let baseUrl = argv.serverUrl || process.env.SERVER_URL || (env && env.SERVER_URL) || 'http://localhost:3000/';

if (endsWith(baseUrl, '/')) baseUrl = trimEnd(baseUrl, '/');

function construct<C extends { new (): InstanceType<C> & IModel }>(
    klass: C,
    fixture: FixtureFn,
    context: { path: string; title?: string | TemplateStringsArray }
): InstanceType<C> & IModel & FixtureFn {
    const { path } = context;
    const model: C & IModel = new klass() as any;
    const url = join([baseUrl, trimStart(path, '/')], '/');
    fixture.page(url);
    if (context.title) {
        fixture(context.title);
    }

    model.url = url;

    // NOTE: This might break things...
    for (const key of Object.getOwnPropertyNames(klass.prototype)) {
        if (key === 'constructor') continue;
        (fixture as any)[key] = (klass.prototype as any)[key];
    }

    for (const key in model) {
        if (key === 'constructor') continue;
        (fixture as any)[key] = (model as any)[key];
    }
    // return defaults(fixture, model, klass.prototype);
    return fixture as any;
}

export class Model {
    public static fixture<C extends { new (): InstanceType<C> & Model }>(this: C, path: string, title?: string) {
        return construct<C>(this, fixture(''), { path, title });
    }

    public static page(path: string) {
        return page(path);
    }

    public static getUrlTo(path: string) {
        return join([baseUrl, trimStart(path, '/')], '/');
    }

    public url!: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Model extends FixtureFn {}

export function page(path: string) {
    class Model {
        public static fixture<C extends { new (): InstanceType<C> }>(this: C, title?: string) {
            const instance = construct<C>(this, fixture, { path, title });
            return instance;
        }

        public static getUrlTo(path: string) {
            return join([baseUrl, trimStart(path, '/')], '/');
        }

        public url!: string;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Model extends FixtureFn {}

    return Model;
}
