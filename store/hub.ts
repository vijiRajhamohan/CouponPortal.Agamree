import { Mutation } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';

@InjectModule({ stateFactory: true }, module)
export default class HubModule extends InjectVuexModule {
    path = '';

    @Mutation
    setPath(path: 'hub' | 'patient' | 'provider') {
        this.path = path;
    }
}
