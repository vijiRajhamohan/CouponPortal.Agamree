<template>
    <v-container>
        <v-row justify="center" class="mt-10">
            <v-col cols="12">
                <h1 class="text-center">I am enrolling as:</h1>
            </v-col>
            <v-col sm="12" lg="3">
                <v-btn
                    ref="btn_patientSearch"
                    :outlined="layout.configuration.isOutlined"
                    :rounded="layout.configuration.isRounded"
                    class="big-btn"
                    height="100"
                    color="primary"
                    :to="{ name: nextPage }"
                    @click="hub.setPath('patient')"
                >
                    Patient
                </v-btn>
            </v-col>
            <v-col sm="12" lg="3">
                <v-btn
                    ref="btn_hac"
                    :outlined="layout.configuration.isOutlined"
                    :rounded="layout.configuration.isRounded"
                    class="big-btn"
                    height="100"
                    color="primary"
                    :to="{ name: nextPage }"
                    @click="hub.setPath('provider')"
                >
                    Provider
                </v-btn>
            </v-col>
            <v-col sm="12" lg="3">
                <v-btn
                    ref="btn_nac"
                    :outlined="layout.configuration.isOutlined"
                    :rounded="layout.configuration.isRounded"
                    class="big-btn"
                    height="100"
                    color="primary"
                    :to="{ name: nextPage }"
                    @click="hub.setPath('hub')"
                >
                    Hub
                </v-btn>
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
    width: 100%;
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
    ::v-deep .v-btn__content {
        width: 100%;
        white-space: normal;
        text-align: center;
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
import HubModule from '~/store/hub';
import { CommonTools } from '~/components/tools/commonTools';

@Component<SelectPath>({
    layout: 'default',
})
@Title(process.env.NAME!)
export default class SelectPath extends Vue {

    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public hub!: HubModule;

    public get nextPage() {
        return CommonTools.getRouteName('select-path', this.layout.configuration.pages)
    }
}
</script>
