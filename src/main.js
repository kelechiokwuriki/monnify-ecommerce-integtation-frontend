import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

export const eventBus = new Vue();

window.Vue = Vue;

new Vue({
  render: h => h(App),
}).$mount('#app')
