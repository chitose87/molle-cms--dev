(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{326:function(t,e,n){"use strict";(function(t){n(21);var o=n(11),l=n(18),c=n(13),r=n(14),d=n(4),m=n(12),v=(n(3),n(37),n(22),n(7),n(59),n(61),n(236),n(5)),f=n(39),h=n(24);function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var l=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,l)}else n=o.apply(this,arguments);return Object(r.a)(this,n)}}var y=function(t,e,n,desc){var o,l=arguments.length,c=l<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(l<3?o(c):l>3?o(e,n,c):o(e,n))||c);return l>3&&c&&Object.defineProperty(e,n,c),c},C=function(e){Object(c.a)(r,e);var n=_(r);function r(){var t;return Object(o.a)(this,r),(t=n.apply(this,arguments)).importModal=!1,t.deployModal=!1,t.currentCIFlow={},t.schedule={min:"",date:"",active:!1},t.user={email:""},t}return Object(l.a)(r,[{key:"input",value:function(t){}},{key:"localValue",get:function(){return this.value},set:function(t){this.input(t)}},{key:"onLogin",value:function(t){var e=this;f.a.auth().signInWithEmailAndPassword(t.target.email.value,t.target.password.value).then((function(t){t&&(e.localValue=!0)}))}},{key:"onLogout",value:function(){f.a.auth().signOut(),this.localValue=!1}},{key:"checkCI",value:function(){var e=this;this.deployModal=!0,this.$set(this,"currentCIFlow",{reading:!0}),fetch("".concat(t.env.functions,"/").concat("comthink","_ghStatus")).then((function(t){return t.json()})).then((function(t){var n=JSON.parse(t);console.log(n),e.$set(e,"currentCIFlow",n.workflow_runs[0])})),h.a.systemDocRef.get().then((function(t){var data=t.data();e.$set(e.schedule,"date",data.deploySchedule),e.$set(e.schedule,"active",data.deployScheduleActive)}))}},{key:"scheduleUpdate",value:function(){h.a.systemDocRef.update({deploySchedule:this.schedule.date,deployScheduleActive:this.schedule.active})}},{key:"deployQue",value:function(){this.deployModal=!1,h.a.systemDocRef.update({deployQue:!0})}},{key:"onExport",value:function(){h.a.pagesRef.get().then((function(t){var e={pages:{}};t.forEach((function(t){e.pages[t.id]=t.data()}));var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"text/plain"})),a.download="pages-".concat((new Date).toUTCString(),".json"),a.click()})),h.a.itemsRef.get().then((function(t){var e={items:{}};t.forEach((function(t){var n=t.data();e.items[t.id]=n}));var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),a.download="items-".concat((new Date).toUTCString(),".json"),a.click()}))}},{key:"onImport",value:function(t){var e=t.target.files.files;if(0!=e.length){if(window.confirm("\nこの作業は破壊的な変更です。\n同一のIDの場合、既存のデータがすべて上書きされます。\n重複するjsonデータを読み込む場合、優先順位に規則性はありません。\nよろしいですか？")){for(var n=[],o=function(i){n.push(new Promise((function(t,n){var o=new FileReader;o.onload=function(e){try{var data=JSON.parse(e.target.result),o=[],l=f.a.firestore().batch(),c=0,r=data.pages||data.items,d=data.pages?h.a.pagesRef:data.items?h.a.itemsRef:n();for(var m in r)l.set(d.doc(m),r[m]),++c>=500&&(o.push(l.commit()),l=f.a.firestore().batch(),c=0);o.push(l.commit()),Promise.all(o).then(t)}catch(e){alert(e),n()}},o.readAsText(e[i])})))},i=0;i<e.length;i++)o(i);Promise.all(n).then((function(){alert("complete")}))}}else alert("ファイルが選択されていません。")}},{key:"cleanup",value:function(){console.log("cleanup");var t=f.a.firestore().batch(),e=0;Promise.all([h.a.pagesRef.get(),h.a.itemsRef.get()]).then((function(n){var o={};for(var l in n[1].forEach((function(t){t.data();o[t.id]=0})),n[1].forEach((function(n){var l=n.data(),c=!1;if("children"==l.type){for(var i in l.value){var r=l.value[i];o[r.id||r]+=1,"string"==typeof r&&(l.value[i]={id:r},c=!0)}c&&(t.update(h.a.itemsRef.doc(n.id),"value",l.value),++e>=500&&(t.commit(),t=f.a.firestore().batch(),e=0))}})),n[0].forEach((function(t){var e=t.data();o[e.itemId]+=1})),console.log(o),o)0==o[l]&&(console.log("delete",l),t.delete(h.a.itemsRef.doc(l)),++e>=500&&(t.commit(),t=f.a.firestore().batch(),e=0));t.commit(),alert("完了しました。結果はconsoleを確認してください")}))}},{key:"sendPasswordResetEmail",value:function(){var t=this;f.a.auth().sendPasswordResetEmail(this.user.email).then((function(t){alert("パスワード再設定メールをリクエストしました。メールをご確認ください")})).catch((function(e){alert(e+"/"+t.user.email)}))}}]),r}(v.Vue);y([Object(v.Prop)()],C.prototype,"value",void 0),y([Object(v.Emit)()],C.prototype,"input",null),C=y([Object(v.Component)({components:{}})],C),e.a=C}).call(this,n(85))},329:function(t,e,n){},330:function(t,e,n){},345:function(t,e,n){"use strict";n(329)},346:function(t,e,n){"use strict";n(330)},362:function(t,e,n){"use strict";n.r(e);n(21);var o=n(11),l=n(18),c=n(13),r=n(14),d=n(4),m=n(12),v=(n(3),n(7),n(5)),f=n(24),h=n(326).a,_=(n(345),n(15)),y=Object(_.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"molle-tool-bar"},[t.localValue?n("div",[n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.checkCI}},[n("span",[t._v("公開設定")])]),t.deployModal?n("div",{staticClass:"modal",attrs:{"aria-expanded":t.deployModal}},[n("div",{staticClass:"modal__fiexd"},[n("div",{staticClass:"modal__close",on:{click:function(e){t.deployModal=!t.deployModal}}}),n("div",{staticClass:"modal__body"},[n("button",{staticClass:"btn btn-warning",attrs:{type:"button"},on:{click:t.deployQue}},[n("span",[t._v("即時実行")])]),t._m(2),n("hr"),n("div",{staticClass:"form-inline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.schedule.date,expression:"schedule.date"}],staticClass:"form-control mr-2",attrs:{type:"date"},domProps:{value:t.schedule.date},on:{change:t.scheduleUpdate,input:function(e){e.target.composing||t.$set(t.schedule,"date",e.target.value)}}}),n("label",{staticClass:"btn btn-outline-primary"},[n("span",{staticClass:"mr-2"},[t._v("予約")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.schedule.active,expression:"schedule.active"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.schedule.active)?t._i(t.schedule.active,null)>-1:t.schedule.active},on:{change:[function(e){var n=t.schedule.active,o=e.target,l=!!o.checked;if(Array.isArray(n)){var c=t._i(n,null);o.checked?c<0&&t.$set(t.schedule,"active",n.concat([null])):c>-1&&t.$set(t.schedule,"active",n.slice(0,c).concat(n.slice(c+1)))}else t.$set(t.schedule,"active",l)},t.scheduleUpdate]}})])]),n("p",{staticClass:"caption"},[t._v("*指定日の朝9時頃に実行されます。")]),n("hr"),n("h4",[t._v("Github Actions Statu.")]),t.currentCIFlow.reading?n("div",[n("p",[t._v("確認中…")])]):n("div",[n("p",[n("span",[t._v("タスク名：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.name)}})]),n("p",[n("span",[t._v("ステータス：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.status)}})]),n("p",[n("span",[t._v("状態：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.conclusion)}})]),n("p",[n("span",[t._v("日時：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.created_at)}})])])])])]):t._e()]),n("hr"),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.onExport}},[n("span",[t._v("Export")])])]),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-warning",attrs:{type:"submit"},on:{click:function(e){t.importModal=!0}}},[n("span",[t._v("Import")])]),t.importModal?n("div",{staticClass:"modal",attrs:{"aria-expanded":t.importModal}},[n("div",{staticClass:"modal__fiexd"},[n("div",{staticClass:"modal__close",on:{click:function(e){t.importModal=!t.importModal}}}),n("div",{staticClass:"modal__body"},[n("form",{on:{submit:[function(t){t.preventDefault()},t.onImport]}},[n("input",{attrs:{type:"file",name:"files",accept:"application/json",multiple:""}}),t._m(3)])])])]):t._e()]),n("hr"),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-danger",on:{click:t.cleanup}},[n("span",[t._v("Data Clean")])])]),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.onLogout}},[n("span",[t._v("Logout")])])])]):n("div",[n("form",{staticClass:"form-group",on:{submit:[function(t){t.preventDefault()},t.onLogin]}},[n("label",[t._v("mail:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control form-control-sm",attrs:{type:"email",name:"email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),t._m(0),t._m(1),n("button",{staticClass:"btn btn-link btn-sm",on:{click:t.sendPasswordResetEmail}},[n("b-icon",{attrs:{icon:"envelope"}}),n("span",[t._v("パスワード再設定")])],1)])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",[t._v("password:"),n("input",{staticClass:"form-control form-control-sm",attrs:{type:"password",name:"password"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"btn btn-info",attrs:{type:"submit"}},[n("span",[t._v("Login")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"caption"},[t._v("5~10分程度かかります。"),n("br"),t._v("1日あたり100分を超えると料金が発生します。")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"btn btn-info",attrs:{type:"submit"}},[n("span",[t._v("Import")])])}],!1,null,null,null).exports;function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var l=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,l)}else n=o.apply(this,arguments);return Object(r.a)(this,n)}}var w=function(t,e,n,desc){var o,l=arguments.length,c=l<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(l<3?o(c):l>3?o(e,n,c):o(e,n))||c);return l>3&&c&&Object.defineProperty(e,n,c),c},O=function(t){Object(c.a)(n,t);var e=C(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).version="0.7",t.addNewsObj={id:"",date:"",title:"",option:{}},t.added={path:"",itemId:"",option:{}},t.pages={},t.news={},t.systemData={deployQue:!1,deployStatus:"undefinde"},t.isLogin=!1,t}return Object(l.a)(n,[{key:"head",value:function(){return{title:"[MOLLE]{{MOLLE CMS v0.1}}",script:[{src:"https://cdnjs.cloudflare.com/ajax/libs/jimp/0.16.1/jimp.js"}]}}},{key:"created",value:function(){var t=this;f.a.firebaseInit((function(e){e&&(t.isLogin=!0,f.a.systemDocRef.onSnapshot((function(e){e.exists?t.$set(t,"systemData",e.data()):f.a.systemDocRef.set({deployQue:!1,deployStatus:"undefinde"})})),f.a.pagesRef.onSnapshot((function(e){t.$set(t,"pages",{}),t.$set(t,"news",{}),e.forEach((function(e){var n=e.data();0==n.path.indexOf("news/")?t.$set(t.news,e.id,n):t.$set(t.pages,e.id,n)}))})))}))}},{key:"addNews",value:function(){var path="news/"+(this.addNewsObj.id||this.addNewsObj.date),t=encodeURIComponent(path);console.log(this.addNewsObj.date),f.a.pagesRef.doc(t).set({path:path,itemId:t,title:this.addNewsObj.title,date:this.addNewsObj.date})}},{key:"addPage",value:function(){var t=encodeURIComponent(this.added.path);f.a.pagesRef.doc(t).set({path:this.added.path,itemId:this.added.itemId||t})}},{key:"deletePage",value:function(t){f.a.pagesRef.doc(t).delete()}},{key:"changeItemTag",value:function(t,e,n){var o={option:e.option||{}};o.option.tag=n,f.a.pagesRef.doc(t).update(o)}}]),n}(v.Vue),j=O=w([Object(v.Component)({components:{MolleToolbar:y}})],O),k=(n(346),Object(_.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"molle-sys-ui bootstrap"},[n("div",{staticClass:"d-flex flex-nowrap"},[n("div",{staticStyle:{width:"210px","z-index":"100"}},[n("div",{staticClass:"container-fluid position-sticky pt-3 pb-3",staticStyle:{top:"0"}},[t._m(0),n("p",{staticClass:"text-info"},[t._v("Contents Management System v"+t._s(t.version))]),n("hr"),t.isLogin?n("ul",[n("li",[n("a",{staticClass:"btn-link",attrs:{href:"#readme"}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"book"}}),t._v("Readme")],1)]),n("li",[n("a",{staticClass:"btn-link",attrs:{href:"#news"}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"newspaper"}}),t._v("News Data")],1)]),n("li",[n("a",{staticClass:"btn-link",attrs:{href:"#universal"}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"file-earmark"}}),t._v("Universal pages")],1)])]):t._e(),n("MolleToolbar",{model:{value:t.isLogin,callback:function(e){t.isLogin=e},expression:"isLogin"}})],1)]),t.isLogin?n("div",{staticClass:"w-100"},[n("div",{staticClass:"container-fluid"},[n("section",{staticClass:"mt-1r mb-6r",attrs:{id:"readme"}},[n("ModuleLoader",{attrs:{node:{id:"_readme"}}})],1),n("section",{staticClass:"mt-1r mb-6r",attrs:{id:"news"}},[n("h2",{staticClass:"p-3 mt-0 mb-4 bg-info text-white"},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"newspaper"}}),t._v("News Data")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("ul",{staticClass:"list-group"},t._l(t.news,(function(e,o){return n("li",{staticClass:"list-group-item list-group-item-action d-flex justify-content-between"},[n("span",{staticClass:"mr-2",domProps:{innerHTML:t._s(e.date||"0000-00-00")}}),n("span",{staticClass:"mr-2"},[t._v(":")]),n("span",{staticClass:"mr-2",domProps:{innerHTML:t._s(e.title||"{no title}")}}),n("label",{staticClass:"mr-2"},[n("select",{staticClass:"form-control form-control-sm",domProps:{value:e.option&&e.option.tag},on:{change:function(n){return t.changeItemTag(o,e,n.target.value)}}},[n("option",{attrs:{value:"活動報告"}},[t._v("活動報告")]),n("option",{attrs:{value:"お知らせ"}},[t._v("お知らせ")])])]),n("NuxtLink",{staticClass:"mr-auto",attrs:{to:{path:"/--molle/editer",query:{pageId:o,edit:"true"}}}},[n("span",{domProps:{innerHTML:t._s(e.path+"/")}}),n("b-icon",{attrs:{icon:"chevron-right"}})],1),n("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(e){return t.deletePage(o)}}},[t._v("Delete")])],1)})),0)]),n("div",{staticClass:"col-4"},[n("div",{staticClass:"card position-sticky",staticStyle:{top:"0"}},[n("div",{staticClass:"card-header"},[n("h3",{staticClass:"mt-0"},[n("b-icon",{attrs:{icon:"file-earmark-plus"}}),t._v("Add Page")],1)]),n("div",{staticClass:"card-body"},[n("p",[n("label",{staticClass:"mr-2"},[n("span",[t._v("日付")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.addNewsObj.date,expression:"addNewsObj.date"}],staticClass:"form-control",attrs:{type:"date"},domProps:{value:t.addNewsObj.date},on:{input:function(e){e.target.composing||t.$set(t.addNewsObj,"date",e.target.value)}}})]),n("label",{staticClass:"mr-2"},[n("span",[t._v("タグ")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.addNewsObj.option.tag,expression:"addNewsObj.option.tag"}],staticClass:"form-control",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.addNewsObj.option,"tag",e.target.multiple?n:n[0])}}},[n("option",{attrs:{value:"活動報告"}},[t._v("活動報告")]),n("option",{attrs:{value:"お知らせ"}},[t._v("お知らせ")])])]),n("label",{staticClass:"mr-2"},[n("span",[t._v("ディレクトリ名 (Option 変更不可)")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.addNewsObj.id,expression:"addNewsObj.id"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.addNewsObj.date},domProps:{value:t.addNewsObj.id},on:{input:function(e){e.target.composing||t.$set(t.addNewsObj,"id",e.target.value)}}})])]),n("p",[n("label",{staticClass:"w-100 mr-2"},[n("span",[t._v("タイトル")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.addNewsObj.title,expression:"addNewsObj.title"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.addNewsObj.title},on:{input:function(e){e.target.composing||t.$set(t.addNewsObj,"title",e.target.value)}}})])]),n("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"button",disabled:""===t.addNewsObj.date||""===t.addNewsObj.title},on:{click:t.addNews}},[t._v("Add")])])])])])]),n("section",{staticClass:"mt-1r mb-6r",attrs:{id:"universal"}},[n("h2",{staticClass:"p-3 mt-0 mb-4 bg-info text-white"},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"file-earmark"}}),t._v("Universal pages")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("ul",{staticClass:"list-group"},t._l(t.pages,(function(e,o){return n("li",{staticClass:"list-group-item list-group-item-action d-flex justify-content-between"},[n("span",{staticClass:"mr-2",domProps:{innerHTML:t._s(e.date||"0000-00-00")}}),n("span",{staticClass:"mr-2"},[t._v(":")]),n("span",{staticClass:"mr-2",domProps:{innerHTML:t._s(e.title||"{no title}")}}),n("NuxtLink",{staticClass:"mr-auto",attrs:{to:{path:"/--molle/editer",query:{pageId:o,edit:"true"}}}},[n("span",{domProps:{innerHTML:t._s(e.path)}}),n("b-icon",{attrs:{icon:"chevron-right"}})],1),n("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(e){return t.deletePage(o)}}},[t._v("Delete")])],1)})),0)]),n("div",{staticClass:"col-4"},[n("div",{staticClass:"card position-sticky",staticStyle:{top:"0"}},[n("div",{staticClass:"card-header"},[n("h3",{staticClass:"mt-0"},[n("b-icon",{attrs:{icon:"file-earmark-plus"}}),t._v("Add Page")],1)]),n("div",{staticClass:"card-body"},[n("label",[t._v("Path *"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.added.path,expression:"added.path"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.added.path},on:{input:function(e){e.target.composing||t.$set(t.added,"path",e.target.value)}}})]),n("label",[t._v("Box id (Option)"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.added.itemId,expression:"added.itemId"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.added.itemId},on:{input:function(e){e.target.composing||t.$set(t.added,"itemId",e.target.value)}}})]),n("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"button",disabled:""===t.added.path},on:{click:t.addPage}},[t._v("Add")])])])])])]),n("section",{staticClass:"mt-1r mb-6r"},[n("h2",{staticClass:"p-3 mt-0 mb-4 text-white bg-success"},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"tools"}}),t._v("MOLLE DEVELOP")],1),n("h4",{staticClass:"mb-2"},[t._v("ADDED/追加された機能")]),t._m(1),n("h4",{staticClass:"mb-2"},[t._v("READY/追加可能機能")]),t._m(2),n("h4",{staticClass:"mb-2"},[t._v("TODO")]),t._m(3)])])]):t._e()])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{staticClass:"text-info mt-0"},[n("span",{staticClass:"text-nowrap"},[t._v("MOdular")]),n("span",{staticClass:"text-nowrap"},[t._v("Light")]),n("span",{staticClass:"text-nowrap"},[t._v("Layout")]),n("span",{staticClass:"text-nowrap"},[t._v("Easy")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("自動デプロイ機能 new!")]),n("li",[t._v("未使用モジュールの一括削除")]),n("li",[t._v("管理画面のデザイン変更")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("テキストエディタ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("変更ログ・アンドゥ")]),n("li",[t._v("モジュール入れ替え(loop注意)")]),n("li",[t._v("継承・拡張")]),n("li",[t._v("itemData内に使用されているmodule-idを管理")]),n("li",[t._v("データ連携モジュール")]),n("li",[t._v("カスタムセット登録")]),n("li",[t._v("firebaseに上げた画像をdeploy時にhostingサーバーに移動させるOption")])])}],!1,null,null,null));e.default=k.exports}}]);