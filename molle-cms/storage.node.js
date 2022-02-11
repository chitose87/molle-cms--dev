require('dotenv').config();

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const SITE_DIR = process.argv[2];
const molle = require(`../${SITE_DIR}/molle.json`);
var fs = require('fs');
const request = require("request");
let replaceList = [];

function cleaningFirestoreValue(_data) {
  for (let key in _data) {
    if (_data[key]) {
      if (key == "updateTime" || key == "createTime" || key == "dev") {
        delete _data[key]
      } else if (typeof _data[key] == "object") {
        cleaningFirestoreValue(_data[key]);
      }
    }
  }
  return _data;
}

function strReplace(_data) {
  let json = JSON.stringify(_data);
  let str = json;
  replaceList.forEach((fromTo) => {
    str = str.replace(new RegExp(fromTo.from, "g"), fromTo.to);
  });
  if (json == str) {
    return false;
  } else {
    Object.assign(_data, JSON.parse(str));
    return true;
  }
}

(async () => {
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
  let [pages, items, storage] = await Promise.all([
    firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/pages`).get(),
    firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/items`).get(),
    firebase.firestore().collection(`${molle.molleProjectID}/${molle.molleBrunch}/storage`).get()
  ])

  let promiseList = [];
  let batch = firebase.firestore().batch();

  // 全ダウンロード
  // let hoge = await firebase.storage().ref().child(`${molle.molleProjectID}`).listAll();
  // let list = [];
  // for (let i = 0; i < hoge.items.length; i++) {
  //   let itemRef = hoge.items[i];
  //   let str = `https://storage.googleapis.com/seishun-style.appspot.com/${itemRef.fullPath}`;
  //   str = encodeURI(str);
  //   console.log(itemRef.fullPath);
  //   await Promise.all([
  //     new Promise((resolve, reject) => {
  //       request.head(str, (err, res, body) => {
  //         request({url: str, encoding: null})
  //           .pipe(fs.createWriteStream(`${SITE_DIR}/${itemRef.fullPath}`))
  //           .on("close", () => {
  //             console.log(itemRef.fullPath)
  //             resolve();
  //           })
  //       });
  //     })
  //   ])
  // }
  // hoge.items.forEach((itemRef) => {

  //   // promiseList.push(
  //   //   new Promise((resolve, reject) => {
  //   //     request.head(str, (err, res, body) => {
  //   //       request({url: str, encoding: null})
  //   //         .pipe(fs.createWriteStream(`${SITE_DIR}/${itemRef.fullPath}`))
  //   //         .on("close", () => {
  //   //           console.log(itemRef.fullPath)
  //   //           resolve();
  //   //         })
  //   //     });
  //   //   })
  //   // )
  // })

  // storage
  storage.forEach((snap) => {
    let data = snap.data();
    if (!data.save) return;
    replaceList.push({from: data.src, to: `/storage/${data.rename || data.srcName}.${data.extend.toLowerCase()}`});
    batch.delete(
      firebase.firestore().doc(`${molle.molleProjectID}/${molle.molleBrunch}/storage/${snap.id}`)
    )
  });
  for (let item of replaceList) {
    await new Promise((resolve, reject) => {
      request.head(encodeURI(item.from), (err, res, body) => {
        request(encodeURI(item.from))
          .pipe(fs.createWriteStream(`${SITE_DIR}/static${encodeURI(item.to)}`))
          .on("close", () => {
            console.log(item.from, "=>", item.to)
            resolve();
          });
      });
    });
  }

  pages.forEach((snap) => {
    let data = cleaningFirestoreValue(snap.data());
    if (strReplace(data)) {
      batch.update(
        firebase.firestore().doc(`${molle.molleProjectID}/${molle.molleBrunch}/pages/${snap.id}`),
        data
      );
    }
  });
  items.forEach((snap) => {
    let data = cleaningFirestoreValue(snap.data());
    if (strReplace(data)) {
      batch.update(
        firebase.firestore().doc(`${molle.molleProjectID}/${molle.molleBrunch}/items/${snap.id}`),
        data
      );
    }
  });
  await batch.commit();
  // promiseList.push(batch.commit());

  //  Promise.all(promiseList);
  process.exit(0);
})();
