/* eslint-disable @typescript-eslint/no-explicit-any */
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';
import { StoreOptions } from 'vuex';
import { startsWith } from 'lodash';
// Root module cannot be an injected module

const store = {
    state() {
        return {
            restored: 0,
        };
    },
    mutations: {
        STORE_RESTORED: state => {
            state.restored = state.restored + 1;
        },
    },
    getters: {
        loaded(state) {
            return state.restored >= 2;
        },
    },
    actions: {
        CLEAR: async (state, payload) => {
            if (process.client) {
                const keys = await localForage.keys();
                for (const key of keys) {
                    await localForage.removeItem(key);
                }
            }
        },
        async ensureStateLoaded(context) {
            if (context.getters.loaded) {
                return true;
            }

            return new Promise<boolean>(resolve => {
                const cb = this.watch(
                    (state, getters) => getters.loaded,
                    newValue => {
                        resolve(newValue);
                        cb();
                    }
                );
            });
        },
    },
    plugins: [
        store =>
            store.subscribe((mutation, state) => {
                if (mutation.type === 'RESTORE_MUTATION') {
                    store.commit('STORE_RESTORED');
                }
            }),
    ],
} as StoreOptions<any>;

if (process.client) {
    const vuexLongTermPersist = new VuexPersistence<any>({
        key: process.env.PORTALID,
        storage: localForage,
        modules: [
            'session',
            // 'layout'
        ], // modules to store to the users browser
        asyncStorage: true,
        strictMode: true, // process.env.NODE_ENV !== 'production',
    });
    const vuexSessionPersist = new VuexPersistence<any>({
        key: process.env.PORTALID,
        storage: window.sessionStorage,
        modules: ['enrollment'], // modules to store to the users browser
        strictMode: true, // process.env.NODE_ENV !== 'production',
    });

    store.mutations!.RESTORE_MUTATION = function(state: any, payload?: any) {
        if (payload.enrollment) {
            vuexSessionPersist.RESTORE_MUTATION.call(this, state, payload);
        } else {
            vuexLongTermPersist.RESTORE_MUTATION.call(this, state, payload);
        }
    };
    store.plugins!.push(vuexLongTermPersist.plugin, vuexSessionPersist.plugin);
}

export default store;
