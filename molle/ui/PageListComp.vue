<template lang="pug">
.page-list-comp
  .list-group
    .item-list-item-comp.list-group-item.list-group-item-action.p-0
      button.btn.btn-sm.btn-link.btn-block.text-left(
      )
        b-icon.ml-n1.mr-1(icon="window")
        b Top Page
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import Index from "~/pages/index.vue";

@Component({
  components: {Index}
})
export default class PageListComp extends Vue {
}
</script>

<style lang="scss">
.page-list-comp {
}
</style>
