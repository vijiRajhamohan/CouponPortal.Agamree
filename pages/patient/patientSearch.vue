<template>
    <div>
        <div v-if="hasSearchFields">
            <SearchHeader :searchFields="searchFields"></SearchHeader>
        </div>
        <div v-if="hasSearchData && hasSearchFields">
            <DisplayList :headers="headerConfig" :listItems="searchResults"></DisplayList>
        </div>
        <div v-else>
            <div class="loading-circular" :size="100">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loading-circular {
    display: block;
    text-align: center;
    padding: 5vh;
}
.v-progress-circular {
    height: 100px !important;
    width: 100px !important;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { Component, Prop, Model, Emit } from 'vue-property-decorator';
import { SearchFields } from '../../components/patient/search/searchFields';
// import { PatientSearchHeaders } from '~/components/patient/search/searchHeaderFields';
import DisplayList from '~/components/shared/displayList.vue';
import SearchHeader from '~/components/shared/searchHeader.vue';
import { MockService } from '~/services/mockService';
import styles from '~/assets/style/variables.scss';

@Component({
    components: { DisplayList, SearchHeader },
})
export default class PatientSearch extends Vue {
    private searchFields = new SearchFields();
    private searchResults: any[] = [];

    get styles() {
        return styles;
    }

    get hasSearchFields() {
        return !!this.searchFields;
    }
    get hasSearchData() {
        return this.searchResults && this.searchResults.length > 0;
    }
    get headerConfig() {
        return this.searchFields.getHeaderConfig();
    }

    getSearchResults() {
        MockService.search()
            .then(data => {
                this.searchResults = data;
                return this.searchResults;
            })
            .catch(error => {
                throw error;
            });
    }

    created() {
        this.getSearchResults();
    }
}
</script>
