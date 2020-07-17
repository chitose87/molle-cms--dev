import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'

@Module({name: 'lsStore', stateFactory: true, namespaced: true})

export default class lsStore extends VuexModule {
  private static prefix: string = "molle-ls-";
  private storage: any = {};

  editing: string[] = [];

  @Mutation
  init() {
    let v: string[] = JSON.parse(localStorage.getItem(lsStore.prefix + "editing") || "[]");
    v.forEach((id) => {
      this.editing.push(id);
    })
  }

  @Mutation
  update(key: string, value: any) {
    this.storage[key] = value;
    localStorage.setItem(lsStore.prefix + key, JSON.stringify(value))
  }

  // getAttr(key: string) {
  //   return this.storage[key] || JSON.parse(localStorage.getItem(lsStore.prefix + key) || "");
  // }

  @Mutation
  updateEditing(id: string) {
    let i = this.editing.indexOf(id);
    if (i == -1) {
      this.editing.push(id);
    } else {
      this.editing.splice(i, 1);
    }
    localStorage.setItem(lsStore.prefix + "editing", JSON.stringify(this.editing));
  }
}
