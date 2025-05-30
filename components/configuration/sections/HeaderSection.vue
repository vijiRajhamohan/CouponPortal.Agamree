<template>
    <form-context :validator="$v">
        <v-expansion-panel>
            <v-expansion-panel-header class="pt-0 pb-0">
                <v-card-text class="pl-0">
                    <fa-icon size="1x" :icon="icon" class="header-icon" />
                    Header Options
                </v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <p>Logo Alignment</p>
                <v-radio-group v-model="logoPosition">
                    <v-radio label="Left Aligned" color="primary" :value="'start'" class="pb-2"></v-radio>
                    <v-radio label="Center Aligned" color="primary" :value="'center'" class="pb-2"></v-radio>
                    <v-radio label="Right Aligned" color="primary" :value="'end'" class="pb-2"></v-radio>
                </v-radio-group>
                <p>Header Style</p>
                <v-radio-group v-model="headerStyle">
                    <v-radio label="Static" color="primary" :value="'static'" class="pb-2"></v-radio>
                    <v-radio label="scrolling" color="primary" :value="'scrolling'" class="pb-2"></v-radio>
                </v-radio-group>
                <v-checkbox v-model="hasHeaderBottomBar" label="Header Bottom Bar" />
                <div v-if="hasHeaderBottomBar">
                    <form-field v-slot="{ attrs, events }" name="bottomBarHeight" label="Bottom Bar Height">
                        <v-text-field v-model="bottomBarHeight" type="number" :minLength="1" v-bind="attrs" v-on="events"></v-text-field>
                    </form-field>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </form-context>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';
</style>

<style lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { numeric, minLength } from 'vuelidate/lib/validators';
import { Prop } from 'vue-property-decorator';
import LayoutModule from '~/store/layout';

@Component<HeaderSection>({
    layout: 'default',
    validations: {
        bottomBarHeight: {
            numeric,
            minLength: minLength(0),
        },
    },
})
export default class HeaderSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon: any;

    get bottomBarHeight() {
        return this.layout.configuration.bottomBarHeight;
    }

    set bottomBarHeight(bottomBarHeight) {
        this.layout.setConfiguration({bottomBarHeight});
    }

    get logoPosition() {
        return this.layout.configuration.logoPosition;
    }

    set logoPosition(logoPosition) {
        this.layout.setConfiguration({logoPosition});
    }

    get headerStyle() {
        return this.layout.configuration.headerStyle;
    }

    set headerStyle(headerStyle) {
        this.layout.setConfiguration({headerStyle});
    }

    get hasHeaderBottomBar() {
        return this.layout.configuration.hasHeaderBottomBar;
    }

    set hasHeaderBottomBar(hasHeaderBottomBar) {
        this.layout.setConfiguration({hasHeaderBottomBar});
    }
}
</script>
