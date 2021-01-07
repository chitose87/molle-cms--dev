<template lang="pug">
  .item-list-item-comp.list-group-item.list-group-item-action.pr-0.border-right-0(v-if="itemData.moduleId")

    .d-flex.justify-content-between
      button.btn.btn-sm.btn-outline-secondary(
        :class="{active:lsStore.storage.focusModuleId===itemId}"
        :title="itemId"
        @click="lsStore.update({key: 'focusModuleId',value:itemId})"
      )
        b(v-html="itemData.moduleId")
      //削除
        v-if="!$parent.notDeleted"
      button.btn.btn-sm.btn-danger.mr-2(
        v-if="lsStore.storage.focusModuleId===itemId"
        @click="deleteModule()"
      ) x
    // children
    .list-group.mt-3(v-if="molleModules[itemData.moduleId].def.type==='children'")
      ItemListItemComp(
        v-for="id in itemData.value"
        :key="id"
        :itemId="id"
      )

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
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import {Singleton} from "~/src/Singleton";
  import {IItemData} from "~/src/interface";
  import firebase from "~/node_modules/firebase";
  import {lsStore} from "~/utils/store-accessor";
  import {molleModules} from "~/plugins/Modules";

  @Component({
    components: {}
  })
  export default class ItemListItemComp extends Vue {
    @Prop() itemId!: string;
    itemData = <IItemData>{};
    lsStore = lsStore;
    molleModules = molleModules;
    pushModuleSelected: string = "";
    private unsubscribe!: () => void;

    created() {
      this.unsubscribe = Singleton.itemsRef.doc(this.itemId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) return;
        this.$set(this, "itemData", snap.data());
      });
    }

    deleteModule() {
        let parent = <ItemListItemComp>this.$parent;
        Singleton.itemsRef.doc(parent.itemId).update({
          value: parent.itemData.value.filter((via: string) => via != this.itemId)
        });
    }

    beforeDestroy() {
      console.log("beforeDestroy")
      this.unsubscribe();
    }
  }
</script>

<style lang="scss">
  .item-list-item-comp {

  }
</style>
