<template lang="pug">
	header
		.container
			nav
				ul
					li(v-if="isLoggedIn") #[img(:src="currentUser.photoURL")]{{currentUser.email}}
					li(v-if="!isLoggedIn")
						router-link(to="/login" exact) Login
					li(v-if="!isLoggedIn")
						router-link(to="/register" exact) Register
					li(v-if="isLoggedIn")
						md-button(@click="logout") Logout
					li(v-if="isLoggedIn")
						router-link(to="/add" exact) Add a new blog
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
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
  }
};
</script>

<style scoped>
</style>