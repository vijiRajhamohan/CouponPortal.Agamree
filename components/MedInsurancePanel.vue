<template>
    <form-context>
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
                                    @change="onChange($event)"
                                />
                            </form-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <form-field v-slot="{ attrs, events }" name="carrier" label="Insurance Carrier">
                                <v-text-field
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
                    <v-btn v-if="!isPrimaryMedicalSaved" text block @click="clear('primaryMedical')">
                        Clear
                    </v-btn>
                    <v-btn v-if="isPrimaryMedicalSaved" :disabled="addSecondary" text block @click="clear('primaryMedical')">
                        Delete
                    </v-btn>
                </v-col>
                <v-col cols="6" md="2">
                    <v-btn v-if="!isPrimaryMedicalSaved" color="primary" block @click="save('primaryMedical')">
                        Save
                    </v-btn>
                    <v-btn v-if="isPrimaryMedicalSaved" color="primary" block @click="edit('primaryMedical')">
                        Edit
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </form-context>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Model, Emit } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { intersection } from 'lodash';
import moment, { Moment } from 'moment';
import { Validation } from 'vuelidate';

@Component<MedicalInsurancePanel>({
    inheritAttrs: false,
})
export default class MedicalInsurancePanel extends Vue {
    @Prop({ type: Object, required: true })
    public validator!: Validation;

    @Model('change', { type: [Object, Date] })
    public value!: Moment | string | null;

    @Emit('change')
    public onChange(value: string) {
        const x = moment(value);
        return x;
    }
}
</script>
