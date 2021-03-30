const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const molle = require("../../molle.json");
var fs = require('fs');

let allData = {
  pages: {}, items: {}
};

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
    console.log("generate:before");
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
                  `${generateOptions.staticAssets.dir}/news/news-page-${i + 1}.json`,
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
    console.log("generate:extendRoutes")
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
    console.log('----generate:route', route, setPayload);
  });
  this.nuxt.hook('generate:routeCreated', async generator => {
    console.log('pageのファイル作成が終わったよ')
  });
};
