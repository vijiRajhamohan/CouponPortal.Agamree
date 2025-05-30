import { each } from 'lodash';

export function clearRecords(value: any) {
    each(value, (v, k) => {
        if (Array.isArray(v)) {
            value[k] = [];
        } else {
            switch (typeof v) {
                case 'string':
                    value[k] = '';
                    break;
                case 'number':
                    value[k] = null;
                    break;
                case 'boolean':
                    value[k] = false;
                    break;
                default:
                    value[k] = null;
                    break;
            }
        }
    });
}
