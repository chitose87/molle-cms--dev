<template lang="pug">
  .module-editor(:status="isEdit?'show':'hidden'")
    button.toggle(@click="isEdit=!isEdit") 閉じる
    div(v-if="isEdit")
      // todo visible 設定を足す
      div
        component(v-for="item in itemOption"
          :is="item.name"
          :key="item.name"
          :profile="item"
          :itemData="itemData"
        )

      ValueComp(:itemData="itemData" :valueProfile="valueProfile")
      StyleComp(:itemData="itemData" :styleProfile="styleProfile")

      button.btn.btn-danger(@click="$parent.deleteModule()") 削除

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {ValueProfile} from "~/molle/interface/ValueProfile";
  import {StyleProfile} from "~/molle/interface/StyleProfile";

  @Component({
    components: {StyleComp, ValueComp}
  })
  /**
   */
  export default class ModuleEditorComp extends Vue {
    isEdit = false;

    @Prop() itemOption?: any;
    @Prop() itemData?: IItemStoreData;
    @Prop() valueProfile?: ValueProfile;
    @Prop() styleProfile?: StyleProfile;

    mounted() {
    }
  }
</script>

<style lang="scss">
  .module-editor {
    position: absolute;

    &[status=hidden] {
      z-index: $zindex-fixed - 1;
      top: -0.5rem;
      left: -0.5rem;
      width: calc(100% + 1rem);
      height: calc(100% + 1rem);

      .toggle {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;

        &:hover {
          opacity: 0.1;
        }
      }
    }

    &[status=show] {
      top: 100%;

      z-index: $zindex-fixed;
      border: 1px solid gray;
      padding: 1rem;
      background-color: lightblue;
    }
  }
</style>
