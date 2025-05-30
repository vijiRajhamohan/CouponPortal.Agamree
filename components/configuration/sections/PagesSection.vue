<template>
    <v-expansion-panel ref="drawer_pages_panel">
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Page Options
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <p>Page selection</p>
            <h4>Page order after landing page</h4>
            <draggable v-model="pages" group="people" @start="drag = true" @end="drag = false">
                <div v-for="(page, i) in pages" :key="i" class="page-item">
                    <fa-icon size="1x" :icon="$icons.faGripHorizontal" class="header-icon" />
                    {{ page }}
                </div>
            </draggable>
            <br />
            <h4>Other pages (drag above to include)</h4>
            <draggable v-model="otherPages" group="people" @start="drag = true" @end="drag = false">
                <div v-for="(otherPage, i) in otherPages" :key="i" class="page-item">
                    <fa-icon size="1x" :icon="$icons.faGripHorizontal" class="header-icon" />
                    {{ otherPage }}
                </div>
            </draggable>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';
.page-item {
    border: 1px solid white;
    padding: 5px;
    border-radius: 2px;
    margin-top: 3px;
    &:hover {
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
}
</style>

<style lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { faGripHorizontal } from '@fortawesome/pro-duotone-svg-icons';
import LayoutModule from '~/store/layout';

@Component<PagesSection>({
    layout: 'default',
    components: {
        draggable,
    },
    icons: {
        faGripHorizontal: faGripHorizontal as any,
    },
})
export default class PagesSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon: any;

    public get pages() {
        return this.layout.configuration.pages;
    }

    public set pages(pages) {
        this.layout.setConfiguration({ pages });
    }

    public get otherPages() {
        return this.layout.configuration.otherPages;
    }

    public set otherPages(otherPages) {
        this.layout.setConfiguration({ otherPages });
    }
}
</script>
