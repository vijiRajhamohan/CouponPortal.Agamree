import { VueWaitInstance } from 'vue-wait';
import 'vuetify/types/lib';
import { Container } from 'vue-di';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import Vuetify from 'vuetify';
import { Settings } from '~/services/settings';

declare module 'vue/types/vue' {
    interface Vue {
        $wait: VueWaitInstance;
        $settings: Settings;
        $ai?: ApplicationInsights;
        $icons: Record<string, import('@fortawesome/fontawesome-common-types').IconDefinition>;
        $passwordProtect: IPasswordProtect;
    }

    interface IPasswordProtect {
        authorise(password: string): boolean;
        isAuthorised(): boolean;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V> {
        icons?: Record<string, import('@fortawesome/fontawesome-common-types').IconDefinition>;
    }
}

declare module '@nuxt/types' {
    interface Context {
        container: Container;
        $vuetify: typeof Vuetify;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $wait: VueWaitInstance;
        $settings: Settings;
        $ai?: ApplicationInsights;
        $detect: MobileDetect;
        $isMobile: MobileDetect;
        $isPhone: MobileDetect;
        $isTablet: MobileDetect;
    }
}
