import { findIndex } from 'lodash';
import { Route } from 'vue-router';

export function createRouteTransition(routes: Array<{ name: string }>) {
    return function(to: Route, from: Route) {
        if (!from) return 'scroll-x-transition';
        if (findIndex(routes, { name: to.name! }) > findIndex(routes, { name: from.name! })) {
            return 'scroll-x-transition';
        }
        return 'scroll-x-reverse-transition';
    };
}
