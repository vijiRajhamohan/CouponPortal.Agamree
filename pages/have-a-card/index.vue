<template>
    <form-context :validator="$v">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="12">
                    <h1 class="brand-header">
                        Activate your
                        <span v-text="$settings.program"></span>
                        Card
                    </h1>
                </v-col>
                <v-col cols="12" md="6">
                    <form-field v-slot="{ attrs, events }" name="memberNumber" label="Your 11-Digit Member Number">
                        <v-text-field ref="input_memberNumber" v-model="memberNumber" v-bind="attrs" v-on="events"></v-text-field>
                    </form-field>
                </v-col>
            </v-row>
            <NextBack :btn-names="['Activate', 'Back']" :back-function="handleBack" :next-function="activateNumber" />
        </v-container>
    </form-context>
</template>

<style lang="scss"></style>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Emit } from 'vue-property-decorator';
import { required, numeric, maxLength, minLength, helpers } from 'vuelidate/lib/validators';
import { Resolve } from 'vue-di';
import { first } from 'lodash';
import { Validate } from '~/validation/Validate';
import { Title } from '~/decorators/Title';
import haveACardModule from '~/store/have-a-card';
import NextBack from '~/components/NextBack.vue';

@Component<Index>({
    created() {},
    components: {
        NextBack,
    },
    validations: {},
})
export default class Index extends Vue {
    @Resolve
    public module!: haveACardModule;

    handleBack() {
        this.$router.push({ name: 'index' });
    }

    private touch() {
        this.$v.$touch();
    }

    public doValidate() {
        this.touch();
        if (this.$v.$invalid) {
            return false;
        }
        return true;
    }

    public get isInvalid() {
        return this.$v.$invalid && this.$v.$dirty;
    }

    public activateNumber() {
        if (!this.doValidate()) {
            return;
        }

        this.module.updateHaveACard({
            memberNumber: this.memberNumber,
        });

        this.$router.push({ name: 'have-a-card-success' });
    }

    @Validate({ required, numeric, maxLength: maxLength(11), minLength: minLength(11) })
    public memberNumber = '';
}
</script>
