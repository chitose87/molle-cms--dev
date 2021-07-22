<template lang="pug">
  .editor-option-comp
    .card.bg-light
      .card-header.pt-1.pb-1.pl-3.pr-3(@click="flag=!flag") Editor設定
        b-icon(:icon="flag?'chevron-up':'chevron-down'")
      .card-body.p-3(v-if="flag")
        label.form-inline
          span UI非表示:
          input.form-control.form-control-sm(type="checkbox" v-model="hiddedUi")

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class EditorOptionComp extends Vue {
    flag = false;
    hiddedUi = false;

    mounted() {
    }

    @Watch("hiddedUi")
    onChangeHiddedUi() {
      //@ts-ignore
      this.$router.push({query: {...this.$route.query, hidden: this.hiddedUi}});
    }
  }
</script>

<style lang="scss">
  .page-property-comp {
  }
</style>
