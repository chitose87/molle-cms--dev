<template lang="pug">
.add-module-comp.bootstrap(v-if="$route.query.edit && $route.query.hidden !== 'true'")
  .mt-3.text-right
    span.text-info(v-if="label" v-html="label")
      b-icon.ml-1.mr-1(icon="box-arrow-in-left")

    form.form-group.form-check-inline(@submit.prevent v-if="itemData.moduleId" @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="key in moduleList", :value="key", v-html="key")
      button.btn.btn-sm.btn-info(type="submit") +

    //.text-center(v-if="beforeNode||afterNode")
      button.btn.btn-secondary(@click="addClone")
        span Clone

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import {IItemData, INodeObject, ILogsData} from "../interface";

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
  moduleList: string[] = [];
  maxHistory: number = 100;
  private unsubscribe!: () => void;

  mounted() {
    Singleton.itemsRef.doc(this.parentNode.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        this.$set(this, "itemData", snap.data());

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
        this.$set(this, "moduleList", response);
      });
  }

  pushModule() {
    console.log("pushModuleスタート")
    // console.log("pushModule", this.pushModuleSelected)
    if (!this.pushModuleSelected) return;
    let data: IItemData = this.$molleModules[this.pushModuleSelected].def;
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    let updateTime = firebase.firestore.Timestamp.now();
    console.log("updateTime", updateTime)

    // firestoreのlogs登録（子） by青木
    console.log("logsの登録直前")
    Singleton.logsRef.doc(node.id).set({
      history: [{
        timestamp: updateTime,
        uid: firebase.auth().currentUser!.uid
      }]
    });
    console.log("logsの登録直後")

    Singleton.itemsRef
      .doc(node.id).set(data)
      .then(() => {
        if (this.beforeNode) {
          this.itemData.value.some((_node: INodeObject, i: number) => {
            if (this.beforeNode!.id == _node.id) {
              this.itemData.value.splice(i, 0, node);
              return true;
            }
          })
        } else if (this.afterNode) {
          this.itemData.value.some((_node: INodeObject, i: number) => {
            if (this.afterNode!.id == _node.id) {
              this.itemData.value.splice(i + 1, 0, node);
              return true;
            }
          })
        } else {
          this.itemData.value.push(node);
        }
        // firebase
        Singleton.itemsRef.doc(this.parentNode.id)
          .update({
            value: this.itemData.value,
          })
          .then(() => {
            this.$router.push({query: {...this.$route.query, focus: node.id}})
          });

        // firestoreのlogs登録（親） by青木
        Singleton.logsRef.doc(this.parentNode.id)
          .get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            let data = snap.data();
            if (data) {
              let history: ILogsData[] = data.history || [];
              history.unshift({
                timestamp: updateTime,
                uid: firebase.auth().currentUser!.uid,
                update: {
                  value: this.itemData.value
                }
              });
              if (history.length > this.maxHistory) history.length = this.maxHistory;
              Singleton.logsRef.doc(this.parentNode.id).update({history: history});
            }
          })
      })
  }

  addClone() {
    let ba = <INodeObject>this.beforeNode || this.afterNode;
    Singleton.itemsRef.doc(ba.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>snap.data();
        let node: INodeObject = {id: Singleton.itemsRef.doc().id};
        console.log(itemData);
        // itemData.value.forEach
        //todo

        // this.update(node, data);
      });
  }

  /**
   *
   * @param node
   * @param data
   * @private
   */
  private update(node: INodeObject, data: IItemData) {

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
