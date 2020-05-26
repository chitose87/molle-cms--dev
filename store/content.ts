import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'content', stateFactory: true, namespaced: true})

export default class content extends VuexModule {
  pages: any = {};
  presetOutlines: any = {
    0: {name: "Headline"},
  };
  outlines: any = this.presetOutlines;
  values: any = {};
  valueRefs: any = [];

  @Mutation
  updatePages(firestoreQuerySnapshot: any) {
    console.log("updatePages")
    this.pages = {};
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.pages[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }

  @Mutation
  updateOutlines(firestoreQuerySnapshot: any) {
    this.outlines = Object.assign({}, this.presetOutlines);
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.outlines[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
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
