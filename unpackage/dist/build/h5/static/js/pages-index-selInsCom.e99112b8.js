(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-selInsCom"],{"12cb":function(t,i,n){"use strict";n.r(i);var e=n("8526"),s=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(i,t,(function(){return e[t]}))}(o);i["default"]=s.a},"1d40":function(t,i,n){"use strict";var e,s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"header"},[e("v-uni-view",{staticClass:"left_",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jump("/pages/index/provinceCity")}}},[e("v-uni-image",{attrs:{src:n("d310"),mode:""}})],1),e("v-uni-view",{staticClass:"center_title"},[e("v-uni-text",[t._v("选择保险公司")])],1)],1),e("v-uni-view",{staticClass:"inscom"},t._l(t.inscomlis,(function(i,n){return e("v-uni-view",{key:n,staticClass:"inscom_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selins(n,i.id)}}},[e("v-uni-view",{staticClass:"inscom_sel_icon"},[e("v-uni-image",{attrs:{src:t.index==n?"../../static/icon/radio_select.png":"../../static/icon/radio.png",mode:""}})],1),e("v-uni-view",{staticClass:"inscom_coms"},[e("v-uni-text",[t._v(t._s(i.company_name))]),e("v-uni-text",[t._v(t._s(i.discounts)+"折")])],1)],1)})),1),e("v-uni-view",{staticClass:"btns",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.next.apply(void 0,arguments)}}},[t._v("下一步")])],1)},o=[];n.d(i,"b",(function(){return s})),n.d(i,"c",(function(){return o})),n.d(i,"a",(function(){return e}))},6616:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,".content[data-v-dbc8328a]{background-color:#fff}.header[data-v-dbc8328a]{background-color:#2189ff}.left_[data-v-dbc8328a]{width:%?36?%;height:%?36?%}.center_title[data-v-dbc8328a]{font-size:%?36?%;color:#fff;margin-right:%?72?%;width:80%}.inscom[data-v-dbc8328a]{margin-bottom:%?300?%}.inscom_item[data-v-dbc8328a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;box-sizing:border-box;padding:%?0?% %?40?%\n\t/* text-align: center; */\n\t/* justify-content: center; */}.inscom_sel_icon[data-v-dbc8328a]{padding-right:%?20?%;width:%?40?%;height:%?40?%}.inscom_coms[data-v-dbc8328a]{color:#333;font-size:%?30?%;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between ;justify-content:space-between ;width:90%;padding:%?40?% 0;border-bottom:%?2?% solid #f4f4f4}.inscom_coms uni-text[data-v-dbc8328a]:nth-of-type(2){background-color:#fff0dd;color:#fa9c22;padding:%?0?% %?20?%}.btns[data-v-dbc8328a]{text-align:center;margin:0 auto;width:70%;color:#fff;font-size:%?36?%;background-color:#0089e2;padding:%?30?% 0;border-radius:%?60?%}",""]),t.exports=i},"80e1":function(t,i,n){"use strict";var e=n("e791"),s=n.n(e);s.a},8526:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{index:0,res:"",selectbloon:!1,compsId:"",inscomlis:[]}},methods:{jump:function(t){uni.navigateTo({url:t})},selins:function(t,i){this.selectbloon=!this.selectbloon,this.index=t,console.log(i),this.compsId=i},next:function(){1==this.inscomlis.length?(this.compsId=this.inscomlis[0].id,console.log(this.compsId,this.inscomlis.length,"1"),uni.navigateTo({url:"/pages/record/custom?id="+this.compsId})):""==this.compsId?(this.compsId=this.inscomlis[0].id,uni.navigateTo({url:"/pages/record/custom?id="+this.compsId}),console.log(this.compsId,"2")):uni.navigateTo({url:"/pages/record/custom?id="+this.compsId})}},onShow:function(){this.res=uni.getStorageSync("inscompanys"),this.inscomlis=uni.getStorageSync("inscompanys").data.company_list,console.log(this.inscomlis)}};i.default=e},a19a:function(t,i,n){"use strict";n.r(i);var e=n("1d40"),s=n("12cb");for(var o in s)"default"!==o&&function(t){n.d(i,t,(function(){return s[t]}))}(o);n("80e1");var c,a=n("f0c5"),d=Object(a["a"])(s["default"],e["b"],e["c"],!1,null,"dbc8328a",null,!1,e["a"],c);i["default"]=d.exports},d310:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmElEQVRoQ+3YT0dEYRTH8d/vfbVpXdtiKIZhFqOhlJTS9IeIUlKSUopSbaN1r6M3c/JwYuTZXM8557o8d33v9f2ccxfPDNHxix3vRwW0vcG6gbqBwgnUT6hwgMWPt7IBEVkBsAdghuRPiSIcICL7ACYa/U1ytjOAf/Gpe47kVycAmfgeybeS+PRsyCeUiV8i+VIaHwLIxPdJPlnEuwMy8QOSD1bxroBM/JDknWW8GyATPyJ5Yx3vAsjEj0leecSbAzLxayQvvOJNAZn4DZJnnvFmgEz8FskT73gTQCZ+h+RxRHwxQETmAXxOxU5IHkbFWwAWAHxMBR+QTKfNsKv4LCQi7wAW20IUA1K4iLwC6LWBMAEo4hnAcjTCDKCIRwD9SIQpQBH3AAZRCHOAIm4BDCMQLgBFXAMYeSPcAIq4BDD2RLgCFHEOYNUL4Q5QxCmAdQ9ECEAR6XS6aY0IAyginVK3LRGhAEUcAdhVRLf+Wvyb/NRviOLTa/gGrM/ZFWA90abvqxtoOjHr++sGrCfa9H11A00nZn3/L1cFljG+jrjIAAAAAElFTkSuQmCC"},e791:function(t,i,n){var e=n("6616");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=n("4f06").default;s("3995b6ff",e,!0,{sourceMap:!1,shadowMode:!1})}}]);