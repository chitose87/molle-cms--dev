<template lang="pug">
.focus-extension.bootstrap(
  v-show="lsStore.storage.focusModuleNode.id"
  :style="style"
  :data-is-row="sibling.isRow")
  .focus-extension__before(v-show="isBefore")
    button.btn.btn-sm.btn-outline-info#addBefore
      b-icon(icon="plus")
      span Before

    b-popover(
      :target="'addBefore'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      AddModuleComp(
        v-if="loader.fromModule && loader.fromModule.loader"
        :parentNode="loader.fromModule.loader.node"
        :beforeNode="loader.node"
      )

    button.btn.btn-sm.btn-outline-info#copyBefore
      b-icon(icon="plus")
      span copy

    b-popover(
      :target="'copyBefore'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      CopyModuleComp(
        v-if="loader.fromModule && loader.fromModule.loader"
        :parentNode="loader.fromModule.loader.node"
        :beforeNode="loader.node"
      )


  .focus-extension__after(v-show="isAfter")
    button.btn.btn-sm.btn-outline-info#addAfter
      b-icon(icon="plus")
      span After

    b-popover(
      :target="'addAfter'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      AddModuleComp(
        v-if="loader.fromModule && loader.fromModule.loader"
        :parentNode="loader.fromModule.loader.node"
        :afterNode="loader.node"
      )

    button.btn.btn-sm.btn-outline-info#copyAfter
      b-icon(icon="plus")
      span copy

    b-popover(
      :target="'copyAfter'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      CopyModuleComp(
        v-if="loader.fromModule && loader.fromModule.loader"
        :parentNode="loader.fromModule.loader.node"
        :afterNode="loader.node"
      )


</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import {Module} from "~/molle/module/Module";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";
import CopyModuleComp from "~/molle/ui/CopyModuleComp.vue";

@Component({
  components: {AddModuleComp,CopyModuleComp},
})
export default class FocusExtension extends Vue {
  lsStore = lsStore;
  itemId: string = "";
  private observer: any;

  loader = <ModuleLoader>{};
  style: any = {};
  sibling = {};
  isBefore = true;
  isAfter = true;

  mounted() {
    this.enterFrame();

    // on update focusModuleNode
    this.$store.watch((state, getters) => {
      return lsStore.storage.focusModuleNode
    }, (newer: any, older: any) => {
      console.log(newer.id)

      let loader = Singleton.modules[newer.id];
      if (loader) {
        this.itemId = lsStore.storage.focusModuleNode.id;
        this.$set(this, "loader", loader);

        //子要素を差し込めない要素確認
        this.isBefore = this.isAfter = !(!loader.fromModule.itemData || loader.fromModule.itemData.type == "group");
        if (this.isAfter &&
          loader.fromModule.itemData.value[loader.fromModule.itemData.value.length - 1].id == this.itemId) {
          this.isAfter = false;
        }
      }
    })
  }

  private enterFrame() {
    try {
      let el = <HTMLElement>this.loader.toModule.$el;
      // console.log(el);
      let rect = el.getBoundingClientRect();
      this.$set(this, "style", {
        "top": pageYOffset + rect.top + "px",
        "left": pageXOffset + rect.left + "px",
        "width": rect.width + "px",
        "height": rect.height + "px"
      });
    } catch (e) {
      this.$set(this, "style", {
        "display": "none"
      });
    }

    setTimeout(() => this.enterFrame(), Math.floor(1000 / 10));
  }

  beforeDestroy() {
  }

  // ディープコピー

}
</script>

<style lang="scss">
.focus-extension {
  position: absolute;
  z-index: $zindex-on;
  outline: 2px solid $color-red;
  pointer-events: none;

  &__before, &__after {
    position: absolute;
    pointer-events: all;
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
