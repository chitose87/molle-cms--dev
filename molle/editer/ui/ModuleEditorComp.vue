<template lang="pug">
  .module-editor(
    :status="$parent.isEditing()?'show':'hidden'"
    :title="itemData?itemData.moduleId+'/'+itemData.id:''"
  )
    button.toggle.btn.btn-dark(
      @click="lsStore.updateEditing({id:itemData.id})"
      :class="{outerFocus:$parent.$data.outerFocus}"
    ) X
    div.module-editor__body(v-if="$parent.isEditing()")
      b-icon.module-editor__arrow(icon="square-fill")
      div.form-inline.mb-1
        //入れ替え
        button.btn.btn-sm.btn-secondary.mr-2.module-editor__swap-btn(@click="$parent.indexSwap()")
          b-icon(icon="arrow-down-up")

        b(v-html="itemData.moduleId")

        //名前
        input.form-control.form-control-sm.mr-3(type="text" v-model="data.name" @change="update2('name')" placeholder="Name")

        //ID
        label id=
          input.form-control.form-control-sm.mr-3(type="text" v-model="data.tagId" @change="update2('tagId')" placeholder="id")

        //クラス
        label class=
          input.form-control.form-control-sm.mr-3(type="text" v-model="data.tagClass" @change="update2('tagClass')" placeholder="css class")

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

        div.form-inline(v-if="data.type === 'picture'")
          label.mr-2 src:
            input.form-control.form-control-sm(type="text" v-model="data.value.src" )
          label.mr-2 sp:
            input.form-control.form-control-sm(type="text" v-model="data.value.sp" )
          label.mr-2 alt:
            input.form-control.form-control-sm(type="text" v-model="data.value.alt" )

          a.btn.btn-secondary.btn-sm(href="https://console.firebase.google.com/project/"+process.env.projectId+"/storage/"+process.env.storageBucket+"/files~2Fimages?hl=ja" target="_blank")
            span Storage


</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {ValueProfile} from "~/molle/interface/ValueProfile";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
  import {lsStore} from "~/utils/store-accessor";
  import {Singleton} from "~/molle/Singleton";

  @Component({
    components: {StyleComp}
  })
  /**
   */
  export default class ModuleEditorComp extends Vue {
    @Prop() itemOption?: any;
    @Prop() itemData?: IItemStoreData;
    @Prop() valueProfile?: ValueProfile;
    @Prop() styleProfile?: StyleProfile;

    data = <IItemStoreData>{};
    extendsModal: boolean = false;
    extendsList: { [key: string]: IItemStoreData } = {};
    lsStore = lsStore;


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
    &:before {
      content: "";
      position: absolute;
      top: -0.5rem;
      left: -0.5rem;
      width: 100%;
      height: 100%;
      border: 0.5rem solid var(--orange);
      border-radius: 0.5rem;
      box-sizing: content-box;
      pointer-events: none;
    }

    //z-index: $zindex-fixed - 1;

    &[status=hidden] {
      &:before {
        visibility: hidden;
      }

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
      /*position: relative;*/
      //top: 100%;
      //z-index: $zindex-fixed;
      margin-bottom: 0.5rem;
      margin-left: -1rem;
      margin-right: -1rem;

      .toggle {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        z-index: 1;
      }
    }

    &__body {
      background-color: var(--orange);
      padding-bottom: 0.75rem;
      margin-bottom: 0.5rem;
      position: relative;
    }

    &__arrow {
      color: var(--orange);
      position: absolute;
      bottom: -0.5em;
      left: 2rem;
      transform: rotate(45deg);
      font-size: 11px;
    }

    &--box {
      &:before {
        border-color: var(--teal);
      }

      .module-editor__body {
        background-color: var(--teal);
      }

      .module-editor__arrow {
        color: var(--teal);
      }
    }
  }
</style>
