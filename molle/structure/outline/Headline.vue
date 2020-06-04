<template lang="pug">
  .module
    component(
      :is="lv"
      :class="styleParam.getClass({})"
      v-html="valueData.value || valueData.superValue"
    )
    //span {{itemData.id}}
    //span {{itemData.valueRef}}
    //span {{itemData.moduleId}}

    .editer(:status="isEdit?'show':'hidden'")
      button.toggle(@click="isEdit=!isEdit") 閉じる
      div(v-if="isEdit")
        //index
        form(@submit.prevent="itemData.ref.update({index:Number.parseFloat(itemData.index)})")
          label index
            input(type="number" v-model="itemData.index")
          button.btn.btn-link(type="submit") done

        ValueComp(:valueData="valueData" :types="types")
        StyleComp(:itemData="itemData" :styleParam="styleParam")

        div
          select(v-model="lv")
            option h1
            option h2
            option h3
            option h4
            option h5
            option h6

        button.btn.btn-danger(@click="deleteModule()") 削除
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IPageItem, IPageItemType} from "~/molle/interface/Page";
  import {IValue, IValueType, ValueTypes} from "~/molle/interface/Value";
  import ValueComp from "~/components/ValueComp.vue";
  import StyleComp from "~/components/StyleComp.vue";
  import {StyleAlign, StyleParam} from "~/molle/structure/StyleParam";

  @Component({
    components: {StyleComp, ValueComp}
  })
  export default class Headline extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

    @Prop() itemData?: IPageItem;
    readonly types: IValueType[] = [ValueTypes.text];
    styleParam: StyleParam = new StyleParam({
      border: false,
      align: StyleAlign.None,
      theme: {default: "", select: ["", "test"]},
      color: {default: "", select: ["", "dark"]},
    });

    unsubscribes: (() => void)[] = [];
    isEdit = true;
    valueData: IValue = {ref: {}};
    lv: string = "h3";

    mounted() {
      // console.log("mounted", this.itemData!.ref.id)

      this.valueData.ref = this.itemData!.ref.parent.parent.collection("values").doc(this.itemData!.ref.id);
      this.valueData.ref.get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            this.valueData.ref.set({
              type: this.types[0].val
            });
          } else {
            let data = snap.data();
            if (!data!.type || this.types.every((type) => type.val != data!.type)) {
              this.valueData.ref.update({
                type: this.types[0].val
              });
            }
          }
        });

      this.changeContentStore();
    }

    updateItemData(key: IPageItemType) {
      let updateData: IPageItem = <IPageItem>{};
      updateData[key] = this.itemData![key];

      this.itemData!.ref.update(updateData);
    }

    /**
     *
     * @param newer
     * @param older
     */
    // @Watch("itemData")
    @Watch("contentStore.values")
    changeContentStore() {
      // console.log("changeContentStore", contentStore.values[this.itemData!.ref.id]);
      let v = Object.assign({}, contentStore.values[this.itemData!.ref.id]);
      v.ref = this.valueData.ref;
      this.valueData = v;
    }

    deleteModule() {
      contentStore.removeValue(this.valueData.ref.id);
      this.itemData!.ref.delete();
      this.valueData!.ref.delete();
    }

    destroyed() {
      while (this.unsubscribes.length) {
        this.unsubscribes.shift()!();
      }
    }
  }
</script>

<style lang="scss">
  .module {
    position: relative;

    .test {
      width: 50%;
      margin: auto;
    }

    .dark {
      background-color: $black;
      color: $white;
    }
  }

  .editer-h {
    position: absolute;

    &[status=hidden] {
      z-index: $zindex-fixed - 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .toggle {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;

        &:hover {
          opacity: 0.1;
        }
      }
    }

    &[status=show] {
      z-index: $zindex-fixed;
      border: 1px solid gray;
      padding: 1rem;
      background-color: lightblue;
    }
  }
</style>
