<template lang="pug">
.log-data-comp
  .log-list-data(v-if="logData.timestamp" )
    .log-list-data-title(v-html="'timestamp' + '　' + logData.timestamp" @click="isShow=!isShow")
    .p-2(v-if="isShow")
      p.mb-0
        | uid　
        span.log-list-data-uid(v-html="logData.uid")
      p.mb-0(v-if="logDataUpdate")
        | update　
        span.log-list-data-update(v-html="logDataUpdate")
      p.mb-0
        | logId　{{ logId }}

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
  isShow = false;

  @Watch('logId', {immediate: true})
  onChangeLogsData() {
    this.unsubscribe = Singleton.logsRef.doc(this.logId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
      if (!snap.exists) return;

      this.$set(this,"logData",snap.data());
      if (this.logData.timestamp) {
          this.logData.timestamp = this.logData.timestamp.toDate().toLocaleString({ timeZone: 'Asia/Tokyo' });
      }
      this.logDataUpdate = JSON.stringify(this.logData.update);
      if (this.logDataUpdate) {
        this.logDataUpdate = this.logDataUpdate.replace( /{/g , " ").replace( /}/g , " ").replace( /"/g , "").replace( /,/g , "<br>");
      }
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
