import { VueSelectorPromise } from 'testcafe-vue-selectors';

// selector object
export interface ISelector {
    selector: Selector | VueSelectorPromise | SelectorPromise;
}
// group of selector objects - used for checkAttribute and visibleAll utils
export interface ISelectors {
    [key: string]: ISelector
}
