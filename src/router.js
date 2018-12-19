import Vue from 'vue';
import Router from 'vue-router';
import showBlogs from './components/showBlogs.vue';
import singleBlog from './components/singleblog.vue';
import addBlog from './components/addBlog.vue';
import enter from './components/enter.vue';
import error404 from './components/error404.vue';
import firebase from 'firebase';

Vue.use(Router);
Vue.component('router-link', Vue.options.components.RouterLink);
Vue.component('router-view', Vue.options.components.RouterView);

let router = new Router({
	routes: [
		{
			path: '*',
			component: error404
		},
		{
			path: '/',
			component: showBlogs,
			meta: {
				desiresPersonalization: true
			}
		},
		{
			path: '/blog/:id',
			component: singleBlog,
			meta: {
			}
		},
		{
			path: '/add',
			component: addBlog,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/enter/',
			redirect:'/enter/login',
		},
		{
			path: '/enter/:logreg',
			component: enter,
			meta: {
				requiresGuest: true
			}
		},
	],
	mode: 'history'
});


// Nav Guard
router.beforeEach((to, from, next) => {
	// Check for requiresAuth guard
	if (to.matched.some(record => record.meta.requiresAuth)) {
	  // Check if NO logged user
	  if (!firebase.auth().currentUser) {
		// Go to login
		next({
		  path: '/enter/login',
		  query: {
			redirect: to.fullPath
		  }
		});
	  } else {
		// Proceed to route
		next();
	  }
	} else if (to.matched.some(record => record.meta.requiresGuest)) {
	  // Check if NO logged user
	  if (firebase.auth().currentUser) {
		// Go to login
		next({
		  path: '/',
		  query: {
			redirect: to.fullPath
		  }
		});
	  } else {
		// Proceed to route
		next();
	  }
	} else {
	  // Proceed to route
	  next();
	}
  });

export default router;