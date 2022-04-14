<template lang="pug">
.molle-sys-ui.bootstrap
  MolleBase(v-model="isLogin")
  div(v-if="isLogin")
    .container-fluid
      table.table
        thead
          tr
            th(v-for="key in opt.dtOrder")
              span(v-html="opt.dt[key].jp")
        tbody
          tr(v-for="id in data.metaData.arr" @click="$router.replace({query: {id:id}})")
            td(v-for="key in opt.dtOrder")
              span(v-for="item in [data.metaData[id][key]]")
                span(v-if="key=='holder'" v-html="opt.users[item]?opt.users[item].name:''")
                span(v-else-if="item && item.toDate" v-html="item.toDate().toLocaleString({timeZone: 'Asia/Tokyo'})")
                span(v-else v-html="item")

      // 追加UI
      .fixed-bottom.d-flex(v-if="!isShow && !$route.query.id")
        input.form-control(
          type="text"
          v-model="addMetaData.title"
          :placeholder="opt.dt.title.jp"
        )
        div
          label.form-inline
            //span 担当者
            select.form-control(v-model="addMetaData.holder")
              option(value="") 未設定
              option(v-for="(item,key) in opt.users" :value="key" v-html="item.name")

        button.btn-primary(@click="isShow=true")
          span
            b-icon(icon="plus")

    // 追加モーダル
    div(v-if="isShow")
      .modal(:aria-expanded="isShow")
        .modal__fiexd
          .modal__close(@click="isShow=!isShow")
          .modal__body.bootstrap
            // title
            label.form-inline
              span.mr-2 {{opt.dt.title.jp}}:
              input.form-control(type="text" v-model="addMetaData.title")

            // 担当者
            label.form-inline
              span 担当者
              select.form-control(v-model="addMetaData.holder")
                option(value="") 未設定
                option(v-for="item in opt.users" :value="item.id" v-html="item.name")

            //limitDate
            label.form-inline
              span.mr-2 {{opt.dt.limitDate.jp}}:
              input.form-control(type="date" v-model="addMetaData.limitDate")

            // description
            TextAreaQuill(
              :label="opt.dt.description.jp+':'"
              v-model="addBodyData.description"
              :toolbar="'full'"
            )

            .d-flex
              button.btn-primary(@click="addSave")
                span
                  b-icon(icon="plus")
                  | 保存

    // 閲覧・編集モーダル
    TaskView(
      :metaData="data.metaData"
      :users="opt.users"
    )
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "../../Singleton";
import TextAreaQuill from "../property/TextAreaQuill.vue";
import TaskView from "~/molle-cms/src/ui/tasks/TaskView.vue";
import MolleBase from "~/molle-cms/src/ui/MolleBase.vue";

@Component({
  components: {MolleBase, TaskView, TextAreaQuill},
})
export default class TasksList extends Vue {
  static tasksMetaRef = firebase.firestore().collection(`${process.env.molleProjectID}/_tasks/meta/`);
  static tasksBodyRef = firebase.firestore().collection(`${process.env.molleProjectID}/_tasks/body/`);
  static dt = {
    id: {jp: "ID"},
    title: {jp: "件名"},
    description: {jp: "内容"},
    author: {jp: "作成者"},
    holder: {jp: "担当者"},
    status: {jp: "ステータス"},
    priority: {jp: "優先度"},
    milestone: {jp: "マイルストーン"},
    category: {jp: "カテゴリ"},
    createTime: {jp: "登録"},
    limitDate: {jp: "〆切"},
    updateTime: {jp: "更新"},
    arr: [
      "id",
      "title",
      "holder",
      "status",
      "priority",
      "milestone",
      "category",
      "createTime",
      "limitDate",
      "updateTime",
    ],
  };
  opt = {
    dt: TasksList.dt,
    dtOrder: TasksList.dt.arr,
    users: {},
  };
  addMetaData = <ITaskMetaData>{};
  addBodyData = <ITaskBodyData>{};
  isShow = false;
  isLogin = false;

  data = {
    focus: "",
    metaData: {
      // [key: string]: ITaskMetaData,
      arr: [],
    },
  };

  head() {
    return {
      title: "[TASK]" + process.env.title,
    };
  }

  created() {
    TasksList.tasksMetaRef
      // .orderBy("updateTime")
      .onSnapshot((snap: firebase.firestore.QuerySnapshot) => {
        let dic: any = {arr: []};
        snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
          dic[_snap.id] = _snap.data();
          dic.arr.push(_snap.id);
        });
        this.$set(this.data, "metaData", dic);
      });

    //
    firebase.firestore().collection("_users")
      .get()
      .then((snap: firebase.firestore.QuerySnapshot) => {
        let dic: any = {};
        snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
          dic[_snap.id] = _snap.data();
        });
        this.$set(this.opt, "users", dic);
      });
  }

  addSave() {
    let uid = TasksList.tasksMetaRef.doc().id;
    let batch = firebase.firestore().batch();
    this.addMetaData.author = firebase.auth().currentUser!.uid;
    this.addMetaData.createTime = firebase.firestore.FieldValue.serverTimestamp();
    this.addMetaData.updateTime = firebase.firestore.FieldValue.serverTimestamp();
    batch.set(TasksList.tasksMetaRef.doc(uid), this.addMetaData);
    batch.set(TasksList.tasksBodyRef.doc(uid), this.addBodyData);
    batch.commit()
      .then(() => {
        this.isShow = false;
      });
  }
}

export interface ITaskMetaData {
  id: string,
  title: string,
  author: string,
  holder: string,
  status: string,
  priority: string,
  milestone: string,
  category: string,
  createTime: any,
  limitData: any,
  updateTime: any,
}

export interface ITaskBodyData {
  description: string,
}
</script>

<style lang="scss">
</style>
