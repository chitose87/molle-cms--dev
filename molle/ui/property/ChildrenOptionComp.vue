<template lang="pug">
.children-option-input.mt-3
  label Children:
  draggable.list-group(
    tag="ul"
    v-model="localValue"
    @update="()=>$emit('change')"
  )
    li.item-list-item-comp.list-group-item.list-group-item-action(
      v-for="node in localValue"
      :key="node.id"
    )
      span(v-if="childlen[node.id]")
        span(v-html="childlen[node.id].moduleId")
        //span(v-html="item")

  // add
  label.mt-3 Add Module
  AddModuleComp(
    :parentNode="{id:$parent.itemId}"
  )

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import {OptionComp} from "~/molle/ui/property/OptionComp.ts";
import draggable from 'vuedraggable'
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject} from "~/molle/interface";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp, draggable}
})
/**
 */
export default class ChildrenOptionComp extends OptionComp {
  @Prop() moduleId!: string;
  private childlen = <{ [key: string]: IItemData }>{};

  created() {
    this.localValue.forEach((node: INodeObject) => {
      Singleton.itemsRef.doc(node.id)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          this.$set(this.childlen, snap.id, snap.data());
        });
    });
  }
}
</script>

<style lang="scss">
</style>
