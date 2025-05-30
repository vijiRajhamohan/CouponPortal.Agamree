import { Mutation } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';

@InjectModule({ stateFactory: true }, module)
export default class IriModule extends InjectVuexModule {
    public visibility = false;
    public open = false;

    @Mutation
    public setIriVisibility(visibility: boolean): void {
        this.visibility = visibility;
        this.open = false;
    }

    @Mutation
    public toggleIriOpen(open: boolean): void {
        this.open = open;
    }
}
