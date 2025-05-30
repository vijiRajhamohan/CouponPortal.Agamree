<template>
    <DefaultError :code="401" />
</template>

<script lang="ts">
import Vue from 'vue';
import DefaultError from '~/components/DefaultError.vue';
export default Vue.extend({
    components: { DefaultError },
    head() {
        return {
            title: (this.$settings.errorPages[401] || this.$settings.errorPages.default).title,
        };
    },
});
</script>
