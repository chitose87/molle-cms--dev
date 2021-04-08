const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const molle = require("../../molle.json");
var fs = require('fs');

let allData = {
  pages: {}, items: {}
};
let genDir = "";
let dir = "";

function cleaningFirestoreValue(_data) {
  for (let key in _data) {
    if (_data[key]) {
      // if (_data[key].id) {
      //   console.log(key,_data[key]);
      //   _data[key] = _data[key].id;
      // } else
      if (key == "updateTime" || key == "createTime") {
        _data[key] = "";
      } else if (typeof _data[key] == "object") {
        cleaningFirestoreValue(_data[key]);
      }
    }
  }
  return _data;
}

module.exports = function () {
  /**
   * firebaseから全件データを取得して保持
   */
  this.nuxt.hook('generate:before', async (generator, generateOptions) => {
    console.log("generate:before", process.env.IS_MOLLE_CMS);
    if (process.env.IS_MOLLE_CMS == "true") return;

    firebase.initializeApp({
      apiKey: molle.apiKey,
      authDomain: molle.authDomain,
      databaseURL: molle.databaseURL,
      projectId: molle.projectId,
      storageBucket: molle.storageBucket,
      messagingSenderId: molle.messagingSenderId,
    });

    await new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(molle.developerId, process.env.FIRESTORE_PW)
        .then((user) => {
          Promise.all([
            firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/pages`).get(),
            firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/items`).get()
          ])
            .then(([pages, items]) => {
              let newsPage = [];
              console.log(generateOptions)
              genDir = generateOptions.dir;
              dir = generateOptions.staticAssets.dir;
              pages.forEach((snap) => {
                let data = cleaningFirestoreValue(snap.data());
                if (data.noExport) return;
                allData.pages[snap.id] = data;
                if (data.path.indexOf("news/") == 0) {
                  newsPage.push(data)
                }
              });
              items.forEach((snap) => {
                let data = cleaningFirestoreValue(snap.data());

                data.id = snap.id;
                allData.items[snap.id] = data;
              });

              //news jsonの書き出し
              newsPage.sort((a, b) => {
                return a.date < b.date ? 1 : -1;
              });
              for (let i = 0; i < newsPage.length / 10; i++) {
                fs.writeFileSync(
                  `${dir}/news/news-page-${i + 1}.json`,
                  JSON.stringify(newsPage.slice(i * 10, i * 10 + 10))
                );
              }
              resolve();
            });
        });
    });
  });

  /**
   * routesを編集
   */
  this.nuxt.hook('generate:extendRoutes', async (routes) => {
    console.log("generate:extendRoutes", process.env.IS_MOLLE_CMS == "true")
    if (process.env.IS_MOLLE_CMS != "true") {
      const routesToGenerate = routes.filter(route => {
        return !route.route.match('/--molle')
      })
      routes.splice(0, routes.length, ...routesToGenerate)
    }
    routes.forEach((route) => {
      route.payload = {
        // id: snap.id,
        pages: allData.pages,
        items: allData.items,
      }
    });
    for (let id in allData.pages) {
      let data = allData.pages[id];

      routes.push({
        route: `/${data.path}`
        , payload: {
          id: id,
          pageData: data,
          pages: allData.pages,
          items: allData.items,
        }
      })
    }
  });
  this.nuxt.hook('generate:route', async (route, setPayload) => {
    // console.log('----generate:route', route, setPayload);
    /**
     * ページ生成前のフック。動的ペイロードに便利です。#7422 を参照してください。Nuxt v2.13 以上で利用可能
     */
  });
  this.nuxt.hook('generate:page', async (attr) => {
    console.log('----generate:page', attr.route, attr.path);
    /**
     * ユーザーが生成後のパスと HTML を更新するときのフック
     * stateとpayloadを削除
     */
    if (process.env.IS_MOLLE_CMS != "true") {

    } else {

    }
    // attr.html = attr.html
    //   .replace(/(<link rel="preload" href="\/_nuxt\/static)(.*)(state.js" as="script">)/, "")
    // .replace(/(<link rel="preload" href="\/_nuxt\/static)(.*)(payload.js" as="script">)/, "")
    // .replace(/(<script defer src="\/_nuxt\/static)(.*)(state.js"><\/script>)/, "")

    // <script defer src="/_nuxt/static/1617113411/state.js"></script>
    // <link rel="preload" href="/_nuxt/static/1617113411/state.js" as="script">
    // <link rel="preload" href="/_nuxt/static/1617113411/payload.js" as="script">

  });
  this.nuxt.hook('generate:routeCreated', async generator => {
    console.log('pageのファイル作成が終わったよ')
  });
  this.nuxt.hook('generate:done', async generator => {
    if (process.env.IS_MOLLE_CMS != "true") {
      // console.time("a")
      let js = fs.readFileSync(`${genDir}/_nuxt/app.js`, "utf8");
      let list = js.split(`"use strict";`)
        .map((str) => {
          if (/MOLLE_DELETE_WITH_STATIC_MODE/.test(str)) {
            let l = str.lastIndexOf("component.exports");
            console.log(l)
            if (l >= 0) {
              str = "/* generate:done < deleted */" + str.substr(l + 17);
            }
          }
          return str;
        });
      fs.writeFileSync(`${genDir}/_nuxt/app.js`, list.join('"use strict";'));
      // console.timeEnd("a")
    }
  });
};
