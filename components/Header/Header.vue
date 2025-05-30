<template>
    <div>
        <!-- <ConfigurationDrawer /> -->
        <v-app-bar id="main-header" app flat height="150" class="main-nav-header" :absolute="isScrolling">
            <!-- <v-app-bar-nav-icon ref="icon_navDrawer" :class="{ absolute: isAbsolute, drawerIcon: true }" @click="drawer = !drawer">
                <fa-icon size="1x" class="black--text" :icon="['far', 'bars']" />
            </v-app-bar-nav-icon> -->
            <v-row :justify="layout.configuration.logoPosition">
                <v-col cols="auto">
                    <nuxt-link data-test="link_header_logo" :to="{ name: 'index' }" class="logo-link">
                        <img
                            id="header-logo"
                            data-test="img_header_logo"
                            :src="headerLogoSrc"
                            :alt="`${$settings.name} Home`"
                            class="logo"
                        />
                    </nuxt-link>
                </v-col>
            </v-row>
        </v-app-bar>
        <div
            v-if="layout.configuration.hasHeaderBottomBar"
            class="bottom-bar"
            :style="`height: ${layout.configuration.bottomBarHeight || '10'}px`"
        />
    </div>
</template>

<style lang="scss" scoped>
.main-nav-header {
    background: var(--color-headerBackground) !important;
    &.v-toolbar--fixed {
        z-index: 5;
    }
}

.logo {
    margin-top: 20px;
    height: 9em;
    margin-left: 80px;
}

.absolute {
    position: absolute;
}

.drawerIcon {
    top: 0;
}

.bottom-bar {
    position: absolute;
    width: 100%;
    background: var(--color-secondary);
    z-index: 1;
    top: 100px;
    left: 0;
    right: 0;
}
@media (max-width: 770px){
.logo {
    margin-top: 20px;
    height: 5em;
    margin-left: 10px;
}

}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import LayoutModule from '../../store/layout';
import ConfigurationDrawer from '~/components/configuration/ConfigurationDrawer.vue';
@Component<Header>({
    components: {
        ConfigurationDrawer,
    },
})
export default class Header extends Vue {
    @Resolve
    public layout!: LayoutModule;

    public get drawer() {
        return this.layout.drawer;
    }
    public set drawer(v) {
        this.layout.setDrawer(v);
    }

    public get headerLogoSrc() {
        return this.layout.configuration.images.header || this.$settings.url(this.$settings.headerLogo);
    }

    public get isAbsolute() {
        return this.layout.configuration.logoPosition !== 'start';
    }

    public get isScrolling() {
        return this.layout.configuration.headerStyle === 'scrolling';
    }
    public get brkPoints() {
        return {
            'brk-xs': this.$vuetify.breakpoint.xs,
            'brk-xs-only': this.$vuetify.breakpoint.xsOnly,
            'brk-sm': this.$vuetify.breakpoint.sm,
            'brk-sm-only': this.$vuetify.breakpoint.smOnly,
            'brk-sm-and-down': this.$vuetify.breakpoint.smAndDown,
            'brk-sm-and-up': this.$vuetify.breakpoint.smAndUp,
            'brk-md': this.$vuetify.breakpoint.md,
            'brk-md-only': this.$vuetify.breakpoint.mdOnly,
            'brk-md-and-down': this.$vuetify.breakpoint.mdAndDown,
            'brk-md-and-up': this.$vuetify.breakpoint.mdAndUp,
            'brk-lg': this.$vuetify.breakpoint.lg,
            'brk-lg-only': this.$vuetify.breakpoint.lgOnly,
            'brk-lg-and-down': this.$vuetify.breakpoint.lgAndDown,
            'brk-lg-and-up': this.$vuetify.breakpoint.lgAndUp,
            'brk-xl': this.$vuetify.breakpoint.xl,
            'brk-xl-only': this.$vuetify.breakpoint.xlOnly,
        };
    }

    handleClick() {
        this.$vuetify.goTo('#main-footer', {
            duration: 1000,
            easing: 'easeInOutCubic',
            offset: 70,
        });
    }
}
</script>
