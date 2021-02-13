<template lang="pug">
.item-list-item-comp.list-group-item.list-group-item-action.p-0.border-right-0(
  v-if="itemData.moduleId"
)
  .d-flex.justify-content-between
    button.btn.btn-sm.btn-link.btn-block.text-left(
      :class="{active: lsStore.storage.focusModuleId === itemId}",
      :title="itemId",
      @click="lsStore.update({key: 'focusModuleId', value: itemId})"
      style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
    )
      span(v-if="itemData.moduleId=='Headline'")
        b H
        span :{{itemData.value}}
      span(v-else-if="itemData.moduleId=='Button'")
        b Btn
        span :{{itemData.value}}
      span(v-else)
        b(v-html="itemData.moduleId")
        span(v-if="itemData.name") :{{itemData.name}}
    //削除
      v-if="!$parent.notDeleted"
    button.btn.btn-sm.btn-danger(
      v-if="lsStore.storage.focusModuleId === itemId",
      @click="deleteModule()"
    ) x
  // children
  draggable.list-group.pl-2.pb-2(
    v-if="molleModules[itemData.moduleId].def.type === 'children'",
    v-model="itemData.value",
    :group="getGroup(itemData.moduleId)",
    @remove="updateChild",
    @add="updateChild",
    @update="updateChild",
    @end="hoge"
  )
    ItemListItemComp(v-for="id in itemData.value", :key="id", :itemId="id")
    .item-list-item-comp.list-group-item.list-group-item-action.pr-0.border-right-0(
      v-if="!itemData.value || itemData.value.length == 0"
    )
      span.color-gray-200 -empty-

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
import {IItemData} from "~/molle/interface";
import firebase from "~/node_modules/firebase";
import {lsStore} from "~/utils/store-accessor";
import {molleModules} from "~/molle/module";
import draggable from "vuedraggable";

@Component({
  components: {draggable},
})
export default class ItemListItemComp extends Vue {
  @Prop() itemId!: string;
  itemData = <IItemData>{};
  lsStore = lsStore;
  molleModules = molleModules;
  pushModuleSelected: string = "";
  private unsubscribe!: () => void;

  created() {
    //@ts-ignore
    let checkLoop = (p: any) => {
      if (!p) return false;
      if (p.itemData && p.itemId === this.itemId) {
        alert("loopしたので解決します。");
        this.deleteModule();
        return true;
      }
      if (p.$parent) return checkLoop(p.$parent);
    };
    if (checkLoop(this.$parent)) return;

    this.unsubscribe = Singleton.itemsRef
      .doc(this.itemId)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) return;
        let itemData = snap.data();

        this.$set(this, "itemData", itemData);
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
    Singleton.itemsRef.doc(this.itemId).update({
      value: this.itemData.value,
    });
  }

  deleteModule() {
    let parent = <ItemListItemComp>this.$parent.$parent;
    Singleton.itemsRef.doc(parent.itemId).update({
      value: parent.itemData.value.filter((via: string) => via != this.itemId),
    });
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
