<template lang="pug">
.page-container
	md-app(md-mode='reveal')
		md-app-toolbar(md-elevation="0")
			router-link.md-icon-button(tag="md-button" to="/")
				md-icon(md-font-set="material-icons") home
			span.md-title {{ title }}
			router-link.md-icon-button.pull-right(v-if="isLoggedIn" to="/add" exact tag="md-button")
				md-icon.md-primary add
			router-link.md-icon-button.pull-right(v-if="!isLoggedIn" to="/enter" exact tag="md-button")
				md-icon person
			md-menu(md-size="medium" md-direction="bottom-end" v-if="isLoggedIn" )
				md-avatar(md-menu-trigger)
					md-ripple
						img(:src="currentUser.photoURL || '/dist/logo.png'")
				md-menu-content
					md-menu-item(to="/profile") Profile
					md-menu-item(@click="logout") Logout
		md-app-content
			transition( name="fade-slide-up" mode="out-in")
				router-view
</template>

<script>
import showBlogs from './components/showBlogs.vue';
import firebase from 'firebase';

export default {
	components: {
		'show-blogs': showBlogs
	},
	data() {
		return {
			isLoggedIn: false,
			currentUser: false,
		}
	},
  created() {
    if (firebase.auth().currentUser) {
	  this.isLoggedIn = true;
	  const {email, photoURL, displayName} = firebase.auth().currentUser;
      this.currentUser = {email, photoURL, displayName};
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  },
  computed:{
	  title(){
		  return this.$store.state.title
	  }
  }
}
</script>

<style lang="scss">

@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(black, A200), // The primary color of your application
  accent: md-get-palette-color(black, A200), // The accent or secondary color
  
));

@import "~vue-material/dist/theme/all"; // Apply the theme
  .md-app {
  	height: 100vh;
  	border: 1px solid rgba(#000, .12);
  }
.fade-slide-up-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-up-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-up-enter, .fade-slide-up-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
  // Demo purposes only
  .md-drawer {
  	width: 230px;
  	max-width: calc(100vw - 125px);
  }
.pull-right{
	margin-left:auto!important
}
.responsive-media {
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 25px;
	height: 0;
	display:block;
	audio:not(.md-image), canvas:not(.md-image), embed:not(.md-image), iframe:not(.md-image), img:not(.md-image), object:not(.md-image), video:not(.md-image) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
