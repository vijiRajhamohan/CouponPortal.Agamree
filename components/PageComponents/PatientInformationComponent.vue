<template>
    <v-row :justify="'center'" class="mb-10">
        <form-context :validator="patientInformation.$v">
            <v-col cols="12">
                <h2 data-test="message_h1" class="px-0 mb-0 mt-4 brand-header sub-header">Patient Information</h2>
                <v-card-text class="px-0">
                    To finish enrollment, please enter information as displayed on the patient's insurance card.
                    <p aria-hidden="true" class="legend">
                        <v-icon>$asterisk</v-icon>
                        = Required
                    </p>
                </v-card-text>
                <form-context v-if="layout.configuration.hasConditionalFields" :validator="patientInformation.$v" :messages="formMessages">
                    <v-row>
                        <v-col cols="12" class="radio-column">
                            <v-icon
                                aria-required="true"
                                aria-hidden="false"
                                :class="{
                                    'required-icon': true,
                                    'error--text': patientInformation.$v.isCareGiver.$error,
                                }"
                            >
                                $asterisk
                            </v-icon>
                            <p
                                :class="{
                                    'question-label': true,
                                    'error--text': patientInformation.$v.isCareGiver.$error,
                                }"
                            >
                                I certify that I am a care partner of the patient, I am at least 18 years of age, and I am legally
                                authorized to make decisions on behalf of the patient.
                            </p>

                            <form-field v-slot="{ attrs, events }" name="isCareGiver">
                                <v-radio-group
                                    id="radio-caregiver"
                                    ref="survey_caregiver_question"
                                    v-model="patientInformation.isCareGiver"
                                    row
                                    v-bind="attrs"
                                    v-on="events"
                                    @change="patientInformation.setCellNumber"
                                >
                                    <v-radio
                                        ref="survey_caregiver_answerYes"
                                        label="Yes"
                                        color="primary"
                                        :value="true"
                                        class="pl-1"
                                    ></v-radio>
                                    <v-radio ref="survey_caregiver_answerNo" label="No" color="primary" :value="false"></v-radio>
                                </v-radio-group>
                            </form-field>
                        </v-col>
                    </v-row>
                </form-context>
                <v-row>
                    <v-col cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events }" name="firstName" label="Patient First Name">
                            <v-text-field
                                ref="patient_firstName"
                                v-model="patientInformation.firstName"
                                v-bind="attrs"
                                :maxLength="20"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                    <v-col cols="12" md="5" lg="6">
                        <form-field v-slot="{ attrs, events }" name="lastName" label="Patient Last Name">
                            <v-text-field
                                ref="patient_lastName"
                                v-model="patientInformation.lastName"
                                v-bind="attrs"
                                :maxLength="20"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events }" name="addressOne" label="Patient Address Line One">
                            <v-text-field
                                ref="patient_addresses_0_addressOne"
                                v-model="patientInformation.addressOne"
                                v-bind="attrs"
                                :maxLength="40"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events }" name="addressTwo" label="Patient Address Line Two">
                            <v-text-field
                                ref="patient_addresses_0_addressTwo"
                                v-model="patientInformation.addressTwo"
                                v-bind="attrs"
                                :maxLength="40"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" lg="4">
                        <form-field v-slot="{ attrs, events, mask }" name="zip" label="Patient ZIP">
                            <v-text-field
                                ref="patient_addresses_0_zip"
                                v-model="patientInformation.zip"
                                v-mask="mask"
                                v-bind="attrs"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                    <v-col cols="12" md="4" lg="4">
                        <form-field v-slot="{ attrs, events }" name="city" label="Patient City">
                            <v-text-field
                                ref="patient_addresses_0_city"
                                v-model="patientInformation.city"
                                v-bind="attrs"
                                :maxLength="25"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                    <v-col cols="12" md="4" lg="4">
                        <form-field v-slot="{ attrs, events }" name="state" label="Patient State">
                            <v-autocomplete
                                ref="patient_addresses_0_state"
                                v-model="patientInformation.state"
                                :items="patientInformation.states"
                                clearable
                                auto-select-first
                                role="combobox"
                                item-text="description"
                                item-value="code"
                                v-bind="attrs"
                                autocomplete="disabled"
                                v-on="events"
                            ></v-autocomplete>
                        </form-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events }" name="gender" label="Patient Gender">
                            <v-autocomplete
                                ref="patient_gender"
                                v-model="patientInformation.gender"
                                :items="patientInformation.genders"
                                clearable
                                auto-select-first
                                role="combobox"
                                item-text="name"
                                item-value="id"
                                v-bind="attrs"
                                autocomplete="disabled"
                                v-on="events"
                            ></v-autocomplete>
                        </form-field>
                    </v-col>
                    <v-col v-if="!layout.configuration.hasDatePicker" cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events }" name="dateOfBirth" label="Patient Date of Birth (MM/DD/YYYY)">
                            <v-text-field
                                ref="patient_dateOfBirth"
                                v-model="patientInformation.dateOfBirth"
                                v-mask="'##/##/####'"
                                v-bind="attrs"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                    <v-col v-if="layout.configuration.hasDatePicker" cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events }" name="dateOfBirth" label="Patient Date of Birth (MM/DD/YYYY)">
                            <tc-date-picker
                                ref="patient_dateOfBirth"
                                v-model="patientInformation.dateOfBirth"
                                v-bind="attrs"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="!patientInformation.isCareGiver" cols="12" md="6" lg="6">
                        <form-field v-slot="{ attrs, events, mask }" name="email" label="Patient Email">
                            <v-text-field
                                ref="patient_emailAddresses_0_address"
                                v-model="patientInformation.email"
                                v-mask="mask"
                                v-bind="attrs"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                    <v-col v-if="!patientInformation.isCareGiver" cols="12" md="5" lg="6">
                        <form-field v-slot="{ attrs, events, mask }" name="phone" label="Patient Phone Number">
                            <v-text-field
                                ref="patient_phoneNumbers_0_phoneNumber"
                                v-model="patientInformation.phone"
                                v-mask="mask"
                                v-bind="attrs"
                                @input="patientInformation.checkSameNumber"
                                v-on="events"
                            />
                        </form-field>
                    </v-col>
                </v-row>
                <div v-if="patientInformation.isCareGiver">
                    <v-divider></v-divider>
                    <h2 class="px-0 mb-0 mt-4 brand-header sub-header">Care Partner Information</h2>
                    <v-row>
                        <v-col cols="12" md="6" lg="6">
                            <form-field v-slot="{ attrs, events }" name="caregiverFirstName" label="Care Partner First Name">
                                <v-text-field
                                    ref="caregiver_firstName"
                                    v-model="patientInformation.caregiverFirstName"
                                    v-bind="attrs"
                                    :maxLength="20"
                                    v-on="events"
                                />
                            </form-field>
                        </v-col>
                        <v-col cols="12" md="5" lg="6">
                            <form-field v-slot="{ attrs, events }" name="caregiverLastName" label="Care Partner Last Name">
                                <v-text-field
                                    ref="caregiver_lastName"
                                    v-model="patientInformation.caregiverLastName"
                                    v-bind="attrs"
                                    :maxLength="20"
                                    v-on="events"
                                />
                            </form-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" lg="6">
                            <form-field v-slot="{ attrs, events, mask }" name="caregiverEmail" label="Care Partner Email">
                                <v-text-field
                                    ref="caregiver_emailAddresses_0_address"
                                    v-model="patientInformation.caregiverEmail"
                                    v-mask="mask"
                                    v-bind="attrs"
                                    v-on="events"
                                />
                            </form-field>
                        </v-col>

                        <v-col cols="12" md="5" lg="6">
                            <form-field v-slot="{ attrs, events, mask }" name="caregiverPhone" label="Care Partner Phone Number">
                                <v-text-field
                                    ref="caregiver_phoneNumbers_0_phoneNumber"
                                    v-model="patientInformation.caregiverPhone"
                                    v-mask="mask"
                                    v-bind="attrs"
                                    v-on="events"
                                    @input="patientInformation.checkSameNumber"
                                />
                            </form-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" lg="6">
                            <form-field v-slot="{ attrs, events, mask }" name="caregiverZip" label="Care Partner ZIP">
                                <v-text-field
                                    ref="caregiver_addresses_0_zip"
                                    v-model="patientInformation.caregiverZip"
                                    v-mask="mask"
                                    v-bind="attrs"
                                    v-on="events"
                                />
                            </form-field>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="layout.configuration.isMarketingOptIn">
                    <v-row class="mb-0">
                        <v-col cols="12" class="pb-0">
                            <h4 class="brand-header mb-3">
                                Patient/Care Partner Consent – Marketing/Telecommunications
                                <br />
                                [OPTIONAL: NOT REQUIRED TO PARTICIPATE IN THE CIZPLAM COPAY SAVINGS PROGRAM]
                            </h4>
                            <form-field ref="survey_patientConsentText_question" name="patientConsentText">
                                <v-checkbox
                                    ref="survey_patientConsentText_answerYes"
                                    v-model="patientInformation.doesAgreeTextMessage"
                                    class="mb-0 mt-0"
                                    color="primary"
                                >
                                    <template slot="label">
                                        <p class="attestation">
                                            I consent to receive non-marketing text messages by or on behalf of TrialCard at the telephone
                                            number(s) that I provide. Calls/texts may be made with an autodialer or a pre-recorded voice. I
                                            understand that my consent is not required as a condition of purchase in any goods or receiving
                                            support from TrialCard. Message and data rates may apply.
                                        </p>
                                    </template>
                                </v-checkbox>
                            </form-field>
                            <form-field ref="survey_patientConsentMarketing_question" name="patientConsentMarketing">
                                <v-checkbox
                                    ref="survey_patientConsentMarketing_answerYes"
                                    v-model="patientInformation.doesAgreeMarketing"
                                    class="mb-0 mt-0 v-input_control_align-top"
                                    color="primary"
                                >
                                    <template slot="label">
                                        <p class="attestation">
                                            I consent to receive marketing information, offers, and educational materials related to
                                            CIZPLAM. I understand that my consent is not required as a condition of purchasing any goods or
                                            receiving support from TrialCard.
                                        </p>
                                    </template>
                                </v-checkbox>
                            </form-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="patientInformation.doesAgreeMarketing || patientInformation.doesAgreeTextMessage" class="px-4 mb-4">
                        <v-col cols="12">
                            <form-context ref="account_contactPreferences" :validator="patientInformation.$v" :messages="oneIsRequired">
                                <div v-if="patientInformation.doesAgreeMarketing">
                                    <i aria-hidden="true" class="v-icon notranslate material-icons theme--light">*</i>
                                    <div class="v-label theme--light contact-info">
                                        I am interested in receiving information via the following method(s):
                                    </div>
                                    <v-row>
                                        <v-col cols="auto">
                                            <form-field v-slot="{ attrs, events }" name="contactText">
                                                <v-checkbox
                                                    ref="account_contactPreferences_0_contactInfoTypeText"
                                                    v-model="patientInformation.contactText"
                                                    v-bind="{ ...$attrs, ...attrs }"
                                                    class="mb-0 mt-0"
                                                    color="primary"
                                                    label="Text"
                                                    @change="
                                                        val => {
                                                            if (val === false) {
                                                                val = null;
                                                            }
                                                            patientInformation.contactText = val;
                                                        }
                                                    "
                                                    v-on="{ ...$listeners, ...events }"
                                                />
                                            </form-field>
                                        </v-col>
                                        <v-col cols="auto">
                                            <form-field v-slot="{ attrs, events }" name="contactPhone">
                                                <v-checkbox
                                                    ref="account_contactPreferences_1_contactInfoTypePhone"
                                                    v-model="patientInformation.contactPhone"
                                                    v-bind="{ ...$attrs, ...attrs }"
                                                    class="mb-0 mt-0"
                                                    color="primary"
                                                    label="Phone"
                                                    @change="
                                                        val => {
                                                            if (val === false) {
                                                                val = null;
                                                            }
                                                            patientInformation.contactPhone = val;
                                                        }
                                                    "
                                                    v-on="{ ...$listeners, ...events }"
                                                />
                                            </form-field>
                                        </v-col>
                                        <v-col cols="auto">
                                            <form-field v-slot="{ attrs, events }" name="contactEmail">
                                                <v-checkbox
                                                    ref="account_contactPreferences_2_contactInfoTypeEmail"
                                                    v-model="patientInformation.contactEmail"
                                                    v-bind="{ ...$attrs, ...attrs }"
                                                    class="mb-0 mt-0"
                                                    color="primary"
                                                    label="Email"
                                                    @change="
                                                        val => {
                                                            if (val === false) {
                                                                val = null;
                                                            }
                                                            patientInformation.contactEmail = val;
                                                        }
                                                    "
                                                    v-on="{ ...$listeners, ...events }"
                                                />
                                            </form-field>
                                        </v-col>
                                        <v-col cols="auto">
                                            <form-field v-slot="{ attrs, events }" name="contactRegularMail">
                                                <v-checkbox
                                                    ref="account_contactPreferences_3_contactInfoTypeMail"
                                                    v-model="patientInformation.contactRegularMail"
                                                    v-bind="{ ...$attrs, ...attrs }"
                                                    class="mb-0 mt-0"
                                                    color="primary"
                                                    label="Regular Mail"
                                                    @change="
                                                        val => {
                                                            if (val === false) {
                                                                val = null;
                                                            }
                                                            patientInformation.contactRegularMail = val;
                                                        }
                                                    "
                                                    v-on="{ ...$listeners, ...events }"
                                                />
                                            </form-field>
                                        </v-col>
                                    </v-row>
                                    <p
                                        v-if="
                                            patientInformation.$v.contactText.$error ||
                                                patientInformation.$v.contactEmail.$error ||
                                                patientInformation.$v.contactPhone.$error
                                        "
                                        class="v-messages error--text shrink-margin"
                                    >
                                        One selection is required
                                    </p>
                                </div>
                            </form-context>
                            <div v-if="patientInformation.contactText || patientInformation.doesAgreeTextMessage">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <form-field ref="patientCellSameAsAbove_question" name="cellSameAsAbove">
                                            <v-checkbox
                                                ref="patientCellSameAsAbove_answerYes"
                                                v-model="patientInformation.sameAsAbove"
                                                color="primary"
                                                class="mt-0 ml-0"
                                                label="My cell phone number is the same as above"
                                                @change="patientInformation.checkSameNumber"
                                            ></v-checkbox>
                                        </form-field>
                                        <form-field v-slot="{ attrs, events, mask }" name="cellPhone" label="Cell Phone">
                                            <v-text-field
                                                ref="patient_phoneNumbers_1_phoneNumber"
                                                v-model="patientInformation.cellPhone"
                                                v-mask="mask"
                                                v-bind="attrs"
                                                @input="patientInformation.unCheckSameAsAbove"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <NextBack :back-function="handleBack" :next-function="submit" />
            </v-col>
        </form-context>
    </v-row>
</template>

<style lang="scss" scoped>
::v-deep .v-input__slot {
    align-items: flex-start;
}
.flex-row {
    flex-direction: row;
    display: flex;
}
.error--text {
    font-size: 12px;
}
.shrink-margin {
    margin-top: -25px;
}
.contact-info {
    display: inline;
    margin-left: 5px;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { Watch } from 'vue-property-decorator';
import { CommonTools } from '../tools/commonTools';
import genders from '~/assets/genders';
import NextBack from '~/components/NextBack.vue';
import TcDatePicker from '~/components/TcDatePicker.vue';
import PatientInformationModule from '~/components/PageComponents/PatientInformationModule';
import RouteModule from '~/store/routes';
import LayoutModule from '~/store/layout';

@Component<PatientInformationComponent>({
    components: {
        TcDatePicker,
        NextBack,
    },
})
export default class PatientInformationComponent extends Vue {
    @Resolve
    routes!: RouteModule;

    @Resolve
    layout!: LayoutModule;

    patientInformation = new PatientInformationModule();

    // mounted() {
    //     this.layout.replaceProgramName(this.layout.configuration.programName, this.layout.previousProgramName);
    // }

    // @Watch('layout.configuration.programName', { deep: true })
    // public watchProgramName(programName: string) {
    //     this.layout.replaceProgramName(programName, this.layout.previousProgramName);
    // }

    // @Watch('layout.configuration.isMarketingOptIn', { deep: true })
    // public watchMarketingOptIn() {
    //     this.layout.replaceProgramName(this.layout.configuration.programName, this.layout.previousProgramName);
    //}

    checkError() {
        const keys = Object.keys(this.patientInformation.$v);
        const error = keys.find(key => {
            const err = false;
            if (!key.startsWith('$') && this.patientInformation.$v[key].$error) {
                // eslint-disable-next-line no-console
                console.error('Error on property', key);
            }
        });
    }

    handleBack() {
        this.patientInformation.updateInfo();
        const name = CommonTools.getRouteName('patient-information', this.layout.configuration.pages, true);
        this.$router.push({ name });
    }

    async submit() {
        CommonTools.checkError(this.patientInformation.$v);
        const didSucceed = await this.patientInformation.submit();
        if (didSucceed) {
            const name = CommonTools.getRouteName('patient-information', this.layout.configuration.pages);
            this.$router.push({ name });
        } else if (!didSucceed && typeof didSucceed === 'boolean') {
            this.$router.push({ name: 'error' });
        }
    }

    public formMessages = {
        required: 'Required',
    };
    public oneIsRequired = {
        required: ' ',
    };
}
</script>
