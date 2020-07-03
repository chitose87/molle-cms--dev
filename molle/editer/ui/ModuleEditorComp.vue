<template lang="pug">
  .module-editor(:status="isEdit?'show':'hidden'")
    button.toggle(
      @click="isEdit=!isEdit"
      :class="{outerFocus:outerFocus}"
    ) 閉じる
    div.d-flex.flex-wrap.p-2(v-if="isEdit")
      div.p-2
        button(@click="$parent.indexSwap()")
          b-icon(icon="arrow-down-up")
        p
          span(v-html="itemData.ref.id")
        p
          span(v-html="itemData.moduleId")
          | /
          span(v-html="itemData.type")

        // todo visible 設定を足す
        div
          component(v-for="item in itemOption"
            :is="item.name"
            :key="item.name"
            :profile="item"
            :itemData="itemData"
          )

      ValueComp.p-2(:itemData="itemData" :valueProfile="valueProfile")
      StyleComp.p-2(:itemData="itemData" :styleProfile="styleProfile")

      button.btn.btn-danger.align-self-end(@click="$parent.deleteModule()") 削除

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
    outerFocus: boolean = false;

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
    &[status=hidden] {
      position: absolute;
      //z-index: $zindex-fixed - 1;
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

        &:hover, &.outerFocus {
          opacity: 0.1;
        }
      }
    }

    &[status=show] {
      position: relative;
      //top: 100%;
      //z-index: $zindex-fixed;
      border: 1px solid gray;
      background-color: var(--light);
      .toggle{
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
    }
  }
</style>
