<template lang="pug">
.log-property-comp
  button.btn.btn-sm.btn-secondary(@click="init") ログ
  div(v-if="logDataList")
    //span.mt-2(@click="isShow=!isShow") ログ
    ul
      li(v-for="logData in logDataList.history")
        //span(v-html="logData.uid")
        LogDataComp(:logData="logData")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import {IItemData, INodeObject, ILogsData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";
import LogDataComp from "~/molle/ui/LogDataComp.vue";

@Component({
  components: {LogDataComp}
})
export default class LogPropertyComp extends Vue {
  // itemId: string = "";
  itemData = <IItemData>{};
  itemDataBefore = <IItemData>{};
  // @Prop() log!:ILogsData[];
  // @Prop() history!: ILogsData[];
  @Prop() itemId!: string;

  private unsubscribe?: () => void;
  flag = false;
  isShow = false;

  logDataList: ILogsData[] | null = null;

  init() {
    // console.log("★★LogPropertyComp通過★★", this.history)
    console.log(this.itemId)
    Singleton.logsRef.doc(this.itemId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) return;
        console.log(snap.data())
        this.$set(this, "logDataList", snap.data() || []);
      })
  }

}
</script>

<style lang="scss">
.log-property-comp {
}

.hoge {
  z-index: $zindex-modal;
}
</style>
