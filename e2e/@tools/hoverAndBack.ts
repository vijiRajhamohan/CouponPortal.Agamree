import VueSelector, { VueSelectorPromise } from 'testcafe-vue-selectors';
import { scrollTo } from './scrollTo';
export function hoverAndBack(t: TestController, field: VueSelector | VueSelectorPromise | Selector | SelectorPromise, offsetY?: number) {
    return t
        .expect(scrollTo(100000, { easing: 'easeOutQuad', duration: 200 }))
        .ok()
        .hover(field as any, { offsetX: 0, offsetY: offsetY || -120 });
}
