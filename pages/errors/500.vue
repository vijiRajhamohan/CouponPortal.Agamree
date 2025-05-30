<template>
    <DefaultError :code="500" />
</template>

<script lang="ts">
import Vue from 'vue';
import DefaultError from '~/components/DefaultError.vue';
export default Vue.extend({
    components: { DefaultError },
    head() {
        return {
            title: (this.$settings.errorPages[500] || this.$settings.errorPages.default).title,
        };
    },
});
</script>
