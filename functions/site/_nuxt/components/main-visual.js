(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{362:function(t,e,n){},365:function(t,e,n){"use strict";n(362)},366:function(t,e,n){"use strict";n.r(e);n(16);var c=n(6),r=n(17),o=n(8),l=n(9),f=n(4),d=n(7),v=(n(5),n(3));function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,c=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(c,arguments,r)}else n=c.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var c,r=arguments.length,o=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(c=t[i])&&(o=(r<3?c(o):r>3?c(e,n,o):c(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o},h=function(t){Object(o.a)(n,t);var e=m(n);function n(){var t;return Object(c.a)(this,n),(t=e.apply(this,arguments)).breakPoint="768",t}return Object(r.a)(n,[{key:"mounted",value:function(){}}]),n}(v.Vue);y([Object(v.Prop)()],h.prototype,"pageData",void 0);var O=h=y([Object(v.Component)({components:{}})],h),j=(n(365),n(10)),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-visual"},[t.pageData.theme&&"minimum"!=t.pageData.theme?n("picture",{staticClass:"main-visual__img"},[n("source",{attrs:{media:"(max-width:"+(t.breakPoint-1)+"px)",srcset:t.pageData.mainVisualSp,alt:""}}),n("img",{attrs:{src:t.pageData.mainVisual,alt:""}})]):t._e(),n("div",{staticClass:"main-visual__body"},[n("Headline",{attrs:{static__value:t.pageData.displayTitle||t.pageData.title,static__option:{lv:"h2",text:t.pageData.displayTitleSub}}})],1)])}),[],!1,null,null,null);e.default=component.exports}}]);