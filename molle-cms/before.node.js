require('dotenv').config();

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const SITE_DIR = process.argv[2];
const molle = require(`../${SITE_DIR}/molle.json`);
var fs = require('fs');
let allData = {
  pages: {}, items: {}, datalist: {}
};

function cleaningFirestoreValue(_data) {
  for (let key in _data) {
    if (_data[key]) {
      // if (_data[key].id) {
      //   console.log(key,_data[key]);
      //   _data[key] = _data[key].id;
      // } else
      if (key == "updateTime" || key == "createTime" || key == "dev") {
        delete _data[key]
      } else if (typeof _data[key] == "object") {
        cleaningFirestoreValue(_data[key]);
      }
    }
  }
  return _data;
}

(async () => {
  /**
   * 【app.js軽量化】
   * pluginSpa.tsからProfileを抜いた、
   * pluginStatic.tsを作成する
   */
  let imports = fs.readFileSync(`${SITE_DIR}/molle/nuxt-config/pluginSpa.ts`, "utf8")
    .match(/(\/\* <imports)([\s\S]*?)(> \*\/)/)[0]
    .match(/(?!.*Profile.vue)(import )(.*)(.vue\")/g)
    .join("\n");
  let molleModules = imports
    .match(/(import )(.*)( from)/g).map((str) => {
      let name = str.substring(7, str.length - 5);
      return `Vue.component("${name}", ${name});`
    })
    .join("\n");

  let result = fs.readFileSync(`${SITE_DIR}/molle/nuxt-config/pluginStatic.ts`, "utf8")
    .replace(/(\/\* <imports)([\s\S]*?)(> \*\/)/, ["/* <imports */", imports, "/* > */"].join("\n"))
    .replace(/(\/\* <molleModules)([\s\S]*?)(> \*\/)/, ["/* <molleModules */", molleModules, "/* > */"].join("\n"))
  fs.writeFileSync(`${SITE_DIR}/molle/nuxt-config/pluginStatic.ts`, result);


  /**
   * firebaseから全件データを取得して保持
   */

  firebase.initializeApp({
    apiKey: molle.apiKey,
    authDomain: molle.authDomain,
    databaseURL: molle.databaseURL,
    projectId: molle.projectId,
    storageBucket: molle.storageBucket,
    messagingSenderId: molle.messagingSenderId,
  });

  const user = await firebase.auth().signInWithEmailAndPassword(molle.developerId, process.env.FIRESTORE_PW);
  let [pages, items, site] = await Promise.all([
    firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/pages`).get(),
    firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/items`).get(),
    firebase.firestore().doc(`${molle.molleProjectID}/${molle.molleBrunch}`).get()
  ])
  //
  allData.datalist = site.data().datalist;
  pages.forEach((snap) => {
    let data = cleaningFirestoreValue(snap.data());
    if (data.noExport) return;
    allData.pages[snap.id] = data;
  });
  items.forEach((snap) => {
    let data = cleaningFirestoreValue(snap.data());
    // data.id = snap.id;
    allData.items[snap.id] = data;
  });

  //全データの出力
  fs.writeFileSync(
    `${SITE_DIR}/molle/nuxt-config/firestore-snap.json`,
    JSON.stringify(allData)
  );
  process.exit(0);
})();
