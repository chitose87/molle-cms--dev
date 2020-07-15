<template lang="pug">
  .module-editor(:status="isEdit?'show':'hidden'")
    button.toggle.btn.btn-dark(
      @click="isEdit=!isEdit"
      :class="{outerFocus:outerFocus}"
    ) X
    div.p-2.module-editor__body(v-if="isEdit")
      b-icon.module-editor__arrow(icon="square-fill")
      div.form-inline.mb-1
        //入れ替え
        button.btn.btn-sm.btn-secondary.mr-2.module-editor__swap-btn(@click="$parent.indexSwap()")
          b-icon(icon="arrow-down-up")

        b(v-html="itemData.moduleId")

        //名前
        input.form-control.form-control-sm.mr-3(type="text" v-model="data.name" @change="update2('name')" placeholder="Name")

        span.mr-1.text-white(v-html="itemData.id")

        //削除
        button.btn.btn-sm.btn-danger.mr-3(@click="$parent.deleteModule()") 削除

        // todo visible 設定を足す
      div.mb-1.form-inline
        component.mr-3(v-for="item in itemOption"
          :is="item.name"
          :key="item.name"
          :profile="item"
          :itemData="itemData"
        )

      StyleComp.mb-1(:itemData="itemData" :styleProfile="styleProfile")

      //value
      //p Extends:
        span(v-html="data.extends?data.extends.id:'継承なし'")
        button(@click="openExtendsModal()") 変更
        b-modal(v-model="extendsModal" centered="" title="Change Extends")
          div(v-if="extendsModal")
          .list-group-flush
            button.list-group-item.list-group-item-action(@click="closeExtendsModal(null)")
              span 継承なし
            button.list-group-item.list-group-item-action(v-for="(item,key) in extendsList" @click="closeExtendsModal(item)")
              span(v-html="item.value")
              | /
              span(v-html="item.name||`[ ${key} ]`")
              //span(v-html="item.extends.")?

        //p type {{data.type}}
        //label type
          select(v-model="data.type" )
            option(v-for="(item,key) in valueTypes" :value="key" v-html="item.label")
      form.w-100.form-group.m-0(@submit.prevent @change="update()")
        div(v-if="data.type === 'text'")
          div(v-if="data.superValue")
            span superValue=
            span(v-html="data.superValue")
          textarea.form-control(v-model="data.value")

        input(v-if="data.type === 'number'" type="number" v-model="data.value" )
        textarea(v-if="data.type === 'html'" v-model="data.value" )

        div(v-if="data.type === 'img'" :func="typeof data.value=='object'?false:data.value={}")
          label src:
            input(type="text" v-model="data.value.src" )
          label sp:
            input(type="text" v-model="data.value.sp" )
          label alt:
            input(type="text" v-model="data.value.alt" )


</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {ValueProfile} from "~/molle/interface/ValueProfile";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {StyleComp}
  })
  /**
   */
  export default class ModuleEditorComp extends Vue {
    isEdit = false;
    outerFocus: boolean = false;

    @Prop() itemOption?: any;
    @Prop() itemData?: IItemStoreData;
    @Prop() valueProfile?: ValueProfile;
    @Prop() styleProfile?: StyleProfile;

    data = <IItemStoreData>{};
    extendsModal: boolean = false;
    extendsList: { [key: string]: IItemStoreData } = {};

    created() {
      this.changeItemData();
    }

    @Watch("itemData")
    changeItemData() {
      this.$set(this, "data", this.itemData);
    }

    openExtendsModal() {
      //   let list: { [key: string]: IItemStoreData } = {};
      //   // console.log(this.itemData)
      //   for (let id in Singleton.store.items) {
      //     let item = Singleton.store.items[id];
      //     // console.log("--------------", item, this.valueProfile!.types);
      //     a:for (let i of this.valueProfile!.types) {
      //       // console.log(i)
      //       if (i.val == item.type) {
      //         //not self & parents
      //         let viaId = id;
      //         while (viaId) {
      //           // console.log(viaId, this.itemData)
      //           if (this.itemData!.id.path.indexOf(viaId) >= 0) {
      //             continue a;
      //           }
      //           if (Singleton.store.items[viaId].extends) {
      //             viaId = Singleton.store.items[viaId].extends.id;
      //           } else {
      //             break;
      //           }
      //         }
      //         list[id] = item;
      //         break;
      //       }
      //     }
      //   }
      //   this.extendsList = list;
      //   this.extendsModal = true;
    }

    closeExtendsModal(itemData?: IItemStoreData) {
      //   this.extendsModal = false;
      //   // console.log(this.itemData!.id, itemData)
      //   FirestoreMgr.itemUpdate(this.itemData!.id, {extends: itemData ? itemData!.id : null})
    }

    update() {
      let update: any = {
        name: this.data.name || "",
        type: this.data.type,
        // updateTime: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (this.data.value) update.value = this.data.value;
      // this.itemData!.id.update(update);

      FirestoreMgr.itemUpdate(this.itemData!.id, update)
    }

    update2(key: string) {
      let update: any = {};
      //@ts-ignore
      update[key] = this.data[key];
      FirestoreMgr.itemUpdate(this.itemData!.id, update);
    }
  }
</script>

<style lang="scss">
  .module-editor {
    &[status=hidden] {
      position: absolute;
      //z-index: $zindex-fixed - 1;
      top: -0.5rem;
      left: -0.5rem;
      width: calc(100% + 1rem);
      height: calc(100% + 1rem);

      .toggle {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;

        &:hover, &.outerFocus {
          opacity: 0.1;
        }
      }
    }

    &[status=show] {
      position: relative;
      //top: 100%;
      //z-index: $zindex-fixed;
      /*border: 1px solid gray;*/
      background-color: var(--teal);
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;

      .toggle {
        position: absolute;
        top: 0rem;
        right: 0rem;
      }
    }

    &__arrow {
      color: var(--teal);
      position: absolute;
      bottom: -0.5em;
      left: 2rem;
      transform: rotate(45deg);
      font-size: 11px;
    }
  }
</style>
