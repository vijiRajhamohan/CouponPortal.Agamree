<template>
    <v-container>
        <v-row justify="center" class="mt-10">
            <v-col sm="12" md="4" order="2" order-md="1">
                <v-col v-if="layout.configuration.isPatientSearch" sm="12">
                    <v-btn
                        ref="btn_patientSearch"
                        :outlined="layout.configuration.isOutlined"
                        :rounded="layout.configuration.isRounded"
                        class="big-btn"
                        height="80"
                        color="primary"
                        :to="{ name: 'patient-patientSearch' }"
                    >
                        Patient Search
                    </v-btn>
                </v-col>
                <v-col v-if="layout.configuration.isHaveACard" sm="12">
                    <v-btn
                        ref="btn_hac"
                        :outlined="layout.configuration.isOutlined"
                        :rounded="layout.configuration.isRounded"
                        class="big-btn"
                        height="80"
                        color="primary"
                        :to="{ name: 'have-a-card' }"
                    >
                        Have A Card
                    </v-btn>
                </v-col>
                <v-col sm="12">
                    <v-btn
                        ref="btn_nac"
                        :outlined="layout.configuration.isOutlined"
                        :rounded="layout.configuration.isRounded"
                        class="big-btn"
                        height="80"
                        color="primary"
                        :to="{ name: nextPage }"
                    >
                        Need A Card
                    </v-btn>
                </v-col>
                <v-col v-if="layout.configuration.isReimbursement" sm="12">
                    <v-btn
                        ref="btn_reimbursement"
                        :outlined="layout.configuration.isOutlined"
                        :rounded="layout.configuration.isRounded"
                        class="big-btn"
                        height="80"
                        color="primary"
                        :to="{ name: 'upload-documents' }"
                    >
                        Submit Reimbursement
                    </v-btn>
                </v-col>
            </v-col>
            <v-col sm="12" md="8" order="1" order-md="2">
                <h1 :class="{ 'brand-header': true, 'left-align': brkPoints['brk-md-and-up'] }">
                    Welcome to the
                    <span v-text="$settings.program"></span>
                    <span>!</span>
                </h1>
                <p :class="{ instructions: true, 'left-align': brkPoints['brk-md-and-up'] }">
                    The
                    <span v-text="$settings.program"></span>
                    supports eligible, commercially-insured patients with their out-of-pocket costs for
                    <span v-text="$settings.name"></span>
                    Eligible patients may pay as little as
                    <span v-text="$settings.cost"></span>
                    for each
                    <span v-text="$settings.name"></span>
                    prescription filled, up to an annual maximum benefit of
                    <span v-text="$settings.benefit"></span>
                    .
                </p>
            </v-col>
        </v-row>
        <div class="spacer"></div>
    </v-container>
</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.left-align {
    text-align: left;
}

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

@Component<LeftAlignment>({
    layout: 'default',
})
@Title(process.env.NAME!)
export default class LeftAlignment extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public brkPoints!: object;

    @Prop()
    public nextPage!: string;
}
</script>
