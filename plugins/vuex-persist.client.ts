import { Context } from '@nuxt/types';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

export default async (context: Context, inject: (name: string, value: any) => void) => {
    await context.store.dispatch('ensureStateLoaded');
    // const vuexPersist = new VuexPersistence<any>({
    //     storage: localForage,
    //     modules: ['session', 'layout'], // modules to store to the users browser
    //     asyncStorage: true,
    //     strictMode: process.env.NODE_ENV !== 'production',
    // });
    // vuexPersist.plugin(context.store);
};
