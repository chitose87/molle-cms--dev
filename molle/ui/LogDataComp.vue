<template lang="pug">
.log-data-comp
  .log-list-data(v-if="this.logData.timestamp" )
    .log-list-data-title(v-html="'更新日時' + '　' + this.logData.timestamp" @click="isShow=!isShow")
    p.log-list-data-detail(v-if="isShow")
      | 更新者　
      span.log-list-data-uid(v-html="this.logData.uid")
      br
      | 更新内容　
      span.log-list-data-update(v-html="this.logDataUpdate")
      br
      | ログID　{{ this.logId }}

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
      this.logDataUpdate = this.logDataUpdate.replace( /{/g , " ").replace( /}/g , " ").replace( /"/g , "").replace( /,/g , "<br>");

    });
  }
}

</script>

<style lang="scss">
.log-Data-comp {

}

.log-list-data-title:hover {
  opacity: .8;
  cursor: pointer;
}
.log-list-data-title {
  margin-bottom: 0.1rem;
  padding: 0.5rem;
  background-color: #EBE8E4;
}

.log-list-data-detail {
  background-color: #ffffff;
  padding: 0.5rem;
  margin-bottom: 0.1rem;
}

.hoge {
  z-index: $zindex-modal;
}



</style>
