import {Vue} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/src/Singleton";
import firebase from "~/node_modules/firebase";
import {IPageData} from "~/src/interface/IPageData";

export class DynamicPage extends Vue {
  pageData: IPageData = <IPageData>{};
  payload = {
    items:
  };

  _mounted() {
    Singleton.firebaseInit(() => {
      let str = this.$route.path.replace("/--molle", "");
      if (str.substr(0, 1) == "/") str = str.substr(1);
      str = str.replace(/\//g, "__");


      firebase.firestore().doc(`version/${Singleton.systemVersion}/pages/${str}`).get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            console.log("no page data");
            return;
          }
          let pageData = <IPageData>snap.data();
          this.$set(this, "pageData", pageData);

          this.init();
        });

      firebase.firestore().collection(`version/${Singleton.systemVersion}/items`)
        .onSnapshot((query: firebase.firestore.QuerySnapshot) => {
          query.forEach((snap: firebase.firestore.DocumentSnapshot) => {
            console.log(snap.id)
          })
        })
    });
  }

  init() {
  }
}
