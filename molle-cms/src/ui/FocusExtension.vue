<template lang="pug">
.focus-extension.bootstrap(
  v-show="active"
  :style="style"
  :data-is-row="sibling.isRow")
  .focus-extension__before(v-show="isBefore")
    button.btn.btn-sm.btn-outline-info#addBefore
      b-icon(icon="plus")
      span {{$words.before}}

    b-popover(
      :target="'addBefore'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      div(v-if="loader.fromModule && loader.fromModule.loader")
        AddModuleComp(
          :parentNode="loader.fromModule.loader.node"
          :beforeNode="loader.node"
        )

        CopyModuleComp(
          :parentNode="loader.fromModule.loader.node"
          :beforeNode="loader.node"
        )
  .focus-extension__tr(v-show="isBefore")
    button.btn.btn-sm.btn-outline-danger#delete(@click="deleteModule")
      span Delete
      b-icon(icon="x")

  .focus-extension__after(v-show="isAfter")
    button.btn.btn-sm.btn-outline-info#addAfter
      b-icon(icon="plus")
      span {{$words.after}}

    b-popover(
      :target="'addAfter'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      div(v-if="loader.fromModule && loader.fromModule.loader")
        AddModuleComp(
          v-if="loader.fromModule && loader.fromModule.loader"
          :parentNode="loader.fromModule.loader.node"
          :afterNode="loader.node"
        )

        CopyModuleComp(
          v-if="loader.fromModule && loader.fromModule.loader"
          :parentNode="loader.fromModule.loader.node"
          :afterNode="loader.node"
        )

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
import {IItemData, INodeObject} from "../interface";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import AddModuleComp from "./AddModuleComp.vue";
import CopyModuleComp from "./CopyModuleComp.vue";
import ModuleLoaderCms from "../module/ModuleLoaderCms.vue";
import {MoUtils} from "../MoUtils";

@Component({
  components: {AddModuleComp, CopyModuleComp},
})
export default class FocusExtension extends Vue {
  itemId: string = "";
  private observer: any;
  active = false;

  loader = <ModuleLoaderCms>{};
  style: any = {};
  sibling = {};
  isBefore = true;
  isAfter = true;

  mounted() {
    this.enterFrame();

    this.changeFocus(this.$route.query.focus + "");
  }

  @Watch("$route.query.focus")
  changeFocus(newer: string) {
    let loader = ModuleLoaderCms.modules[newer];
    if (loader) {
      this.$set(this, "active", true);
      this.itemId = this.$route.query.focus + "";
      this.$set(this, "loader", loader);

      //子要素を差し込めない要素確認
      // this.isBefore = this.isAfter=true;
      this.isBefore = this.isAfter = loader.fromModule.itemData && loader.fromModule.itemData.type != "group";
      // if (this.isAfter &&
      //   loader.fromModule.itemData.value[loader.fromModule.itemData.value.length - 1].id == this.itemId) {
      //   this.isAfter = false;
      // }
    } else {
      this.$set(this, "active", false);
      console.log(loader, newer);
    }
  }

  private enterFrame() {
    try {
      let el = <HTMLElement>this.loader.$children[0].$el;
      // console.log(el);
      let rect = el.getBoundingClientRect();
      // console.log(pageYOffset,rect.top)
      this.$set(this, "active", true);
      this.$set(this, "style", {
        "top": 0 + rect.top + "px",
        "left": 0 + rect.left + "px",
        "width": rect.width + "px",
        "height": rect.height + "px",
      });
    } catch (e) {
      this.$set(this, "active", false);
    }

    requestAnimationFrame(() => {
      this.enterFrame();
    });
    // setTimeout(() => this.enterFrame(), Math.floor(1000 / 10));
  }

  deleteModule() {
    if (!confirm(`削除します`)) return
    let parent:any = this.loader.$parent;
    let value: any = parent.itemData.value.filter((via: INodeObject) => via.id != this.itemId);
    let update = {value: value};
    MoUtils.updateItem(parent.$parent.node.id, update);
    MoUtils.addHistory("delete",
      parent.$parent.node.id,
      parent.itemData,
      update,
    );
  }

  beforeDestroy() {
  }
}
</script>

<style lang="scss">
.focus-extension {
  position: fixed;
  z-index: $zindex-modal;
  //outline: 2px solid $color-red;
  pointer-events: none;

  &__before, &__after, &__tr {
    position: absolute;
    pointer-events: auto;
  }

  &__before {
  }

  &__after {
  }

  //
  &:not([data-is-row]) {
    .focus-extension {
      &__before, &__after {
      }

      &__before {
        top: 0rem;
        left: 0rem;
        transform: translate(0, -100%);
      }

      &__tr {
        top: 0rem;
        right: 0rem;
        transform: translate(0, -100%);
      }

      &__after {
        bottom: 0rem;
        right: 0rem;
        transform: translate(0, 100%);
      }
    }
  }

  &[data-is-row] {
    .focus-extension {
      &__before, &__after {
        top: 50%;
        left: auto;
      }

      &__before {
        left: 0.5rem;
        transform: translate(-100%, -50%);
      }

      &__after {
        right: 0.5rem;
        transform: translate(100%, -50%);
      }
    }
  }
}
</style>
