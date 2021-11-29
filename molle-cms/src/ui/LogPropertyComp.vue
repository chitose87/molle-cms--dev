<template lang="pug">
.log-property-comp
  button.btn.btn-sm.btn-secondary(@click="init") {{$words.log}}
  div(v-if="logDataList")
    ul
      li(v-for="logData in logDataList.history")
        details
          summary(v-html="getDataStr(logData.timestamp)+'/'+logData.uid")
          div.caption(v-html="getUpdateStr(logData.update)")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IItemData, INodeObject, ILogsData} from "../interface";
import {Singleton} from "../Singleton";
import firebase from "firebase";

@Component({
  components: {},
})
export default class LogPropertyComp extends Vue {
  @Prop() itemId!: string;
  logDataList: ILogsData[] | null = null;

  init() {
    // console.log("★★LogPropertyComp通過★★", this.history)
    console.log(this.itemId);
    Singleton.logsRef.doc(this.itemId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) return;
        // console.log(snap.data());
        this.$set(this, "logDataList", snap.data() || []);
      });
  }

  getDataStr(timestamp: any) {
    if (typeof timestamp === "object") {
      return timestamp.toDate().toLocaleString({timeZone: "Asia/Tokyo"});
    }
    return "---";
  }

  getUpdateStr(data: any) {
    if (data) {
      return JSON.stringify(data)
        .replace(/,/g, "<br>")
        .replace(/:{/g, ":{<br>");
    }
    return "---";
  }
}
</script>

<style lang="scss">
.log-property-comp {
}
</style>
