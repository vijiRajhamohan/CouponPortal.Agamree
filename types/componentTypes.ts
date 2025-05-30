/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHeader {
    text: string;
    value: string;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
    filterable?: boolean;
    divider?: boolean;
    class?: string | string[];
    width?: string | number;
    filter?: (value: any, search: string, item: any) => boolean;
    sort?: (a: any, b: any) => number;
}

export interface ISearchFields {
    getFieldDefaults(): ISearchFields;
    getHeaderConfig(): IHeader[];
    getClassName(index: number): string;
    getFieldWidths(): string[];
}

export interface ICSSVariables {
    mainBackground?: string;
    headerBackground?: string;
    primary?: string;
    primaryLight?: string;
    secondary?: string;
    secondaryBright?: string;
    accent?: string;
    neutralLight?: string;
    neutralBright?: string;
    success?: string;
    brandGrey?: string;
    active?: string;
}
