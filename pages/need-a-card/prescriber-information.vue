<template>
    <form-context :validator="$v">
        <v-row :justify="'center'">
            <v-col cols="12" md="10" lg="8" xl="6">
                <v-card class="mb-7">
                    <div class="px-8">
                        <v-row :justify="'center'" class="mb-10">
                            <v-col cols="12">
                                <h2 data-test="message_h1" class="px-0 mb-0 mt-4 brand-header sub-header">Prescriber Information</h2>
                                <v-card-text class="px-0">
                                    <p class="legend">
                                        <v-icon>$asterisk</v-icon>
                                        = Required
                                    </p>
                                </v-card-text>
                                <v-row>
                                    <v-col cols="12" md="6" lg="6">
                                        <form-field v-slot="{ attrs, events }" name="firstName" label="Provider First Name">
                                            <v-text-field
                                                ref="provider_firstName"
                                                v-model="firstName"
                                                v-bind="attrs"
                                                :maxLength="20"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="5" lg="6">
                                        <form-field v-slot="{ attrs, events }" name="lastName" label="Provider Last Name">
                                            <v-text-field
                                                ref="provider_lastName"
                                                v-model="lastName"
                                                v-bind="attrs"
                                                :maxLength="20"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6" lg="6">
                                        <form-field v-slot="{ attrs, events, mask }" name="siteName" label="Site Name">
                                            <v-text-field
                                                ref="site_name"
                                                v-model="siteName"
                                                v-mask="mask"
                                                v-bind="attrs"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="5" lg="6">
                                        <form-field v-slot="{ attrs, events, mask }" name="fax" label="Site Fax Number">
                                            <v-text-field
                                                ref="site_phoneNumbers_2_fax"
                                                v-model="fax"
                                                v-mask="mask"
                                                v-bind="attrs"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6" lg="6">
                                        <form-field v-slot="{ attrs, events }" name="addressOne" label="Site Address Line One">
                                            <v-text-field
                                                ref="site_addresses_0_addressOne"
                                                v-model="addressOne"
                                                v-bind="attrs"
                                                :maxLength="40"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="6">
                                        <form-field v-slot="{ attrs, events }" name="addressTwo" label="Site Address Line Two">
                                            <v-text-field
                                                ref="site_addresses_0_addressTwo"
                                                v-model="addressTwo"
                                                v-bind="attrs"
                                                :maxLength="40"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="4" lg="4">
                                        <form-field v-slot="{ attrs, events, mask }" name="zip" label="Site ZIP">
                                            <v-text-field ref="site_addresses_0_zip" v-model="zip" v-mask="mask" v-bind="attrs" v-on="events" />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="4" lg="4">
                                        <form-field v-slot="{ attrs, events }" name="city" label="Site City">
                                            <v-text-field
                                                ref="site_addresses_0_city"
                                                v-model="city"
                                                v-bind="attrs"
                                                :maxLength="25"
                                                v-on="events"
                                            />
                                        </form-field>
                                    </v-col>
                                    <v-col cols="12" md="4" lg="4">
                                        <form-field v-slot="{ attrs, events }" name="state" label="Site State">
                                            <v-autocomplete
                                                ref="site_addresses_0_state"
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
                                </v-row>
                                <NextBack :back-function="handleBack" :next-function="submit" />
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </form-context>
</template>

<style lang="scss">
    // Styles to position the error msg for the attestation and remove shake animation
    .v-input--checkbox .v-messages {
        margin-left: 33px;
    }
    .v-input--checkbox.error--text .v-label {
        -webkit-animation: none !important;
        -moz-animation: none !important;
        -o-animation: none !important;
        -ms-animation: none !important;
        animation: none !important;
    }
</style>
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
import { required, maxLength } from 'vuelidate/lib/validators';
import { Watch } from 'vue-property-decorator';
import { LocationV1Api } from '@trialcard/apigateway.client/locationV1Api';
import { first } from 'lodash';
import { RoleType, ContactInfoType, ContactInfoPurposeType, AddressType } from '@trialcard/enums';
import { EnterpriseCoordinatorSharedPhoneUpsearchModel } from '@trialcard/apigateway.models';
import { phone, zip } from '~/services/validations';
import states from '~/assets/states.json';
import EnrollmentModule from '~/store/enrollment';
import { Validate } from '~/validation/Validate';
import NextBack from '~/components/NextBack.vue';
import { CommonTools } from '~/components/tools/commonTools';
import LayoutModule from '~/store/layout';

@Component<PrescriberInformation>({
    components: {
        NextBack,
    },
})
export default class PrescriberInformation extends Vue {

    @Resolve
    public location!: LocationV1Api;

    @Resolve
    public enrollment!: EnrollmentModule;

    @Resolve
    public layout!: LayoutModule;

    @Validate({ required, maxLength: maxLength(20) })
    public firstName = '' as string;
    @Validate({ required, maxLength: maxLength(20) })
    public lastName = '' as string;
    @Validate({ required, maxLength: maxLength(50) })
    public siteName = '' as string;
    @Validate({ phone })
    public fax = '' as string;
    @Validate({ required, maxLength: maxLength(40) })
    public addressOne = '' as string;
    @Validate({ maxLength: maxLength(40) })
    public addressTwo = '' as string;
    @Validate({ required, zip })
    public zip = '' as string;
    @Validate({ required, maxLength: maxLength(25) })
    public city = '' as string;
    @Validate({ required })
    public state = '' as string;

    public states = states;

    @Watch('zip')
    public async watchZip(code: string) {
        if (!code || code.length < 5) return;
        const result = await this.location.getCitiesByZip(code);
        const location = first(result.data.data);
        if (location) {
            // Only set city and state if the state exists in our list
            const foundState = this.states.find(state => state.code === location.stateAbbr);
            if (foundState) {
                this.city = location.cityName!;
                this.state = location.stateAbbr!;
            }
        }
    }

    @Watch('enrollment.prescriberData', { immediate: true, deep: true })
    watchPrescriber(prescriberData: typeof EnrollmentModule.prototype.prescriberData) {
        const { firstName, lastName } = prescriberData[0].model!;
        const enrollmentObj = {
            firstName,
            lastName,
        };
        Object.assign(this, enrollmentObj);
    }

    @Watch('enrollment.siteData', { immediate: true, deep: true })
    watchSite(siteData: typeof EnrollmentModule.prototype.siteData) {
        const { description, addresses, phoneNumbers } = siteData[0].model!;
        const enrollmentObj = {
            addressOne: addresses.length > 0 && addresses[0].addressOne || '',
            addressTwo: addresses.length > 0 && addresses[0].addressTwo || '',
            zip: addresses.length > 0 && addresses[0].zip || '',
            city: addresses.length > 0 && addresses[0].city || '',
            state: addresses.length > 0 && addresses[0].state || '',
            siteName: description,
            fax: phoneNumbers.length > 0 && phoneNumbers[0].phoneNumber || ''
        };
        Object.assign(this, enrollmentObj);
    }

    async structurePrescriberData() {
        const prescribers = [{
            canUpdate: true,
            canInsert: true,
            skipSearch: false,
            model: {
                accountRelationshipIsPrimary: true,
                firstName: this.firstName,
                lastName: this.lastName,
                prescriberLicenses: [],
                externalIds: [],
                addresses: [],
                phoneNumbers: [],
                emailAddresses: [],
            },
        }]
        await this.enrollment.updatePrescribers(prescribers);
    }

    structureSiteData() {
        const site =
        {
            canUpdate: true,
            canInsert: true,
            skipSearch: false,
            model: {
                accountRelationshipIsPrimary: true,
                siteRoleType: RoleType.PrescriberSite,
                pointOfContacts: [],
                description: this.siteName,
                addresses: [
                    {
                        addressOne: this.addressOne,
                        addressTwo: this.addressTwo,
                        zip: this.zip,
                        city: this.city,
                        state: this.state,
                        addressType: AddressType.MAILINGADDRESS
                    },
                ],
                contacts: [],
                emailAddresses: [],
                externalIds: [],
                phoneNumbers: [] as EnterpriseCoordinatorSharedPhoneUpsearchModel[],
                globalIds: [],
            },
        }
        if (this.fax) {
            site.model.phoneNumbers.push({
                phoneType: ContactInfoType.FAX,
                phonePurpose: ContactInfoPurposeType.UNKNOWN,
                phoneNumber: this.fax!.replace(/\D/g, ''),
            })
        }
        this.enrollment.updateSites([ site ]);
    }

    async updateInfo() {
        await Promise.all([
            this.structurePrescriberData(),
            this.structureSiteData(),
        ]);
    }

    async handleBack() {
        await this.updateInfo();
        const name = CommonTools.getRouteName('prescriber-information', this.layout.configuration.pages, true);
        this.$router.push({ name });
    }

    async submit() {
        this.$v.$touch();
        CommonTools.checkError(this.$v);
        if (!this.$v.$anyError) {
            await this.updateInfo();
            const name = CommonTools.getRouteName('prescriber-information', this.layout.configuration.pages);
            this.$router.push({ name });
        }
    }

    public attestation = {
        required: 'Required',
    };
}
</script>
