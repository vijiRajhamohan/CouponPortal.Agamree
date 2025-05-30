import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { OnClear } from '~/services/clearModule';

@InjectModule({ stateFactory: true }, module)
@OnClear<LoginModule>(async value => value.clear())
export default class LoginModule extends InjectVuexModule {
    public loginCount = 0;
    private authenticated = false;

    @Mutation
    public incrementLogin(): void {
        this.loginCount++;
    }

    @Mutation
    public clear(): void {
        this.loginCount = 0;
        this.authenticated = false;
    }

    @Mutation
    public authenticate(input: { userName: string; password: string }): boolean {
        (input.password || 'testing') != null ? (this.authenticated = true) : this.loginCount++;

        return this.authenticated;
    }

    @Action
    public async login(input: { userName: string; password: string }) {
        this.authenticate(input);
    }

    get isAuthenticated(): boolean {
        return this.authenticated;
    }

    get currentLoginCount(): number {
        return this.loginCount;
    }
}
