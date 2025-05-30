// import { Selector } from 'testcafe';

// // import VueSelector from 'testcafe-vue-selectors';
// // import { mapValues } from 'lodash';
// export const VueSelector: import('testcafe-vue-selectors').default = Selector(complexSelector => {
//     function validateSelector(selector: any) {
//         if (selector !== void 0 && typeof selector !== 'string')
//             throw new Error('If the selector parameter is passed it should be a string, but it was ' + eval('typeof selector')); // eslint-disable-line no-eval
//     }

//     function validateVueVersion(rootInstance: any) {
//         const MAJOR_SUPPORTED_VUE_VERSION = 2;
//         const vueVersion = parseInt(findVueConstructor(rootInstance).version.split('.')[0], 10);

//         if (vueVersion < MAJOR_SUPPORTED_VUE_VERSION) throw new Error('testcafe-vue-selectors supports Vue version 2.x and newer');
//     }

//     /*eslint-disable no-unused-vars, no-eval*/
//     function findVueConstructor(rootInstance: any) {
//         // NOTE: Testcafe does not support a ClientFunction containing polyfilled functions. See list in
//         // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js.
//         // This is why, we use this hack.
//         let Vue = eval('Object.getPrototypeOf(rootInstance)').constructor;

//         while (Vue.super) Vue = Vue.super;

//         return Vue;
//     }
//     /*eslint-enable no-unused-vars, no-eval*/

//     function findFirstRootInstance() {
//         let instance = null;
//         const fn: any = () => NodeFilter.FILTER_ACCEPT;
//         const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, fn, false);

//         while (!instance && treeWalker.nextNode()) instance = (treeWalker.currentNode as any).__vue__;

//         return instance;
//     }

//     function getComponentTagNames(componentSelector: string) {
//         return componentSelector
//             .split(' ')
//             .filter(el => !!el)
//             .map(el => el.trim());
//     }

//     function getComponentTag(instance: any) {
//         return instance.$options.name || instance.$options._componentTag || instance.$options.__file || '';
//     }

//     function isRef(selector: string) {
//         return selector.includes('ref:');
//     }

//     function getRef(selector: any) {
//         if (selector.indexOf('ref:') === 0 && selector.split('ref:')[1]) return selector.split('ref:')[1];

//         throw new Error("If the ref is passed as selector it should be in the format 'ref:ref-selector'");
//     }

//     function getRefOfNode(node: any) {
//         if (node.$vnode && node.$vnode.data) return node.$vnode.data.ref;
//         return null;
//     }

//     function filterNodes(root: any, tags: any) {
//         const foundComponents: any[] = [];

//         function walkVueComponentNodes(node: any, tagIndex: any, checkFn: any) {
//             if (checkFn(node, tagIndex)) {
//                 if (tagIndex === tags.length - 1) {
//                     foundComponents.push(node.$el);
//                     return;
//                 }

//                 tagIndex++;
//             }

//             for (let i = 0; i < node.$children.length; i++) {
//                 const childNode = node.$children[i];

//                 walkVueComponentNodes(childNode, tagIndex, checkFn);
//             }
//         }

//         walkVueComponentNodes(root, 0, (node: any, tagIndex: any) => {
//             if (isRef(tags[tagIndex])) {
//                 console.log(node, getRefOfNode(node));
//                 const ref = getRef(tags[tagIndex]);

//                 return ref === getRefOfNode(node);
//             }
//             console.log(node, getComponentTag(node));
//             return tags[tagIndex] === getComponentTag(node);
//         });
//         return foundComponents;
//     }

//     validateSelector(complexSelector);

//     const rootInstance = findFirstRootInstance();

//     if (!rootInstance) return null;

//     validateVueVersion(rootInstance);

//     if (!complexSelector) return rootInstance.$el;

//     const componentTags = getComponentTagNames(complexSelector);
//     console.log(rootInstance);
//     console.log(componentTags);

//     return filterNodes(rootInstance, componentTags);
// }).addCustomMethods({
//     getVue: (node, fn) => {
//         function getData(instance: any, prop: any) {
//             const result: any = {};

//             Object.keys(prop).forEach(key => {
//                 result[key] = instance[key];
//             });

//             return result;
//         }

//         function getProps(instance: any) {
//             return getData(instance, instance.$options.props || {});
//         }

//         function getState(instance: any) {
//             const props = instance._props || instance.$options.props;
//             const getters = instance.$options.vuex && instance.$options.vuex.getters;
//             const result: any = {};

//             Object.keys(instance._data)
//                 .filter(key => !(props && key in props) && !(getters && key in getters))
//                 .forEach(key => {
//                     result[key] = instance._data[key];
//                 });

//             return result;
//         }

//         function getComputed(instance: any) {
//             return getData(instance, instance.$options.computed || {});
//         }

//         function getComponentReference(instance: any) {
//             return instance.$vnode && instance.$vnode.data && instance.$vnode.data.ref;
//         }

//         const nodeVue = (node as any).__vue__;

//         if (!nodeVue) return null;

//         const props = getProps(nodeVue);
//         const state = getState(nodeVue);
//         const computed = getComputed(nodeVue);
//         const ref = getComponentReference(nodeVue);

//         if (typeof fn === 'function') return fn({ props, state, computed, ref });

//         return { props, state, computed, ref };
//     },
// }) as any;
