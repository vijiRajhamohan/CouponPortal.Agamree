<template>
  <v-container fill-height>
    <v-row justify="center" align="center" class="mt-8">
      <v-col sm="12" md="12" class="mt-n12">
        <v-row justify="center">
          <h1 class="brand-header fs-36">WELCOME TO THE AGAMREE CO-PAY PROGRAM !</h1>
        </v-row>
        <v-row justify="center">
          <p class="sub-header-text text-center">
            By clicking on the buttons below, you certify that the patient meets the
            <nobr>
              <span>
                <a class="home-anchor" @click="$router.push({ name: 'eligibility-requirements' })">eligibility requirements</a>.
              </span>
            </nobr>
          </p>
        </v-row>
      </v-col>
      <v-row justify="center" align="center" class="mt-3">
        <v-col cols="12" sm="12" md="6" lg="5" xl="4">
          <v-container fill-height class="button-box1">
            <v-row justify="center" align="center">
              <h1 class="brand-header fs-36">AnovoRx SP</h1>
            </v-row>
            <v-row justify="center" align="center">
              <p class="fs-20 btn-sub-header">
                Select this option to generate a member ID for
                <br />
                AnovoRX.
              </p>
              <v-btn id="btn_AnovoRx" class="big-btn mb-n4" height="80" @click="serviceCall('anovorx')">GENERATE</v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5" xl="4">
          <v-container fill-height class="button-box1">
            <v-row justify="center" align="center">
              <h1 class="brand-header fs-36">HUB</h1>
            </v-row>
            <v-row justify="center" align="center">
              <p class="fs-20 btn-sub-header">
                Select this option to generate an ID for HUB.
                <br />
                <br />
              </p>
              <v-btn id="btn_hub" ref="btn_AnovoRx" class="big-btn mb-n4" height="80" @click="serviceCall('hub')">GENERATE</v-btn>
            </v-row>
          </v-container>
        </v-col>
        <!-- <v-col cols="12" sm="12" md="6" lg="5" xl="4">
          <v-container fill-height class="button-box1">
            <v-row justify="center" align="center">
              <h1 class="brand-header fs-36">HUB</h1>
            </v-row>
            <v-row justify="center" align="center">
              <p class="fs-20 btn-sub-header mb-10 pa-5">Select this option to generate an ID for HUB.</p>
              <v-btn ref="btn_HUB/Other" class="big-btn" height="80" @click="serviceCall('hub')">GENERATE</v-btn>
            </v-row>
          </v-container>
        </v-col> -->
      </v-row>
    </v-row>
    <v-row>
      <v-col cols="12">
        <FooterAboveComponent class="container fill-height" />
      </v-col>
    </v-row>
    <div class="spacer"></div>
  </v-container>
</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.spacer {
  height: 80px;
}
.big-btn {
  width: 60%;
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
.sub-header-text {
  font-size: 22px;
  color: #152f52;
}

.button-box1 {
  position: relative;
  height: 300px;
  border: 1px solid #122f54;
  border-radius: 20px;
  z-index: 2;
  text-align: center;
}
@media (max-width: 430px) {
  .button-box1 {
    position: relative;
    height: 400px;
    border: 1px solid #122f54;
    border-radius: 20px;
    z-index: 2;
    text-align: center;
  }
  .big-btn {
    width: 80%;
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
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { Prop } from 'vue-property-decorator';
import LayoutModule from '~/store/layout';
import { Title } from '~/decorators/Title';
import ActivationModule from '~/store/activation';
import EnrollmentModule from '~/store/enrollment';
import FooterAboveComponent from '~/components/Footer/FooterAboveSection.vue';
@Component<CenterAlignment>({
  layout: 'default',
  components: { FooterAboveComponent },
})
@Title(process.env.NAME!)
export default class CenterAlignment extends Vue {
  @Resolve
  public layout!: LayoutModule;

  @Prop()
  public brkPoints!: object;

  @Prop()
  public nextPage!: string;

  @Resolve
  public activation!: ActivationModule;

  @Resolve
  public enrollment!: EnrollmentModule;

  programNumber = '' as string;

  public async serviceCall(src: string) {
    this.$wait.start('nuxt');
    if (src == 'anovorx') {
      this.programNumber = '1570';
    } else {
      this.programNumber = '1571';
    }
    const response = await this.activation.submitToAPI(this.programNumber);
    this.$wait.end('nuxt');
    if (response && response.status === 200) {
      const memberNumber = response.data.data[0].memberNumber || '';
      this.enrollment.setMemberNumber(memberNumber);
      this.$router.push('/success');
    } else {
      this.$router.push('/error');
    }
  }
}
</script>
