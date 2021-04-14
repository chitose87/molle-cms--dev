<template lang="pug">
.add-module-comp.bootstrap(v-if="lsStore.isEditer && this.$route.query.hidden !== 'true'")
  .mt-3.text-right
    span.text-info {{label}}
      b-icon.ml-1.mr-1(icon="box-arrow-in-left")
    form.form-group.form-check-inline(@submit.prevent, @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="key in getModuleList()", :value="key", v-html="key")
      button.btn.btn-sm.btn-info(type="submit") +
</template>

<script lang="ts">
import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";
import {IItemData} from "../interface";
import {lsStore} from "~/store";

@Component({
  components: {},
})
export default class AddModuleComp extends Vue {
  @Prop() itemData!: IItemData;
  @Prop({default: "Add"}) label?: string;
  pushModuleSelected: string = "";
  lsStore = lsStore

  getModuleList() {
    // @ts-ignore
    let moduleOpt = this.$molleModules[this.itemData.moduleId];
    let response: string[] = [];
    if (moduleOpt.white) {
      response = moduleOpt.white;
    } else if (moduleOpt.black) {
      response = Object.keys(this.$molleModules).filter(
        (name: string) => moduleOpt.black!.indexOf(name) == -1,
      );
    }
    if (!this.pushModuleSelected) {
      this.pushModuleSelected = response[0];
    }
    return response;
  }

  pushModule() {
    this.$root.$emit("pushModule", this.pushModuleSelected);
  }
}
</script>

<style lang="scss">
.add-module-comp {
  @include mediaquery-sm {
    display: none;
  }
}

[data-molle="embed"] {
  .add-module-comp {
    display: none;
  }
}
</style>
