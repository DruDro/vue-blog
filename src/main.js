import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import App from './App.vue';
import VueFroala from 'vue-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/css/froala_style.min.css';

Vue.use(VueFroala);
Vue.use(VueRouter);
	const router = new VueRouter({
		routes: Routes,
		mode: 'history'
	});

//Custom directives
Vue.directive('rainbow', {
	bind(el, binding, vnode) {
		el.style.color = binding.value || `#${Math.random().toString().slice(2,8)}`;
	}
});


new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
