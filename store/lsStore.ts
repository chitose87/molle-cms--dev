import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'

@Module({name: 'lsStore', stateFactory: true, namespaced: true})

export default class lsStore extends VuexModule {
  private static prefix: string = "molle-ls-";
  storage = {
    focusModuleId: ""
  };

  editing: string[] = [];

  @Mutation
  init() {
    let v: string[] = JSON.parse(localStorage.getItem(lsStore.prefix + "editing") || "[]");
    v.forEach((id) => {
      this.editing.push(id);
    });

    this.storage = JSON.parse(localStorage.getItem(lsStore.prefix + "storage") || "{}");
    console.log("lsStore", "initialized")
  }

  @Mutation
  update(arg: { key: string, value: any }) {
    // @ts-ignore
    this.storage[arg.key] = arg.value;
    localStorage.setItem(lsStore.prefix + "storage", JSON.stringify(this.storage))
  }

  // getAttr(key: string) {
  //   return this.storage[key] || JSON.parse(localStorage.getItem(lsStore.prefix + key) || "");
  // }

  @Mutation
  updateEditing(arg: { id: string, flag?: boolean }) {
    let i = this.editing.indexOf(arg.id);
    if (i >= 0) this.editing.splice(i, 1);

    if (arg.flag === false) {
    } else if (i == -1 || arg.flag === true) {
      this.editing.push(arg.id);
    }

    localStorage.setItem(lsStore.prefix + "editing", JSON.stringify(this.editing));
  }
}
