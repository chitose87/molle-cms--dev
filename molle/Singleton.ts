export class Singleton {
  static store = {
    pages: <any>{},
    outlines: <any>{},
    items: <any>{},
  };

  static presetOutlines: any = {
    paragraph: {name: "Paragraph"},
    headline: {name: "Headline"},
    box: {name: "Box"},
  };

  /**
   *
   * @param query
   */
  static updatePages(query: any) {
    Singleton.store.pages = {};
    query.forEach((snap: any) => {
      let v = snap.data();
      v.ref = snap.ref;
      Singleton.store.pages[snap.id] = v;
    });
  }

  /**
   *
   * @param query
   */
  static updateOutlines(query: any) {
    Singleton.store.outlines = Object.assign({}, Singleton.presetOutlines);
    query.forEach((snap: any) => {
      Singleton.store.outlines[snap.id] = snap.data();
    });
  }

  /**
   *
   * @param query
   */
  static updateItems(query: any) {
    Singleton.store.items = Object.assign({}, Singleton.store.items);
    query.forEach((snap: any) => {
      Singleton.addItem(snap);
    });
  }

  /**
   *
   * @param snap
   */
  static addItem(snap: any) {
    let v = snap.data();
    v.ref = snap.ref;
    if (Singleton.store.items[snap.id]) {
      v = Object.assign(Singleton.store.items[snap.id], v)
    }
    Singleton.store.items[snap.id] = v;
    return v;
  }
}
