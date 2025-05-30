<template>
    <form-context :validator="$v">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1 class="brand-header">Medical &amp; Pharmacy Insurance</h1>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header ref="medical_expansion-header" v-slot="{ open }" @click.stop="updateFloatingFooter()">
                                <v-row no-gutters>
                                    <v-col cols="4">Medical Insurance</v-col>
                                    <v-col cols="8" class="text--secondary">
                                        <v-fade-transition leave-absolute>
                                            <!-- <v-row v-if="open" key="0"></v-row> -->
                                            <v-row v-if="!open" no-gutters>
                                                <v-col cols="6">Primary: {{ primaryMedical.carrier || 'None' }}</v-col>
                                                <v-col cols="6">Secondary: {{ secondaryMedical.carrier || 'None' }}</v-col>
                                            </v-row>
                                        </v-fade-transition>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <form-context :validator="$v.primaryMedical">
                                    <v-form>
                                        <v-row justify="center">
                                            <v-col cols="12">
                                                <v-row justify="center">
                                                    <v-col class="insurance-section-head" cols="12">
                                                        <h2>Primary</h2>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="state" label="State">
                                                            <v-autocomplete
                                                                ref="primary-medical_state"
                                                                v-model="primaryMedical.state"
                                                                clearable
                                                                auto-select-first
                                                                role="combobox"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                :items="states"
                                                                item-value="code"
                                                                item-text="description"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            />
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="carrier" label="Insurance Carrier">
                                                            <v-text-field
                                                                ref="primary-medical_carrier"
                                                                v-model="primaryMedical.carrier"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events, mask }" name="phone" label="Insurance Phone">
                                                            <v-text-field
                                                                ref="primary-medical_phone"
                                                                v-model="primaryMedical.phone"
                                                                v-mask="mask"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <form-field v-slot="{ attrs, events }" name="firstName" label="First Name">
                                                            <v-text-field
                                                                ref="primary-medical_first-name"
                                                                v-model="primaryMedical.firstName"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <form-field v-slot="{ attrs, events }" name="lastName" label="Last Name">
                                                            <v-text-field
                                                                ref="primary-medical_last-name"
                                                                v-model="primaryMedical.lastName"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="planName" label="Group/Plan Name">
                                                            <v-text-field
                                                                ref="primary-medical_plan-name"
                                                                v-model="primaryMedical.planName"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="groupNumber" label="Group Number">
                                                            <v-text-field
                                                                ref="primary-medical_group-number"
                                                                v-model="primaryMedical.groupNumber"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="policyNumber" label="Policy Number">
                                                            <v-text-field
                                                                ref="primary-medical_policy-number"
                                                                v-model="primaryMedical.policyNumber"
                                                                :disabled="isPrimaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="6" md="2">
                                                <v-btn
                                                    v-if="!isPrimaryMedicalSaved"
                                                    ref="primary-medical_clear"
                                                    text
                                                    block
                                                    @click="clear('primaryMedical')"
                                                >
                                                    Clear
                                                </v-btn>
                                                <v-btn
                                                    v-if="isPrimaryMedicalSaved"
                                                    ref="primary-medical_delete"
                                                    :disabled="addSecondary"
                                                    text
                                                    block
                                                    @click="deleteForm('primaryMedical')"
                                                >
                                                    Delete
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6" md="2">
                                                <v-btn
                                                    v-if="!isPrimaryMedicalSaved"
                                                    ref="primary-medical_save"
                                                    color="primary"
                                                    block
                                                    @click="save('primaryMedical')"
                                                >
                                                    Save
                                                </v-btn>
                                                <v-btn
                                                    v-if="isPrimaryMedicalSaved"
                                                    ref="primary-medical_edit"
                                                    color="primary"
                                                    block
                                                    @click="edit('primaryMedical')"
                                                >
                                                    Edit
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </form-context>
                                <v-row>
                                    <v-col cols="12">
                                        <v-btn
                                            v-if="!addSecondary"
                                            ref="medical_add-secondary"
                                            :disabled="!isPrimaryMedicalSaved"
                                            block
                                            outlined
                                            @click="addSecondary = 'true'"
                                        >
                                            ADD SECONDARY INSURANCE
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <form-context :validator="$v.secondaryMedical">
                                    <v-form v-if="addSecondary">
                                        <v-row justify="center">
                                            <v-col cols="12">
                                                <v-row justify="center">
                                                    <v-col class="insurance-section-head" cols="12">
                                                        <h2>Secondary</h2>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="state" label="State">
                                                            <v-autocomplete
                                                                ref="secondary-medical_state"
                                                                v-model="secondaryMedical.state"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                clearable
                                                                auto-select-first
                                                                role="combobox"
                                                                :items="states"
                                                                item-value="code"
                                                                item-text="description"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            />
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="carrier" label="Insurance Carrier">
                                                            <v-text-field
                                                                ref="secondary-medical_carrier"
                                                                v-model="secondaryMedical.carrier"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events, mask }" name="phone" label="Insurance Phone">
                                                            <v-text-field
                                                                ref="secondary-medical_phone"
                                                                v-model="secondaryMedical.phone"
                                                                v-mask="mask"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <form-field v-slot="{ attrs, events }" name="firstName" label="First Name">
                                                            <v-text-field
                                                                ref="secondary-medical_first-name"
                                                                v-model="secondaryMedical.firstName"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <form-field v-slot="{ attrs, events }" name="lastName" label="Last Name">
                                                            <v-text-field
                                                                ref="secondary-medical_last-name"
                                                                v-model="secondaryMedical.lastName"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="planName" label="Group/Plan Name">
                                                            <v-text-field
                                                                ref="secondary-medical_plan-name"
                                                                v-model="secondaryMedical.planName"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="groupNumber" label="Group Number">
                                                            <v-text-field
                                                                ref="secondary-medical_group-number"
                                                                v-model="secondaryMedical.groupNumber"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="policyNumber" label="Policy Number">
                                                            <v-text-field
                                                                ref="secondary-medical_policy-number"
                                                                v-model="secondaryMedical.policyNumber"
                                                                :disabled="isSecondaryMedicalSaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="6" md="2">
                                                <v-btn
                                                    v-if="!isSecondaryMedicalSaved"
                                                    ref="secondary-medical_clear"
                                                    text
                                                    block
                                                    @click="clear('secondaryMedical')"
                                                >
                                                    Clear
                                                </v-btn>
                                                <v-btn
                                                    v-if="isSecondaryMedicalSaved"
                                                    ref="secondary-medical_delete"
                                                    text
                                                    block
                                                    @click="deleteForm('secondaryMedical')"
                                                >
                                                    Delete
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6" md="2">
                                                <v-btn
                                                    v-if="!isSecondaryMedicalSaved"
                                                    ref="secondary-medical_save"
                                                    color="primary"
                                                    block
                                                    @click="save('secondaryMedical')"
                                                >
                                                    Save
                                                </v-btn>
                                                <v-btn
                                                    v-if="isSecondaryMedicalSaved"
                                                    ref="secondary-medical_edit"
                                                    color="primary"
                                                    block
                                                    @click="edit('secondaryMedical')"
                                                >
                                                    Edit
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </form-context>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header
                                ref="pharmacy_expansion-header"
                                v-slot="{ open }"
                                @click.stop="updateFloatingFooter()"
                            >
                                <v-row no-gutters>
                                    <v-col cols="4">Pharmacy Insurance</v-col>
                                    <v-col cols="8" class="text--secondary">
                                        <v-fade-transition leave-absolute>
                                            <v-row v-if="!open" no-gutters>
                                                <v-col cols="12">{{ primaryPharmacy.pbmName || 'None' }}</v-col>
                                            </v-row>
                                        </v-fade-transition>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <form-context :validator="$v.primaryPharmacy">
                                    <v-form>
                                        <v-row justify="center">
                                            <v-col cols="12">
                                                <v-row justify="center">
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="pharmacyState" label="State">
                                                            <v-autocomplete
                                                                ref="primary-pharmacy_state"
                                                                v-model="primaryPharmacy.state"
                                                                :disabled="isPrimaryPharmacySaved"
                                                                clearable
                                                                auto-select-first
                                                                role="combobox"
                                                                :items="states"
                                                                item-value="code"
                                                                item-text="description"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            />
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="pbmName" label="PBM Name">
                                                            <v-text-field
                                                                ref="primary-pharmacy_pbm-name"
                                                                v-model="primaryPharmacy.pbmName"
                                                                :disabled="isPrimaryPharmacySaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="memberID" label="Rx Member ID">
                                                            <v-text-field
                                                                ref="primary-pharmacy_member-id"
                                                                v-model="primaryPharmacy.memberID"
                                                                :disabled="isPrimaryPharmacySaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="groupID" label="Rx Group ID">
                                                            <v-text-field
                                                                ref="primary-pharmacy_group-number"
                                                                v-model="primaryPharmacy.groupID"
                                                                :disabled="isPrimaryPharmacySaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="binNumber" label="Rx Bin #">
                                                            <v-text-field
                                                                ref="primary-pharmacy_bin-number"
                                                                v-model="primaryPharmacy.binNumber"
                                                                :disabled="isPrimaryPharmacySaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <form-field v-slot="{ attrs, events }" name="pcnNumber" label="Rx PCN #">
                                                            <v-text-field
                                                                ref="primary-pharmacy_pcn-number"
                                                                v-model="primaryPharmacy.pcnNumber"
                                                                :disabled="isPrimaryPharmacySaved"
                                                                v-bind="attrs"
                                                                v-on="events"
                                                            ></v-text-field>
                                                        </form-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="5" md="2">
                                                <v-btn
                                                    v-if="!isPrimaryPharmacySaved"
                                                    ref="primary-pharmacy_clear"
                                                    text
                                                    block
                                                    @click="clear('primaryPharmacy')"
                                                >
                                                    Clear
                                                </v-btn>
                                                <v-btn
                                                    v-if="isPrimaryPharmacySaved"
                                                    ref="primary-pharmacy_delete"
                                                    text
                                                    block
                                                    @click="clear('primaryPharmacy')"
                                                >
                                                    Delete
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="5" md="2">
                                                <v-btn
                                                    v-if="!isPrimaryPharmacySaved"
                                                    ref="primary-pharmacy_save"
                                                    color="primary"
                                                    block
                                                    @click="save('primaryPharmacy')"
                                                >
                                                    Save
                                                </v-btn>
                                                <v-btn
                                                    v-if="isPrimaryPharmacySaved"
                                                    ref="primary-pharmacy_edit"
                                                    color="primary"
                                                    block
                                                    @click="edit('primaryPharmacy')"
                                                >
                                                    Edit
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </form-context>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
            <NextBack :btn-names="['Next', 'Back']" prev-page="patient-information" :next-function="submit" />
        </v-container>
    </form-context>
</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.insurance-section-head {
    background-color: var(--color-primary);
    color: $white;
}

.add-btn {
    background-color: #000;
    color: $white;
    border-radius: 50%;
    padding: 3px 8px;
    font-weight: bold;
    font-size: 1rem;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { faEllipsisH, faQuestionCircle } from '@fortawesome/pro-regular-svg-icons';
import { Resolve } from 'vue-di';
import { required, numeric, helpers } from 'vuelidate/lib/validators';
import { phone } from '~/services/validations';
import { Title } from '~/decorators/Title';
import SessionModule from '~/store/session';
import states from '~/assets/states.json';
import NextBack from '~/components/NextBack.vue';
import InsuranceModule from '~/store/insurance';
import { Validate } from '~/validation/Validate';
import EnrollmentModule from '~/store/enrollment';
import { clearRecords } from '~/services/clearRecords';
import SurveyModule from '~/store/survey';
import EligibilityModule from '~/store/eligibility';
import LayoutModule from '~/store/layout';
import FooterModule from '~/store/footer';

@Component<Insurance>({
    layout({ store }) {
        return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
    },
    components: {
        NextBack,
    },
    validations: {
        primaryMedical: {},
    },
})
export default class Insurance extends Vue {
    public states = states;

    @Resolve
    public module!: InsuranceModule;

    @Resolve
    public enrollment!: EnrollmentModule;

    @Resolve
    public eligibility!: EligibilityModule;

    @Resolve
    public survey!: SurveyModule;

    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public footer!: FooterModule;

    isPrimaryMedicalSaved = this.module.primaryMedicalInsurance.isPrimaryMedicalSaved || false;
    isSecondaryMedicalSaved = this.module.secondaryMedicalInsurance.isSecondaryMedicalSaved || false;
    isPrimaryPharmacySaved = this.module.primaryPharmacyInsurance.isPrimaryPharmacySaved || false;
    addSecondary = false;

    public isLoading = false;

    public async updateFloatingFooter() {
        if (this.layout.configuration.footerType !== 'floating') {
            return;
        }
        // wait for panel transition to complete
        setTimeout(() => {
            const staticFooter = document.querySelector('#static-footer') as HTMLElement | null;
            if (staticFooter) {
                this.footer.setStaticFooter({
                    y: staticFooter.offsetTop,
                });
            }
        }, 500);
    }

    public doValidate() {
        this.$v.$touch();

        if (this.$v.$invalid) {
            return false;
        }

        return true;
    }

    public get isInvalid() {
        return this.$v.$invalid && this.$v.$dirty;
    }

    // Save, edit, clear, delete functions

    // TODO: NEED TO DRY UP SAVE/EDIT/DELETE CODE

    public clear(form: string) {
        if (form === 'primaryMedical') {
            clearRecords(this.primaryMedical);
            this.$v.primaryMedical!.$reset();
        }
        if (form === 'secondaryMedical') {
            clearRecords(this.secondaryMedical);
            this.$v.secondaryMedical!.$reset();
        }
        if (form === 'primaryPharmacy') {
            clearRecords(this.primaryPharmacy);
            this.$v.primaryPharmacy!.$reset();
        }
    }

    public edit(form: string) {
        if (form === 'primaryMedical') {
            this.isPrimaryMedicalSaved = false;
        }
        if (form === 'secondaryMedical') {
            this.isSecondaryMedicalSaved = false;
        }
        if (form === 'primaryPharmacy') {
            this.isPrimaryPharmacySaved = false;
        }
    }

    public save(form: string) {
        this.$v[form]!.$touch();
        if (this.$v[form]!.$anyError) {
            return;
        }

        if (form === 'primaryMedical') {
            this.module.savePrimaryMedical({
                state: this.primaryMedical.state,
                carrier: this.primaryMedical.carrier,
                phone: this.primaryMedical.phone,
                firstName: this.primaryMedical.firstName,
                lastName: this.primaryMedical.lastName,
                planName: this.primaryMedical.planName,
                groupNumber: this.primaryMedical.groupNumber,
                policyNumber: this.primaryMedical.policyNumber,
                isPrimaryMedicalSaved: this.isPrimaryMedicalSaved,
            });

            this.isPrimaryMedicalSaved = true;
        }

        if (form === 'secondaryMedical') {
            this.module.saveSecondaryMedical({
                state: this.secondaryMedical.state,
                carrier: this.secondaryMedical.carrier,
                phone: this.secondaryMedical.phone,
                firstName: this.secondaryMedical.firstName,
                lastName: this.secondaryMedical.lastName,
                planName: this.secondaryMedical.planName,
                groupNumber: this.secondaryMedical.groupNumber,
                policyNumber: this.secondaryMedical.policyNumber,
                isSecondaryMedicalSaved: this.isSecondaryMedicalSaved,
            });

            this.isSecondaryMedicalSaved = true;
        }

        if (form === 'primaryPharmacy') {
            this.module.savePrimaryPharmacy({
                state: this.primaryPharmacy.state,
                pbmName: this.primaryPharmacy.pbmName,
                memberID: this.primaryPharmacy.memberID,
                groupID: this.primaryPharmacy.groupID,
                binNumber: this.primaryPharmacy.binNumber,
                pcnNumber: this.primaryPharmacy.pcnNumber,
                isPrimaryPharmacySaved: this.isPrimaryPharmacySaved,
            });

            this.isPrimaryPharmacySaved = true;
        }
    }

    // TODO: write delete function

    public deleteForm(form: string) {
        this.clear(form);
        if (form === 'primaryMedical') {
            this.isPrimaryMedicalSaved = false;
        }

        if (form === 'secondaryMedical') {
            this.addSecondary = false;
            this.isSecondaryMedicalSaved = false;
        }
    }

    // check if any forms are partially filled in but unsaved

    public checkIfIncomplete() {
        if (!this.isPrimaryMedicalSaved && this.$v.primaryMedical!.$anyDirty) {
            this.$v.primaryMedical!.$touch();
            return;
        }

        if (!this.isSecondaryMedicalSaved && this.$v.secondaryMedical!.$anyDirty) {
            this.$v.secondaryMedical!.$touch();
            return;
        }

        if (!this.isPrimaryPharmacySaved && this.$v.primaryPharmacy!.$anyDirty) {
            this.$v.primaryPharmacy!.$touch();
            return;
        }
    }

    // submit and enroll

    public submit() {
        this.checkIfIncomplete();

        if (!this.$v.$anyError) {
            this.$router.push({ name: 'need-a-card-success' });
        } else {
            this.$router.push({ name: 'need-a-card-success' });
        }
    }

    async enroll() {
        this.checkIfIncomplete();

        if (!this.$v.$anyError) {
            this.isLoading = true;
            await this.survey.fetchSurveySession(this.eligibility.eligibilityData);

            const enrollmentResult = (!this.survey.error && (await this.enrollment.submitToAPI())) || null;
            if (enrollmentResult && enrollmentResult.status === 200) {
                const memberNumber =
                    (enrollmentResult.data &&
                        enrollmentResult.data.data &&
                        enrollmentResult.data.data.enrollment &&
                        enrollmentResult.data.data.enrollment.memberNumbers[0].number) ||
                    '';
                this.enrollment.setMemberNumber(memberNumber);
                this.$router.push({ name: 'need-a-card-success' });
                // eslint-disable-next-line no-console
                console.log(memberNumber);
            } else {
                this.$router.push({ name: 'error' });
            }
        }
    }

    // Validations

    @Validate({
        state: { required },
        carrier: { required },
        phone: { required, phone },
        firstName: { required },
        lastName: { required },
        planName: {},
        groupNumber: { numeric },
        policyNumber: { numeric },
    })
    primaryMedical = {
        state: this.module.primaryMedicalInsurance.state || '',
        carrier: this.module.primaryMedicalInsurance.carrier || '',
        phone: this.module.primaryMedicalInsurance.phone || '',
        firstName: this.module.primaryMedicalInsurance.firstName || '',
        lastName: this.module.primaryMedicalInsurance.lastName || '',
        planName: this.module.primaryMedicalInsurance.planName || '',
        groupNumber: this.module.primaryMedicalInsurance.groupNumber || '',
        policyNumber: this.module.primaryMedicalInsurance.policyNumber || '',
    };

    @Validate({
        state: { required },
        carrier: { required },
        phone: { required, phone },
        firstName: { required },
        lastName: { required },
        planName: { numeric },
        groupNumber: { numeric },
        policyNumber: { numeric },
    })
    secondaryMedical = {
        state: this.module.secondaryMedicalInsurance.state || '',
        carrier: this.module.secondaryMedicalInsurance.carrier || '',
        phone: this.module.secondaryMedicalInsurance.phone || '',
        firstName: this.module.secondaryMedicalInsurance.firstName || '',
        lastName: this.module.secondaryMedicalInsurance.lastName || '',
        planName: this.module.secondaryMedicalInsurance.planName || '',
        groupNumber: this.module.secondaryMedicalInsurance.groupNumber || '',
        policyNumber: this.module.secondaryMedicalInsurance.policyNumber || '',
    };

    @Validate({
        state: { required },
        pbmName: { required },
        memberID: { required, numeric },
        groupID: { numeric },
        binNumber: { numeric },
        pcnNumber: { numeric },
    })
    primaryPharmacy = {
        state: this.module.primaryPharmacyInsurance.state || '',
        pbmName: this.module.primaryPharmacyInsurance.pbmName || '',
        memberID: this.module.primaryPharmacyInsurance.memberID || '',
        groupID: this.module.primaryPharmacyInsurance.groupID || '',
        binNumber: this.module.primaryPharmacyInsurance.binNumber || '',
        pcnNumber: this.module.primaryPharmacyInsurance.pcnNumber || '',
    };
}
</script>
