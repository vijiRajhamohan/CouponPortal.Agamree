import { Context } from '@nuxt/types';
import MobileDetect from 'mobile-detect';

export default (context: Context, inject: (name: string, value: any) => void) => {
    const md = new MobileDetect(window.navigator.userAgent);
    inject('isPhone', !!md.phone());
    inject('isTablet', !!md.tablet());
    inject('isMobile', !!md.mobile());
    inject('detect', md);
};
