<template lang="pug">
.log-data-comp
  p.log-list-data
    | {{ this.logId }}<br>
    | {{ this.MapData }}

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
  LogData = <ILogsData>{};
  itemDataBefore = <IItemData>{};
  @Prop() logId!:string;
  lsStore = lsStore;
  private unsubscribe?: () => void;
  flag = false;
  MapData = {};

  @Watch('logId', {immediate: true})
  onChangeLogsData() {
    console.log("１通過")
    this.unsubscribe = Singleton.logsRef.doc(this.logId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
      if (!snap.exists) return;

      this.LogData = <ILogsData>snap.data();
      let dateType = Object.prototype.toString.call(this.LogData.timestamp);
      if (dateType === "[object Object]") {
          console.log("if文通過")
          this.LogData.timestamp = this.LogData.timestamp.toDate().toLocaleString({ timeZone: 'Asia/Tokyo' });
      }
      console.log("２通過",this.LogData)
      console.log("２通過",this.LogData)

      let MapData2 = {
        "itemId":this.LogData.itemId,
        "timestamp":this.LogData.timestamp,
        "update":this.LogData.update
      }
      console.log("MapData2",MapData2)
      console.log("MapDataあ",this.MapData)
      this.MapData = MapData2
      console.log("MapDataい",this.MapData)

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
