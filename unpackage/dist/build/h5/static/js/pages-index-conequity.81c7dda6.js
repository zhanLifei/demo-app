(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-conequity"],{"0d0c":function(t,e,i){"use strict";i.r(e);var n=i("3622"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"10ac":function(t,e,i){"use strict";i.r(e);var n=i("209f"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"1b76":function(t,e,i){"use strict";var n=i("4707"),a=i.n(n);a.a},"209f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{title:{type:String},bitstyle:{type:String}},methods:{}};e.default=n},3622:function(t,e,i){"use strict";var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("89c2")),o=n(i("46db")),c={components:{btncoms:a.default},data:function(){return{bitstyle:"margin-top:50upx",btntitle:"兑换",bitcolor:"",clause:!0,codeTime:"获取验证码",wti:"",password:"",verifycode:"",codeB:!0,account:uni.getStorageSync("member").account}},methods:{btns:function(){o.default.auth(this,o.default.api.index.ex_stock,"POST",{wti:this.wti,password:this.password,verifycode:this.verifycode},(function(t,e){uni.showToast({title:e.info,icon:"none"}),setTimeout((function(){uni.navigateBack({delta:1})}),1500)}))},jump:function(t){uni.switchTab({url:t})},jum:function(t){uni.navigateTo({url:t})},getAuthCode:function(){var t=this;if(t.codeB)if(t.codeB=!1,t.codeTime=60,uni.request({url:o.default.api.index.verifycode,method:"GET",data:{},header:{Authorization:"Bearer "+uni.getStorageSync("token")},success:function(t){t.code,uni.showToast({icon:"none",title:t.data.info})}}),t.codeTime>0)var e=setInterval((function(){t.codeTime--,0==t.codeTime&&(t.codeTime="重新获取验证码",clearInterval(e),t.codeB=!0)}),1e3);else t.codeTime="重新获取验证码",t.codeB=!0;else console.log("12321"),uni.showToast({title:"请勿重复获取验证码!",icon:"none"})}}};e.default=c},4707:function(t,e,i){var n=i("86ae");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("411c66d4",n,!0,{sourceMap:!1,shadowMode:!1})},"640b":function(t,e,i){"use strict";var n=i("da0a"),a=i.n(n);a.a},"74e2":function(t,e,i){"use strict";i.r(e);var n=i("e00d"),a=i("0d0c");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("640b");var c,s=i("f0c5"),d=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"91d345c0",null,!1,n["a"],c);e["default"]=d.exports},"86ae":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".bottom_btn[data-v-968d89ce]{color:#fff;background-color:#0089e2;font-size:%?36?%;width:60%;text-align:center;padding:%?20?% %?70?%;border-radius:%?44?%;margin:%?30?% auto 0}",""]),t.exports=e},"89c2":function(t,e,i){"use strict";i.r(e);var n=i("b8a4"),a=i("10ac");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("1b76");var c,s=i("f0c5"),d=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"968d89ce",null,!1,n["a"],c);e["default"]=d.exports},b463:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".content[data-v-91d345c0]{padding-left:%?24?%;padding-right:%?24?%;background-color:initial}.header[data-v-91d345c0]{background:transparent}.left_[data-v-91d345c0]{width:%?36?%;height:%?36?%}.right_[data-v-91d345c0]{\n\t/* width: 120upx; */height:%?36?%;font-size:%?26?%;color:#fff;\n\t    /* margin-riht: 20px; */margin-right:%?12?%}.center_title[data-v-91d345c0]{font-size:%?36?%;color:#fff;\n\t/* margin-right: 72upx; */width:80%;margin-left:%?78?%}uni-page-body[data-v-91d345c0]{\n\t/* background-color: #EFF3F6; */}.top_back[data-v-91d345c0]{position:fixed;top:0;left:0;background:#1a81f1;height:%?243?%;width:100%;z-index:-1}.top_back2[data-v-91d345c0]{position:fixed;top:%?243?%;left:0;background:#eff3f6;height:100%;width:100%;z-index:-1}.top_notice[data-v-91d345c0]{color:#fff;font-size:%?26?%;line-height:%?42?%;padding-top:%?30?%}.input_box[data-v-91d345c0]{width:100%;background-color:#fff;box-sizing:border-box;padding:0 %?30?% %?200?%;border-radius:%?10?%;margin-top:%?40?%}.input_block[data-v-91d345c0]{\n\t/* width: 100%; */\n\t/* display: flex; */\n\t/* align-items: center; */padding:%?30?% 0;border-bottom:%?2?% solid #f3f3f3}\n\n/* .input_block:nth-of-type(1){\n\tborder-bottom: 2upx solid #F4F4F4;\n} */.inps_title[data-v-91d345c0]{color:#333;font-size:%?26?%;\n\t /* border-bottom: 2upx solid #F3F3F3; */padding:%?30?% 0\n\t /* width: 20%; */}.placehss[data-v-91d345c0]{color:#939190;font-size:%?26?%}.inps[data-v-91d345c0]{color:#333;font-size:%?26?%;\n\t/* width: 80%; */margin-top:%?10?%}.input_block2[data-v-91d345c0]{padding:%?30?% 0;display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?2?% solid #f3f3f3}\n\n/* .input_block2:nth-last-of-type(1){\n\tborder-bottom: none;\n} */.inps_title2[data-v-91d345c0]{color:#333;font-size:%?26?%;width:30%}.inps2[data-v-91d345c0]{color:#333;font-size:%?26?%;width:70%}.inps_title3[data-v-91d345c0]{color:#333;font-size:%?26?%;width:30%}.inps3[data-v-91d345c0]{color:#333;font-size:%?26?%;width:40%}.getauthcode[data-v-91d345c0]{color:#fbb35a;font-size:%?28?%;width:40%}",""]),t.exports=e},b8a4:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"bottom_btn ",style:t.bitstyle,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("btns")}}},[i("v-uni-text",[t._v(t._s(t.title))])],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},d310:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmElEQVRoQ+3YT0dEYRTH8d/vfbVpXdtiKIZhFqOhlJTS9IeIUlKSUopSbaN1r6M3c/JwYuTZXM8557o8d33v9f2ccxfPDNHxix3vRwW0vcG6gbqBwgnUT6hwgMWPt7IBEVkBsAdghuRPiSIcICL7ACYa/U1ytjOAf/Gpe47kVycAmfgeybeS+PRsyCeUiV8i+VIaHwLIxPdJPlnEuwMy8QOSD1bxroBM/JDknWW8GyATPyJ5Yx3vAsjEj0leecSbAzLxayQvvOJNAZn4DZJnnvFmgEz8FskT73gTQCZ+h+RxRHwxQETmAXxOxU5IHkbFWwAWAHxMBR+QTKfNsKv4LCQi7wAW20IUA1K4iLwC6LWBMAEo4hnAcjTCDKCIRwD9SIQpQBH3AAZRCHOAIm4BDCMQLgBFXAMYeSPcAIq4BDD2RLgCFHEOYNUL4Q5QxCmAdQ9ECEAR6XS6aY0IAyginVK3LRGhAEUcAdhVRLf+Wvyb/NRviOLTa/gGrM/ZFWA90abvqxtoOjHr++sGrCfa9H11A00nZn3/L1cFljG+jrjIAAAAAElFTkSuQmCC"},da0a:function(t,e,i){var n=i("b463");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("39a59799",n,!0,{sourceMap:!1,shadowMode:!1})},e00d:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"header"},[n("v-uni-view",{staticClass:"left_",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jump("/pages/main/my")}}},[n("v-uni-image",{attrs:{src:i("d310"),mode:""}})],1),n("v-uni-view",{staticClass:"center_title"},[n("v-uni-text",[t._v("兑换股权")])],1),n("v-uni-view",{staticClass:"right_",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jum("/pages/record/conDeial")}}},[n("v-uni-text",[t._v("兑换明细")])],1)],1),n("v-uni-view",{staticClass:"top_back"}),n("v-uni-view",{staticClass:"top_back2"}),n("v-uni-view",{staticClass:"input_box"},[n("v-uni-view",{staticClass:"input_block"},[n("v-uni-view",{staticClass:"inps_title"},[n("v-uni-text",[t._v("请在下方输入兑换份数")])],1),n("v-uni-input",{staticClass:"inps",attrs:{type:"text",value:"",placeholder:"注：1车贝兑换3份股权，每次兑换不得少于100车贝","placeholder-class":"placehss"},model:{value:t.wti,callback:function(e){t.wti=e},expression:"wti"}})],1),n("v-uni-view",{staticClass:"input_block2"},[n("v-uni-view",{staticClass:"inps_title2"},[n("v-uni-text",[t._v("请输入置换密码")])],1),n("v-uni-input",{staticClass:"inps2",attrs:{type:"password",value:"",placeholder:"","placeholder-class":"placehss"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("v-uni-view",{staticClass:"input_block2"},[n("v-uni-view",{staticClass:"inps_title3"},[n("v-uni-text",[t._v("请输入验证码")])],1),n("v-uni-input",{staticClass:"inps3",attrs:{type:"number",value:"",placeholder:"","placeholder-class":"placehss"},model:{value:t.verifycode,callback:function(e){t.verifycode=e},expression:"verifycode"}}),n("v-uni-view",{staticClass:"getauthcode",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getAuthCode.apply(void 0,arguments)}}},[n("v-uni-text",[t._v(t._s(t.codeTime))])],1)],1)],1),n("btncoms",{attrs:{title:t.btntitle,bitstyle:t.bitstyle},on:{btns:function(e){arguments[0]=e=t.$handleEvent(e),t.btns.apply(void 0,arguments)}}})],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))}}]);