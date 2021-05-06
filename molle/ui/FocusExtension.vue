<template lang="pug">
.focus-extension.bootstrap(
  v-show="lsStore.storage.focusModuleNode.id"
  :style="style"
  :data-is-row="sibling.isRow")
  RealtimeTextInput(v-show="itemData.type=='text'")
  .focus-extension__before(v-show="isInsert")
    button.btn.btn-sm.btn-outline-info#addBefore
      b-icon(icon="plus")

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

  .focus-extension__after(v-show="isInsert")
    button.btn.btn-sm.btn-outline-info#addAfter
      b-icon(icon="plus")

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
  lsStore = lsStore;
  itemId: string = "";
  itemData = <IItemData>{};
  private unsubscribe!: () => void;
  private observer: any;

  loader = <ModuleLoader>{};
  style: any = {};
  sibling = {};
  isInsert = true;

  mounted() {
    window.addEventListener("resize", () => {
      this.updateStyle();
    })
    this.enterFrame();

    // on update focusModuleNode
    this.$store.watch((state, getters) => {
      return lsStore.storage.focusModuleNode
    }, (newer: any, older: any) => {
      if (this.unsubscribe) this.unsubscribe();
      this.$emit("beforeUpdate");

      // console.log(newer.id, older.id)

      let loader = Singleton.modules[newer.id];
      if (loader) {
        this.itemId = lsStore.storage.focusModuleNode.id;
        this.$set(this, "loader", loader);

        //子要素を差し込めない要素確認
        this.isInsert = !(!loader.fromModule.itemData || loader.fromModule.itemData.type == "group");

        let once = true;
        this.unsubscribe = Singleton.itemsRef
          .doc(this.itemId)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) return;
            this.$set(this, "itemData", snap.data());

            setTimeout(() => {
              this.updateStyle();
              // if (this.observer) this.observer.disconnect();
              // this.observer = new MutationObserver(() => {
              //   //要素のサイズ確認
              //   const width = loader.$el.getBoundingClientRect().width
              //   const height = loader.$el.getBoundingClientRect().height
              //   console.log(newer.id, width, height)
              // })
              // this.observer.observe(loader.$el, <MutationObserverInit>{
              //   // attriblutes: true,
              //   // characterData: true,
              //   childList: true,
              //   subtree: true,
              // });

              if (once) this.$emit("initialized"), once = false;
              else this.$emit("update");
            }, 1000 / 60)
          });
      }
    })
  }

  private enterFrame() {
    try {
      let el = <HTMLElement>this.loader.toModule.$el;
      // console.log(this.loader);
      let rect = el.getBoundingClientRect();
      if (rect.width + "px" != this.style.width || rect.height + "px" != this.style.height) {
        this.$set(this, "style", {
          "top": pageYOffset + rect.top + "px",
          "left": pageXOffset + rect.left + "px",
          "width": rect.width + "px",
          "height": rect.height + "px"
        });
      }
    } catch (e) {
    }

    setTimeout(() => this.enterFrame(), Math.floor(1000 / 10));
  }

  updateStyle() {
    // console.log(this.loader.toModule.$el)
    try {
      let el = <HTMLElement>this.loader.toModule.$el;
      let rect = el.getBoundingClientRect();
      this.$set(this, "style", {
        "top": pageYOffset + rect.top + "px",
        "left": pageXOffset + rect.left + "px",
        "width": rect.width + "px",
        "height": rect.height + "px"
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
