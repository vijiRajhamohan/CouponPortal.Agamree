import Component from 'vue-class-component';

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'head',
    'middleware',
    'layout',
    'transition',
    'scrollToTop',
    'validate',
]);
