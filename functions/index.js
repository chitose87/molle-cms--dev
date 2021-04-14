const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')
const request = require('request');
const config = functions.config();
const path = require('path');

//staging & 管理画面
exports.stgApp = functions.https.onRequest(
  express()
  .use(basicAuth(config.basic.id, config.basic.pw))
  .use(express.static(__dirname + '/stgApp/'))
  .all('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'stgApp/index.html'));
  })
)

/**
 * submit git actions
 * @type {HttpsFunction}
 */
exports.publish = functions.https.onRequest(async (req, res) => {
  if (checkOrign(req.headers.origin, res)) {
    var options = {
      url: 'https://api.github.com/repos/chitose87/molle-cms--dev/actions/workflows/publish.yml/dispatches',
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
  }
});

exports.githubActionsStatus = functions.https.onRequest(async (req, res) => {
  if (checkOrign(req.headers.origin, res)) {
    request(
      {
      url: 'https://api.github.com/repos/chitose87/molle-cms--dev/actions/runs?per_page=1',
      // method: 'GET',
      // body: '{"ref":"main"}',
      headers: {
        'Authorization': 'token ' + config.gh.token,
        'user-agent': 'node.js',
        'Accept': 'application/vnd.github.v3+json'
      }},
      function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
      res.json(body)
    });
  }
});

//getHtml
exports.getHtml = functions.https.onRequest(async (req, res) => {
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
