<template lang="pug">
  .item-list-item-comp.list-group-item.list-group-item-action.pr-0.border-right-0(v-if="flag")

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
      //.list-group-item.pr-0.border-right-0
        form.form-group.d-flex.justify-content-between.mb-0.mr-2(@submit.prevent @submit="pushModule()")
          select.form-control.form-control-sm(v-model="pushModuleSelected")
            option(v-for="key in getModuleList()" :value="key" v-html="key")
          button.btn.btn-sm.btn-info(type="submit") +

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
    @Prop() itemId?: string;
    itemData?: IItemData;
    flag = false;
    lsStore = lsStore;
    molleModules = molleModules;
    pushModuleSelected: string = "";

    created() {
      Singleton.itemsRef.doc(this.itemId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) return;

        this.itemData = <IItemData>snap.data();
        this.$set(this, "itemData", this.itemData);
        requestAnimationFrame(() => {
          this.$set(this, "flag", true);
        });
      });
    }


    getItem() {
      //   this.itemData = fsStore.items[this.itemId!];
      //   if (!this.pushModuleSelected && this.itemData) {
      //     this.pushModuleSelected = this.getModuleList()[0];
      //   }
      //   return this.itemData;
    }

    //
    // mounted() {
    // }
    //
    getModuleList() {
      let moduleList: string[] = [];
      // @ts-ignore
      let moduleOpt = molleModules[this.itemData.moduleId];
      if (moduleOpt.white) {
        for (let item of moduleOpt.white) {
          moduleList.push(item.options.name);
        }
      } else {
        moduleList = Object.keys(molleModules);
        if (moduleOpt.black) {
          moduleOpt.black.forEach((item: any) => {
            let i = moduleList.indexOf(item.options.name);
            moduleList.splice(i, 1);
          })
        }
      }
      return moduleList;
    }

    pushModule() {
      //   // @ts-ignore
      //   let data: IItemStoreData = molleModules[this.pushModuleSelected].def;
      //
      //   let id = FirestoreMgr.itemsRef.doc().id;
      //
      //   let batch = firebase.firestore().batch();
      //   batch.set(FirestoreMgr.itemsRef.doc(id), data);
      //   batch.update(FirestoreMgr.itemsRef.doc(this.itemId), {value: [...this.itemData!.value, id]});
      //   batch.commit();
      //
      //   lsStore.update({key: "focusModuleId", value: id});
    }

    deleteModule() {
      //   let parent = <ItemListItemComp>this.$parent;
      //
      //   FirestoreMgr.itemUpdate(parent.itemId!, {
      //     value: parent.itemData!.value.filter((via: string) => via != this.itemId)
      //   });
    }
  }
</script>

<style lang="scss">
  .item-list-item-comp {

  }
</style>
