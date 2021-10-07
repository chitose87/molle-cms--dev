<template lang="pug">
div
  label
    span.mr-1 {{custom.lat.label}}:
    MolleGuide(:propertyItem="'gmLat'")
    input.form-control.form-control-sm(
      type="nubmer"
      v-model="itemData.value.lat"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.lng.label}}:
    input.form-control.form-control-sm(
      type="nubmer"
      v-model="itemData.value.lng"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.markerTitle.label}}:
    MolleGuide(:propertyItem="'gmTitle'")
    input.form-control.form-control-sm(
      v-model="itemData.option.title"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.markerText.label}}:
    MolleGuide(:propertyItem="'gmText'")
    input.form-control.form-control-sm(
      v-model="itemData.option.text"
      @change="()=>$emit('change')"
    )
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import GoogleMap from "./GoogleMap.vue";
import MolleGuide from "~/molle-cms/src/ui/property/MolleGuide.vue";

@Component({
  components: {StyleComp, MolleGuide},
})
export default class GoogleMapProfile extends Profile {
  static readonly CLASS_NAME = "GoogleMapProfile";
  static readonly LANGS = {
    en: GoogleMap.CLASS_NAME,
    jp: "GoogleMap",
  };
  // custom
  static readonly custom = {
    lat: {label: Vue.prototype.$words.lat, value: Vue.prototype.$words.number},
    lng: {label: Vue.prototype.$words.lng, value: Vue.prototype.$words.number},
    markerTitle: {
      label: Vue.prototype.$words.marker + " " + Vue.prototype.$words.title,
      value: Vue.prototype.$words.text
    },
    markerText: {
      label: Vue.prototype.$words.marker + " " + Vue.prototype.$words.text,
      value: Vue.prototype.$words.text
    },
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "any",
    icon: "geo-alt",
  };
}
</script>

<style lang="scss">
</style>
