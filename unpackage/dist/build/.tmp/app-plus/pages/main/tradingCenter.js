(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/tradingCenter"],{"3e35":function(t,e,i){},"3e82":function(t,e,i){"use strict";(function(t){i("42df"),i("921b");r(i("66fd"));var e=r(i("fc8d"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},4242:function(t,e,i){"use strict";(function(t,r){var s;function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function n(t){return u(t)||c(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=function(){return i.e("components/header_nav").then(i.bind(null,"ddfc"))},d=function(){return i.e("components/uni-icons").then(i.bind(null,"5bbe"))},h=function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"bd9c"))},p=(s={components:{headers:l,uniLoadMore:h,uniIcons:d},data:function(){return{synthesis:1,cateMaskState:0,cateId:0,cateList:[],headerPosition:"fixed",headerTop:"0px",timeOrder:!1,priceOrder:!1,salesOrder:!1,filterIndex:1,comp:!1,color:!1,image:!0,num:0,number:1,keywords:"",category:"",indicatorDots:!0,cart_status:!1,isLoading:!1,scroll:!1,status:0,pages:1,limit:15,page:0,out:0,goodsList:[],tabIndex:0,navList:[],obj:[],AllList:[],account:"",email:"",inputType:1,typeList:[{id:1,name:"手机号"},{id:2,name:"邮箱号"}],typeName:"手机号",showType:!1,Htitle:"置换中心",subtitle:"我的置换",url_ri:"/pages/center/my_deal",hstyle:"background:transparent",now_price:"",order_sum1:"",order_sum2:"",total_sum:"",last_price:"",mywti:"",usermid:t.getStorageSync("member").mid,levelname:t.getStorageSync("member").levelname,service_charge:t.getStorageSync("member").service_charge,loadshow:!0,colorshow:!1,scrlist:[],usdt:"",alipay:"",mining_dols:""}},onLoad:function(t){},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},methods:{timeStart:function(t,e){return new Date(t.createtime).getTime()-new Date(e.createtime).getTime()},timeEnd:function(t,e){return new Date(e.createtime).getTime()-new Date(t.createtime).getTime()},salesStart:function(t,e){return t.purchase_quantity-e.purchase_quantity},salesEnd:function(t,e){return e.purchase_quantity-t.purchase_quantity},priceStart:function(t,e){return t.order_price-e.order_price},priceEnd:function(t,e){return e.order_price-t.order_price},tabClickbox:function(e,i){this.filterIndex===e?this.synthesis=1==i?0:2==i?1:2:(this.filterIndex=e,this.synthesis=1),this.filterIndex=e,2===e?(this.priceOrder=!this.priceOrder,this.priceOrder?this.scrlist=n(this.scrlist.sort(this.priceStart)):this.scrlist=n(this.scrlist.sort(this.priceEnd))):1==e?(console.log(r(this.timeOrder," at pages\\main\\tradingCenter.vue:356")),this.timeOrder=!this.timeOrder,this.timeOrder?this.scrlist=n(this.scrlist.sort(this.timeStart)):this.scrlist=n(this.scrlist.sort(this.timeEnd))):(this.salesOrder=!this.salesOrder,this.salesOrder?this.scrlist=n(this.scrlist.sort(this.salesStart)):this.scrlist=n(this.scrlist.sort(this.salesEnd))),t.pageScrollTo({duration:300,scrollTop:0}),this.Loadthepage("refresh",1),console.log(r(this.scrlist," at pages\\main\\tradingCenter.vue:385"))},search:function(){this.loadshow=!0,this.colorshow=!1,this.page=1,this.pages=2,this.scrlist=[],this.Loadthepage()},selType:function(){this.showType=!this.showType,this.image=!this.image,this.color=!this.color},typess:function(t,e){this.inputType=e,this.typeName=t,this.typeId=e,this.showType=!this.showType,1==e?(this.email="",this.showCity=!1):(this.account="",this.showCity=!0)},jum:function(e){t.navigateTo({url:e})},jump:function(e,i){i==this.usermid?this.colorshow=!0:(console.log(r("11111111111111111"," at pages\\main\\tradingCenter.vue:433")),t.navigateTo({url:e}),this.colorshow=!1)},Loadthepage:function(){var e=this;if(e.loadshow)if(e.page<=e.pages){var i=e.page+1;this.$service.auth(this,this.$service.api.main.purchasingOrder,"GET",{page:i,limit:15,order:"desc",sort:"time",keywords:"",account:this.account,email:this.email},function(e,s){console.log(r(s," at pages\\main\\tradingCenter.vue:462")),e.pages=s.data.last_page,e.page=i;var a=s.data.data;e.usdt=a.usdt,e.alipay=a.alipay,a.forEach(function(t,i){e.scrlist.push(t)}),e.$forceUpdate(),console.log(r(e.scrlist," at pages\\main\\tradingCenter.vue:473")),e.pages==e.page||0==e.scrlist.length?(e.loadshow=!1,t.showToast({title:"数据已加载完毕",icon:"none"}),console.log(r("1",e.page,e.pages," at pages\\main\\tradingCenter.vue:480"))):(e.loadshow=!0,console.log(r("2",e.page,e.pages," at pages\\main\\tradingCenter.vue:483")))})}else e.loadshow=!1,t.showToast({title:"数据已加载完毕",icon:"none"}),console.log(r("3",e.page,e.pages," at pages\\main\\tradingCenter.vue:493"))},lower:function(){this.Loadthepage()},total:function(t){this.$service.auth(this,this.$service.api.main.purchasingOrder,"GET",{page:1,limit:15,order:"desc",sort:"time",keywords:""},function(t,e){var i=e.data.data;i.forEach(function(t){var e=t.order_price;t.order_price=e.toFixed(2),console.log(r(t," at pages\\main\\tradingCenter.vue:519"))}),t.scrlist=i,t.$forceUpdate()})}}},a(s,"onLoad",function(){this.Loadthepage()}),a(s,"onShow",function(){this.$service.auth(this,this.$service.api.main.getQuotationData,"GET","",function(e,i){e.now_price=i.data.avg_price1,e.total_sum=i.data.total_sum,e.order_sum1=i.data.order_sum1,e.order_sum2=i.data.order_sum2,e.last_price=i.data.avg_price2,e.mywti=i.data.mywti;var r=i.data.mining_dols;t.setStorageSync("tr",r),t.setStorageSync("data_fo",i.data),e.total(i.data.mining_dols)})}),s);e.default=p}).call(this,i("6e42")["default"],i("0de9")["default"])},"7fe1":function(t,e,i){"use strict";var r=i("3e35"),s=i.n(r);s.a},a11d:function(t,e,i){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return r}),i.d(e,"b",function(){return s})},f693:function(t,e,i){"use strict";i.r(e);var r=i("4242"),s=i.n(r);for(var a in r)"default"!==a&&function(t){i.d(e,t,function(){return r[t]})}(a);e["default"]=s.a},fc8d:function(t,e,i){"use strict";i.r(e);var r=i("a11d"),s=i("f693");for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);i("7fe1");var n=i("2877"),o=Object(n["a"])(s["default"],r["a"],r["b"],!1,null,"04f8effc",null);e["default"]=o.exports}},[["3e82","common/runtime","common/vendor"]]]);