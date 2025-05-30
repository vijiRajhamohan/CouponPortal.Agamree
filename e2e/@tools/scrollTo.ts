import { ClientFunction } from 'testcafe';
import { GoToOptions } from 'vuetify/types/services/goto';

export const scrollTo = ClientFunction<number, any>((value: string | number, options?: GoToOptions) => {
    return (window as any).$nuxt.$vuetify.goTo(value, options) as number;
}) as {
    (value: number, options?: GoToOptions): Promise<number>;
    (selector: string, options?: GoToOptions): Promise<number>;
};
