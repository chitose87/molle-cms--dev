<template lang="pug">
  .value-tree-item-comp
    button.btn.btn-sm.btn-outline-secondary {{(value && value.name) || id}}
    .list-group.mt-3(v-if="value && value.childrenId.length")
      .list-group-item.list-group-item-action.pr-0(v-for="item in value.childrenId")
        ValueTreeItemComp(:id="item")

</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IValue, IValueType, ValueTypes} from "~/molle/interface/Value";

  @Component({
    components: {}
  })
  export default class ValueTreeItemComp extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

    @Prop() id?: string;
    value: IValue | null = null;

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
