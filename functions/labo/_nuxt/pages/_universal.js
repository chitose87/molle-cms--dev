(window.webpackJsonp=window.webpackJsonp||[]).push([[10,2,3],{317:function(t,e,n){},318:function(t,e,n){},319:function(t,e,n){"use strict";n(317)},320:function(t,e,n){"use strict";n(318)},321:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(9),c=n(18),o=(n(8),n(72),n(7),n(24)),l=function(){function t(){Object(r.a)(this,t)}return Object(c.a)(t,null,[{key:"setMeta",value:function(t){var e={title:"",meta:[]};return e.title=t.title||t.displayTitle||"",t.description&&e.meta.push({hid:"description",name:"description",content:t.description},{hid:"og:description",property:"og:description",content:t.description}),t.ogpImg&&e.meta.push({hid:"og:image",property:"og:image",content:t.ogpImg},{hid:"twitter:image",property:"twitter:image",content:t.ogpImg}),t.ogpImg&&e.meta.push({hid:"og:image",property:"og:image",content:t.ogpImg},{hid:"twitter:image",property:"twitter:image",content:t.ogpImg}),e}},{key:"getPageData",value:function(t){return t.$nuxt.context.isDev,o.a.getCurrentPageData(t.$route)}},{key:"getPageList",value:function(t,e,n,r){var c=[];function l(t,e){var n=e&&e.sort||"asc",r=e&&e.attr;return t.sort((function(a,b){return r?a[r]<b[r]==("desc"==n)?1:-1:a<b==("desc"==n)?1:-1})),e&&e.max&&e.max<t.length&&(t.length=e.max),t}e.isDev,o.a.firebaseInit((function(){o.a.pagesRef.onSnapshot((function(e){e.forEach((function(e){var n=e.data();0==n.path.indexOf(t+"/")&&c.push(n)})),l(c,r),n(c)}))}))}}]),t}()},322:function(t,e,n){"use strict";n.r(e);n(21);var r=n(9),c=n(18),o=n(13),l=n(14),f=n(4),d=n(12),h=(n(3),n(5));function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var m=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},v=function(t){Object(o.a)(n,t);var e=_(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).isMenuOpen=!1,t}return Object(c.a)(n,[{key:"mounted",value:function(){}}]),n}(h.Vue),y=v=m([Object(h.Component)({components:{}})],v),O=(n(319),n(15)),component=Object(O.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"global-header",attrs:{"aria-expanded":t.isMenuOpen}},[t._m(0),n("div",{staticClass:"global-header__menu"},[n("button",{staticClass:"global-header__menu__btn isSp",attrs:{type:"button"},on:{click:function(){return t.isMenuOpen=!t.isMenuOpen}}},[n("span",{staticClass:"global-header__menu__btn__line"}),n("span",{staticClass:"global-header__menu__btn__label"})]),t._m(1)])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"company-name",attrs:{href:"/"}},[n("span",[t._v("LOGO")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"global-header__menu__body"},[n("li",{staticClass:"global-header__menu__item"},[n("a",{attrs:{href:"/about"}},[n("span",[t._v("About")])])]),n("li",{staticClass:"global-header__menu__item"},[n("a",{attrs:{href:"/news"}},[n("span",[t._v(" News")])])]),n("li",{staticClass:"global-header__menu__item"},[n("a",{attrs:{href:"/qa"}},[n("span",[t._v(" Q&A")])])]),n("li",{staticClass:"global-header__menu__item"},[n("a",{attrs:{href:"/contact"}},[n("span",[t._v(" Contact")])])])])}],!1,null,null,null);e.default=component.exports},323:function(t,e,n){"use strict";n.r(e);n(21);var r=n(9),c=n(13),o=n(14),l=n(4),f=n(12),d=(n(3),n(5));function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var c=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(o.a)(this,n)}}var _=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},m=function(t){Object(c.a)(n,t);var e=h(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return n}(d.Vue);m.MOLLE_DELETE_WITH_STATIC_MODE=!0;var v=m=_([Object(d.Component)({components:{}})],m),y=(n(320),n(15)),component=Object(y.a)(v,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"global-footer"},[n("small",[t._v("Copyright © All Rights Reserved.")])])}],!1,null,null,null);e.default=component.exports},324:function(t,e,n){},327:function(t,e,n){"use strict";n(324)},329:function(t,e,n){"use strict";n.r(e);n(21);var r=n(44),c=n(9),o=n(18),l=n(13),f=n(14),d=n(4),h=n(12),_=(n(75),n(3),n(5)),m=n(321);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var c=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var y=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},O=function(t){Object(l.a)(f,t);var e,n=v(f);function f(){var t;return Object(c.a)(this,f),(t=n.apply(this,arguments)).pageData={},t}return Object(o.a)(f,[{key:"fetch",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.t1=this,t.next=4,m.a.getPageData(this);case 4:if(t.t2=t.sent,t.t2){t.next=7;break}t.t2=this.pageDataByEditer;case 7:t.t3=t.t2,t.t0.$set.call(t.t0,t.t1,"pageData",t.t3);case 9:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"head",value:function(){return m.a.setMeta(this.pageData||this.pageDataByEditer)}}]),f}(_.Vue);y([Object(_.Prop)({default:function(){return{}}})],O.prototype,"pageDataByEditer",void 0);var j=O=y([Object(_.Component)({components:{}})],O),R=(n(327),n(15)),component=Object(R.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"l-body universal"},[n("GlobalHeaderComp"),n("article",{staticClass:"l-content"},[n("Headline",{attrs:{static__value:t.pageData.displayTitle||t.pageData.title,static__option:{lv:"h2"}}}),t.pageData.itemId?n("ModuleLoader",{attrs:{node:{id:t.pageData.itemId}}}):t._e()],1),n("GlobalFooterComp")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{GlobalHeaderComp:n(322).default,GlobalFooterComp:n(323).default})}}]);