<template>
    <v-row justify="center">
        <v-col cols="12">
            <p class="enrollment-details">
                <strong class="brand-header">BIN:</strong>
                600428
            </p>
            <p class="enrollment-details">
                <strong class="brand-header">PCN:</strong>
                06780000
            </p>
            <p class="enrollment-details">
                <strong class="brand-header">Group:</strong>
                06780149
            </p>
            <p class="enrollment-details">
                <strong class="brand-header">ID:</strong>
                {{ memberNumber }}
            </p>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.enrollment-details text-center {
    font-size: 20px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { Resolve } from 'vue-di';
import EnrollmentModule from '../store/enrollment';

@Component<MemberDetails>({})
export default class MemberDetails extends Vue {
    @Resolve
    public enrollment!: EnrollmentModule;

    memberNumber = this.enrollment.memberNumber || 'XXXXXXXXXXX';
}
</script>
