import Vue from 'vue'
import App from './App'
import service from './service.js';
import screenTextScroll from './components/screenTextScroll.vue';
Vue.component('textscroll',screenTextScroll);
Vue.prototype.$service = service;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
