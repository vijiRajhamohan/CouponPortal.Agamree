import Vue from 'vue';
export const WaitFor = Vue.extend({
    methods: {
        async waitFor<T>(waiter: string, func: () => Promise<T>) {
            try {
                this.$wait.start(waiter);
                return await func();
            } finally {
                if (this.$wait.is(waiter)) {
                    this.$wait.end(waiter);
                }
            }
        },
    },
});
