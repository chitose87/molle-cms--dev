(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{371:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(5),c=n(17),o=(n(13),n(63),n(11),n(23),n(41),n(18)),l=function(){function t(){Object(r.a)(this,t)}return Object(c.a)(t,null,[{key:"setMeta",value:function(t){var e={title:"",meta:[],link:[]};return e.title=t.title||t.displayTitle||"",t.description&&e.meta.push({hid:"description",name:"description",content:t.description},{hid:"og:description",property:"og:description",content:t.description}),t.ogpImg&&e.meta.push({hid:"og:image",property:"og:image",content:t.ogpImg},{hid:"twitter:image",property:"twitter:image",content:t.ogpImg}),t.cssPlugin&&t.cssPlugin.split(/\r\n|\n/).forEach((function(t){e.link.push({rel:"stylesheet",href:t})})),e}},{key:"getPageData",value:function(t){return t.$nuxt.context.isDev,o.a.getCurrentPageData(t.$route)}},{key:"getPageList",value:function(t,e,n,r){var c=[];function l(t,e){var n=e&&e.sort||"asc",r=e&&e.attr;return t.sort((function(a,b){return r?a[r]<b[r]==("desc"==n)?1:-1:a<b==("desc"==n)?1:-1})),e&&e.max&&e.max<t.length&&(t.length=e.max),t}e.isDev,o.a.firebaseInit((function(){o.a.pagesRef.onSnapshot((function(e){e.forEach((function(e){var n=e.data();0==n.path.indexOf(t+"/")&&c.push(n)})),l(c,r),n(c)}))}))}}]),t}()},375:function(t,e,n){},379:function(t,e,n){"use strict";n(375)},381:function(t,e,n){"use strict";n.r(e);n(16);var r=n(45),c=n(5),o=n(17),l=n(8),f=n(9),d=n(4),h=n(7),v=(n(79),n(6),n(2)),m=n(371);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var c=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var O=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},w=function(t){Object(l.a)(f,t);var e,n=y(f);function f(){var t;return Object(c.a)(this,f),(t=n.apply(this,arguments)).news=[],t}return Object(o.a)(f,[{key:"fetch",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:m.a.getPageList("news",this.$nuxt.context,(function(t){e.$set(e,"news",t)}),{sort:"desc",attr:"date",max:this.max});case 1:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"mounted",value:function(){}}]),f}(v.Vue);O([Object(v.Prop)({default:0})],w.prototype,"max",void 0),O([Object(v.Prop)()],w.prototype,"list",void 0);var j=w=O([Object(v.Component)({components:{}})],w),x=(n(379),n(10)),component=Object(x.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"news-list"},t._l(t.list||t.news,(function(e){return n("li",{staticClass:"news-list__item"},[n("a",{attrs:{href:"/"+e.path}},[n("span",[t._v(t._s(e.date))]),n("span",{staticClass:"news-list__title",domProps:{innerHTML:t._s(e.displayTitle||e.title)}})])])})),0)}),[],!1,null,null,null);e.default=component.exports}}]);