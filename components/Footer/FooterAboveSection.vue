<template>
  <v-col cols="12">
    <v-row>
      <p>
        Please see
        <a class="home-anchor" target="_blank" href="https://agamree.com/pdf/agamree-pi.pdf"><b>FULL PRESCRIBING INFORMATION</b></a>
      </p>
    </v-row>
    <v-row>
      <p>
        This information–including product information–is intended only for residents of the United States. The products discussed herein may have different labeling in different countries. For help, please call customer support at 1-855-331-5532
        </p>
    </v-row>
    <v-row>
      <p class="ma-0 pa-0">Catalyst Pathways is a registered trademark of Catalyst Pharmaceuticals, Inc.</p>
    </v-row>
    <v-row>
      <p class="ma-0 pa-0">AGAMREE is a registered trademark of Santhera Pharmaceuticals (Schweiz) AG.</p>
    </v-row>
  </v-col>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component<FooterAboveComponent>({})
export default class FooterAboveComponent extends Vue {}
</script>
