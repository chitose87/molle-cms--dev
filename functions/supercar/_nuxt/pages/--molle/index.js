(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{382:function(t,e,n){"use strict";(function(t){n(16);var o=n(45),r=n(5),c=n(17),l=n(8),d=n(9),f=n(4),v=n(7),m=(n(6),n(36),n(27),n(11),n(52),n(58),n(169),n(14),n(79),n(67),n(74),n(33),n(2)),h=n(29),y=n(18),_=n(21),O=n(411);function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(d.a)(this,n)}}var C=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},w=function(e){Object(l.a)(d,e);var n=j(d);function d(){var t;return Object(r.a)(this,d),(t=n.apply(this,arguments)).importModal=!1,t.deployModal=!1,t.currentCIFlow={},t.schedule={min:"",date:"",active:!1},t.cleanupStr="",t}return Object(c.a)(d,[{key:"onLogout",value:function(){h.a.auth().signOut()}},{key:"checkCI",value:function(){var e=this;this.deployModal=!0,this.$set(this,"currentCIFlow",{reading:!0}),fetch("".concat(t.env.functions,"/").concat("japansupercar","_ghStatus")).then((function(t){return t.json()})).then((function(t){var n=JSON.parse(t);console.log(n),e.$set(e,"currentCIFlow",n.workflow_runs[0])})),y.a.systemDocRef.get().then((function(t){var data=t.data();e.$set(e.schedule,"date",data.deploySchedule),e.$set(e.schedule,"active",data.deployScheduleActive)}))}},{key:"scheduleUpdate",value:function(){y.a.systemDocRef.update({deploySchedule:this.schedule.date,deployScheduleActive:this.schedule.active})}},{key:"deployQue",value:function(){this.deployModal=!1,y.a.systemDocRef.update({deployQue:!0})}},{key:"onExport",value:function(){y.a.pagesRef.get().then((function(t){var e={pages:{}};t.forEach((function(t){e.pages[t.id]=t.data()}));var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"text/plain"})),a.download="".concat("japansupercar","-").concat("v1","-pages-").concat((new Date).toUTCString(),".json"),a.click()})),y.a.itemsRef.get().then((function(t){var e={items:{}};t.forEach((function(t){var n=t.data();e.items[t.id]=n}));var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:"application/json"})),a.download="".concat("japansupercar","-").concat("v1","-items-").concat((new Date).toUTCString(),".json"),a.click()}))}},{key:"onImport",value:function(t){var e=t.target.files.files;if(0!=e.length){if(window.confirm("\nこの作業は破壊的な変更です。\n同一のIDの場合、既存のデータがすべて上書きされます。\n重複するjsonデータを読み込む場合、優先順位に規則性はありません。\nよろしいですか？")){for(var n=[],o=[],r=function(i){o.push(new Promise((function(t,o){var r=new FileReader;r.onload=function(e){try{var data=JSON.parse(e.target.result),o=data.pages||data.items,r=data.pages?y.a.pagesRef:data.items?y.a.itemsRef:new Error;for(var c in o)n.push({cmd:"set",ref:r.doc(c),data:o[c]});t()}catch(e){alert(e)}},r.readAsText(e[i])})))},i=0;i<e.length;i++)r(i);Promise.all(o).then((function(){console.log(n.length),_.a.updateBatch(n).then((function(){alert("complete")}))}))}}else alert("ファイルが選択されていません。")}},{key:"cleanup",value:function(){console.log("cleanup");var t=[];Promise.all([y.a.pagesRef.get(),y.a.itemsRef.get(),y.a.logsRef.get()]).then((function(e){var n=Object(o.a)(e,3),r=n[0],c=n[1],l=n[2],d={},f={};for(var v in c.forEach((function(t){d[t.id]=t.data(),d[t.id]._count=0})),d){var m=d[v],h=!1;if("children"==m.type||"group"==m.type){for(var i in m.value){var O=m.value[i],j=O.id||O;d[j]&&(d[j]._count+=1),"string"==typeof O&&(m.value[i]={id:O},h=!0)}h&&t.push({cmd:"update",ref:y.a.itemsRef.doc(v),data:{value:m.value}})}}r.forEach((function(t){var e=t.data();f[t.id]=e,d[e.itemId]&&(d[e.itemId]._count+=1)})),console.log(Object.keys(d).length);for(var C=!0;C;)for(var w in C=!1,d){var x=d[w];if(!x._count){if(console.log("delete",w),"children"==x.type||"group"==x.type)for(var R in x.value){var k=x.value[R],P=k.id||k;d[P]&&(d[P]._count-=1)}t.push({cmd:"delete",ref:y.a.itemsRef.doc(w)}),delete d[w],C=!0}}var $={};for(var E in l.forEach((function(e){var data=e.data();data.id&&d[data.id]?($[data.id]||($[data.id]=[]),data.refId=e.id,$[data.id].push(data)):t.push({cmd:"delete",ref:y.a.logsRef.doc(e.id)})})),$){var S=$[E];S.sort((function(a,b){return a.timestamp<b.timestamp?1:-1}));for(var D=S[0],I=void 0,L=1;L<S.length;L++){var M=S[L];D.uid==M.uid&&D.timestamp-M.timestamp<10||L>100?(L<100&&(I||(I=D),I.data=Object.assign(M.data,I.data)),S.splice(L,1),t.push({cmd:"delete",ref:y.a.logsRef.doc(M.refId)}),L--):I&&(t.push({cmd:"update",ref:y.a.logsRef.doc(I.refId),data:{data:I.data}}),I=null),D=M}}console.log(t.length),t.length?_.a.updateBatch(t).then((function(){alert("完了しました。結果はconsoleを確認してください")})):alert("未参照のitemはありませんでした。")}))}},{key:"cleanupStorage",value:function(){Promise.all([y.a.pagesRef.get(),y.a.itemsRef.get(),h.a.storage().ref().child("".concat("japansupercar")).listAll()]).then((function(t){var e=Object(o.a)(t,3),n=e[0],r=e[1],c=e[2],l=[];r.forEach((function(t){l.push(t.data())})),n.forEach((function(t){l.push(t.data())}));var d=JSON.stringify({data:l}),f=[];c.items.forEach((function(t){d.includes(t.fullPath)||(f.push(t.fullPath),console.log("------"+t.fullPath))})),c.items.forEach((function(t){d.includes(t.fullPath)||t.delete()}))}))}}]),d}(m.Vue);w=C([Object(m.Component)({components:{UserSettings:O.a}})],w),e.a=w}).call(this,n(83))},386:function(t,e,n){},387:function(t,e,n){},388:function(t,e,n){},389:function(t,e,n){},390:function(t,e,n){},391:function(t,e,n){},392:function(t,e,n){},400:function(t,e,n){"use strict";n(386)},401:function(t,e,n){"use strict";n(387)},402:function(t,e,n){"use strict";n(388)},403:function(t,e,n){"use strict";n(389)},404:function(t,e,n){"use strict";n(390)},405:function(t,e,n){"use strict";n(391)},406:function(t,e,n){"use strict";n(392)},411:function(t,e,n){"use strict";n(16);var o=n(5),r=n(17),c=n(8),l=n(9),d=n(4),f=n(7),v=(n(6),n(25),n(92),n(2)),m=n(29);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},_=function(t){Object(c.a)(n,t);var e=h(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).usersRef=m.a.firestore().collection("_users/"),t.isShow=!1,t.user={uid:m.a.auth().currentUser.uid,email:m.a.auth().currentUser.email},t.before={},t.data={name:"",thumbnail:""},t}return Object(r.a)(n,[{key:"mounted",value:function(){var t=this;this.usersRef.doc(m.a.auth().currentUser.uid).get().then((function(e){if(!e.exists)return t.before={name:t.user.email.match(/(.*)(?=@)/)[1]},void t.usersRef.doc(m.a.auth().currentUser.uid).set(t.before);t.before=e.data(),t.$set(t,"data",t.before)}))}},{key:"save",value:function(){this.usersRef.doc(m.a.auth().currentUser.uid).update(this.data),this.before=this.data,this.isShow=!1}},{key:"cancel",value:function(){this.$set(this,"data",this.before||{}),this.isShow=!1}}]),n}(v.Vue),O=_=y([Object(v.Component)({components:{}})],_),j=(n(400),n(10)),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.data.thumbnail?n("div",[n("img",{attrs:{src:t.data.thumbnail,width:"144px",height:"144px",alt:"data.name||user.email"}})]):n("b-icon",{attrs:{icon:"person-fill"}}),n("p",{staticClass:"btn btn-link",on:{click:function(e){t.isShow=!0}}},[n("span",{domProps:{innerHTML:t._s(t.data.name||t.user.email)}})]),t.isShow?n("div",{staticClass:"modal"},[n("div",{staticClass:"modal__fiexd"},[n("div",{staticClass:"modal__close",on:{click:t.cancel}}),n("div",{staticClass:"modal__body"},[n("p",[n("label",{staticClass:"w-100"},[t._v("Name :"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.name,expression:"data.name"}],staticClass:"form-control form-control-lg",attrs:{type:"text"},domProps:{value:t.data.name},on:{input:function(e){e.target.composing||t.$set(t.data,"name",e.target.value)}}})])]),n("p",[n("label",{staticClass:"w-100"},[t._v("Thumbnail :"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.thumbnail,expression:"data.thumbnail"}],staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"https://"},domProps:{value:t.data.thumbnail},on:{input:function(e){e.target.composing||t.$set(t.data,"thumbnail",e.target.value)}}})])]),n("p",{staticClass:"caption",domProps:{innerHTML:t._s(t.user.email)}}),n("p",{staticClass:"caption",domProps:{innerHTML:t._s(t.user.uid)}}),n("button",{staticClass:"btn btn-primary btn-block",on:{click:t.save}},[n("span",[t._v("Save")])])])])]):t._e()],1)}),[],!1,null,null,null);e.a=component.exports},412:function(t,e,n){"use strict";n.r(e);n(16),n(34),n(36),n(40),n(68),n(52),n(13),n(66),n(75),n(58);var o=n(5),r=n(17),c=n(8),l=n(9),d=n(4),f=n(7),v=(n(6),n(11),n(67),n(74),n(2)),m=n(18),h=n(382).a,y=(n(401),n(10)),_=Object(y.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"molle-tool-bar"},[n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.checkCI}},[n("span",[t._v(t._s(t.$words.release)+" "+t._s(t.$words.settings))])]),t.deployModal?n("div",{staticClass:"modal"},[n("div",{staticClass:"modal__fiexd"},[n("div",{staticClass:"modal__close",on:{click:function(e){t.deployModal=!1}}}),n("div",{staticClass:"modal__body"},[n("button",{staticClass:"btn btn-warning",attrs:{type:"button"},on:{click:t.deployQue}},[n("span",[t._v(t._s(t.$words.immediate)+" "+t._s(t.$words.execution))])]),t._m(0),n("hr"),n("div",{staticClass:"form-inline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.schedule.date,expression:"schedule.date"}],staticClass:"form-control mr-2",attrs:{type:"date"},domProps:{value:t.schedule.date},on:{change:t.scheduleUpdate,input:function(e){e.target.composing||t.$set(t.schedule,"date",e.target.value)}}}),n("label",{staticClass:"btn btn-outline-primary"},[n("span",{staticClass:"mr-2"},[t._v(t._s(t.$words.reserve))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.schedule.active,expression:"schedule.active"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.schedule.active)?t._i(t.schedule.active,null)>-1:t.schedule.active},on:{change:[function(e){var n=t.schedule.active,o=e.target,r=!!o.checked;if(Array.isArray(n)){var c=t._i(n,null);o.checked?c<0&&t.$set(t.schedule,"active",n.concat([null])):c>-1&&t.$set(t.schedule,"active",n.slice(0,c).concat(n.slice(c+1)))}else t.$set(t.schedule,"active",r)},t.scheduleUpdate]}})])]),n("p",{staticClass:"caption"},[t._v("*指定日の朝9時頃に実行されます。")]),n("hr"),n("h4",[t._v("Github "+t._s(t.$words.actions)+" "+t._s(t.$words.status)+".")]),t.currentCIFlow.reading?n("div",[n("p",[t._v(t._s(t.$words.checking)+"…")])]):n("div",[n("p",[n("span",[t._v(t._s(t.$words.task)+"：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.name)}})]),n("p",[n("span",[t._v(t._s(t.$words.status)+"：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.status)}})]),n("p",[n("span",[t._v(t._s(t.$words.conclusion)+"：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.conclusion)}})]),n("p",[n("span",[t._v(t._s(t.$words.date)+"：")]),n("span",{domProps:{innerHTML:t._s(t.currentCIFlow.created_at)}})])])])])]):t._e()]),n("hr"),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-info btn-block",attrs:{type:"button"},on:{click:t.onExport}},[n("span",[t._v(t._s(t.$words.export))])])]),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-warning btn-block",attrs:{type:"submit"},on:{click:function(e){t.importModal=!0}}},[n("span",[t._v(t._s(t.$words.import))])]),t.importModal?n("div",{staticClass:"modal"},[n("div",{staticClass:"modal__fiexd"},[n("div",{staticClass:"modal__close",on:{click:function(e){t.importModal=!1}}}),n("div",{staticClass:"modal__body"},[n("form",{on:{submit:[function(t){t.preventDefault()},t.onImport]}},[n("input",{attrs:{type:"file",name:"files",accept:"application/json",multiple:""}}),n("button",{staticClass:"btn btn-info",attrs:{type:"submit"}},[n("span",[t._v(t._s(t.$words.import))])])])])])]):t._e()]),n("hr"),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-danger btn-block",on:{click:t.cleanup}},[n("span",[t._v(t._s(t.$words.dataClean))])])]),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-danger btn-block",on:{click:t.cleanupStorage}},[n("span",[t._v("Cleanup Storage")])])]),n("div",{staticClass:"mb-2"},[n("button",{staticClass:"btn btn-info btn-block",attrs:{type:"button"},on:{click:t.onLogout}},[n("span",[t._v(t._s(t.$words.logout))])]),n("UserSettings")],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"caption"},[t._v("5~10分程度かかります。"),n("br"),t._v("1日あたり100分を超えると料金が発生します。")])}],!1,null,null,null).exports;function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var j=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},C=function(t){Object(c.a)(n,t);var e=O(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"created",value:function(){}},{key:"mounted",value:function(){}},{key:"updatePage",value:function(t,e){m.a.pagesRef.doc(t).update(e)}},{key:"deletePage",value:function(t){m.a.pagesRef.doc(t).delete()}}]),n}(v.Vue);j([Object(v.Prop)()],C.prototype,"pages",void 0);var w=C=j([Object(v.Component)({components:{}})],C),x=(n(402),Object(y.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"item-list-view-comp"},[n("thead",[n("tr",[n("th",{attrs:{scope:"col"}},[t._v("Path")]),n("th",{attrs:{scope:"col"}},[t._v("Title")]),n("th",{attrs:{scope:"col"}}),n("th",{attrs:{scope:"col"}},[t._v(t._s(t.$words.donotExport))]),n("th",{attrs:{scope:"col"}},[t._v(t._s(t.$words.delete))])])]),n("tbody",t._l(t.pages,(function(e,o){return n("tr",[n("th",{attrs:{scope:"row"}},[n("a",{staticClass:"mr-2",attrs:{href:"/"+e.path+"?edit=true"}},[n("span",{domProps:{innerHTML:t._s(e.path)}}),n("b-icon",{attrs:{icon:"chevron-right"}})],1)]),n("td",[n("span",{staticClass:"mr-2 ml-auto",domProps:{innerHTML:t._s(e.title||"{no title}")}})]),n("td",[e.date?n("div",[n("span",{staticClass:"mr-2"},[t._v(":")]),n("span",{staticClass:"mr-2",domProps:{innerHTML:t._s(e.date)}})]):t._e()]),n("td",[n("label",{staticClass:"small form-inline justify-content-center"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.noExport,expression:"item.noExport"}],staticClass:"form-control form-control-sm",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.noExport)?t._i(e.noExport,null)>-1:e.noExport},on:{change:[function(n){var o=e.noExport,r=n.target,c=!!r.checked;if(Array.isArray(o)){var l=t._i(o,null);r.checked?l<0&&t.$set(e,"noExport",o.concat([null])):l>-1&&t.$set(e,"noExport",o.slice(0,l).concat(o.slice(l+1)))}else t.$set(e,"noExport",c)},function(n){return t.updatePage(o,e)}]}})])]),n("td",{staticClass:"text-center"},[n("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return t.deletePage(o)}}},[t._v(t._s(t.$words.delete))])])])})),0)])}),[],!1,null,null,null).exports),R=n(21);function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var P=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},$=function(t){Object(c.a)(n,t);var e=k(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).dataObj={id:"",date:"",title:"",itemId:"",option:{}},t}return Object(r.a)(n,[{key:"created",value:function(){}},{key:"mounted",value:function(){}},{key:"add",value:function(){var path=this.prefix+(this.dataObj.id||this.dataObj.date),t=encodeURIComponent(path),e=this.dataObj.itemId||t;m.a.pagesRef.doc(t).set({path:path,itemId:e,title:this.dataObj.title,date:this.dataObj.date,noExport:"--no-export/"==this.prefix}),R.a.updateItem(e,this.$molleModules.Box.def,!0),window.open("/"+this.prefix+(this.dataObj.id||this.dataObj.date)+"?edit=true","_blank")}}]),n}(v.Vue);P([Object(v.Prop)({default:""})],$.prototype,"prefix",void 0),P([Object(v.Prop)({default:!1})],$.prototype,"isDateField",void 0),P([Object(v.Prop)()],$.prototype,"tags",void 0);var E=$=P([Object(v.Component)({components:{}})],$),S=(n(403),Object(y.a)(E,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card"},[n("div",{staticClass:"card-header"},[n("h3",{staticClass:"mt-0"},[n("b-icon",{attrs:{icon:"file-earmark-plus"}}),t._v(t._s(t.$words.add))],1)]),n("div",{staticClass:"card-body"},[t.isDateField?n("p",[n("label",{staticClass:"form-inline"},[n("span",{staticClass:"mr-2"},[t._v("日付:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.dataObj.date,expression:"dataObj.date"}],staticClass:"form-control",attrs:{type:"date"},domProps:{value:t.dataObj.date},on:{input:function(e){e.target.composing||t.$set(t.dataObj,"date",e.target.value)}}})])]):t._e(),n("p",[n("label",{staticClass:"form-inline"},[n("span",{staticClass:"mr-2"},[t._v("ディレクトリ指定:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.dataObj.id,expression:"dataObj.id"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.dataObj.id},on:{input:function(e){e.target.composing||t.$set(t.dataObj,"id",e.target.value)}}})])]),t.tags?n("p",[n("label",{staticClass:"form-inline"},[n("span",{staticClass:"mr-2"},[t._v("タグ:")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.dataObj.option.tag,expression:"dataObj.option.tag"}],staticClass:"form-control",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.dataObj.option,"tag",e.target.multiple?n:n[0])}}},t._l(t.tags,(function(e){return n("option",{domProps:{value:Object.keys(e)[0],innerHTML:t._s(e[Object.keys(e)[0]])}})})),0)])]):t._e(),n("p",[n("label",{staticClass:"form-inline"},[n("span",{staticClass:"mr-2"},[t._v("Box id (Option):")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.dataObj.itemId,expression:"dataObj.itemId"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.dataObj.itemId},on:{input:function(e){e.target.composing||t.$set(t.dataObj,"itemId",e.target.value)}}})])]),n("p",[n("label",{staticClass:"w-100 mr-2"},[n("span",[t._v("タイトル:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.dataObj.title,expression:"dataObj.title"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.dataObj.title},on:{input:function(e){e.target.composing||t.$set(t.dataObj,"title",e.target.value)}}})])]),n("p",{staticClass:"mb-1"},[n("span",{staticClass:"mr-2"},[t._v("生成Path :")]),n("span",[t._v("/"+t._s(t.prefix+(t.dataObj.id||t.dataObj.date||"***")))])]),n("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"button",disabled:""===t.dataObj.date&&""===t.dataObj.id},on:{click:t.add}},[t._v(t._s(t.$words.add))])])])}),[],!1,null,null,null).exports),D=n(29);function I(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var L=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},M=function(t){Object(c.a)(n,t);var e=I(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).flag=!1,t.inited=!1,t.users={},t.uid=D.a.auth().currentUser.uid,t.selfUserData={name:""},t}return Object(r.a)(n,[{key:"onOpen",value:function(){this.inited||(this.inited=!0,D.a.firestore().doc("_settings/options").onSnapshot((function(t){console.log(t.data())})))}},{key:"onChangeUserName",value:function(){var t={};t[this.uid]=this.selfUserData,D.a.firestore().doc("_settings/users").update(t)}}]),n}(v.Vue);L([Object(v.Watch)("flag")],M.prototype,"onOpen",null);var U=M=L([Object(v.Component)({components:{}})],M),A=(n(404),Object(y.a)(U,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"project-settings-comp"},[n("h2",{staticClass:"p-3 mt-0 mb-4 text-white bg-success",on:{click:function(e){t.flag=!t.flag}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"tools"}}),t._v(t._s(t.$words.project)+" "+t._s(t.$words.settings)),n("b-icon",{attrs:{icon:t.flag?"chevron-up":"chevron-down"}})],1),t.flag?n("div",[n("div",[n("span",{domProps:{innerHTML:t._s(t.uid)}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.selfUserData.name,expression:"selfUserData.name"}],staticClass:"form-control form-control-sm",attrs:{type:"text"},domProps:{value:t.selfUserData.name},on:{change:function(){t.onChangeUserName()},input:function(e){e.target.composing||t.$set(t.selfUserData,"name",e.target.value)}}})]),n("h4",{staticClass:"mb-2"},[t._v("ADDED/追加された機能")]),t._m(0),n("h4",{staticClass:"mb-2"},[t._v("READY/追加可能機能")]),n("h4",{staticClass:"mb-2"},[t._v("TODO")]),t._m(1)]):t._e()])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("自動デプロイ機能 new!")]),n("li",[t._v("未使用モジュールの一括削除")]),n("li",[t._v("管理画面のデザイン変更")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("変更ログ・アンドゥ")]),n("li",[t._v("モジュール入れ替え(loop注意)")]),n("li",[t._v("継承・拡張")]),n("li",[t._v("itemData内に使用されているmodule-idを管理")]),n("li",[t._v("データ連携モジュール")]),n("li",[t._v("カスタムセット登録")]),n("li",[t._v("firebaseに上げた画像をdeploy時にhostingサーバーに移動させるOption")])])}],!1,null,null,null).exports),N=n(32);n(27),n(79);function B(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var T=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},F=function(t){Object(c.a)(n,t);var e=B(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).flag=!1,t.inited=!1,t.addObj={id:"",value:""},t.datalist=[],t}return Object(r.a)(n,[{key:"onOpen",value:function(){var t=this;this.inited||(this.inited=!0,m.a.systemDocRef.onSnapshot((function(e){var n=e.data();t.$set(t,"datalist",n.datalist||[])})))}},{key:"add",value:function(){m.a.systemDocRef.update("datalist",[Object.assign({},this.addObj)].concat(Object(N.a)(this.datalist))),this.addObj.id="",this.addObj.value=""}},{key:"onDelete",value:function(i){console.log(i);var t=this.datalist.concat();t.splice(i,1),m.a.systemDocRef.update("datalist",t)}},{key:"update",value:function(){m.a.systemDocRef.update("datalist",this.datalist)}}]),n}(v.Vue);T([Object(v.Watch)("flag")],F.prototype,"onOpen",null);var H=F=T([Object(v.Component)({components:{}})],F),V=(n(405),Object(y.a)(H,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"site-settings-comp"},[n("h2",{staticClass:"p-3 mt-0 mb-4 text-white bg-success",on:{click:function(e){t.flag=!t.flag}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"tools"}}),t._v(t._s(t.$words.site)+" "+t._s(t.$words.settings)),n("b-icon",{attrs:{icon:t.flag?"chevron-up":"chevron-down"}})],1),t.flag?n("div",[n("h3",[t._v("単語帳")]),n("table",{staticClass:"item-list-view-comp"},[t._m(0),n("tbody",[n("tr",[n("th",{attrs:{scope:"row"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.addObj.id,expression:"addObj.id"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.addObj.id},on:{input:function(e){e.target.composing||t.$set(t.addObj,"id",e.target.value)}}})]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.addObj.value,expression:"addObj.value"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.addObj.value},on:{input:function(e){e.target.composing||t.$set(t.addObj,"value",e.target.value)}}})]),n("td",[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.add}},[n("span",[t._v("Add")])])])]),t._l(t.datalist,(function(e,i){return n("tr",[n("th",{attrs:{scope:"row"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.id,expression:"item.id"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.id},on:{change:t.update,input:function(n){n.target.composing||t.$set(e,"id",n.target.value)}}})]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"item.value"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.value},on:{change:t.update,input:function(n){n.target.composing||t.$set(e,"value",n.target.value)}}})]),n("td",[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.onDelete(i)}}},[n("span",[t._v("Delete")])])])])}))],2)])]):t._e()])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{scope:"col"}},[t._v("ID ${ID}で使用")]),n("th",{attrs:{scope:"col"}},[t._v("Value")]),n("th",{attrs:{scope:"col"}})])])}],!1,null,null,null).exports),J=n(170);function Q(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return W(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return W(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,r=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw r}}}}function W(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function z(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(d.a)(t);if(e){var r=Object(d.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var G=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},Y=function(t){Object(c.a)(n,t);var e=z(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).version="0.8",t.pages={},t.profile={pages:[{id:"universal",prefix:"",icon:"file-earmark",label:"Universal"},{id:"noExport",prefix:"--no-export/",icon:"file-x",label:"非出力ページ"}]},t.isLogin=!1,t}return Object(r.a)(n,[{key:"head",value:function(){return{title:"[MOLLE]日本スーパーカー協会"}}},{key:"onLogin",value:function(){var t=this;this.isLogin&&m.a.pagesRef.onSnapshot((function(e){var n={universal:{}};e.forEach((function(e){var o,r=e.data(),c=!0,l=Q(t.profile.pages);try{for(l.s();!(o=l.n()).done;){var d=o.value;if(d.prefix&&r.path.includes(d.prefix,0)){n[d.id]||(n[d.id]={}),n[d.id][e.id]=r,c=!1;break}}}catch(t){l.e(t)}finally{l.f()}c&&(n.universal[e.id]=r)})),t.$set(t,"pages",n)}))}}]),n}(v.Vue);G([Object(v.Watch)("isLogin",{immediate:!0})],Y.prototype,"onLogin",null);var K=Y=G([Object(v.Component)({components:{MolleBase:J.a,IndexPageAddView:S,SiteSettingsComp:V,ProjectSettingsComp:A,IndexPageListView:x,MolleToolbar:_}})],Y),X=(n(406),Object(y.a)(K,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"molle-sys-ui bootstrap"},[n("MolleBase",{model:{value:t.isLogin,callback:function(e){t.isLogin=e},expression:"isLogin"}}),n("div",{staticClass:"d-flex flex-nowrap"},[n("div",{staticStyle:{width:"210px","z-index":"100"}},[n("div",{staticClass:"container-fluid position-sticky pt-3 pb-3",staticStyle:{top:"0"}},[t._m(0),n("p",{staticClass:"text-info"},[t._v("Contents Management System v"+t._s(t.version))]),n("hr"),t.isLogin?n("div",[n("ul",[n("li",[n("a",{staticClass:"btn-link",attrs:{href:"#readme"}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"book"}}),t._v(t._s(t.$words.readme))],1)]),t._l(t.profile.pages,(function(e){return n("li",[n("a",{staticClass:"btn-link",attrs:{href:"#"+e.id}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:e.icon}}),t._v(t._s(e.label))],1)])}))],2),n("MolleToolbar")],1):t._e()])]),t.isLogin?n("div",{staticClass:"w-100"},[n("div",{staticClass:"container-fluid"},[n("section",{staticClass:"mt-1r mb-6r",attrs:{id:"readme"}},[n("ModuleLoader",{attrs:{node:{id:"_readme"}}})],1),t._l(t.profile.pages,(function(e){return n("section",{staticClass:"mt-1r mb-6r",attrs:{id:e.id}},[n("h2",{staticClass:"p-3 mt-0 mb-4 bg-info text-white"},[n("b-icon",{staticClass:"mr-2",attrs:{icon:e.icon}}),t._v(t._s(e.label))],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("IndexPageListView",{attrs:{pages:t.pages[e.id]}})],1),n("div",{staticClass:"col-4"},[n("IndexPageAddView",{staticClass:"position-sticky",attrs:{prefix:e.prefix,isDateField:e.isDateField,tags:e.tags}})],1)])])})),n("section",{staticClass:"mt-1r mb-6r",attrs:{id:"site"}},[n("SiteSettingsComp")],1),n("section",{staticClass:"mt-1r mb-6r",attrs:{id:"project"}},[n("ProjectSettingsComp")],1)],2)]):t._e()])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{staticClass:"text-info mt-0"},[n("span",{staticClass:"text-nowrap"},[t._v("MOdular")]),n("span",{staticClass:"text-nowrap"},[t._v("Light")]),n("span",{staticClass:"text-nowrap"},[t._v("Layout")]),n("span",{staticClass:"text-nowrap"},[t._v("Easy")])])}],!1,null,null,null));e.default=X.exports}}]);