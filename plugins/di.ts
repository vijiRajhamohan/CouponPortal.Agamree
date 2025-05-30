/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoInject, Container } from 'vue-di';
import { Context } from '@nuxt/types';
import { configure } from '@trialcard/apigateway.client';
import { AXIOS } from '@trialcard/apigateway.client/symbols';
import { AXIOS_CONFIGURATION, X_TC_USERID } from '@trialcard/shared';
import Axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import { IServiceContext, OAUTH_TOKEN_PROVIDER } from '@trialcard/authentication';
import VueRouter from 'vue-router';
import { has, startsWith } from 'lodash';
import moment from 'moment';
import { Settings } from '~/services/settings';
import SessionModule from '~/store/session';

export default (context: Context) => {
    const container = context.container;
    container.registerSingleton(OAUTH_TOKEN_PROVIDER, {
        get(container) {
            return new TokenProvider(container);
        },
    });
    container.registerInstance<AxiosRequestConfig>(AXIOS_CONFIGURATION, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformRequest(data: any, headers?: any) {
            delete headers['User-Agent'];
            if (Array.isArray(Axios.defaults.transformRequest)) {
                return Axios.defaults.transformRequest[0](data, headers);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return Axios.defaults.transformRequest!(data, headers);
        },
        // transformResponse(data: any, headers?: any) {
        //     let response: any;
        //     if (Array.isArray(Axios.defaults.transformResponse)) {
        //         response = Axios.defaults.transformResponse[0](data, headers);
        //     } else {
        //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //         response = Axios.defaults.transformResponse!(data, headers);
        //     }
        //     if (typeof response === 'object' && has(response, 'success') && !response.success) {
        //         if (response.messages && response.messages.some((z: string) => startsWith(z, 'Session not found'))) {
        //         }
        //     }
        //     return response;
        // },
    });
    container.registerInstance<string>(X_TC_USERID, '');
    configure(container, process.env.CONNECTTO as any);
    const gatewayAxios = container.get<AxiosInstance>(AXIOS);
    gatewayAxios.interceptors.response.use(
        response => {
            return response;
        },
        async (error: AxiosError) => {
            const session = container.get(SessionModule);
            if (session.expirationDate && moment().isAfter(session.expirationDate)) {
                session.clearData();
                await session.ensure();
                context.app.router!.push({ name: 'index' });
            }
            return error;
        }
    );
    {
        let buster = 0;
        gatewayAxios.interceptors.request.use(
            request => {
                if (request.url && request.method && request.method.toLowerCase() === 'get') {
                    request.url += `${request.url.includes('?') ? '&' : '?'}__cachebust=${buster++}`;
                }
                return request;
            },
            e => e
        );
    }
    container.registerInstance(Settings, new Settings(context.env));
    container.registerResolver(VueRouter, {
        get() {
            return context.app.router;
        },
    });
};

@AutoInject
class TokenProvider {
    private _module?: SessionModule;
    public constructor(private readonly container: Container) {}
    public async getToken(context: IServiceContext) {
        if (!this._module) {
            this._module = this.container.get(SessionModule);
        }
        await this._module.ensure();
        return this._module.token;
    }
}
