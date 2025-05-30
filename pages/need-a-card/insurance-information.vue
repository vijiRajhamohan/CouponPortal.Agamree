<template>
    <form-context :validator="$v">
        <v-row :justify="'center'">
            <v-col cols="12" md="10" lg="8" xl="6">
                <v-card class="mb-7">
                    <div class="px-8">
                        <v-row :justify="'center'">
                            <v-col cols="12" class="my-2">
                                <h2 data-test="message_h1" class="px-0 mb-0 mt-4 brand-header sub-header">Insurance Information</h2>
                                <v-card-text class="px-0 pb-0">
                                    <p class="legend mb-0">
                                        <v-icon>$asterisk</v-icon>
                                        = Required
                                    </p>
                                </v-card-text>
                                <v-row>
                                    <v-col cols="12" md="6" >
                                        <form-field v-slot="{ attrs, events }" name="state" label="Insurance State">
                                            <v-autocomplete
                                                ref="patient_addresses_0_state"
                                                v-model="state"
                                                :items="states"
                                                clearable
                                                auto-select-first
                                                item-text="description"
                                                item-value="code"
                                                v-bind="attrs"
                                                autocomplete="disabled"
                                                v-on="events"
                                            ></v-autocomplete>
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <form-field v-slot="{ attrs, events }" name="insuranceCarrier" label="Insurance Carrier">
                                            <v-autocomplete
                                                ref="payor_name"
                                                v-model="insuranceCarrier"
                                                :items="payorList"
                                                clearable
                                                auto-select-first
                                                item-text="payorName"
                                                item-value="payorName"
                                                no-data-text="Please select the patient's state"
                                                v-bind="attrs"
                                                autocomplete="disabled"
                                                v-on="events"
                                            ></v-autocomplete>
                                        </form-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="insuranceCarrier === 'Other'">
                                    <v-col cols="12">
                                        <form-field
                                            v-slot="{ attrs, events }"
                                            name="otherCarrier"
                                            label="Other Insurance Carrier"
                                        >
                                            <v-text-field
                                                ref="payor_payor-benefit_otherCarrier"
                                                v-model="otherCarrier"
                                                v-bind="attrs"
                                                :maxLength="50"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6" lg="6">
                                        <form-field
                                            v-slot="{ attrs, events }"
                                            name="firstName"
                                            label="Policy Holder First Name"
                                        >
                                            <v-text-field
                                                ref="payor_payor-benefit_first-name"
                                                v-model="firstName"
                                                v-bind="attrs"
                                                :maxLength="20"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="5" lg="6">
                                        <form-field
                                            v-slot="{ attrs, events }"
                                            name="lastName"
                                            label="Policy Holder Last Name"
                                        >
                                            <v-text-field
                                                ref="payor_payor-benefit_last-name"
                                                v-model="lastName"
                                                v-bind="attrs"
                                                :maxLength="20"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <form-field v-slot="{ attrs, events }" name="policyNumber" label="Policy Number">
                                            <v-text-field
                                                ref="payor_payor-benefit_policy-number"
                                                v-model="policyNumber"
                                                v-bind="attrs"
                                                :maxLength="20"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <form-field v-slot="{ attrs, events }" name="groupNumber" label="Group Number">
                                            <v-text-field
                                                ref="payor_payor-benefit_group-number"
                                                v-model="groupNumber"
                                                v-bind="attrs"
                                                :maxLength="20"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <NextBack :back-function="handleBack" :next-function="submit" />
                        </v-row>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </form-context>
</template>

<style lang="scss"></style>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { required, maxLength } from 'vuelidate/lib/validators';
import { PayorModel } from '@trialcard/apigateway.models';
import { PayorV4GlobalApi } from '@trialcard/apigateway.client/payorV4GlobalApi';
import { Watch } from 'vue-property-decorator';
import { RuleDecl } from 'vue/types/options';
import { AddressType, RoleType, PayorType } from '@trialcard/enums';
import moment from 'moment';
import states from '~/assets/states.json';
import NextBack from '~/components/NextBack.vue';
import { Validate } from '~/validation/Validate';
import EnrollmentModule from '~/store/enrollment';
import EligibilityModule from '~/store/eligibility';
import SurveyModule from '~/store/survey';
import { CommonTools } from '~/components/tools/commonTools';
import LayoutModule from '~/store/layout';

const requiredIfOther = function(obj: RuleDecl) {
    return function(this: InsuranceInformation): RuleDecl {
        return this.insuranceCarrier === 'Other' ? obj : {};
    };
};


@Component<InsuranceInformation>({
    components: {
        NextBack,
    },
})
export default class InsuranceInformation extends Vue {
    public states = states;

    @Resolve
    public enrollment!: EnrollmentModule;

    @Resolve
    public eligibility!: EligibilityModule;

    @Resolve
    public survey!: SurveyModule;

    @Resolve
    public payor!: PayorV4GlobalApi;

    @Resolve
    public layout!: LayoutModule;

    @Validate({ required })
    public state = ''
    @Validate({ required })
    public insuranceCarrier = '' as string;
    @Validate({ required, maxLength: maxLength(20) })
    public firstName = '' as string;
    @Validate({ required, maxLength: maxLength(20) })
    public lastName = '' as string;
    @Validate(requiredIfOther({ required , maxLength: maxLength(50)}))
    public otherCarrier = '';
    @Validate({ maxLength: maxLength(20) })
    public policyNumber = '' as string;
    @Validate({ maxLength: maxLength(20) })
    public groupNumber = '' as string;

    public payorList = [] as PayorModel[];

    @Watch('state', { immediate: true })
    public async watchState(state: string) {
        if (!state) return;
        this.$wait.start('nuxt');
        const result = await this.payor.globalPayorSearchByTenantId({ coverageAreaState: state });
        this.payorList = result.data && result.data.data && result.data.data.payors || [];
        this.payorList.push({
            payorName: 'Other',
            payorType: PayorType.INS,
        } as PayorModel);
        this.$wait.end('nuxt');
    }

    @Watch('enrollment.payorData', { immediate: true, deep: true })
    watchPayor(values: typeof EnrollmentModule.prototype.payorData) {
        const { payorName, payorGroup, payorBenefit, addresses } = values[0].model!;
        const enrollmentObj = {
            state: addresses.length > 0 && addresses[0].state || '',
            insuranceCarrier: payorName || '',
            firstName: payorBenefit!.policyHolderFirstName || '',
            lastName: payorBenefit!.policyHolderLastName || '',
            policyNumber: payorBenefit!.policyNumber || '',
            groupNumber: payorGroup || '',
        };
        Object.assign(this, enrollmentObj);
    }

    structurePayorData() {
        const payors = [];
        payors.push({
            canUpdate: true,
            canInsert: true,
            skipSearch: false,
            model: {
                payorType: PayorType.INS,
                payorName: this.otherCarrier || this.insuranceCarrier,
                payorGroup: this.groupNumber,
                accountRelationshipCoverageOrder: 1,
                accountRoleType: RoleType.InsuranceProvider,
                webAddresses: [],
                addresses: [
                    {
                        addressType: AddressType.UNKNOWN,
                        state: this.state
                    }
                ],
                phoneNumbers: [],
                emailAddresses: [],
                contacts: [],
                payorBenefit: {
                    policyHolderFirstName: this.firstName,
                    policyHolderLastName: this.lastName,
                    policyNumber: this.policyNumber,
                },
            },
        });
        this.enrollment.updatePayors(payors)
    }

    public handleBack() {
        this.structurePayorData();
        const name = CommonTools.getRouteName('insurance-information', this.layout.configuration.pages, true);
        this.$router.push({ name });
    }

    public async submit() {
        this.$v.$touch();
        CommonTools.checkError(this.$v);
        if (!this.$v.$anyError){
            this.$wait.start('nuxt');
            let didSucceed = false;
            await this.structurePayorData();
            didSucceed = true;
            // this.survey.setSurveyId(this.$settings.surveyId);
            // await this.survey.fetchSurveySession(this.eligibility.eligibilityData);
            // // block enrollment if the survey wasn't created, and send user to error page
            // const enrollmentResult = (!this.survey.error && (await this.enrollment.submitToAPI())) || null;
            // if (enrollmentResult && enrollmentResult.status === 200) {
            //     const memberNumber =
            //     (enrollmentResult.data &&
            //         enrollmentResult.data.data &&
            //         enrollmentResult.data.data.enrollment &&
            //         enrollmentResult.data.data.enrollment.memberNumbers[0].number) ||
            //         '';
            //     const expirationDate =
            //         (enrollmentResult.data &&
            //             enrollmentResult.data.data &&
            //             enrollmentResult.data.data.enrollment &&
            //             enrollmentResult.data.data.enrollment.endDate) ||
            //             '';
            //     didSucceed = true;
            //     this.enrollment.setExpirationDate(moment(expirationDate));
            //     this.enrollment.setMemberNumber(memberNumber);
            //     this.$wait.end('nuxt');
            // }
            if (didSucceed) {
                const name = CommonTools.getRouteName('insurance-information', this.layout.configuration.pages);
                this.$router.push({ name });
            } else {
                this.$router.push({ name: 'error' });
            }
        }
    }


}
</script>
