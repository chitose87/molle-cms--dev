<template lang="pug">
.item-list-item-comp.list-group-item.list-group-item-action.p-0.border-right-0(
  v-if="itemData.moduleId"
  :class="{_current:$route.query.focus === node.id}"
  :data-item-id="node.id"
)
  .d-flex
    button.btn.btn-sm.btn-link.btn-block.text-left(
      :class="{active: $route.query.focus === node.id}",
      :title="node.id",
      @click="onClick"
      @mouseover="$router.replace({query: {...$route.query, hover: node.id}}).catch(err=>{})"
      style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
    )
      span(v-if="isRoot")
        b-icon.ml-n1.mr-1(icon="aspect-ratio-fill")
        b(v-html="node.id")
      span(v-else-if="itemData.option.tag=='section'")
        b-icon.ml-n1.mr-1(icon="bookmark-check-fill")
        b {{itemData.name||$words.section}}
      span(v-else-if="itemData.moduleId=='Headline'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b H
        span :{{itemData.value}}
      span(v-else-if="itemData.moduleId=='Button'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b Btn
        span :{{itemData.value}}
      span(v-else-if="itemData.moduleId=='DevModuleGuide'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b-icon.mr-1(:icon="$molleModules[itemData.option.module].icon")
        span(v-html="itemData.option.module")
      span(v-else)
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b(v-html="itemData.moduleId")
        span(v-if="itemData.name") :{{itemData.name}}

      //
      b-icon.ml-1(
        v-if="$molleModules[itemData.moduleId].def.type === 'children' || $molleModules[itemData.moduleId].def.type === 'group'"
        :icon="expanded?'chevron-up':'chevron-down'"
      )

    //削除
      v-if="!$parent.notDeleted"
    button.btn.btn-sm.btn-danger.item-list-item-comp__delete(
      v-if="!isRoot && $route.query.focus === node.id",
      @click="deleteModule()"
    ) x

  // children
  draggable.list-group.pl-2.pb-2(
    v-if="$molleModules[itemData.moduleId].def.type === 'children'"
    v-show="expanded"
    v-model="itemData.value"
    :group="getGroup(itemData.moduleId)"
    @remove="updateChild"
    @add="updateChild"
    @update="updateChild"
  )
    ItemListItemComp(v-for="node in itemData.value", :key="node.id", :node="node")
    .item-list-item-comp.list-group-item.list-group-item-action.pr-0.border-right-0(
      v-if="!itemData.value || itemData.value.length == 0"
    )
      span.color-gray-200 -{{$words.empty}}-

  //Group
  .list-group.pl-2.pb-2(
    v-else-if="$molleModules[itemData.moduleId].def.type === 'group'"
    v-show="expanded"
  )
    ItemListItemComp(v-for="node in groupChildSort(itemData.value)", :key="node.id", :node="node")

  .list-group.pl-2.pb-2(
    v-else-if="itemData.moduleId === 'Reference'"
  )
    ItemListItemComp(:node="itemData.value")
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from "nuxt-property-decorator";
import {Singleton} from "~/molle-cms/src/Singleton";
import {IItemData, INodeObject, ILogsData} from "~/molle-cms/src/interface";
import firebase from "firebase";
import draggable from "vuedraggable";
import {Utils} from "~/molle-cms/src/Utils";

@Component({
  components: {draggable},
})
export default class ItemListItemComp extends Vue {
  @Prop() node!: INodeObject;
  @Prop() isRoot?: boolean;
  itemData = <IItemData>{};
  pushModuleSelected: string = "";
  private unsubscribe!: () => void;
  maxHistory: number = 100;
  expanded = true;

  @Watch("node", {immediate: true})
  updateNode() {
    if (!this.node.id) {
      this.$set(this, "itemData", {});
      return;
    }
    if (this.checkLoop(this.$parent)) return;

    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = Singleton.itemsRef
      .doc(this.node.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        console.log(!snap.exists);
        if (!snap.exists) {
          let update = this.$molleModules[this.node!.fixedModuleId || "Box"].def;
          Utils.updateItem(this.node.id, update, true);
          return;
        }
        let itemData = <IItemData>snap.data();

        let moduleProfile = this.$molleModules[itemData.moduleId];
        if (!moduleProfile) {
          //@ts-ignore
          if (confirm(`${itemData.moduleId}は存在していないモジュールです。(id:${this.node.id})\n` + `親モジュール、${this.$parent.$parent.node.id}から削除しますか？`)) {
            this.deleteModule();
            return;
          }
        }
        this.$set(this, "itemData", itemData);
      });
  }

  private checkLoop(p: any): any {
    if (!p) return false;
    if (p.itemData && p.node.id === this.node.id) {
      console.log(this.$parent);
      alert(`loopしたので解決します。(id:${this.node.id})`);
      this.deleteModule();
      return true;
    }
    if (p.$parent) return this.checkLoop(p.$parent);
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
    let update = {value: this.itemData.value};
    Utils.updateItem(this.node.id, update);
  }

  deleteModule() {
    let parent = <ItemListItemComp>this.$parent.$parent;
    let value: any = parent.itemData.value.filter((via: INodeObject) => via.id != this.node.id);
    let update = {value: value};
    Utils.updateItem(parent.node.id, update);
  }

  private groupChildSort(groupValue: any) {
    let v: any[] = [];
    for (let i in groupValue) {
      v.push(groupValue[i]);
    }
    v.sort((a, b) => {
      return a.order > b.order ? 1 : -1;
    });
    return v;
  }

  /**
   *
   */
  onClick() {
    if (this.$route.query.focus == this.node.id) {
      this.expanded = !this.expanded;
    }
    this.$router
      .replace({query: {...this.$route.query, focus: this.node.id}})
      .catch(err => {
      });
  }

  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }
}
</script>

<style lang="scss">
.item-list-item-comp {
  &:hover, &:focus {
    background-color: $color-gray-200 !important;
  }

  &._current {
    background-color: $color-gray-300 !important;
  }

  &__delete {
    min-width: auto;
  }
}
</style>
