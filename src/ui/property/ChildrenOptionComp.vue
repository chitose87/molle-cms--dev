<template lang="pug">
  .children-option-input.mt-3
    label Children:
    draggable.list-group(
      tag="ul"
      v-model="localValue"
      @update="()=>$emit('change')"
      )
      li.item-list-item-comp.list-group-item.list-group-item-action(
        v-for="item in localValue"
        :key="item"
        )
        span {{item}}

</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {OptionComp} from "~/src/ui/property/OptionComp.ts";
  import draggable from 'vuedraggable'

  @Component({
    components: {draggable}
  })
  /**
   */
  export default class ChildrenOptionComp extends OptionComp {
  }
</script>

<style lang="scss">
</style>
