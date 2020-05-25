import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'content', stateFactory: true, namespaced: true})

export default class content extends VuexModule {
  pages: any = {};
  presetOutline: any = {
    0: {name: "Headline"},
  };
  outline: any = this.presetOutline;
  values: any = {};

  @Mutation
  updatePages(firestoreQuerySnapshot: any) {
    console.log("updatePages")
    this.pages = {};
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.pages[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }

  @Mutation
  updateOutline(firestoreQuerySnapshot: any) {
    this.outline = Object.assign({}, this.presetOutline);
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.outline[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }

  @Mutation
  updateValues(firestoreQuerySnapshot: any) {
    this.values = {};
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.values[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }
}
