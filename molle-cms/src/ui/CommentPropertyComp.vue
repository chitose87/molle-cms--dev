<template lang="pug">
.comment-property-comp
  button.btn.btn-sm.btn-block.btn-outline-secondary.d-flex.justify-content-between(
    @click="toggle.show=!toggle.show"
  )
    span Comment
    b-icon(:icon="toggle.show?'chevron-up':'chevron-down'")

  div(v-if="toggle.show")
    // add
    button.btn.btn-primary.btn-sm.mt-2(@click="toggle.add=true" id="addPop")
      span コメントを追加
    b-popover(
      target="addPop"
      triggers="focus"
      :show.sync="toggle.add"
      placement="top"
      container="bootstrap-container"
    )
      TextAreaQuill(
        :label="'Comment:'"
        v-model="addData.msg"
      )
      button.btn.btn-primary.btn-block.btn-sm.mt-n3(@click="add")
        span
          b-icon(icon="plus")
          | 追加

    // Comment list
    .card.mt-2.p-2(v-for="(item,commentId) in commentList" v-if="item.data && item.data.status!='close'")
      // Comment
      div(v-if="item.data")
        .mb-2(v-html="item.data.msg")
        hr
        .mb-2(v-for="reply in item.data.reply")
          .d-flex
            b-icon.ml-n1.mr-1(icon="reply" style="transform: scaleY(-1);")
            span.small.caption.mr-3.mt-0.mb-0(v-html="$getUser(reply.author).name")
            span.small.caption.ml-auto.mt-0.mb-0(
              v-html="$dateFormatter(reply.timestamp.toDate(),'YYYY/MM/DD')"
              :title="$dateFormatter(reply.timestamp.toDate(),'hh:mm')"
            )
          div(v-html="reply.msg")

        .d-flex
          button.btn.btn-outline-secondary.btn-sm(@click="resolve(commentId)")
            b-icon(icon="check2-square")
            span 解決にする
          button.btn.btn-outline-primary.btn-sm.ml-auto(@click="toggle.reply=!toggle.reply")
            b-icon(icon="reply")
            span 返信
        // reply
        div(v-if="toggle.reply")
          hr
          TextAreaQuill(
            :label="'Reply :'"
            v-model="item.msg"
          )
          .d-flex
            button.btn.btn-primary.btn-sm.ml-auto(@click="reply(commentId)")
              //b-icon(icon="send")
              span 送信
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import ModuleLoaderCms from "../module/ModuleLoaderCms.vue";
import TextAreaQuill from "./property/TextAreaQuill.vue";
import {Singleton} from "../Singleton";
import {MoUtils} from "../MoUtils";
import {IItemData} from "../interface";
import firebase from "firebase";

@Component({
  components: {TextAreaQuill},
})
export default class CommentPropertyComp extends Vue {
  @Prop() itemData!: IItemData;
  @Prop() itemId!: string;
  toggle = {
    show: false,
    add: false,
    reply: false,
  };
  replyId = "";
  addData = {
    msg: "",
    createTime: <any>"",
    author: "",
    holder: "",
    itemId: "",
    status: "new",
  };
  commentList: {
    [key: string]: {
      data: {},
      msg: "",
      unsubscribe: () => void
    }
  } = {};

  mounted() {
  }

  @Watch("toggle.show")
  showChange() {
    if (this.toggle.show) this.change();
  }

  @Watch("itemData.comment", {immediate: true})
  change() {
    if (this.toggle.show) {
      for (let commentId in this.itemData.comment) {
        if (this.commentList[commentId]) continue;

        let head = this.itemData.comment[commentId];
        if (head.status == "close") continue;

        let data: any = {};
        data.unsubscribe = Singleton.systemDocRef.collection(`comment`)
          .doc(commentId)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            this.$set(this.commentList[commentId], "data", snap.data());
          });
        this.$set(this.commentList, commentId, data);
      }
    }
  }

  /**
   * commentを追加
   */
  add() {
    let ref = Singleton.systemDocRef.collection(`comment`);
    let id = ref.doc().id;
    this.addData.createTime = firebase.firestore.FieldValue.serverTimestamp();
    this.addData.author = firebase.auth().currentUser!.uid;
    this.addData.holder = "";
    this.addData.itemId = this.itemId;
    // this.addData.reply = [];
    let update: any = {comment: JSON.parse(JSON.stringify(this.itemData.comment))};
    update.comment[id] = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let batchQue: any = [];
    batchQue.push({
      cmd: "set",
      ref: ref.doc(id),
      data: this.addData,
    });
    batchQue.push({
      cmd: "update",
      ref: Singleton.itemsRef.doc(this.itemId),
      data: update,
    });
    // commit
    MoUtils.updateBatch(batchQue).then(() => {
      this.$set(this.addData, "msg", "");
      this.toggle.add = false;
    });
  }

  /**
   * 返信
   */
  reply(commentId: string) {
    if (!this.commentList[commentId].msg) return alert("空です");

    Singleton.systemDocRef.collection(`comment`)
      .doc(commentId)
      .update({
        reply: firebase.firestore.FieldValue.arrayUnion({
          msg: this.commentList[commentId].msg,
          timestamp: firebase.firestore.Timestamp.now(),
          author: firebase.auth().currentUser!.uid,
        }),
      })
      .then(() => {
        this.toggle.reply = false;
        this.commentList[commentId].msg = "";
      });
  }

  /**
   * 解決にする
   */
  resolve(commentId: string) {
    let update: any = {comment: JSON.parse(JSON.stringify(this.itemData.comment))};
    delete update.comment[commentId];
    MoUtils.updateBatch([
      {
        cmd: "update",
        ref: Singleton.itemsRef.doc(this.itemId),
        data: update,
      },
      {
        cmd: "update",
        ref: Singleton.systemDocRef.collection(`comment`)
          .doc(commentId),
        data: {
          status: "close",
          reply: firebase.firestore.FieldValue.arrayUnion({
            msg: "Close",
            timestamp: firebase.firestore.Timestamp.now(),
            author: firebase.auth().currentUser!.uid,
          }),
        },
      },
    ]).then(() => {
      this.$set(this.addData, "msg", "");
      this.toggle.add = false;
    });
  }
}
</script>

<style lang="scss">
.comment-property-comp {
}
</style>
