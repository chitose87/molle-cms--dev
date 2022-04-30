<template lang="pug">
div
  label
    span.mr-1 {{custom.lat.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 緯度(lat)と経度(lng)を入力すると、その地点のGoogleMapが表示されます。
    input.form-control.form-control-sm(
      type="number"
      v-model="itemData.value.lat"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.lng.label}}:
    input.form-control.form-control-sm(
      type="number"
      v-model="itemData.value.lng"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 半径:
    input.form-control.form-control-sm(
      type="number"
      v-model="itemData.value.rkm"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.markerTitle.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 入力するとマーカーにタイトルがつきます。
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.title"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.markerText.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 入力するとマーカーにタイトルがつきます。
    input.form-control.form-control-sm(
      type="text"
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

@Component({
  components: {StyleComp},
})
export default class GoogleMapProfile extends Profile {
  static readonly CLASS_NAME = "GoogleMapProfile";
  static readonly LANGS = {
    en: "GoogleMap",
    jp: "GoogleMap",
  };
  // custom
  static readonly custom = {
    lat: {label: Vue.prototype.$words.lat, value: Vue.prototype.$words.number},
    lng: {label: Vue.prototype.$words.lng, value: Vue.prototype.$words.number},
    markerTitle: {
      label: Vue.prototype.$words.marker + " " + Vue.prototype.$words.title,
      value: Vue.prototype.$words.text,
    },
    markerText: {
      label: Vue.prototype.$words.marker + " " + Vue.prototype.$words.text,
      value: Vue.prototype.$words.text,
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
