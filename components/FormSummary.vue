<template>
    <v-flex>
        <v-alert
            v-for="error in errors"
            :key="error.validationKey + error.fieldName"
            type="error"
            outlined
            icon="$vuetify.icons.error"
            transition="scale-transition"
            :value="error.$dirty && error.hasError"
        >
            {{ getErrorMessage(error.validationKey, error.params) }}
        </v-alert>
    </v-flex>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue, { RenderContext, CreateElement } from 'vue';
import { multiErrorExtractorMixin } from 'vuelidate-error-extractor';
import Component from 'vue-class-component';

@Component({})
export default class FormSummary extends Vue.extend(multiErrorExtractorMixin) {}
</script>
