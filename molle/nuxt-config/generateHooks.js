const molle = require("../../molle.json");
const allData = require("./firestore-snap.json");
var fs = require('fs');

let genDir = "";
let dir = "";

module.exports = function () {
  this.nuxt.hook('generate:before', async (generator, generateOptions) => {
    console.log("generate:before", process.env.isMolleCms);
    if (process.env.IS_MOLLE_CMS == "true") return;

    let newsPage = [];
    // console.log(generator)
    console.log(generateOptions)
    genDir = generateOptions.dir;
    dir = generateOptions.staticAssets.dir;
    for (let id in allData.pages) {
      let data = allData.pages[id];
      // if (data.noExport) return;
      if (data.path.indexOf("news/") == 0) {
        newsPage.push(data)
      }
    }
    for (let id in allData.items) {
      let data = allData.items[id];
    }

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
    // routes.forEach((route) => {
    //   route.payload = {
    // id: snap.id,
    // pages: allData.pages,
    // items: allData.items,
    // }
    // });
    for (let id in allData.pages) {
      let data = allData.pages[id];

      routes.push({
        route: `/${data.path}`
        , payload: {
          id: id,
          pageData: data,
          // pages: allData.pages,
          // items: allData.items,
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
    if (process.env.IS_MOLLE_CMS) {

    } else {
      attr.html = attr.html
        .replace(/data-n-head="1" /g, "")
        //loaderの削除
        .replace(/(<div id="__nuxt">)([\s\S]*?)(<script>window.__NUXT__)/, `<div id="__nuxt"></div><script>window.__NUXT__`);
    }
  });
  this.nuxt.hook('generate:routeCreated', async generator => {
    console.log('pageのファイル作成が終わったよ')
  });
  this.nuxt.hook('generate:done', async generator => {
    if (process.env.IS_MOLLE_CMS == "true") {
    } else {
      // console.time("a")
      /**
       * 【app.js軽量化】
       * MOLLE_DELETE_WITH_STATIC_MODEのフラグがついたクラスを削除する(開発中)
       */
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
