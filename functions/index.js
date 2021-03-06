const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')
const request = require('request');

const app = express()

app.all('/*', basicAuth(function(user, password) {
  return user === 'id' && password === 'pw';
}));

app.use(express.static(__dirname + '/dist/'))

exports.app = functions.https.onRequest(app)


//getHtml
exports.getHtml = functions.https.onRequest(async (req, res) => {

  console.log(req.headers.origin)
  switch (req.headers.origin) {
    case "https://molle-cms.web.app"://molle 2021/03/02
      res.set('Access-Control-Allow-Origin', req.headers.origin);
      res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type, authorization');

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
