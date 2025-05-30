// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { EdgeTokenApi, EdgeAuthenticationApi } from '@trialcard/apigateway.client';
import moment, { Moment } from 'moment';
import { IAuthenticationData, ScriptsAuthenticationGetCurrentUserGetCurrentUserResponseModel } from '@trialcard/apigateway.models';
import { Resolve } from 'vue-di';
import { AuthenticateStatus } from '@trialcard/enums';
import { OnClear } from '~/services/clearModule';

// TODO: THIS IS A TEMPORARY CLASS
// THIS CLASS MUST BE UPDATED TO GO TO UAT OR BEYOND
@InjectModule({ stateFactory: true }, module)
@OnClear<SessionModule>(async value => value.logout())
export default class SessionModule extends InjectVuexModule {
    @Resolve
    public edgeTokenApi!: EdgeTokenApi;
    public type: 'guest' | 'user' | null = null;
    public token: string | null = null;
    public username: string | null = null;
    public features: string[] = [];
    public sessionId: number | null = null;

    public _expirationDate: string | null = null;
    public get expirationDate() {
        return (this._expirationDate && moment(this._expirationDate)) || null;
    }

    public _createDate: string | null = null;
    public get createDate() {
        return (this._createDate && moment(this._createDate)) || null;
    }

    public get isAuthenticatedUser() {
        return this.type === 'user';
    }

    @Action({})
    public async ensure() {
        if (this.token) {
            const expirationDate = this.expirationDate;
            if (expirationDate && expirationDate.isAfter(moment())) {
                return;
            }
        }

        if (this.type === 'user') return; // forget about it...
        const response = await this.edgeTokenApi.authenticationGuest({
            key: process.env.PORTALID!,
        });
        this.setGuestData(response.data.data!);
    }

    @Mutation
    public setGuestData(data: IAuthenticationData) {
        this.type = 'guest';
        this.token = data.token!;
        this.username = data.username || null;
        this.sessionId = data.sessionId || null;
        this._expirationDate = (data.expirationDate && data.expirationDate.format()) || null;
        this._createDate = (data.createDate && data.createDate.format()) || null;
        this.features = data.features || [];
    }

    @Action({})
    public async logout() {
        this.clearData();
    }

    @Mutation
    public clearData() {
        this.type = null;
        this.token = null;
        this.username = null;
        this.sessionId = null;
        this._expirationDate = null;
        this._createDate = null;
        this.features = [];
    }

    @Action({})
    public async refresh() {
        if (!this.token) return;
        const response = await this.edgeTokenApi.authenticationTouch({
            key: process.env.PORTALID!,
            token: this.token,
        });
        this.setRefreshData(response.data.data!);
    }

    @Mutation
    public async setRefreshData(data: { token?: string; sessionId?: number; createDate?: Moment; expirationDate?: Moment }) {
        this.token = data.token!;
        this.sessionId = data.sessionId || null;
        this._expirationDate = (data.expirationDate && data.expirationDate.format()) || null;
        this._createDate = (data.createDate && data.createDate.format()) || null;
    }
}
