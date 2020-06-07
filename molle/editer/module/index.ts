import {Vue} from "~/node_modules/vue-property-decorator";
import {setMolleModules} from "~/molle/ssr/module";
import HeadlineE from "./HeadlineE.vue";

export function setMolleEditerModules() {
  setMolleModules();
  Vue.component("HeadlineE", HeadlineE);
}
