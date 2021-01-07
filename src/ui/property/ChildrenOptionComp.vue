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
        span(v-if="obj[item]")
          span(v-html="obj[item].moduleId")
          //span(v-html="item")

    // add
    label.mt-3 Add Module
    form.form-group.d-flex.justify-content-between.mb-0.mr-2(@submit.prevent @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="key in getModuleList()" :value="key" v-html="key")
      button.btn.btn-sm.btn-info(type="submit") +

</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {OptionComp} from "~/src/ui/property/OptionComp.ts";
  import draggable from 'vuedraggable'
  import {molleModules} from "~/plugins/Modules";
  import {Singleton} from "~/src/Singleton";
  import firebase from "firebase";
  import {lsStore} from "~/utils/store-accessor";
  import {IItemData} from "~/src/interface";

  @Component({
    components: {draggable}
  })
  /**
   */
  export default class ChildrenOptionComp extends OptionComp {
    @Prop() moduleId!: string;
    pushModuleSelected: string = "";
    private obj = <{ [key: string]: IItemData }>{};

    created() {
      console.log(this.localValue)
      this.localValue.forEach((id: string) => {
        Singleton.itemsRef.doc(id)
          .get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            this.$set(this.obj, snap.id, snap.data());
          });
      });
    }

    getModuleList() {
      let moduleList: string[] = [];
      // @ts-ignore
      let moduleOpt = molleModules[this.moduleId];
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
      // @ts-ignore
      let data: IItemStoreData = molleModules[this.pushModuleSelected].def;

      Singleton.itemsRef.add(data)
        .then((docRef: firebase.firestore.DocumentReference) => {
          this.localValue.push(docRef.id);
          this.$emit('change');
          lsStore.update({key: "focusModuleId", value: docRef.id});
        });
    }
  }
</script>

<style lang="scss">
</style>
