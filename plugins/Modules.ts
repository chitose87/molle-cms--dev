import {Vue} from "~/node_modules/vue-property-decorator";
import Headline from "~/molle/structure/outline/Headline.vue";

declare module 'vue/types/vue' {
  interface Vue {
    $fieldType: {
      text: { label: string },
      paragraph: { label: string },
      number: { label: string },
      img: { label: string },
      html: { label: string },
    },
  }
}

Vue.component("Headline", Headline);
Vue.prototype.$fieldType = {
  text: {label: "text"},
  paragraph: {label: "paragraph"},
  number: {label: "number"},
  img: {label: "img"},
  html: {label: "html"},
};
