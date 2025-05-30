import { ClientFunction } from 'testcafe';

export const isMobile = ClientFunction<boolean, any>(() => (window as any).$nuxt.$isMobile);
export const isTablet = ClientFunction<boolean, any>(() => (window as any).$nuxt.$isTablet);
export const isPhone = ClientFunction<boolean, any>(() => (window as any).$nuxt.$isPhone);
