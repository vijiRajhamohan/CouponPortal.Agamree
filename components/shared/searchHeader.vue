<template>
    <div class="container v-card v-sheet">
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
                <v-expansion-panel-header>Search Filters</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row :justify="'center'" class="mb-10">
                        <form-context :validator="$v">
                            <span v-if="renderComponent" name="searchFields" class="search-header">
                                <span v-for="key in fieldKeys(validSearchFields)" :key="key" class="form-Input">
                                    <v-col v-if="!isDropDown(key)">
                                        <form-field v-slot="{ attrs, events }" :name="key" :label="getTitleDisplayName(key)">
                                            <v-text-field v-model="validSearchFields[key]" v-bind="attrs" v-on="events" />
                                        </form-field>
                                    </v-col>
                                </span>
                            </span>
                            <!-- <span v-if="renderComponent" name="searchFields" class="search-header">
                    <span v-for="(key, index) in fieldKeys(validSearchFields)" :key="key" :class="getInputClass(index)" class="form-Input">
                        <v-col v-if="!isDropDown(key)">
                            <label>{{ getTitleDisplayName(key) }}</label>
                            <form-field v-slot="{ attrs, events }" :name="key" :label="getTitleDisplayName(key)">
                                <v-text-field v-model="validSearchFields[key]" v-bind="attrs" v-on="events" />
                            </form-field>
                        </v-col>
                        <div v-else :class="getInputClass(index)">
                            <form-field v-slot="{ attrs, events }" :name="key" :label="getTitleDisplayName(key)">
                                <v-text-field v-model="validSearchFields[key]" v-bind="attrs" v-on="events" />
                            </form-field>
                        </div>
                    </span>
                </span> -->
                        </form-context>
                    </v-row>
                    <v-row class="row-next-back">
                        <v-btn color="secondary" :outlined="layout.configuration.isOutlined" :rounded="layout.configuration.isRounded" @click="handleReset">
                            Reset
                        </v-btn>
                        <v-btn color="primary" :outlined="layout.configuration.isOutlined" :rounded="layout.configuration.isRounded" @click="handleSearchClick">
                            Search
                        </v-btn>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin-top: 29px;
}
.row-next-back {
    display: block;
    text-align: center;
}
.search-header {
    width: 100%;
    display: contents;
}
.form-input {
    padding: 0px;
    margin-left: 7px;
    margin-right: 7px;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { Component, Prop, Model, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import { required } from 'vuelidate/lib/validators';
import { Resolve } from 'vue-di';
import LayoutModule from '../../store/layout';
import { Validate } from '~/validation/Validate';
import { IHeader, ISearchFields } from '~/types/componentTypes';
import { CommonTools } from '~/components/tools/commonTools';
import { SearchFields } from '~/components/patient/search/searchFields';
import { ListBase } from '~/components/shared/listBase.ts';
import styles from '~/assets/style/variables.scss';

@Component<SearchHeader>({})
export default class SearchHeader extends ListBase {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public searchFields!: ISearchFields;

    styles = styles;
    private panel = [1, 0];
    private validSearchFields: ISearchFields = {} as ISearchFields;
    private renderComponent = true;

    isDropDown(fieldName: string, dropDownString = 'QueryType') {
        return fieldName.includes(dropDownString);
    }

    handleSearchClick() {
        // this.$v.$touch();
        // if (this.$v.$invalid) {
        //     return;
        // }

        this.$emit('searchClick', this.searchFields);
    }

    handleReset() {
        this.validSearchFields = this.searchFields.getFieldDefaults();
        this.renderComponent = false;
        this.$nextTick(() => {
            this.renderComponent = true;
        });
    }

    getInputClass(index: number) {
        return this.searchFields.getClassName(index);
    }

    created() {
        this.validSearchFields = this.searchFields;
    }
}
</script>
