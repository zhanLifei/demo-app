
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/null","pages/login/login","pages/reg/reg","pages/reg/download","pages/login/unbind","pages/login/forget","pages/main/index","pages/main/carService","pages/main/tradingCenter","pages/main/financial","pages/main/my","pages/index/notice","pages/index/noticeDeail","pages/index/beguide","pages/index/myteam","pages/index/masters","pages/index/selInsCom","pages/index/uploaddata","pages/index/selarchins","pages/index/carservice","pages/index/storeinfo","pages/index/allevalu","pages/index/allevaluArt","pages/index/issueeval","pages/index/everyoneg","pages/index/pir","pages/index/article","pages/index/selcity","pages/index/provinceCity","pages/index/nameauth","pages/index/cardauth","pages/index/conequity","pages/index/loansrecord","pages/index/applyun","pages/index/applyrecord","pages/index/level","pages/record/levelDateile","pages/index/webview","pages/record/integral","pages/record/int_detail","pages/record/hall","pages/record/order","pages/record/wd_record","pages/record/chebeidetail","pages/record/malidefail","pages/record/honordefail","pages/record/apply_record","pages/record/canalrecord","pages/record/AdDetail","pages/record/auditcom2","pages/center/buy","pages/center/onsale","pages/center/my_deal","pages/center/merchant","pages/center/voucher","pages/center/invitefrient","pages/center/appload","pages/center/apploans2","pages/center/getPOS","pages/center/upload_voucher","pages/center/question","pages/center/credit_card","pages/service/feedback","pages/main/scan","pages/service/star_level","pages/service/auditcom","pages/service/appointment","pages/service/myappointment","pages/service/conversfun","pages/service/myfun","pages/service/businesscenter","pages/service/putcode","pages/service/fam_quest","pages/set/security","pages/set/loginpsw","pages/set/dealpsw","pages/set/forgetpsw","pages/set/personal","pages/service/post","pages/service/up_post","pages/service/credit_card","pages/service/up_credit","pages/record/custom","pages/record/conDeial","pages/service/user_rule","pages/service/settlement","pages/realName/real_name","pages/realName/review","pages/realName/authentication","pages/realName/usdtreal"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#999999","selectedColor":"#2692FE","borderStyle":"black","backgroundColor":"#FAFAFA","list":[{"pagePath":"pages/main/index","iconPath":"static/tabBar/index.png","selectedIconPath":"static/tabBar/index_select.png","text":"首页"},{"pagePath":"pages/main/carService","iconPath":"static/tabBar/carService.png","selectedIconPath":"static/tabBar/carService_select.png","text":"车服务"},{"pagePath":"pages/main/financial","iconPath":"static/tabBar/financial.png","selectedIconPath":"static/tabBar/financial_select.png","text":"金融"},{"pagePath":"pages/main/tradingCenter","iconPath":"static/tabBar/tradingCenter.png","selectedIconPath":"static/tabBar/tradingCenter_select.png","text":"置换中心"},{"pagePath":"pages/main/my","iconPath":"static/tabBar/myCenter.png","selectedIconPath":"static/tabBar/myCenter_select.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"车聚利","compilerVersion":"2.7.9","entryPagePath":"pages/login/null","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/null","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/reg/reg","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/reg/download","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/login/unbind","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/main/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/main/carService","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/main/tradingCenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/main/financial","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/main/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/notice","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/noticeDeail","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/beguide","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/myteam","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/masters","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/selInsCom","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/uploaddata","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/selarchins","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/carservice","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/storeinfo","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/allevalu","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/allevaluArt","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/issueeval","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/everyoneg","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/pir","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/article","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/selcity","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/provinceCity","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/nameauth","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/cardauth","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/conequity","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/loansrecord","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/applyun","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/applyrecord","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/index/level","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/levelDateile","meta":{},"window":{"navigationBarTitleText":"积分详细","titleNView":false}},{"path":"/pages/index/webview","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/integral","meta":{},"window":{"navigationBarTitleText":"积分详细","titleNView":false}},{"path":"/pages/record/int_detail","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/hall","meta":{},"window":{"navigationBarTitleText":"城市大厅","titleNView":false}},{"path":"/pages/record/order","meta":{},"window":{"navigationBarTitleText":"订单详情","titleNView":false}},{"path":"/pages/record/wd_record","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/chebeidetail","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/malidefail","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/honordefail","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/apply_record","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/canalrecord","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/AdDetail","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/auditcom2","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/buy","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/onsale","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/my_deal","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/merchant","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/voucher","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/invitefrient","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/appload","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/apploans2","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/getPOS","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/upload_voucher","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/question","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/center/credit_card","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/feedback","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/main/scan","meta":{},"window":{"navigationBarTitleText":"核销兑换券","titleNView":false}},{"path":"/pages/service/star_level","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/auditcom","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/appointment","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/myappointment","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/conversfun","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/myfun","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/businesscenter","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/putcode","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/fam_quest","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/set/security","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/set/loginpsw","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/set/dealpsw","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/set/forgetpsw","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/set/personal","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/post","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/up_post","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/credit_card","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/up_credit","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/custom","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/record/conDeial","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/user_rule","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/service/settlement","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/realName/real_name","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/realName/review","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/realName/authentication","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/realName/usdtreal","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
