(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-webview"],{"22c1":function(e,t,n){"use strict";var i,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content",on:{touchstart:function(t){arguments[0]=t=e.$handleEvent(t),e.hideDrawer.apply(void 0,arguments)}}},[n("headers",{attrs:{Hlicon:e.Hlicon}})],1)},r=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}))},"24a9":function(e,t,n){"use strict";n.r(t);var i=n("7a1d"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},"30e6":function(e,t,n){"use strict";n.r(t);var i=n("22c1"),a=n("24a9");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);var c,o=n("f0c5"),u=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"2d6bdbf4",null,!1,i["a"],c);t["default"]=u.exports},3468:function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,".header[data-v-14d5806a]{width:100%;height:calc(%?100?% + 0px);box-sizing:border-box;padding-top:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-flex-wrap:nowrap;flex-wrap:nowrap}.header uni-view[data-v-14d5806a]{width:%?200?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.header .header_icon[data-v-14d5806a]{-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start\n\t/* padding: 0 30rpx; */}.header .header_icon uni-image[data-v-14d5806a]{width:%?50?%;height:%?50?%}.header .header_title[data-v-14d5806a]{color:#333;font-size:%?30?%;font-weight:700}.header .header_jump[data-v-14d5806a]{-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;padding:0 %?30?%;color:#333;font-size:%?28?%}.header .header_jump uni-image[data-v-14d5806a]{width:%?40?%;height:%?40?%}",""]),e.exports=t},"5b45":function(e,t,n){var i=n("3468");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("6a806e82",i,!0,{sourceMap:!1,shadowMode:!1})},"7a1d":function(e,t,n){"use strict";var i=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;i(n("46db"));var a=i(n("fff8")),r={components:{headers:a.default},data:function(){return{Hlicon:"../../static/icon/left_whitch.png",token:uni.getStorageSync("token"),webviewStyles:{progress:{color:"#FF3333"}},url:uni.getStorageSync("webUrl")}},onShow:function(){console.log(uni.getStorageSync("webUrl"))},methods:{back:function(e){uni.reLaunch({url:"/pages/main/service"})},hideDrawer:function(){console.log("12321")}},onLoad:function(){window.location.href=uni.getStorageSync("webUrl")}};t.default=r},"90dc":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={props:{subtitle:{type:String},title:{type:String},icon:{type:String},more:{type:String},url_right:{type:String},url_left:{type:String}},data:function(){return{}},methods:{back:function(e){e?""==e?uni.navigateBack({delta:1}):"/pages/index/me"==e||"/pages/index/index"==e||"/pages/index/life"==e||"/pages/index/share"==e?uni.switchTab({url:e}):uni.navigateTo({url:e}):uni.navigateBack({delta:1})},jump:function(e){"/pages/index/me"==e||"/pages/index/index"==e||"/pages/index/life"==e||"/pages/index/share"==e?uni.switchTab({url:e}):uni.navigateTo({url:e})}}};t.default=i},c33c:function(e,t,n){"use strict";var i=n("5b45"),a=n.n(i);a.a},c814:function(e,t,n){"use strict";var i,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"header"},[n("v-uni-view",{staticClass:"header_icon",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back(e.url_left)}}},[n("v-uni-image",{attrs:{src:e.icon,mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"header_title"},[e._v(e._s(e.title))]),n("v-uni-view",{staticClass:"header_jump",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.jump(e.url_right)}}},[e._v(e._s(e.subtitle)),e.more?[n("v-uni-image",{attrs:{src:e.more,mode:"widthFix"}})]:e._e()],2)],1)},r=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}))},fe13:function(e,t,n){"use strict";n.r(t);var i=n("90dc"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},fff8:function(e,t,n){"use strict";n.r(t);var i=n("c814"),a=n("fe13");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("c33c");var c,o=n("f0c5"),u=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"14d5806a",null,!1,i["a"],c);t["default"]=u.exports}}]);