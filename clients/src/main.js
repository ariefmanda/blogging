import Vue from 'vue'
import notifications from 'vue-notification';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(notifications);

Vue.prototype.$axios = require('axios').create({
  baseURL: 'http://127.0.0.1:3000/api', //35.200.153.228
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
