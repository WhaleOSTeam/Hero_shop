// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import Layout from "./pages/Layout.vue"
import $ from  "jquery"
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#root',
 router,
  components: { Layout },
  template: '<Layout/>'
})
