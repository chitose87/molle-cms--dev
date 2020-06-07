import {Vue} from "~/node_modules/vue-property-decorator";
import Headline from "~/molle/ssr/module/Headline.vue";

export function setMolleModules() {
  Vue.component("Headline", Headline);
}
