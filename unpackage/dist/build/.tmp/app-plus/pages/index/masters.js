(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/masters"],{2275:function(t,e,i){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{navs:[{id:1,name:"当家列表"},{id:2,name:"我的当家"},{id:3,name:"历史当家"}],indexs:0,scrolllist:[],page:1,limit:15}},methods:{jump:function(e){t.switchTab({url:e})},lower:function(){this.last_page!=this.page&&(this.last_page>1?this.page=Number(this.page)+1:this.page=1,this.load())},seclnav:function(e){this.indexs=e,this.scrolllist=[],this.page=1,this.load(),t.setStorageSync("tab_index",this.indexs)},exchange:function(e){var i=this;t.showModal({content:"确认兑换？",success:function(a){a.confirm&&t.request({url:i.$service.api.index.byMiningMachine,method:"GET",header:{Authorization:"Bearer "+t.getStorageSync("token")},data:{cate_id:e},success:function(e){e=e.data;1==e.code?(t.showToast({icon:"none",title:e.info}),t.redirectTo({url:"/pages/index/masters"})):t.showToast({icon:"none",title:e.info})},fail:function(e){t.showToast({icon:"none",title:e.info})}})}})},load:function(){var t=this;1==this.indexs||2==this.indexs?this.$service.auth(this,this.$service.api.index.myMiningMachine,"GET",{page:this.page,limit:this.limit,status:this.indexs},function(e,a){if(1==a.code&&a.data.machine_list.data.length>0)for(var n=0;n<a.data.machine_list.data.length;n++){e.scrolllist.push(a.data.machine_list.data[n]);var s=e.scrolllist[n].createtime,o=s.substr(0,10),c=e.scrolllist[n].effectivetime,l=c.substr(0,10);t.$set(e.scrolllist[n],"createtime",o),t.$set(e.scrolllist[n],"effectivetime",l)}e.page=a.data.machine_list.current_page,e.last_page=a.data.machine_list.last_page,console.log(i(a.data.machine_list.data," at pages\\index\\masters.vue:203"))}):this.$service.auth(this,this.$service.api.index.machineCates,"GET",{},function(t,e){console.log(i(e.data.cate_list," at pages\\index\\masters.vue:207")),t.scrolllist=e.data.cate_list})}},onShow:function(){this.scrolllist=[],this.load()},onLoad:function(){this.indexs=t.getStorageSync("tab_index")}};e.default=a}).call(this,i("6e42")["default"],i("0de9")["default"])},"307e":function(t,e,i){"use strict";i.r(e);var a=i("2275"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},3294:function(t,e,i){},8013:function(t,e,i){"use strict";(function(t){i("42df"),i("921b");a(i("66fd"));var e=a(i("c08e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},b33b:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},c08e:function(t,e,i){"use strict";i.r(e);var a=i("b33b"),n=i("307e");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("efd4");var o=i("2877"),c=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},efd4:function(t,e,i){"use strict";var a=i("3294"),n=i.n(a);n.a}},[["8013","common/runtime","common/vendor"]]]);