<template lang="pug">
  .value-tree-item-comp
    button.btn.btn-sm.btn-outline-secondary
      span id:
      b(v-html="id")
      div(v-if="value")
        div(v-if="value.name")
          span name:
          b(v-html="value.name")
        div
          span type:
          b(v-html="value.type")
        div
          span value:
          span(v-html="value.value")
    .list-group.mt-3(v-if="value && value.childrenId.length")
      .list-group-item.list-group-item-action.pr-0(v-for="item in value.childrenId")
        ValueTreeItemComp(:id="item")

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import {IValueStoreData} from "~/molle/interface/ValueProfile";

  @Component({
    components: {}
  })
  export default class ValueTreeItemComp extends Vue {
    contentStore = contentStore;

    @Prop() id?: string;
    value: IValueStoreData | null = null;

    mounted() {
      this.updateValue();
    }

    @Watch("contentStore.values")
    updateValue() {
      this.value = contentStore.values[this.id!]
    }
  }
</script>

<style lang="scss">
  .value-tree-item-comp {
  }
</style>
