import {Vue} from "~/node_modules/vue-property-decorator";
import Headline from "~/molle/ssr/module/Headline.vue";
import Box from "~/molle/ssr/module/Box.vue";

export function setMolleModules() {
  Vue.component("Box", Box);
  Vue.component("Headline", Headline);
}
