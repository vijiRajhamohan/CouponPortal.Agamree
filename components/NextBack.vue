<template>
    <v-row class="row-next-back" justify="center">
        <v-col cols="12" md="3" order="2" order-md="1">
            <v-btn
                ref="btn_back"
                class="v-btn--active nextBack"
                color="primary"
                large
                block
                :outlined="layout.configuration.isOutlined"
                :rounded="layout.configuration.isRounded"
                @click="backFunction()"
            >
                {{ backButton }}
            </v-btn>
        </v-col>
        <v-col cols="12" md="3" order="1" order-md="2">
            <v-btn
                ref="btn_next"
                class="nextBack"
                color="primary"
                large
                block
                :outlined="layout.configuration.isOutlined"
                :rounded="layout.configuration.isRounded"
                @click="nextFunction()"
            >
                {{ nextButton }}
            </v-btn>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import LayoutModule from '../store/layout';

@Component({})
export default class NextBack extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public nextFunction!: Function;

    @Prop()
    public backFunction!: Function;

    @Prop({ default: () => ['Next', 'Back'] })
    public btnNames!: string[];

    get nextButton() {
        return this.btnNames[0];
    }

    get backButton() {
        return this.btnNames[1];
    }
}
</script>
