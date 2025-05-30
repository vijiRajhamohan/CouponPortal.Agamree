<template>
    <v-layout justify-center column class="iri-content pb-12">
        <v-flex class="iri-section pb-6">
            <v-layout justify-center>
                <v-flex xs12 sm12 md10 lg8>
                    <h3>
                        IMPORTANT RISK INFORMATION
                    </h3>
                    <p>
                        TODO: Markdown content from yaml file
                    </p>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<style lang="scss">
.iri-content {
    * {
        color: var(--color-brandGrey);
    }

    .iri-section {
        &:first-of-type {
            .inner-iri-section {
                border-bottom: solid 1px var(--color-brandGrey);
                padding-bottom: 1em;
            }
        }
        padding: 0 0 1em;
    }

    h3 {
        font-size: 1.25em;
        font-weight: 400;
        color: var(--color-primary);
    }

    h4 {
        font-size: 1.15em;
        // padding-top: 0.25em;
    }

    .highlight {
        font-size: 1.2em;
        font-weight: bold;
    }
    a {
        color: var(--color-secondary);
        text-decoration: underline;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { faChevronUp } from '@fortawesome/pro-regular-svg-icons';

@Component<IRIInfo>({
    components: {},
    icons: {
        faChevronUp,
    },
})
export default class IRIInfo extends Vue {}
</script>
