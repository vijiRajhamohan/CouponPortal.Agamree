import { ClientFunction } from 'testcafe';

export const nuxtLoaderHidden = ClientFunction(() => {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (document.querySelector('#__nuxt')) return;

            clearInterval(interval);
            resolve();
        }, 100);
    });
});
