(window.webpackJsonp=window.webpackJsonp||[]).push([[10,3,4],{366:function(t,e,n){},367:function(t,e,n){},368:function(t,e,n){"use strict";n(366)},369:function(t,e,n){"use strict";n(367)},370:function(t,e,n){"use strict";n.r(e);n(16);var r=n(6),o=n(17),c=n(8),l=n(9),f=n(4),d=n(7),h=(n(5),n(3));function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},m=function(t){Object(c.a)(n,t);var e=v(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).isMenuOpen=!1,t}return Object(o.a)(n,[{key:"mounted",value:function(){}}]),n}(h.Vue),O=m=y([Object(h.Component)({components:{}})],m),j=(n(368),n(10)),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"global-header",attrs:{"aria-expanded":t.isMenuOpen}},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"global-header__body"},[t._m(0),n("button",{staticClass:"global-header__toggle",attrs:{type:"button","aria-label":"Menu"},on:{click:function(){return t.isMenuOpen=!t.isMenuOpen}}},[n("span",{staticClass:"global-header__toggle__line"}),n("span",{staticClass:"global-header__toggle__label"})]),n("ModuleLoader",{attrs:{node:{id:"--no-export%2Fglobal_header"}}})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"company-name",attrs:{href:"/"}},[e("img",{attrs:{src:"/img/nct-logo.gif",width:"260px",height:"44px",alt:"日本コムシンク株式会社"}})])}],!1,null,null,null);e.default=component.exports},371:function(t,e,n){"use strict";n.r(e);n(16);var r=n(6),o=n(8),c=n(9),l=n(4),f=n(7),d=(n(5),n(3));function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var v=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},y=function(t){Object(o.a)(n,t);var e=h(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return n}(d.Vue),m=y=v([Object(d.Component)({components:{}})],y),O=(n(369),n(10)),component=Object(O.a)(m,(function(){var t=this.$createElement,e=this._self._c||t;return e("footer",{staticClass:"global-footer"},[e("ModuleLoader",{staticClass:"global-footer__body",attrs:{node:{id:"--no-export%2Fglobal_footer"}}})],1)}),[],!1,null,null,null);e.default=component.exports},372:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(6),o=n(17),c=(n(13),n(65),n(11),n(25),n(43),n(18)),l=function(){function t(){Object(r.a)(this,t)}return Object(o.a)(t,null,[{key:"setMeta",value:function(t){var e={title:"",meta:[],link:[]};return e.title=t.title||t.displayTitle||"",t.description&&e.meta.push({hid:"description",name:"description",content:t.description},{hid:"og:description",property:"og:description",content:t.description}),t.ogpImg&&e.meta.push({hid:"og:image",property:"og:image",content:t.ogpImg},{hid:"twitter:image",property:"twitter:image",content:t.ogpImg}),t.cssPlugin&&t.cssPlugin.split(/\r\n|\n/).forEach((function(t){e.link.push({rel:"stylesheet",href:t})})),e}},{key:"getPageData",value:function(t){return t.$nuxt.context.isDev,c.a.getCurrentPageData(t.$route)}},{key:"getPageList",value:function(t,e,n,r){var o=[];function l(t,e){var n=e&&e.sort||"asc",r=e&&e.attr;return t.sort((function(a,b){return r?a[r]<b[r]==("desc"==n)?1:-1:a<b==("desc"==n)?1:-1})),e&&e.max&&e.max<t.length&&(t.length=e.max),t}e.isDev,c.a.firebaseInit((function(){c.a.pagesRef.onSnapshot((function(e){e.forEach((function(e){var n=e.data();0==n.path.indexOf(t+"/")&&o.push(n)})),l(o,r),n(o)}))}))}}]),t}()},414:function(t,e,n){"use strict";n.r(e);n(16);var r=n(47),o=n(6),c=n(17),l=n(8),f=n(9),d=n(4),h=n(7),v=(n(81),n(5),n(3)),y=n(372);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var O=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},j=function(t){Object(l.a)(f,t);var e,n=m(f);function f(){var t;return Object(o.a)(this,f),(t=n.apply(this,arguments)).pageData={},t}return Object(c.a)(f,[{key:"fetch",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.t1=this,t.next=4,y.a.getPageData(this);case 4:if(t.t2=t.sent,t.t2){t.next=7;break}t.t2=this.pageDataByEditer;case 7:t.t3=t.t2,t.t0.$set.call(t.t0,t.t1,"pageData",t.t3);case 9:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"head",value:function(){return y.a.setMeta(this.pageData||this.pageDataByEditer)}}]),f}(v.Vue);O([Object(v.Prop)({default:function(){return{}}})],j.prototype,"pageDataByEditer",void 0);var R=j=O([Object(v.Component)({components:{}})],j),_=n(10),component=Object(_.a)(R,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"l-body universal",class:t.pageData.theme?"theme--"+t.pageData.theme:""},[n("GlobalHeaderComp",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]}),n("MolleEditerComp"),n("main",[n("article",{staticClass:"l-content"},[t.pageData.itemId?n("ModuleLoader",{attrs:{node:{id:t.pageData.itemId}}}):t._e()],1)]),n("GlobalFooterComp",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{GlobalHeaderComp:n(370).default,GlobalFooterComp:n(371).default})}}]);