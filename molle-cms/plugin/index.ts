import {Vue} from "nuxt-property-decorator";

import "./Words";

Vue.prototype.$users = {};
Vue.prototype.$getUser = (uid: string) => {
  return Vue.prototype.$users[uid]
    ? Vue.prototype.$users[uid]
    : {name: uid};
};

Vue.prototype.$dateFormatter = (date: Date, formatt: string = "YYYY/MM/DD hh:mm") => {
  return formatt
    .replace(/YYYY/g, "" + date.getFullYear())
    .replace(/MM/g, (date.getMonth() + 1).toString().padStart(2, "0"))
    .replace(/DD/g, date.getDate().toString().padStart(2, "0"))
    .replace(/hh/g, date.getHours().toString().padStart(2, "0"))
    .replace(/mm/g, date.getMinutes().toString().padStart(2, "0"))
    ;
};
