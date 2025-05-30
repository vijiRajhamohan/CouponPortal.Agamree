import { Mutation } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';

@InjectModule({ stateFactory: true }, module)
export default class RouteModule extends InjectVuexModule {
    previousRoute = '';

    @Mutation
    setRoute(previousRoute: string) {
        this.previousRoute = previousRoute;
    }
}
