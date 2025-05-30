import { ConstructorOf, Wrap } from 'vue-di';
import { Store } from 'vuex';

export function OnClear<T>(func: (value: T) => Promise<void>) {
    return function(target: ConstructorOf<T>) {
        return Wrap({
            get(value: T) {
                ((value as any).store as Store<any>).subscribeAction(async (action, state) => {
                    if (action.type === 'CLEAR') {
                        await func(value);
                    }
                });
                return value;
            },
        })(target);
    };
}
