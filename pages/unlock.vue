<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="12">
                <h2>Please enter a password to unlock:</h2>
            </v-col>
            <v-col cols="4" lg="4">
                <v-text-field v-model="password" label="Password" type="password" filled></v-text-field>
            </v-col>
            <v-col cols="12" lg="12">
                <v-btn
                    class="white--text"
                    background-color="blue"
                    autofocus="true"
                    large
                    @click="handleSubmit()">Submit
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<style lang="scss">
</style>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Resolve } from 'vue-di';
import { Title } from '~/decorators/Title';
import { Settings } from '~/services/settings';
@Component<Unlock>({
    layout: 'lock',
    middleware(ctx: any) {
        if(
            ((/true/i).test(ctx.env.lockEnabled) && ctx.$passwordProtect.isAuthorised())
            ||
            (!(/true/i).test(ctx.env.lockEnabled))
        ){
            ctx.redirect({ path: '/' });
        }
    }
})
@Title('Please Unlock To Gain Access')
export default class Unlock extends Vue {
    @Resolve
    settings!: Settings;
    password = '';

    handleSubmit(){
        if(this.$passwordProtect.authorise(this.password) && this.$passwordProtect.isAuthorised()){
            this.$router.push({ path: '/' });
        }
    }
}
</script>
