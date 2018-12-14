import Vue from 'vue';
import Router from 'vue-router';
import showBlogs from './components/showBlogs.vue';
import singleBlog from './components/singleblog.vue';
import addBlog from './components/addBlog.vue';
import Login from './components/login.vue';
import Register from './components/register.vue';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/',
			component: showBlogs,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/blog/:id',
			component: singleBlog,
			meta: {
				requiresAuth: true
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
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				requiresGuest: true
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
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
		  path: '/login',
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