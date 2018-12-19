import Vue from 'vue';
import firebase from 'firebase';
import router from './router';
import './components/firebaseInit';
import App from './App.vue';
import VueMaterial from 'vue-material';
import {store} from './store/store';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);

let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
	  router,
	  store,
      template: '<App/>',
      components: { App }
    });
  }
});