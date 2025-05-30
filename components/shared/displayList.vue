<template>
    <div ref="displayListTable" class="container v-card v-sheet">
        <v-data-table
            :headers="headers"
            :items="listItems"
            :items-per-page="displayLength"
            item-key="name"
            class="elevation-1"
            :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus',
            }"
        ></v-data-table>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 0px 0px 0px 0px;
    margin-top: 5px;
    margin-bottom: 19px;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { Component, Prop, Model, Emit } from 'vue-property-decorator';
import { IHeader } from '~/types/componentTypes';
import { ListBase } from '~/components/shared/listBase.ts';

@Component<DisplayList>({})
export default class DisplayList extends ListBase {
    @Prop({ required: true })
    public headers!: IHeader[];
    @Prop({ required: true })
    public listItems!: any[];
    @Prop()
    public displayLength!: number;
}
</script>
