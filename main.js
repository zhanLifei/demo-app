import Vue from 'vue'
import App from './App'
import service from './service.js';
// 引入全局存储
import store from '@/store';

// 全局组件
import rfEmpty from '@/components/rf-empty';

// 引入全局配置
import $mAssetsPath from '@/config/assets.config.js';
import $mConfig from '@/config/index.config.js';
import $mRoutesConfig from '@/config/routes.config.js';
import $mFormRule from '@/config/formRule.config.js';
import $mConstDataConfig from '@/config/constData.config.js';
import $mSettingConfig from '@/config/setting.config.js';

Vue.prototype.$service = service;
Vue.config.productionTip = false
// 挂载全局自定义方法
Vue.prototype.$mStore = store;

Vue.prototype.$mConfig = $mConfig;
Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mFormRule = $mFormRule;
Vue.prototype.$mRoutesConfig = $mRoutesConfig;
Vue.prototype.$mConstDataConfig = $mConstDataConfig;
Vue.prototype.$mSettingConfig = $mSettingConfig;

Vue.component('rfEmpty', rfEmpty);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
