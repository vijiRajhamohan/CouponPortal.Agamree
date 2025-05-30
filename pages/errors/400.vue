<template>
    <DefaultError :code="400" />
</template>

<script lang="ts">
import Vue from 'vue';
import DefaultError from '~/components/DefaultError.vue';
export default Vue.extend({
    components: { DefaultError },
    head() {
        return {
            title: (this.$settings.errorPages[400] || this.$settings.errorPages.default).title,
        };
    },
});
</script>
