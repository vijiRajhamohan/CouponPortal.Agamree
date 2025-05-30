<template>
    <v-footer fixed min-height="120px" color="brandGrey" class="font-weight-medium pa-0">
        <v-content class="footer-container pt-0">
            <v-row class="footer-top" justify="center">
                <v-col cols="12" md="6" class="text-center">
                    <p>&copy; 2019 Pharmaceutical Company 2019</p>
                    <v-layout wrap>
                        <v-flex xs12 md4>
                            <a href="#">Prescribing Information</a>
                        </v-flex>
                        <v-flex xs12 md4>
                            <a href="#">Important Safety Information</a>
                        </v-flex>
                        <v-flex xs12 md4>
                            <a href="#">Terms &amp; Conditions</a>
                        </v-flex>
                    </v-layout>
                </v-col>
            </v-row>
        </v-content>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component<StaticFooter>({})
export default class StaticFooter extends Vue {
    @Prop()
    public brkPoints!: object;
}
</script>

<style lang="scss" scoped>
.footer-bottom {
    background-color: var(--color-neutralLight);
}
.v-application p {
    margin-bottom: 0;
}

.footer-logo {
    height: 60px;
}
.footer-info-links li {
    display: inline;
    margin: 0 5px;
}
</style>
