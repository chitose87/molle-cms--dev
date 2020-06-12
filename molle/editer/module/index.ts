import {Vue} from "~/node_modules/vue-property-decorator";
import {setMolleModules} from "~/molle/ssr/module";
import HeadlineE from "./HeadlineE.vue";
import BoxE from "~/molle/editer/module/BoxE.vue";

export function setMolleEditerModules() {
  setMolleModules();
  Vue.component("BoxE", BoxE);
  Vue.component("HeadlineE", HeadlineE);
}
