<template lang="pug">
.site-settings-comp
  h2.p-3.mt-0.mb-4.text-white.bg-success(@click="flag=!flag")
    b-icon.mr-2(icon="tools")
    | {{$words.site}} {{$words.settings}}
    b-icon(:icon="flag?'chevron-up':'chevron-down'")

  div(v-if="flag")
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import {MoUtils} from "../MoUtils";

@Component({
  components: {},
})
export default class SiteSettingsComp extends Vue {
  flag = false;
  inited = false;

  @Watch("flag")
  onOpen() {
    if (!this.inited) {
      this.inited = true;

    }
  }
}
</script>

<style lang="scss">
.site-settings-comp {

}
</style>
