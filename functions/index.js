const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')
const request = require('request');
const config = functions.config();
const path = require('path');
const admin = require("firebase-admin");
admin.initializeApp();

setProject({
  name: "molle",
  dir: "stgApp/",
  molleProjectID: "sandbox",
  molleBrunch: "beta",
  cron: "every day 10:00",
  ghRepository: "chitose87/molle-cms--dev"
})

//getHtml
exports.getHtml = functions
  // .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    if (checkOrign(req.headers.origin, res)) {
      // req.query.text
      const feed = await doRequest({
        url: decodeURIComponent(req.query.url || ""),
        method: "GET"
      });
      res.json(feed);
    }

    function doRequest(options) {
      return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
          if (!error && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });
    }
  });

/**
 * プロジェクトごとの関数
 * @param args
 */
function setProject(args) {
  /**
   * ベーシック認証を設定
   */
  exports[`${args.name}_rewrites`] = functions
    // .region('asia-northeast1')
    .https.onRequest(express()
      .use(basicAuth(config.basic.id, config.basic.pw))
      .use(express.static(__dirname + '/' + args.dir))
      .all('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, args.dir + 'index.html'));
      })
    )

  /**
   * 予約時間を定期チェックし、deployQueを立てる
   */
  exports[`${args.name}_scheduled`] = functions
    .region('asia-northeast1')
    .pubsub.schedule(args.cron)
    .timeZone("Asia/Tokyo")
    .onRun((context) => {
      let ref = admin.firestore().doc(`${args.molleProjectID}/${args.molleBrunch}`);
      ref.get()
        .then((snap) => {
          let data = snap.data();
          let nowLocalDate = new Date(new Date().toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}));
          // console.log(data.deployScheduleActive, data.deploySchedule, nowLocalDate);
          if (data.deployScheduleActive) {
            if (new Date(data.deploySchedule) < nowLocalDate) {
              ref.update({
                deployScheduleActive: false,
                deployQue: true
              })
            }
          }
        });
    });

  /**
   * DeployQueの変更を監視し、githubActionsへdeployをリクエストする
   */
  exports[`${args.name}_watchDeployQue`] = functions
    .region('asia-northeast1')
    .firestore.document(`${args.molleProjectID}/${args.molleBrunch}`)
    .onWrite((change, context) => {
      let data = change.after.data();
      console.log(data, data === true)
      if (data.deployQue) {
        //deploy request
        var options = {
          url: `https://api.github.com/repos/${arg.ghRepository}/actions/workflows/publish.yml/dispatches`,
          method: 'POST',
          body: '{"ref":"main"}',
          headers: {
            'Authorization': 'token ' + config.gh.token,
            'user-agent': 'node.js',
            'Accept': 'application/vnd.github.v3+json'
          }
        };

        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
          }
          res.json(body)
        }

        request(options, callback);
        //
        admin.firestore().doc(`${args.molleProjectID}/${args.molleBrunch}`).update({deployQue: false});
      }
    });

  /**
   * github actions のステータスを確認するAPI
   */
  exports[`${args.name}_ghStatus`] = functions
    // .region('asia-northeast1')
    .https.onRequest(async (req, res) => {
      if (checkOrign(req.headers.origin, res)) {
        request(
          {
            url: `https://api.github.com/repos/${arg.ghRepository}/actions/runs?per_page=1`,
            // method: 'GET',
            // body: '{"ref":"main"}',
            headers: {
              'Authorization': 'token ' + config.gh.token,
              'user-agent': 'node.js',
              'Accept': 'application/vnd.github.v3+json'
            }
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body);
            }
            res.json(body)
          });
      }
    });
}

function checkOrign(origin, res) {
  switch (origin) {
    case "https://molle-cms---dev.web.app"://molle 2021/03/02
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type, authorization');
      return true;
    default :
      return false;
  }
}
