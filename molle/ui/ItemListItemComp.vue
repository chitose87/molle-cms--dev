<template lang="pug">
.item-list-item-comp.list-group-item.list-group-item-action.p-0.border-right-0(
  v-if="itemData.moduleId"
)
  .d-flex.justify-content-between
    button.btn.btn-sm.btn-link.btn-block.text-left(
      :class="{active: lsStore.storage.focusModuleNode.id === node.id}",
      :title="node.id",
      @click="lsStore.update({key: 'focusModuleNode', value: node})"
      @mouseover="lsStore.update({key: 'hoverModuleNode', value: node})"
      style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
    )
      span(v-if="isRoot")
        b-icon.ml-n1.mr-1(icon="box")
        b Root Item
      span(v-else-if="itemData.moduleId=='Headline'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b H
        span :{{itemData.value}}
      span(v-else-if="itemData.moduleId=='Button'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b Btn
        span :{{itemData.value}}
      span(v-else-if="itemData.option.tag=='section'")
        b-icon.ml-n1.mr-1(icon="bookmark-check-fill")
        b {{itemData.name||'Section'}}
      span(v-else)
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b(v-html="itemData.moduleId")
        span(v-if="itemData.name") :{{itemData.name}}
    //削除
      v-if="!$parent.notDeleted"
    button.btn.btn-sm.btn-danger(
      v-if="!isRoot && lsStore.storage.focusModuleNode.id === node.id",
      @click="deleteModule()"
    ) x
  // children
  draggable.list-group.pl-2.pb-2(
    v-if="$molleModules[itemData.moduleId].def.type === 'children'",
    v-model="itemData.value",
    :group="getGroup(itemData.moduleId)",
    @remove="updateChild",
    @add="updateChild",
    @update="updateChild",
    @end="hoge"
  )
    ItemListItemComp(v-for="node in itemData.value", :key="node.id", :node="node")
    .item-list-item-comp.list-group-item.list-group-item-action.pr-0.border-right-0(
      v-if="!itemData.value || itemData.value.length == 0"
    )
      span.color-gray-200 -empty-

  //Group
  .list-group.pl-2.pb-2(
    v-else-if="$molleModules[itemData.moduleId].def.type === 'group'",
  )
    ItemListItemComp(v-for="node in groupChildSort(itemData.value)", :key="node.id", :node="node")

  // items
  //.list-group.mt-3(v-if="molleModules[itemData.moduleId].def.type==='items'")
  //  ItemListItemComp(
  //    v-for="id in itemData.value"
  //    :key="id"
  //    :itemId="id"
  //    :dic="dic"
  //  )
  //  .list-group-item.pr-0.border-right-0
  //    form.form-group.d-flex.justify-content-between.mb-0.mr-2(@submit.prevent @submit="pushModule()")
  //      span Add Item
  //      button.btn.btn-sm.btn-info(type="submit")
  //a group
  //.list-group.mt-3(v-if="molleModules[itemData.moduleId].def.type==='group'")
  //  ItemListItemComp(
  //    v-for="id in itemData.value"
  //    :key="id"
  //    :itemId="id"
  //    :dic="dic"
  //  )
  //div(v-else="")
  //  p.mb-0(v-html="dic[itemId].value")
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import {IItemData, INodeObject} from "~/molle/interface";
import firebase from "~/node_modules/firebase";
import {lsStore} from "~/utils/store-accessor";
import draggable from "vuedraggable";

@Component({
  components: {draggable},
})
export default class ItemListItemComp extends Vue {
  @Prop() node!: INodeObject;
  @Prop() isRoot?: boolean;
  itemData = <IItemData>{};
  lsStore = lsStore;
  pushModuleSelected: string = "";
  private unsubscribe!: () => void;

  @Watch("node", {immediate: true})
  updateNode() {
    if (!this.node.id) return;
    //@ts-ignore
    let checkLoop = (p: any) => {
      if (!p) return false;
      if (p.itemData && p.node.id === this.node.id) {
        alert("loopしたので解決します。");
        this.deleteModule();
        return true;
      }
      if (p.$parent) return checkLoop(p.$parent);
    };
    if (checkLoop(this.$parent)) return;

    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = Singleton.itemsRef
      .doc(this.node.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) return;
        let itemData = snap.data();

        // console.log("aaaaa")
        this.$set(this, "itemData", itemData);
        // console.log("bbbbb")
      });
  }

  getGroup(moduleId: string) {
    switch (moduleId) {
      //- case "Column":
      //- return moduleId;
      default:
        return "Box";
    }
  }

  updateChild() {
    console.log("updateChild", this.itemData.value);
    Singleton.itemsRef.doc(this.node.id).update({
      value: this.itemData.value,
    });
  }

  deleteModule() {
    let parent = <ItemListItemComp>this.$parent.$parent;
    Singleton.itemsRef.doc(parent.node.id).update({
      value: parent.itemData.value.filter((via: INodeObject) => via.id != this.node.id),
    });
  }

  groupChildSort(groupValue: any) {
    let v: any[] = [];
    for (let i in groupValue) {
      v.push(groupValue[i]);
    }
    v.sort((a, b) => {
      return a.order > b.order ? 1 : -1;
    });
    return v;
  }

  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  hoge(e: any) {
    console.log(e.item);
  }
}
</script>

<style lang="scss">
.item-list-item-comp {
}
</style>
