const is_windows = process.platform==='win32';
const is_mac = process.platform==='darwin';
const is_linux = process.platform==='linux';
const stripJsonComments = require("strip-json-comments");
require("dotenv").config();
const fs = require("fs");
const {execSync} = require("child_process");

const molleConfig = JSON.parse(
  stripJsonComments(
    fs.readFileSync(`molle-cms/molle.config.json`, "utf8"),
  ),
);

let firebase = {
  json: {
    "firestore": {
      "rules": "firestore.rules",
      "indexes": "firestore.indexes.json",
    },
    "functions": {
      "functions": {
        "source": "functions",
      },
      "source": "functions",
    },
    "hosting": [],
    "storage": {
      "rules": "storage.rules",
    },
  },
};
let firebasercHosting = {};
let fns = {};
let scripts = [
  `    "dev": "npm run ${molleConfig.defaultSite}:dev",`,
  `    "gen": "npm run ${molleConfig.defaultSite}:gen",`,
  `    "gen:cms": "npm run ${molleConfig.defaultSite}:gen:cms",`,
  `    "deploy": "npm run ${molleConfig.defaultSite}:deploy",`,
];

for (let siteId in molleConfig.sites) {
  let siteOption = molleConfig.sites[siteId];
  const molleJson = require("../" + siteId + "/molle.json");
  console.log(siteId,siteOption, molleJson);

  // file
  if(!fs.existsSync(siteId))fs.mkdirSync(siteId);
  if(!fs.existsSync(`${siteId}/public-cms`))fs.mkdirSync(`${siteId}/public-cms`);
  if(!fs.existsSync(`${siteId}/molle-cms`)){
    if(is_mac||is_linux){
      execSync(`ln -fs ../molle-cms ${siteId}/molle-cms`);
      execSync(`rm ./molle-cms/molle-cms`);
    }else{
      execSync(`mklink /j "${siteId}/molle-cms" "molle-cms"`);
    }
  }

  //firebase.json
  firebase.json.hosting.push({
      "target": `${siteId}-static`,
      "public": `${siteId}/public`,
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**",
      ],
    },
    {
      "target": `${siteId}-cms`,
      "public": `${siteId}/public-cms`,
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**",
      ],
      "rewrites": [
        {
          "source": "**",
          "function": `${siteId}_rewrites`,
        },
      ],
    });

  //.firebaserc
  firebasercHosting[`${siteId}-static`] = [siteOption.static.hosting];
  firebasercHosting[`${siteId}-cms`] = [siteOption.cms.hosting];

  //functions/molle.export.json
  fns[siteId] = {
    molleProjectID: molleJson.molleProjectID,
    molleBrunch: molleJson.molleBrunch,
    cron: siteOption.cron,
    ghRepository: siteOption.ghRepository,
  };

  //package.json
  scripts.push(
    `    "${siteId}:dev": "cross-env NUXT_PORT=${siteOption.port} IS_MOLLE_CMS=true nuxt-ts dev ${siteId}",`,
    `    "${siteId}:gen": "node ./molle-cms/before.node.js ${siteId} && nuxt-ts generate ${siteId}",`,
    `    "${siteId}:gen:cms": "cross-env IS_MOLLE_CMS=true nuxt-ts generate ${siteId}",`,
    `    "${siteId}:deploy": "firebase deploy --only hosting:${siteId}-static",`,
  );

  //github Actions
  fs.writeFileSync(`.github/workflows/${siteId}.yml`,
    fs.readFileSync(`molle-cms/github.actions.yml`, "utf8")
      .replace(/\${ siteId }/g, siteId),
  );
}
//write
fs.writeFileSync(`firebase.json`,
  JSON.stringify(firebase.json, null, "  "),
);
fs.writeFileSync(`.firebaserc`,
  JSON.stringify({
    "projects": {
      "default": molleConfig.projectId,
    },
    "targets": (() => {
      let obj = {};
      obj[molleConfig.projectId] = {
        hosting: firebasercHosting,
      };
      return obj;
    })(),
  }, null, "  "),
);
fs.writeFileSync(`functions/molle.export.json`,
  JSON.stringify(fns, null, "  "),
);
fs.writeFileSync(`package.json`,
  fs.readFileSync(`package.json`, "utf8")
    .replace(/(molle:setup.node.js)([\s\S]*?)(\/molle:setup.node.js)/, [
      `molle:setup.node.js>": "",`,
      ...scripts,
      `    "</molle:setup.node.js`,
    ].join("\n")),
);
