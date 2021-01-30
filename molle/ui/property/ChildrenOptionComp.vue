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
    form.form-group.d-flex.justify-content-between.mb-0.mr-2(@submit.prevent @submit="pushModule(pushModuleSelected)")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="key in getModuleList()" :value="key" v-html="key")
      button.btn.btn-sm.btn-info(type="submit") +

</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {OptionComp} from "~/molle/ui/property/OptionComp.ts";
  import draggable from 'vuedraggable'
  import {Singleton} from "~/molle/Singleton";
  import firebase from "firebase";
  import {lsStore} from "~/utils/store-accessor";
  import {IItemData} from "~/molle/interface";
  import {molleModules} from "~/molle/module";

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
      this.localValue.forEach((id: string) => {
        Singleton.itemsRef.doc(id)
          .get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            this.$set(this.obj, snap.id, snap.data());
          });
      });

      //
      this.$root.$on("pushModule", this.pushModule);
    }

    getModuleList() {
      // @ts-ignore
      let moduleOpt = molleModules[this.moduleId];
      let response: string[] = [];
      if (moduleOpt.white) {
        response = moduleOpt.white;
      } else if (moduleOpt.black) {
        response = Object.keys(molleModules).filter((name: string) => moduleOpt.black!.indexOf(name) == -1);
      }
      if (!this.pushModuleSelected) {
        this.pushModuleSelected = response[0];
      }
      return response;
    }

    pushModule(pushModuleSelected: string) {
      if (!pushModuleSelected) return;
      // @ts-ignore
      let data: IItemStoreData = molleModules[pushModuleSelected].def;

      Singleton.itemsRef.add(data)
        .then((docRef: firebase.firestore.DocumentReference) => {
          this.localValue.push(docRef.id);
          this.$emit('change');
          lsStore.update({key: "focusModuleId", value: docRef.id});
        });
    }

    beforeDestroy() {
      console.log("beforeDestroy")
      this.$root.$off("pushModule", this.pushModule);
    }
  }
</script>

<style lang="scss">
</style>
