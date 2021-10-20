<template lang="pug">
.add-module-comp.bootstrap(v-if="$route.query.edit && checkView()")
  .mt-3.text-right
    span.text-info(v-if="label" v-html="label")
      b-icon.ml-1.mr-1(icon="box-arrow-in-left")

    form.form-group.form-check-inline(@submit.prevent v-if="itemData.moduleId" @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="item in moduleList", :value="item.ref.CLASS_NAME", v-html="item.ref.CLASS_NAME")
      button.btn.btn-sm.btn-info(type="button" @click="pushModule()") +

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import firebase from "firebase";
import {IItemData, INodeObject, ILogsData} from "../interface";
import {Singleton} from "../Singleton";
import {MoUtils} from "../MoUtils";

@Component({
  components: {},
})
export default class AddModuleComp extends Vue {
  @Prop() label?: string;
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;
  pushModuleSelected: string = "";

  itemData = <IItemData>{};
  moduleList: any[] = [];
  maxHistory: number = 100;
  private unsubscribe!: () => void;

  checkView() {
    if (
      (this.$route.query.focus == this.parentNode.id) ||
      (!this.itemData.value || !this.itemData.value.length)) {
      return true;
    }

    for (let i in this.itemData.value) {
      if (this.$route.query.focus == this.itemData.value[i].id) {
        return true;
      }
    }
    return false;
  }

  mounted() {
    Singleton.itemsRef.doc(this.parentNode.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        this.$set(this, "itemData", snap.data());

        // @ts-ignore
        let moduleOpt = this.$molleModules[this.itemData.moduleId];
        let response: any[] = [];

        if (this.itemData.dev && this.itemData.dev.enabled) {
          // 限定
          for (let i in this.itemData.dev.enabled) {
            response.push(this.$molleModules[this.itemData.dev.enabled[i]]);
          }
        } else if (moduleOpt.white) {
          // ホワイトリスト
          for (let i in moduleOpt.white) {
            response.push(this.$molleModules[moduleOpt.white[i].CLASS_NAME]);
          }
        } else if (moduleOpt.black) {
          // ブラックリスト
          response = this.$molleModuleList.filter((item: any) => {
            for (let i in moduleOpt.black) {
              // @ts-ignore
              if (item.ref.CLASS_NAME == moduleOpt.black[i].CLASS_NAME) {
                return false;
              }
            }
            return true;
          });
        } else {
          response = this.$molleModuleList;
        }
        if (!this.pushModuleSelected) {
          this.pushModuleSelected = response[0].ref.CLASS_NAME;
        }
        this.$set(this, "moduleList", response);
      });
  }

  /**
   *
   */
  private pushModule() {
    console.log("pushModule", this.pushModuleSelected);
    if (!this.pushModuleSelected) return;
    let data: IItemData = MoUtils.createItemData(this.pushModuleSelected);
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};

    MoUtils.updateItem(node.id, data, true);

    //parent
    let update = {value: this.itemData.value.concat()};
    if (this.beforeNode) {
      update.value.some((_node: INodeObject, i: number) => {
        if (this.beforeNode!.id == _node.id) {
          update.value.splice(i, 0, node);
          return true;
        }
      });
    } else if (this.afterNode) {
      update.value.some((_node: INodeObject, i: number) => {
        if (this.afterNode!.id == _node.id) {
          update.value.splice(i + 1, 0, node);
          return true;
        }
      });
    } else {
      update.value.push(node);
    }

    //
    MoUtils.updateItem(this.parentNode.id, update)
      .then(() => {
        this.$router.push({query: {...this.$route.query, focus: node.id}});
      });
    MoUtils.addHistory("create",
      this.parentNode.id,
      this.itemData,
      update,
    );
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
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
