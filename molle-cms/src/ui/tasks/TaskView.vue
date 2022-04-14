<template lang="pug">
div(v-if="$route.query.id && taskMetaData")
  .modal(:aria-expanded="!!$route.query.id")
    .modal__fiexd
      .modal__close(@click="$router.replace({query: {}})")
      .modal__body.bootstrap
        // title
        label.form-inline
          span.mr-2 {{opt.dt.title.jp}}:
          input.form-control(type="text" v-model="taskMetaData.title" @change="update('meta','title')")

        // 担当者
        label.form-inline
          span.mr-2 担当者:
          select.form-control(v-model="taskMetaData.holder")
            option(value="") 未設定
            option(v-for="(item,key) in users" :value="key" v-html="item.name")

        //limitDate
        label.form-inline
          span.mr-2 {{opt.dt.limitDate.jp}}:
          input.form-control(type="date" v-model="taskMetaData.limitData" @change="update('meta','limitDate')")

        // description
        div(v-html="taskBodyData.description")
        //TextAreaQuill(
        //  :label="opt.dt.description.jp+':'"
        //  v-model="taskBodyData.description"
        //  @change="update('body','description')"
        //  :toolbar="'full'"
        //)
        hr
        div(v-for="comment in commentData")
          div(v-html="comment.body")
          p {{comment.author}}
          p(v-if="comment.timestamp && comment.timestamp.toDate") {{comment.timestamp.toDate().toLocaleString({timeZone: "Asia/Tokyo"})}}

        hr

        TextAreaQuill(
          :label="'コメント:'"
          v-model="addCommentData.body"
          :toolbar="'full'"
        )
        .d-flex
          div
          button.btn-primary(@click="addComment")
            span
              b-icon(icon="plus")
        //.d-flex
          button.btn-primary(@click="addSave")
            span
              b-icon(icon="plus")
              | 保存
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop, Emit,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "../../Singleton";
import TextAreaQuill from "../property/TextAreaQuill.vue";
import TasksList, {ITaskMetaData, ITaskBodyData} from "./TasksList.vue";
import {MoUtils} from "../../MoUtils";

@Component({
  components: {TextAreaQuill},
})
export default class TaskView extends Vue {

  @Prop() metaData!: any;
  @Prop() users!: any;
  opt = {
    dt: TasksList.dt,
    dtOrder: TasksList.dt.arr,
  };
  commentData = [];
  addCommentData = {
    body: "",
    taskId: "",
    timestamp: <any>null,
    author: "",
  };

  unsubscribe?: () => void;
  taskMetaData = <ITaskMetaData>{};
  taskBodyData = <ITaskBodyData>{};

  head() {
    return {
      title: "[TASK]" + process.env.title,
    };
  }

  created() {

  }

  @Watch("$route.query.id")
  updateValue() {
    this.$set(this, "taskMetaData", this.metaData[<string>this.$route.query.id]);
    if (this.unsubscribe) this.unsubscribe();
    if (!this.$route.query.id) return;

    let unsubscribe1 = TasksList.tasksBodyRef.doc(<string>this.$route.query.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        this.$set(this, "taskBodyData", snap.data());
      });

    let unsubscribe2 = TasksList.tasksBodyRef.where("taskId", "==", this.$route.query.id)
      .onSnapshot((snap: firebase.firestore.QuerySnapshot) => {
        let arr: any = [];
        snap.forEach((snap: firebase.firestore.DocumentSnapshot) => {
          let data: any = snap.data();
          arr.push(data);
        });
        this.$set(this, "commentData", arr);
      });

    this.unsubscribe = () => {
      unsubscribe1();
      unsubscribe2();
    };
  }

  /**
   *
   */
  update(doc: string, field: string) {
    let que: any = {
      cmd: "update",
      data: {},
    };
    if (doc == "meta") {
      que.ref = TasksList.tasksMetaRef.doc(<string>this.$route.query.id);
      que.data[field] = this.metaData[<string>this.$route.query.id][field];
    } else {
      que.ref = TasksList.tasksBodyRef.doc(<string>this.$route.query.id);
      //@ts-ignore
      que.data[field] = this.taskBodyData[field];
    }

    let batchQue: any = [que];

    MoUtils.updateBatch(batchQue);
  }

  /**
   *
   */
  addComment() {
    let batchQue: any = [];
    this.addCommentData.taskId = <string>this.$route.query.id;
    this.addCommentData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.addCommentData.author = firebase.auth().currentUser!.uid;
    let id = TasksList.tasksBodyRef.doc().id;
    batchQue.push({
      cmd: "set",
      ref: TasksList.tasksBodyRef.doc(id),
      data: this.addCommentData,
    });
    MoUtils.updateBatch(batchQue)
      .then(() => {
        this.$set(this, "addCommentData", {body: ""});
      });
  }
}
</script>

<style lang="scss">
</style>
