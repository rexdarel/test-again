import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueQrcodeReader from 'vue-qrcode-reader'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'

Vue.use(Vuetify)
Vue.use(VueQrcodeReader)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
