<template lang="pug">
.item-list-item-comp(
  v-if="itemData.moduleId"
  :class="{_current:isCurrent}"
  :data-item-id="node.id"
  :data-drag-over="isDragOver"
)
  .d-flex.align-items-center
    b-icon.ml-n2.small(
      v-if="!isRoot && $molleModules[itemData.moduleId].def.type === 'children' || $molleModules[itemData.moduleId].def.type === 'group'"
      :icon="expanded?'chevron-down':'chevron-right'"
      @click="expanded = !expanded"
    )

    button.btn.btn-sm.btn-link.btn-block.text-left.pt-0.pb-0(
      :class="{active: isCurrent}",
      :title="node.id",
      @click="onClick"
      @dblclick="expanded = !expanded"
      @mouseover="$router.replace({query: {...$route.query, hover: node.id}}).catch(err=>{})"
      draggable
      @dragstart="onDragstart($event)"
      @dragend="onDragend"
      @dragover.prevent="isDragOver=isIncludible($parent.$data.itemData)"
      @dragleave.prevent="isDragOver=false"
      @drop="onDrop($event,$parent,node.id)"
      style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
    )
      span(v-if="isRoot")
        b-icon.ml-n1.mr-1(icon="aspect-ratio-fill")
        b(v-html="node.id")
      span(v-else-if="itemData.moduleId=='Section'")
        b-icon.ml-n1.mr-1(icon="bookmark-check-fill")
        b {{itemData.name||$words.section}}
      span(v-else-if="itemData.moduleId=='Headline'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b H
        span :{{itemData.value}}
      span(v-else-if="itemData.moduleId=='Paragraph'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        span {{itemData.value}}
      span(v-else-if="itemData.moduleId=='Picture'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        span(v-if="itemData.option.alt") {{itemData.option.alt}}
        b(v-else) Picture
      span(v-else-if="itemData.moduleId=='Button'")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b Btn
        span :{{itemData.value}}

      span(v-else-if="itemData.moduleId=='DevModuleGuide' && $molleModules[itemData.option.module]")
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b-icon.mr-1(:icon="$molleModules[itemData.option.module].icon")
        span(v-html="itemData.option.module")
      span(v-else)
        b-icon.ml-n1.mr-1(:icon="$molleModules[itemData.moduleId].icon")
        b(v-html="itemData.moduleId")
        span(v-if="itemData.name") :{{itemData.name}}
      //

    //削除
      v-if="!$parent.notDeleted"
    button.btn.btn-sm.btn-danger.item-list-item-comp__delete(
      v-if="!isRoot && isCurrent",
      @click="deleteModule()"
    ) x

  // children
  .pl-3(
    v-if="$molleModules[itemData.moduleId].def.type === 'children'"
    v-show="expanded"
    v-model="itemData.value"
  )
    ItemListItemComp(v-for="node in itemData.value", :key="node.id", :node="node")
    .item-list-item-comp__empty.pr-0(
      v-if="!itemData.value || itemData.value.length == 0"
      @dragover.prevent="isDragOverLast=isIncludible(itemData)"
      @dragleave.prevent="isDragOverLast=false"
      @drop="onDrop($event)"
      :data-drag-over-last="isDragOverLast"
    )
      span.color-gray-200 -{{$words.empty}}-

    .item-list-item-comp__last(
      v-else=""
      @dragover.prevent="isDragOverLast=isIncludible(itemData)"
      @dragleave.prevent="isDragOverLast=false"
      @drop="onDrop($event)"
      :data-drag-over-last="isDragOverLast"
    )

  //Group
  .pl-3(
    v-else-if="$molleModules[itemData.moduleId].def.type === 'group'"
    v-show="expanded"
  )
    ItemListItemComp(v-for="node in groupChildSort(itemData.value)", :key="node.id", :node="node")

  //Reference
  .pl-3(
    v-else-if="itemData.moduleId === 'Reference'"
  )
    span.small(v-html="itemData.value.id")
    //ItemListItemComp.item-list-item-comp--reference(:node="itemData.value")

</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from "nuxt-property-decorator";
import {Singleton} from "../Singleton";
import {IItemData, INodeObject, ILogsData} from "../interface";
import firebase from "firebase";
import {MoUtils} from "../MoUtils";
import ModuleLoaderCms from "../module/ModuleLoaderCms.vue";

@Component({
  components: {},
})
export default class ItemListItemComp extends Vue {
  @Prop() node!: INodeObject;
  @Prop() isRoot?: boolean;
  itemData = <IItemData>{};
  private beforeValue: any;
  pushModuleSelected: string = "";
  private unsubscribe!: () => void;
  maxHistory: number = 100;
  expanded = true;
  isDragOver = false;
  isDragOverLast = false;
  isCurrent = false;

  static dragItem: ItemListItemComp;

  mounted() {
    // if (!this.node.id) {
    //   this.$set(this, "itemData", {});
    //   return;
    // }
    if (this.checkLoop(this.$parent)) return;
    //

    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = Singleton.itemsRef
      .doc(this.node.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        // console.log(!snap.exists);
        if (!snap.exists) {
          if (this.node.fixedModuleId) {
            MoUtils.updateItem(
              this.node.id,
              MoUtils.createItemData(this.node.fixedModuleId, this.node.opt),
              true);
          }
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
        if (!this.beforeValue) {
          requestAnimationFrame(() => this.onChangeFocusModuleNode());
        }

        this.$set(this, "itemData", itemData);
        this.beforeValue = itemData.value;
      });
  }

  @Watch("$route.query.focus")
  onChangeFocusModuleNode() {
    this.$set(this, "isCurrent", this.$route.query.focus === this.node.id);
    if (this.isCurrent) {
      let via: any = this;
      while (via.hasOwnProperty("expanded")) {
        via.expanded = true;
        via = via.$parent;
      }
      // scroll
      this.$root.$emit("ITEM_LIST_FOCUS", this);
    }
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

  deleteModule() {
    if (!confirm(`削除します`)) return;
    let parent = <ItemListItemComp>this.$parent;
    let value: any = parent.itemData.value.filter((via: INodeObject) => via.id != this.node.id);
    let update = {value: value};
    MoUtils.updateItem(parent.node.id, update);
    MoUtils.addHistory("delete",
      parent.node.id,
      parent.itemData,
      update,
    );
  }

  /**
   * 子要素のorderに準じてソート
   */
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
    this.$router
      .replace({query: {...this.$route.query, focus: this.node.id}})
      .catch(err => {
      });
  }

  onDragstart(e: any) {
    if (!this.$parent.$data.itemData || this.$parent.$data.itemData.type == "group") {
      e.preventDefault();
      return;
    }

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    ItemListItemComp.dragItem = this;
    this.expanded = false;
  }

  onDragend(e: any) {
    // console.log(e.type,e);
  }

  /**
   *
   * @param e
   * @param to
   * @param before
   */
  onDrop(e: any, to?: ItemListItemComp, before?: string) {
    this.isDragOver = false;
    this.isDragOverLast = false;

    if (!to) to = this;

    if (this.isIncludible(to.itemData) && ItemListItemComp.dragItem.node.id != before) {
      let from = <ItemListItemComp>ItemListItemComp.dragItem.$parent;

      //from
      let update = {
        value: from.itemData.value.filter((via: INodeObject) => via.id != ItemListItemComp.dragItem.node.id),
      };
      if (from.node.id != to.node.id) {
        // 別の親の場合、保存 & updateのすり替え
        MoUtils.updateItem(from.node.id, update);
        MoUtils.addHistory("chain",
          from.node.id,
          from.itemData,
          update,
        );
        update = {
          value: [...to.itemData.value],
        };
      }

      // to
      if (before) {
        update.value.some((_node: INodeObject, i: number) => {
          if (before == _node.id) {
            update.value.splice(i, 0, ItemListItemComp.dragItem.node);
            return true;
          }
        });
      } else {
        update.value.push(ItemListItemComp.dragItem.node);
      }

      MoUtils.updateItem(to.node.id, update);
      MoUtils.addHistory("move",
        to.node.id,
        to.itemData,
        update,
      );
    }
  }

  isIncludible(parentItemData: IItemData) {
    return MoUtils.isIncludible(ItemListItemComp.dragItem.itemData.moduleId, parentItemData);
  }

  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }
}
</script>

<style lang="scss">
.item-list-item-comp {
  border-top: 3px solid transparent;
  position: relative;

  &__arrow {
    position: absolute;
    left: -1rem;
  }

  &:hover, &:focus {
    background-color: $color-gray-200 !important;
  }

  &._current {
    background-color: $color-gray-300 !important;
  }

  &__delete {
    min-width: auto;
  }

  &--reference {
    pointer-events: none;
  }

  &[data-drag-over] {
    border-top-color: $color-red;
  }

  &__last {
    position: absolute;
    bottom: 0;
    height: 5px;
    width: 100%;
    border-bottom: 3px solid transparent;

    &[data-drag-over-last] {
      border-bottom-color: $color-red;
    }
  }

  &__empty {
    border: 3px solid transparent;

    &[data-drag-over-last] {
      border-color: $color-red;
      opacity: 0.6;
    }
  }
}
</style>
