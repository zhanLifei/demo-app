(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-center-appload"],{"0b71":function(t,e,n){"use strict";n.r(e);var i=n("c529"),a=n("9088");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("dde6");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"ff6bbc98",null,!1,i["a"],r);e["default"]=s.exports},"0ded":function(t,e,n){"use strict";n.r(e);var i=n("a100"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"2a31":function(t,e,n){"use strict";n.r(e);var i=n("8da9"),a=n("0ded");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("e27c");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"152ae71a",null,!1,i["a"],r);e["default"]=s.exports},"80e8":function(t,e,n){var i=n("a33c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("f4ff8286",i,!0,{sourceMap:!1,shadowMode:!1})},"8da9":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"header",style:t.hstyle},[n("v-uni-view",{staticClass:"left_icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jump(t.url_le)}}},[n("v-uni-image",{attrs:{src:t.Hlicon,mode:""}})],1),n("v-uni-view",{staticClass:"center_title"},[n("v-uni-text",[t._v(t._s(t.Htitle))])],1),n("v-uni-view",{staticClass:"right_subtitle",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jum(t.url_ri)}}},[t._v(t._s(t.subtitle)),t.Hricon?[n("v-uni-view",{staticClass:"right_icon"},[n("v-uni-image",{attrs:{src:t.Hricon,mode:""}})],1)]:t._e()],2)],1)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},9088:function(t,e,n){"use strict";n.r(e);var i=n("df26"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},a100:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{Hlicon:{type:String},Htitle:{type:String},subtitle:{type:String},Hricon:{type:String},hstyle:{type:String},url_le:{String:String},url_ri:{String:String}},data:function(){return{}},methods:{jump:function(t){t?""==t?uni.navigateBack({delta:1}):"/pages/main/tradingCenter"==t||"/pages/main/my"==t||"/pages/main/index"==t||"/pages/main/financial"==t||"carService"==t?uni.switchTab({url:t}):uni.navigateTo({url:t}):uni.navigateBack({delta:1})},jum:function(t){t?""==t?uni.navigateBack({delta:1}):"/pages/main/tradingCenter"==t||"/pages/main/my"==t||"/pages/main/index"==t||"/pages/main/financial"==t||"carService"==t?uni.switchTab({url:t}):uni.navigateTo({url:t}):uni.navigateBack({delta:1})}}};e.default=i},a33c:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".header[data-v-152ae71a]{\n\t/* background-color: #2575FE; */background-color:#2189ff;height:calc(%?102?% + 0px);position:fixed;top:0;left:0;z-index:105;display:-webkit-box;display:-webkit-flex;display:flex;\n\t/* justify-content: space-between; */-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:100%\n\t/* background-color:transparent; */\n\t/* background: transparent; */}uni-image[data-v-152ae71a]{width:%?36?%;height:%?36?%}.left_icon[data-v-152ae71a]{margin-top:%?12?%;width:20%;text-align:center;box-sizing:border-box}.right_subtitle[data-v-152ae71a]{width:20%;text-align:start;color:#fff;font-size:%?28?%}.right_icon[data-v-152ae71a]{margin-top:%?12?%;box-sizing:border-box;text-align:center}.center_title[data-v-152ae71a]{font-size:%?36?%;color:#fff;text-align:center;width:60%}",""]),t.exports=e},b203:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".text_box[data-v-ff6bbc98]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#fff;padding:%?30?%;border-bottom:%?2?% solid #f2f2f2}.text_name[data-v-ff6bbc98]{color:#333;font-size:%?30?%;width:30%}.inplss[data-v-ff6bbc98]{color:#c3c3c3;font-size:%?30?%}.text_box uni-input[data-v-ff6bbc98]{width:70%}.bottom_btn[data-v-ff6bbc98]{color:#fff;background-color:#0089e2;font-size:%?36?%;width:60%;text-align:center;padding:%?20?% %?70?%;border-radius:%?44?%;margin:%?30?% auto 0}",""]),t.exports=e},c141:function(t,e,n){var i=n("b203");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("2ab5fd12",i,!0,{sourceMap:!1,shadowMode:!1})},c529:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("headers",{attrs:{Htitle:t.Htitle,Hlicon:t.Hlicon}}),t._l(t.addList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"text_box"},[n("v-uni-view",{staticClass:"text_name"},[n("v-uni-text",[t._v(t._s(e.set_name))])],1),n("v-uni-input",{attrs:{type:"text",placeholder:e.tips,"placeholder-class":"inplss"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.input.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.blur(i)}},model:{value:e.default_str,callback:function(n){t.$set(e,"default_str",n)},expression:"item.default_str"}})],1)})),n("v-uni-view",{staticClass:"bottom_btn ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit()}}},[n("v-uni-text",[t._v("提交")])],1)],2)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},dde6:function(t,e,n){"use strict";var i=n("c141"),a=n.n(i);a.a},df26:function(t,e,n){"use strict";var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("46db")),o=i(n("2a31")),r={components:{headers:o.default},data:function(){return{Htitle:"填写地址",Hlicon:"../../static/icon/left_whitch.png",pos_id:0,addList:[],index:0}},onLoad:function(t){this.pos_id=t.id,console.log(t),a.default.auth(this,a.default.api.pos.fields,"GET",{type:3,token:uni.getStorageSync("token")},(function(t,e){console.log(e),t.addList=e.data}))},methods:{input:function(t){this.addList[this.index].default_str=t.detail.value},blur:function(t){this.index=t},submit:function(){for(var t=[],e=this.addList,n=0;n<e.length;n++)if(1==e[n].must){if(""==e[n].default_str)return void uni.showToast({icon:"none",title:e[n].tips+"不能为空"});t.push(e[n].default_str)}a.default.downLoad(this,a.default.api.pos.check,{pos_id:this.pos_id,pos_fields:t},"POST",(function(t,e){uni.showToast({icon:"none",title:e.info}),1==e.code&&setTimeout((function(){uni.navigateTo({url:"/pages/service/post"})}),1500)}))}}};e.default=r},e27c:function(t,e,n){"use strict";var i=n("80e8"),a=n.n(i);a.a}}]);