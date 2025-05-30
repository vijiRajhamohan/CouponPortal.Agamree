import { Mutation } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';

interface FooterPosition {
    y: number
}

@InjectModule({ stateFactory: true }, module)
export default class FooterModule extends InjectVuexModule {
    public staticFooter: FooterPosition = {
        y: 0,
    };

    @Mutation
    public setStaticFooter(footerPosition: FooterPosition): void {
        Object.assign(this.staticFooter, footerPosition)
    }
}
