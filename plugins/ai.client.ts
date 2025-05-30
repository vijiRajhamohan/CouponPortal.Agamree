/* eslint-disable @typescript-eslint/no-explicit-any */
import { CtxTagKeys } from '@microsoft/applicationinsights-common';
import { ApplicationInsights, ITelemetryPlugin, ITelemetryItem } from '@microsoft/applicationinsights-web';
import { Context } from '@nuxt/types';
import { IPlugin, IAppInsightsCore, IConfiguration } from '@microsoft/applicationinsights-core-js';
import VueRouter, { Route } from 'vue-router';

export default (context: Context, inject: (name: string, value: any) => void) => {
    const ApplicationInsightsKey = context.env.ApplicationInsightsKey!;
    if (!ApplicationInsightsKey) return;
    const customPlugin = new Plugin();
    const appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: ApplicationInsightsKey,
            extensions: [customPlugin],
            loggingLevelConsole: 2,
            loggingLevelTelemetry: 2,
            autoTrackPageVisitTime: true,
            maxAjaxCallsPerView: -1,
            disableDataLossAnalysis: false,
            correlationHeaderExcludedDomains: [],
            enableCorsCorrelation: true,
            appId: process.env.PORTALID,
            // accountId: '',
        },
    });

    appInsights.loadAppInsights();
    appInsights.trackPageView({});

    inject('ai', appInsights);

    const router = (context.app as any).router as VueRouter;

    {
        let toPage: Route | undefined;
        router.beforeEach((to, from, next) => {
            if (to.name === from.name) return;
            appInsights.startTrackEvent(getRouteName(to));
            toPage = to;
            next();
        });

        router.onError(e => {
            if (toPage) {
                appInsights.stopTrackEvent(getRouteName(toPage));
                toPage = undefined;
            }
        });

        const disposable = router.afterEach((to, from) => {
            if (to.name === from.name) return;
            const url = location.protocol + '//' + location.host + '/' + to.fullPath;
            // appInsights.stopTrackPage(getRouteName(from), url);
            appInsights.stopTrackEvent(getRouteName(to));
            appInsights.startTrackPage(getRouteName(to));
            disposable();

            router.afterEach((to, from) => {
                if (to.name === from.name) return;
                const url = location.protocol + '//' + location.host + '/' + to.fullPath;
                appInsights.stopTrackPage(getRouteName(from), url);
                appInsights.stopTrackEvent(getRouteName(to));
                appInsights.startTrackPage(getRouteName(to));
                appInsights.trackPageView({});
            });
        });
    }
};

function getRouteName(route: Route) {
    return process.env.NAME + ' / ' + route.fullPath;
}

class Plugin implements ITelemetryPlugin {
    private _nextPlugin: ITelemetryPlugin | undefined;

    public processTelemetry(item: ITelemetryItem) {
        item.tags!.push({
            [CtxTagKeys.cloudRole]: process.env.TYPE,
            [CtxTagKeys.cloudRoleInstance]: process.env.NAME,
            [CtxTagKeys.cloudRoleVer]: process.env.VERSION,
            [CtxTagKeys.applicationId]: process.env.PORTALID,
            [CtxTagKeys.applicationVersion]: process.env.VERSION,
        });
        if (this._nextPlugin && this._nextPlugin.processTelemetry) {
            this._nextPlugin.processTelemetry(item);
        }
    }
    public setNextPlugin(next: ITelemetryPlugin | any) {
        this._nextPlugin = next;
    }
    public priority = 201;
    public initialize(config: IConfiguration, core: IAppInsightsCore, extensions: IPlugin[]) {}
    public identifier = 'ai.client';
    public version = process.env.VERSION;
}
