const functions = require('firebase-functions');
const express = require('express');
const basicAuth = require('basic-auth-connect');
const { Nuxt } = require('nuxt');

const nuxt = new Nuxt({
  buildDir: 'ssr',
  dev: false
});

const USERNAME = 'id';
const PASSWORD = 'pw';

const app = express();

app.use(basicAuth(USERNAME, PASSWORD));

app.use(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res)
});

exports.ssr = functions.https.onRequest(app);
