<template>
  <v-row id="eligibility-requirement" :justify="'center'">
    <v-col cols="12" md="10" lg="7" xl="6">
      <v-row justify="center">
        <v-col class="text-center">
          <h1>
            COMMERCIAL COPAY SAVINGS
            <br />
            PROGRAM FOR AGAMREE (Vamorolone)
          </h1>
          <h2>Eligibility Requirements</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p><b>Patients may be eligible for the Commercial Copay Savings Program for AGAMREE if:</b></p>
          <ol class="ml-4">
            <li>
              The patient is insured by commercial insurance and the prescription insurance coverage does not cover the full cost of the
              patient’s AGAMREE prescription; AND
            </li>
            <li>
              The patient is not covered by a state or federal healthcare program, including but not limited to Medicare Part D, Medicare
              Advantage, Medicaid (including Medicaid managed care), Medigap, Veterans Affairs (VA), or Department of Defense (DOD) or
              TRICARE programs; AND
            </li>
            <li>The patient is 2 years of age or older; AND</li>
            <li>The patient is a resident of the United States or Puerto Rico; AND</li>
            <li>The patient has a valid prescription for AGAMREE for Duchenne muscular dystrophy (DMD).</li>
          </ol>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="text-center">
          <h2>Terms and Conditions</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p><b>Patients may be eligible for the Commercial Copay Savings Program for AGAMREE if:</b></p>
          <ol class="ml-4">
            <li>
              Eligible patients who have an active Member Number under the Commercial Savings Program, together with a valid prescription
              for AGAMREE, may pay as little as $0 per 30-day supply of AGAMREE. Eligibility is subject to a maximum annual benefit per
              calendar year. Other restrictions may apply.
            </li>
            <li>
              This offer is non-transferable, no substitutions are permissible, and this offer cannot be combined with any other
              rebate/coupon, free trial, or similar offer for the specified prescription.
            </li>
            <li>Catalyst Pharmaceuticals reserves the right to rescind, revoke, or amend this offer at any time without notice.</li>
            <li>The Commercial Copay Savings Program for AGAMREE is not insurance and is not intended to substitute for insurance.</li>
            <li>Void where prohibited or restricted by law.</li>
            <li>
              Patient and/or pharmacist, as applicable, must comply with any obligation to notify the patient’s insurance company regarding
              the use of the Commercial Copay Savings Program.
            </li>
            <li>
              <span class="underline">
                NO CLAIM WILL BE FILED WITH A FEDERAL OR STATE HEALTHCARE PROGRAM FOR PRODUCT DISPENSED UNDER THE COMMERCIAL COPAY SAVINGS
                PROGRAM BY USING THIS PROGRAM, PATIENT, PRESCRIBER AND PHARMACIST UNDERSTAND AND AGREE TO COMPLY WITH THESE ELIGIBILITY
                REQUIREMENTS AND TERMS OF USE.
              </span>
            </li>
          </ol>
          <p>To the pharmacist: For processing assistance, please call Pharmacy Support at 1-866-653-1915.</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="text-center">
          <v-btn ref="Home" class="big-btn" height="70" to="/">Home</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="11">
        <v-row>
        <v-col cols="12">
          <FooterAboveComponent class="container fill-height" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}

.big-btn {
  width: 20%;
  font-weight: bold;
  font-size: 32px;
  text-decoration: none;
  background-color: #197cb9 !important;
  color: white;
  box-shadow: 6px 6px 5px 0px rgba(0, 0, 0, 0.55);
  ::v-deep .v-btn__content {
    width: 100%;
    white-space: normal;
    text-align: center;
  }
}

.home-anchor {
  color: #197cb9;
  text-decoration: underline;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import LayoutModule from '~/store/layout';
import genders from '~/assets/genders';
import FooterAboveComponent from '~/components/Footer/FooterAboveSection.vue';
@Component<EligibilityRequirements>({
  layout({ store }) {
    return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
  },
  components: {
    FooterAboveComponent,
  },
})
export default class EligibilityRequirements extends Vue {
  @Resolve
  public layout!: LayoutModule;
}
</script>
