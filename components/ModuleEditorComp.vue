<template lang="pug">
  .module-editor(:status="isEdit?'show':'hidden'")
    button.toggle(@click="isEdit=!isEdit") 閉じる
    div(v-if="isEdit")
      ValueComp(:valueData="$parent.valueData" :valueProfile="$parent.valueProfile")
      StyleComp(:styleData="$parent.styleData" :styleProfile="$parent.styleProfile")

      button.btn.btn-danger(@click="$parent.deleteModule()") 削除

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import ValueComp from "~/components/ValueComp.vue";
  import StyleComp from "~/components/StyleComp.vue";

  @Component({
    components: {StyleComp, ValueComp}
  })
  /**
   */
  export default class ModuleEditorComp extends Vue {
    isEdit = true;

    mounted() {
    }
  }
</script>

<style lang="scss">
  .module-editor {

  }
</style>
