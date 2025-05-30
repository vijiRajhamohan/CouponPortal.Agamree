import { flow, camelCase, upperFirst, map, findIndex, kebabCase, startCase, some, each, find } from 'lodash';
import { VueConstructor } from 'vue';
import Component from 'vue-class-component';
import { Watch, Provide, Prop, Mixins } from 'vue-property-decorator';
import { InjectVuexModule } from 'vue-di/vuex';
import { ConstructorOf } from 'vue-di';
import { IStepperStep } from './StepperStep';
import { WaitFor } from './WaitFor';
import { Title } from '~/decorators/Title';

const pascalCase = flow(
    camelCase,
    upperFirst
);
export default function Stepper<T, S extends InjectVuexModule>(
    options: { title: string; waiter: string; module?: ConstructorOf<S> },
    steps: { [K in keyof T]: T[K] }
) {
    const listOfSteps = map(steps, (v, k) => k);
    const { title, module } = options;

    // NOTE: These are casted to any to remove the typescript error
    // This is related to how VueDecorator is typed... however in this case we do want an abstract class
    /* eslint-disable @typescript-eslint/no-explicit-any */
    @((Component as any)({
        components: steps,
    }))
    /* eslint-enable @typescript-eslint/no-explicit-any */
    abstract class Stepper extends Mixins(WaitFor) {
        private __storeSubscription?: () => void;
        protected steps = steps;
        protected stepsArray = listOfSteps;
        protected waiter = options.waiter;
        @Provide('store-module')
        protected get module(): S {
            return module ? this.$container.get(module) : (undefined as any);
        }

        protected abstract async onComplete(): Promise<void>;

        public created() {
            const page = pascalCase((this.$route.query.page || '').toString());
            if (page !== this.currentStepName) {
                const newIndex = findIndex(listOfSteps, x => x === page);
                if (newIndex === -1) {
                    this.$router.push({ name: this.$route.name!, query: { page: kebabCase(this.currentStepName) } });
                } else {
                    this.$router.push({ name: this.$route.name!, query: { page: kebabCase(page) } });
                }
            }
        }

        public stepAttrs(key: string, index: number) {
            return {
                complete: this.isComplete(key),
                rules: this.isError(key),
                step: index + 1,
            };
        }

        public head() {
            return {
                title: this.title,
            };
        }

        public get title() {
            const step = this.getRef(this.currentStepName);
            if (!step) {
                return `${options.title}`;
            }
            return `${step.title} - ${options.title}`;
        }

        protected get currentStep() {
            return Math.max(0, findIndex(listOfSteps, z => kebabCase(z) === this.$store.state.route.query.page)) + 1;
        }
        protected set currentStep(value) {
            this.$router.push({
                name: this.$route.name!,
                query: { page: kebabCase(listOfSteps[value - 1]) },
            });
        }
        public get currentStepIndex() {
            return this.currentStep - 1;
        }

        public get currentStepName() {
            return listOfSteps[this.currentStepIndex];
        }

        public get isFirstStep() {
            return this.currentStep === 1;
        }

        public get isLastStep() {
            return this.currentStep === listOfSteps.length;
        }

        public get isCurrentStepInvalid() {
            const ref = this.getRef(this.currentStepName);
            if (!ref) return true;
            return ref.isInvalid;
        }

        public getStep(name: string) {
            return findIndex(listOfSteps, name) + 1;
        }

        public getRef(name: string): IStepperStep {
            const ref = this.$refs && this.$refs[name];
            if (Array.isArray(ref)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return ref[0] as any;
            } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return ref as any;
            }
        }

        public nextStep(): Promise<void> {
            return this.waitFor(options.waiter, async () => {
                if (await this.validateStep()) {
                    await this.completeStep();
                    if (this.currentStep >= listOfSteps.length) {
                        if (await this.validateSteps()) {
                            await this.onComplete();
                        }
                    } else {
                        this.$router.push(
                            {
                                name: this.$route.name!,
                                query: { page: kebabCase(listOfSteps[Math.min(this.currentStepIndex + 1, listOfSteps.length - 1)]) },
                            },
                            async () => {
                                if (this.$el) {
                                    await this.$vuetify.goTo(this.$el as HTMLElement, { easing: 'easeInOutQuart', duration: 500 });
                                } else {
                                    await this.$vuetify.goTo(0, { easing: 'easeInOutQuart', duration: 500 });
                                }
                            }
                        );
                    }
                } else {
                    const ref = this.getRef(this.currentStepName);
                    if (ref.$el) {
                        const elements = this.getRef(this.currentStepName).$el!.querySelectorAll('.error--text');
                        if (elements && elements.length > 0) {
                            this.$vuetify.goTo(elements[0] as HTMLElement, { easing: 'easeInOutQuart', duration: 500, offset: 50 });
                        }
                    }
                }
            });
        }

        public prevStep() {
            if (this.currentStepIndex < 1) {
                return;
            }
            this.$router.push({
                name: this.$route.name!,
                query: { page: kebabCase(listOfSteps[Math.max(this.currentStepIndex - 1, 0)]) },
            });
        }

        public isComplete(name: string) {
            const ref = this.getRef(name);
            if (!ref) return false;
            return !ref.$v.$invalid && ref.$v.$dirty;
        }

        public isEditable(name: string) {
            const ref = this.getRef(name);
            if (!ref) return false;
            return ref.$v.$dirty || ref.$v.$invalid;
        }

        public isError(name: string) {
            return [
                () => {
                    const ref = this.getRef(name);
                    if (!ref) return true;
                    return !(ref.$v.$dirty && ref.$v.$invalid);
                },
            ];
        }

        public resetStep(name = this.currentStepName) {
            const ref = this.getRef(name);
            if (!ref) return;
            return ref.doReset();
        }

        public validateStep(name = this.currentStepName) {
            const ref = this.getRef(name);
            if (!ref) return Promise.resolve(false);
            return ref.doValidate();
        }

        public completeStep(name = this.currentStepName) {
            const ref = this.getRef(name);
            if (!ref) return Promise.resolve();
            return ref.doComplete();
        }

        public async validateSteps(): Promise<boolean> {
            each(listOfSteps, x => this.getRef(x).$v.$touch());
            for (const step of listOfSteps) {
                const ref = this.getRef(step);
                await ref.doValidate();
            }

            if (some(listOfSteps, x => this.getRef(x).isInvalid)) {
                if (this.getRef(this.currentStepName).isInvalid) {
                    return false;
                } else {
                    const name = find(listOfSteps, z => this.getRef(z).isInvalid)!;
                    this.$router.push({ name: this.$route.name!, query: { page: kebabCase(name) } }, async () => {
                        if (this.$el) {
                            await this.$vuetify.goTo(this.$el as HTMLElement, { easing: 'easeInOutQuart', duration: 500 });
                        } else {
                            await this.$vuetify.goTo(0, { easing: 'easeInOutQuart', duration: 500 });
                        }
                    });
                    return false;
                }
            }
            return true;
        }
    }
    return Stepper;
}
