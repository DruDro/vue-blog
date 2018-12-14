<template lang="pug">
	.container
		form.login-form
			md-field
				label Email
				md-input(v-model="email" type="email")
			md-field
				label Password
				md-input(v-model="password" type="password")
			md-button.md-raised.md-accent(@click="login") Login
			router-link(to="/register") Register
</template>


<script>
import firebase from 'firebase';
	export default {
		data: function () {
			return {
				email: '',
				password: ''
			};
		},
		methods:{
			login: function(e){
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(user => {
					this.$router.go(this.$router.path)
				},
				err => {
					console.log(err.message)
				}
				)
				e.preventDefault();
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
