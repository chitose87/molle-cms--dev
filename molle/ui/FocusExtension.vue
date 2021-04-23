<template lang="pug">
.focus-extension.bootstrap(:style="style" :data-is-row="sibling.isRow")
  RealtimeTextInput(v-show="itemData.type=='text'")
  .focus-extension__before
    button.btn.btn-sm.btn-outline-info#addBefore
      b-icon(icon="plus")

    b-popover(
      :target="'addBefore'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      AddModuleComp(
        v-if="loader.fromModule"
        :parentNode="loader.fromModule.loader.node"
        :beforeNode="loader.node"
      )

  .focus-extension__after
    button.btn.btn-sm.btn-outline-info#addAfter
      b-icon(icon="plus")

    b-popover(
      :target="'addAfter'"
      triggers="focus"
      :placement="sibling.isRow?'bottom':'right'"
      container="bootstrap-container"
    )
      AddModuleComp(
        v-if="loader.fromModule"
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
import RealtimeTextInput from "~/molle/ui/RealtimeTextInput.vue";
import {Module} from "~/molle/module/Module";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp, RealtimeTextInput},
})
export default class FocusExtension extends Vue {
  itemId: string = "";
  lsStore = lsStore;
  itemData = <IItemData>{};
  targetModule = <Vue>{};
  isInit = false;
  visible = false;

  beforeInputData = "";
  private unsubscribe!: () => void;

  loader = <ModuleLoader>{};

  style: any = {};

  isRow = true;
  sibling = {};

  //
  mounted() {
    window.addEventListener("resize", () => {
      this.updateStyle();
    })
  }

  /**
   * from editer.vue
   */
  init(moduleLoader: Vue) {
    if (moduleLoader == this.loader) return;
    this.$emit("beforeUpdate");

    this.loader = <ModuleLoader>moduleLoader;
    this.itemId = moduleLoader.$props.node.id;
    this.targetModule = this.loader.toModule;
    //
    let prev = this.targetModule.$el.previousElementSibling;
    let next = this.targetModule.$el.nextElementSibling;
    let rect = this.targetModule.$el.getBoundingClientRect();
    //@ts-ignore
    let sibling: any = {};
    let via;
    if (prev) {
      via = prev.getBoundingClientRect();
      sibling.isRow = via.top - rect.top > via.left - rect.left;
    } else if (next) {
      via = next.getBoundingClientRect();
      sibling.isRow = rect.top - via.top > rect.left - via.left;
    }
    this.$set(this, "sibling", sibling);

    let once = true;
    this.unsubscribe && this.unsubscribe();
    this.unsubscribe = Singleton.itemsRef
      .doc(this.itemId)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        this.$set(this, "itemData", snap.data());
        this.updateStyle();
        if (once) this.$emit("initialized"), once = false;
        else this.$emit("update");
      });
  }

  updateStyle() {
    try {
      let el = <HTMLElement>this.targetModule.$el;
      this.$set(this, "style", {
        "top": el.offsetTop + "px",
        "left": el.offsetLeft + "px",
        "width": el.clientWidth + "px",
        "height": el.clientHeight + "px"
      });
    } catch (e) {
    }
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
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
        left: 50%;
      }

      &__before {
        top: -0.5rem;
        transform: translate(-50%, -100%);
      }

      &__after {
        bottom: -0.5rem;
        transform: translate(-50%, 100%);
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
