const functions = require("firebase-functions");
const express = require("express");
const basicAuth = require("basic-auth-connect");

// basic認証
const app = express();
const {execSync} = require("child_process");

app.all(
  "/*",
  basicAuth(function(user, password) {
    return user === "id" && password === "pw";
  }),
);

app.use(express.static(__dirname + "/dist/"));

exports.app = functions.https.onRequest(app);

//firestore
exports.deployChecker = functions.runWith({timeoutSeconds:540}).firestore
  .document("/sandbox/beta")
  .onWrite(change => {
    const message = change.after.data();
    if (message.deployQue) {
      console.log("----------------start");
      execSync("cd tmp && npm run gen");

      // exec("npm run gen", (err, stdout, stderr) => {
      //   if (err) {
      //     console.log(`stderr: ${stderr}`);
      //     return;
      //   }
      //   console.log(`stdout: ${stdout}`);
        console.log("----------------end");
      // });
    }
    return null;
  });

// const {Nuxt} = require("nuxt");

// require("@nuxt/typescript-runtime");
// require("@nuxtjs/dotenv");
// // require("core-js")
// // require("bootstrap");
// // require("bootstrap-vue");
// require("vuex");
// // require("@nuxt/types");
// // require("@nuxt/typescript-build");
// // require("@nuxtjs/style-resources");
// // require("@types/firebase");
// require("firebase");
// require("http-server");
// require("node-sass");
// require("nuxt-property-decorator");
// require("pug");
// require("pug-loader");
// require("pug-plain-loader");
// require("sass-loader");
// require("vuedraggable");
// require("vuex-module-decorators");
// execSync("npm i");

// const {Nuxt} = require("nuxt");
// console.log(
//   new Nuxt({
//     mode: "universal",
//     target: "static",
//     generate: {
//       dir: 'dist'
//     },
//   }),
// );
