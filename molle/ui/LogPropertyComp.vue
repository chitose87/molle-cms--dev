<template lang="pug">
.log-property-comp
  .log-body.log-1
    ul.log-list
      li(v-for="logData in history")
        LogDataComp(:logData="logData")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject, ILogsData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";
import LogDataComp from "~/molle/ui/LogDataComp.vue";

@Component({
  components: {LogDataComp}
})
export default class LogPropertyComp extends Vue {
  itemId: string = "";
  itemData = <IItemData>{};
  itemDataBefore = <IItemData>{};
  // @Prop() log!:ILogsData[];
  @Prop() history!:ILogsData[];
  lsStore = lsStore;
  private unsubscribe?: () => void;
  flag = false;

  mounted() {
    console.log("★★LogPropertyComp通過★★",this.history)
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
