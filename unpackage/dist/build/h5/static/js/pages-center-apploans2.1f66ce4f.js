(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-center-apploans2"],{"1e13":function(t,i,e){"use strict";var n,s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"header"},[n("v-uni-view",{staticClass:"left_",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jump("/pages/main/financial")}}},[n("v-uni-image",{attrs:{src:e("d310"),mode:""}})],1),n("v-uni-view",{staticClass:"center_title"},[n("v-uni-text",[t._v("申请贷款")])],1)],1),n("v-uni-view",{staticClass:"inslist"},t._l(t.inslist,(function(i,e){return n("v-uni-view",{key:e,staticClass:"inslist_it",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.selins(e)}}},[n("v-uni-view",{staticClass:"inslist_selarch"},[n("v-uni-image",{attrs:{src:1==i.operate?"../../static/icon/pitchon.png":"../../static/icon/nopitchon.png",mode:""}})],1),n("v-uni-view",{staticClass:"inslist_name"},[n("v-uni-text",[t._v(t._s(i.item))])],1)],1)})),1),n("v-uni-view",{staticClass:"text_box"},[n("v-uni-view",{staticClass:"text_name"},[n("v-uni-text",[t._v("贷款金额")])],1),n("v-uni-input",{attrs:{type:"number",placeholder:"请输入贷款金额","placeholder-class":"inplss"},model:{value:t.money,callback:function(i){t.money=i},expression:"money"}})],1),n("v-uni-view",{staticClass:"text_box"},[n("v-uni-view",{staticClass:"text_name"},[n("v-uni-text",[t._v("联系电话")])],1),n("v-uni-input",{attrs:{type:"number",maxlength:"11",placeholder:"请输入联系电话","placeholder-class":"inplss"},model:{value:t.phone,callback:function(i){t.phone=i},expression:"phone"}})],1),n("v-uni-view",{staticClass:"text_box"},[n("v-uni-view",{staticClass:"text_name"},[n("v-uni-text",[t._v("住址")])],1),n("v-uni-input",{attrs:{type:"text",placeholder:"现居住地址","placeholder-class":"inplss"},model:{value:t.adress,callback:function(i){t.adress=i},expression:"adress"}})],1),n("v-uni-view",{staticClass:"bottom_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.submit.apply(void 0,arguments)}}},[n("v-uni-text",[t._v("确认申请贷款")])],1)],1)},a=[];e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}))},"6d3c":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,".header[data-v-62971041]{background-color:#2575fe}.left_[data-v-62971041]{width:%?36?%;height:%?36?%}.center_title[data-v-62971041]{font-size:%?36?%;color:#fff;margin-right:%?72?%;width:80%}uni-page-body[data-v-62971041]{background-color:#eff3f6}\n/* .content{\n\tpadding-right:24upx;\n\tpadding-left: 24upx;\n} */.inslist[data-v-62971041]{background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;\n\t/* justify-content: center; */-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#333;font-size:%?30?%;font-weight:700;padding:%?30?% 0;margin:%?20?% 0}.inslist_it[data-v-62971041]{\n\t/* width:25%; */display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?30?% 0;margin:auto %?56?%}.inslist_selarch[data-v-62971041]{width:%?36?%;height:%?36?%}.text_box[data-v-62971041]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#fff;padding:%?30?%;border-bottom:%?2?% solid #f2f2f2}.text_name[data-v-62971041]{color:#333;font-size:%?30?%;width:30%}.inplss[data-v-62971041]{color:#c3c3c3;font-size:%?30?%}.text_box uni-input[data-v-62971041]{width:70%}.bottom_btn[data-v-62971041]{color:#fff;background-color:#0089e2;font-size:%?36?%;width:60%;text-align:center;padding:%?20?% %?70?%;border-radius:%?44?%;margin:%?30?% auto 0}body.?%PAGE?%[data-v-62971041]{background-color:#eff3f6}",""]),t.exports=i},"7b3c":function(t,i,e){var n=e("6d3c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=e("4f06").default;s("6149a1df",n,!0,{sourceMap:!1,shadowMode:!1})},"8ab6":function(t,i,e){"use strict";var n=e("7b3c"),s=e.n(n);s.a},"9f0a":function(t,i,e){"use strict";e("4160"),e("c975"),e("a434"),e("159b"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{money:"",phone:"",adress:"",inslist:[],is_check:[],clause:!0}},methods:{jump:function(t){uni.switchTab({url:t})},selclause:function(){this.clause=!this.clause},selins:function(t){var i=this.is_check.indexOf(t);-1==i?(this.is_check.push(t),this.$set(this.inslist[t],"operate",!0)):(this.is_check.splice(i,1),this.$set(this.inslist[t],"operate",!1)),console.log(this.is_check)},submit:function(){this.$service.auth(this,this.$service.api.center.loans,"POST",{fields:[this.money,this.phone,this.adress,this.is_check]},(function(t,i){console.log(i),uni.showToast({title:i.info,icon:"none"}),setTimeout((function(){uni.switchTab({url:"/pages/main/financial"})}),1500)}))}},onShow:function(){this.$service.auth(this,this.$service.api.center.diyFields,"GET",{type:5},(function(t,i){console.log(i),t.inslist=i.data[3].desc,t.inslist.forEach((function(i,e){1==i.is_check&&(t.is_check.push(e),t.$set(t.inslist[e],"operate",!0))})),console.log(t.is_check,"is_check"),console.log(t.inslist,"inslist")}))}};i.default=n},a0d5:function(t,i,e){"use strict";e.r(i);var n=e("9f0a"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=s.a},c179:function(t,i,e){"use strict";e.r(i);var n=e("1e13"),s=e("a0d5");for(var a in s)"default"!==a&&function(t){e.d(i,t,(function(){return s[t]}))}(a);e("8ab6");var c,o=e("f0c5"),l=Object(o["a"])(s["default"],n["b"],n["c"],!1,null,"62971041",null,!1,n["a"],c);i["default"]=l.exports},d310:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmElEQVRoQ+3YT0dEYRTH8d/vfbVpXdtiKIZhFqOhlJTS9IeIUlKSUopSbaN1r6M3c/JwYuTZXM8557o8d33v9f2ccxfPDNHxix3vRwW0vcG6gbqBwgnUT6hwgMWPt7IBEVkBsAdghuRPiSIcICL7ACYa/U1ytjOAf/Gpe47kVycAmfgeybeS+PRsyCeUiV8i+VIaHwLIxPdJPlnEuwMy8QOSD1bxroBM/JDknWW8GyATPyJ5Yx3vAsjEj0leecSbAzLxayQvvOJNAZn4DZJnnvFmgEz8FskT73gTQCZ+h+RxRHwxQETmAXxOxU5IHkbFWwAWAHxMBR+QTKfNsKv4LCQi7wAW20IUA1K4iLwC6LWBMAEo4hnAcjTCDKCIRwD9SIQpQBH3AAZRCHOAIm4BDCMQLgBFXAMYeSPcAIq4BDD2RLgCFHEOYNUL4Q5QxCmAdQ9ECEAR6XS6aY0IAyginVK3LRGhAEUcAdhVRLf+Wvyb/NRviOLTa/gGrM/ZFWA90abvqxtoOjHr++sGrCfa9H11A00nZn3/L1cFljG+jrjIAAAAAElFTkSuQmCC"}}]);