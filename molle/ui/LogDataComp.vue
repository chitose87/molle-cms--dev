<template lang="pug">
.log-data-comp
  p.log-list-data
    | 更新日時　{{ this.logData.timestamp }}
    br
    | 更新者　{{ this.logData.uid }}
    br
    | ログID　{{ this.logId }}
    br
    | 更新内容　
    span.log-list-data2(v-html="this.logDataUpdate")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject, ILogsData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";

@Component({
  components: {}
})
export default class LogDataComp extends Vue {
  itemId: string = "";
  itemData = <IItemData>{};
  logData = <ILogsData>{};
  @Prop() logId!:string;
  lsStore = lsStore;
  private unsubscribe?: () => void;
  flag = false;
  logDataUpdate: string = "";

  @Watch('logId', {immediate: true})
  onChangeLogsData() {
    console.log("１通過",this.logId)
    this.unsubscribe = Singleton.logsRef.doc(this.logId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
      if (!snap.exists) return;

      this.$set(this,"logData",snap.data());
      console.log("timestampあ",this.logData.timestamp)
      let dateType = Object.prototype.toString.call(this.logData.timestamp);
      if (dateType === "[object Object]") {
          console.log("if文通過")
          this.logData.timestamp = this.logData.timestamp.toDate().toLocaleString({ timeZone: 'Asia/Tokyo' });
      }
      console.log("timestampい",this.logData.timestamp)
      // this.logData.timestamp = this.logData.timestamp.toDate().toLocaleString({ timeZone: 'Asia/Tokyo' });
      console.log("２通過",this.logId,this.logData)

      this.logDataUpdate = JSON.stringify(this.logData.update);
      console.log(this.logDataUpdate)
      this.logDataUpdate = this.logDataUpdate.replace( /{/g , "").replace( /}/g , "").replace( /"/g , "").replace( /,/g , "<br>");
      console.log(this.logDataUpdate)
      console.log("timestampう",this.logData.timestamp)

    });

  }

}
</script>

<style lang="scss">
.log-Data-comp {
}

.hoge {
  z-index: $zindex-modal;
}
</style>
