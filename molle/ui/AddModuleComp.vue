<template lang="pug">
.add-module-comp.bootstrap(v-if="lsStore.isEditer && this.$route.query.hidden !== 'true'")
  .mt-3.text-right
    span.text-info(v-if="label" v-html="label")
      b-icon.ml-1.mr-1(icon="box-arrow-in-left")

    form.form-group.form-check-inline(@submit.prevent v-if="itemData.moduleId" @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="key in moduleList", :value="key", v-html="key")
      button.btn.btn-sm.btn-info(type="submit") +

    //.text-center(v-if="beforeNode||afterNode")
      button.btn.btn-secondary(@click="addClone")
        span Clone

</template>

<script lang="ts">
import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/store";
import ModuleLoader from "../module/ModuleLoader.vue";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import {IItemData, INodeObject} from "../interface";

@Component({
  components: {},
})
export default class AddModuleComp extends Vue {
  @Prop() label?: string;
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;
  pushModuleSelected: string = "";
  lsStore = lsStore
  // localLoader!: ModuleLoader;

  itemData = <IItemData>{};
  moduleList: string[] = [];
  private unsubscribe!: () => void;

  mounted() {
    Singleton.itemsRef.doc(this.parentNode.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        this.$set(this, "itemData", snap.data());

        // @ts-ignore
        let moduleOpt = this.$molleModules[this.itemData.moduleId];
        let response: string[] = [];
        if (moduleOpt.white) {
          response = moduleOpt.white;
        } else if (moduleOpt.black) {
          response = Object.keys(this.$molleModules).filter(
            (name: string) => moduleOpt.black!.indexOf(name) == -1,
          );
        }
        if (!this.pushModuleSelected) {
          this.pushModuleSelected = response[0];
        }
        this.$set(this, "moduleList", response);
      });
  }

  pushModule() {
    // console.log("pushModule", this.pushModuleSelected)
    if (!this.pushModuleSelected) return;
    let data: IItemData = this.$molleModules[this.pushModuleSelected].def;
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};

    if (this.beforeNode) {
      this.itemData.value.some((_node: INodeObject, i: number) => {
        if (this.beforeNode!.id == _node.id) {
          this.itemData.value.splice(i, 0, node);
          return true;
        }
      })
    } else if (this.afterNode) {
      this.itemData.value.some((_node: INodeObject, i: number) => {
        if (this.afterNode!.id == _node.id) {
          this.itemData.value.splice(i + 1, 0, node);
          return true;
        }
      })
    } else {
      this.itemData.value.push(node);
    }
    // console.log(this.itemData.value)
    this.update(node, data);
  }

  addClone() {
    let ba = <INodeObject>this.beforeNode || this.afterNode;
    Singleton.itemsRef.doc(ba.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>snap.data();
        let node: INodeObject = {id: Singleton.itemsRef.doc().id};
        console.log(itemData);
        // itemData.value.forEach
        //todo

        // this.update(node, data);
      });
  }

  /**
   *
   * @param node
   * @param data
   * @private
   */
  private update(node: INodeObject, data: IItemData) {
    let batch = firebase.firestore().batch();
    batch.set(Singleton.itemsRef.doc(node.id), data);
    batch.update(Singleton.itemsRef.doc(this.parentNode.id), {
      updateTime: firebase.firestore.FieldValue.serverTimestamp(),
      value: this.itemData.value
    });
    batch.commit();
    lsStore.update({key: "focusModuleNode", value: node});
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
.add-module-comp {
  @include mediaquery-sm {
    display: none;
  }
}

[data-molle="embed"] {
  .add-module-comp {
    display: none;
  }
}
</style>
