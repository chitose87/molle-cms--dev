<template lang="pug">
.log-data-comp
  .log-list-data(v-if="logData.timestamp" )
    button.btn.btn-sm.btn-outline-secondary(v-html="'timestamp' + '　' + logData.timestamp" @click="isShow=!isShow")
    .p-2(v-if="isShow")
      p.mb-0
        | uid　
        span.log-list-data-uid(v-html="logData.uid")
      p.mb-0(v-if="logDataUpdate")
        | update　
        span.log-list-data-update(v-html="logDataUpdate")
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IItemData, INodeObject, ILogsData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";

@Component({
  components: {}
})
export default class LogDataComp extends Vue {
  itemId: string = "";
  itemData = <IItemData>{};
  @Prop() logData!: ILogsData;
  private unsubscribe?: () => void;
  flag = false;
  logDataUpdate: string = "";
  isShow = false;

  @Watch('logData', {immediate: true})
  onChangeLogsData() {
    if (typeof this.logData.timestamp === "object") {
      this.logData.timestamp = this.logData.timestamp.toDate().toLocaleString({timeZone: 'Asia/Tokyo'});
    }
    if (this.logData.update) {
      this.logDataUpdate = JSON.stringify(this.logData.update);
      this.logDataUpdate = this.logDataUpdate.replace(/,/g, "<br>");
      // this.logDataUpdate = this.logDataUpdate.replace(/{/g, " ").replace(/}/g, " ").replace(/"/g, "").replace(/,/g, "<br>");
    }
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
