const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

module.exports = function () {
  this.nuxt.hook('generate:extendRoutes', async (routes) => {
    firebase.initializeApp({
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
    });

    await new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(process.env.developerId, process.env.developerPw)
        .then((user) => {
          Promise.all([
            firebase.firestore().collection(`${process.env.molleProjectID}/${process.env.molleBrunch}/pages`).get(),
            firebase.firestore().collection(`${process.env.molleProjectID}/${process.env.molleBrunch}/items`).get()
          ])
            .then(([pages, items]) => {
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

              let allData = {
                pages: {}, items: {}
              };
              routes.forEach((route) => {
                route.payload = {
                  // id: snap.id,
                  pages: allData.pages,
                  items: allData.items,
                }
              });
              pages.forEach((snap) => {
                let data = cleaningFirestoreValue(snap.data());
                allData.pages[snap.id] = data;

                if (data.noExport) return;
                routes.push({
                  route: `/${data.path}`
                  , payload: {
                    id: snap.id,
                    pageData: data,
                    pages: allData.pages,
                    items: allData.items,
                  }
                })
              });
              items.forEach((snap) => {
                let data = cleaningFirestoreValue(snap.data());

                data.id = snap.id;
                allData.items[snap.id] = data;
              });
              resolve(routes);
            });
        });
    });

    // console.log('----', +new Date());
    // const result =
    // console.log('----', +new Date());

    // routes.push({
    //   route: '/--molle/hoge',
    //   payload: null
    // });

    console.log('----generate:extendRoutes', routes);
  });
  this.nuxt.hook('generate:route', async (route, setPayload) => {
    console.log('----generate:route', route, setPayload);
  });
  this.nuxt.hook('generate:routeCreated', async generator => {
    console.log('pageのファイル作成が終わったよ')
  });
};
