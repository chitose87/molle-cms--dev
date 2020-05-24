import {Module, VuexModule, Mutation} from 'vuex-module-decorators'
// import * as firebase from "~/node_modules/firebase";

@Module({name: 'page', stateFactory: true, namespaced: true})

export default class page extends VuexModule {
  list: any = {};

  @Mutation
  updateList(firestoreQuerySnapshot: any) {
    this.list = {};
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.list[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }
}
