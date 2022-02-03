<template lang="pug">
.log-property-comp
  button.btn.btn-sm.btn-secondary(@click="init") {{$words.log}}
  div(v-if="logDataList.length")
    ul
      li(v-for="logData in logDataList")
        details
          summary(v-html="getDataStr(logData.timestamp)+'/'+logData.uid")
          div.caption(v-html="getUpdateStr(logData.data)")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IItemData, INodeObject, ILogsData} from "../interface";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import {MoUtils} from "../MoUtils";

@Component({
  components: {},
})
export default class LogPropertyComp extends Vue {
  @Prop() itemId!: string;
  logDataList: ILogsData[] = [];

  init() {
    let list: any[] = [];
    Singleton.logsRef.where("id", "==", this.itemId)
      .get()
      .then((snap: firebase.firestore.QuerySnapshot) => {
        snap.forEach((snap: firebase.firestore.DocumentSnapshot) => {
          let data: any = snap.data();
          data.refId = snap.id;
          list.push(data);
        });

        //sort 降順
        list.sort((a: any, b: any) => {
          return a.timestamp < b.timestamp ? 1 : -1;
        });
        // console.log(list);

        // 全件チェック
        let batchQue: any = [];
        let before = list[0];
        let host: any;
        for (let i = 1; i < list.length; i++) {
          let log = list[i];

          if (before.uid == log.uid && before.timestamp - log.timestamp < 10
            || i >= 100) {
            // 同じユーザーが10秒以内に変更したもの or 100件以上

            // 統合
            if (i < 100) {
              if (!host) host = before;
              host.data = Object.assign(log.data, host.data);
            }
            // listから削除して、logを消す
            list.splice(i, 1);
            batchQue.push({
              cmd: "delete",
              ref: Singleton.logsRef.doc(log.refId),
            });
            i--;
          } else if (host) {
            // 別のユーザーに切り替わる or 10秒以上間がある host更新
            batchQue.push({
              cmd: "update",
              ref: Singleton.logsRef.doc(host.refId),
              data: {data: host.data},
            });
            host = null;
          }

          before = log;
        }

        // batch done
        if (batchQue.length) {
          MoUtils.updateBatch(batchQue);
        }

        this.$set(this, "logDataList", list);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
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
