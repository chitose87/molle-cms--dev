(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{315:function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));var r=n(11),o=n(18),c=(n(8),n(68),n(7),n(24)),f=function(){function t(){Object(r.a)(this,t)}return Object(o.a)(t,null,[{key:"setMeta",value:function(t){var e={title:"",meta:[]};return e.title=t.title||t.displayTitle||"",t.description&&e.meta.push({hid:"description",name:"description",content:t.description},{hid:"og:description",property:"og:description",content:t.description}),t.ogpImg&&e.meta.push({hid:"og:image",property:"og:image",content:t.ogpImg},{hid:"twitter:image",property:"twitter:image",content:t.ogpImg}),t.ogpImg&&e.meta.push({hid:"og:image",property:"og:image",content:t.ogpImg},{hid:"twitter:image",property:"twitter:image",content:t.ogpImg}),e}},{key:"getPageData",value:function(t){return t.$nuxt.context.isDev,c.a.getCurrentPageData(t.$route)}},{key:"getPageList",value:function(t,e,n,r){var o=[];function f(t,e){var n=e&&e.sort||"asc",r=e&&e.attr;return t.sort((function(a,b){return r?a[r]<b[r]==("desc"==n)?1:-1:a<b==("desc"==n)?1:-1})),e&&e.max&&e.max<t.length&&(t.length=e.max),t}e.isDev,c.a.firebaseInit((function(){c.a.pagesRef.onSnapshot((function(e){e.forEach((function(e){var n=e.data();0==n.path.indexOf(t+"/")&&o.push(n)})),f(o,r),n(o)}))}))}}]),t}()},318:function(t,e,n){},320:function(t,e,n){"use strict";n(318)},324:function(t,e,n){"use strict";n.r(e);n(21);var r=n(44),o=n(11),c=n(18),f=n(13),l=n(14),d=n(4),h=n(12),m=(n(76),n(3),n(5)),v=n(315);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var w=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},O=function(t){Object(f.a)(l,t);var e,n=y(l);function l(){var t;return Object(o.a)(this,l),(t=n.apply(this,arguments)).news=[],t}return Object(c.a)(l,[{key:"fetch",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:v.a.getPageList("news",this.$nuxt.context,(function(t){e.$set(e,"news",t)}),{sort:"desc",attr:"date",max:this.max});case 1:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"mounted",value:function(){}}]),l}(m.Vue);w([Object(m.Prop)({default:0})],O.prototype,"max",void 0),w([Object(m.Prop)()],O.prototype,"list",void 0);var j=O=w([Object(m.Component)({components:{}})],O),x=(n(320),n(15)),component=Object(x.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"news-list"},t._l(t.list||t.news,(function(e){return n("li",{staticClass:"news-list__item"},[n("a",{attrs:{href:"/"+e.path}},[n("span",[t._v(t._s(e.date))]),n("span",{staticClass:"news-list__title",domProps:{innerHTML:t._s(e.displayTitle||e.title)}})])])})),0)}),[],!1,null,null,null);e.default=component.exports}}]);