import Vue from 'vue';
import { Emit, Component, Inject } from 'vue-property-decorator';
import { InjectVuexModule } from 'vue-di/vuex';

import { Validation } from 'vuelidate';
import { Title } from '~/decorators/Title';

export interface IStepperStep {
    doValidate(): Promise<boolean>;
    doReset(): void;
    doComplete(): Promise<void>;
    readonly isInvalid: boolean;
    readonly isValid: boolean;
    title: string;
    $v: Validation;
    $el?: Element;
}

export default function StepperStep<T = undefined>(options: { title: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @((Component as any)({}))
    // @((Title as any)(options.title))
    class StepperStep extends Vue implements IStepperStep {
        @Inject('store-module')
        protected readonly module!: T;

        public title = options.title;

        public get isValid() {
            return !this.isInvalid;
        }
        public get isInvalid() {
            return this.$v.$invalid && this.$v.$dirty;
        }

        public async doValidate() {
            this.$v.$touch();
            return this.isValid;
        }

        public doReset() {
            this.$v.$reset();
        }
        public async doComplete() {}

        public nextStep() {}
    }
    (StepperStep as any).title = options.title;
    return StepperStep;
}
