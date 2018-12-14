<template lang="pug">
	.container
		form.login-form
			md-field
				label Display Name
				md-input(v-model="displayName" type="text")
			md-field
				label Photo URL
				md-input(v-model="photoURL" type="url")
			md-field
				label Email
				md-input(v-model="email" type="email")
			md-field
				label Password
				md-input(v-model="password" type="password")
			md-button.md-raised.md-accent(@click="register") Register
			router-link(to="/login") Login
</template>


<script>
import firebase from 'firebase';
	export default {
		data: function () {
			return {
				email: '',
				password: '',
				photoURL:'',
				displayName:''
			};
		},
		methods:{
			register: function(e){
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then(user => {
					if(user){
						firebase.auth().currentUser.updateProfile({
							displayName: this.displayName,
							photoURL: this.photoURL
						})
					}
				},
				err => {
					console.log(err.message)
				}
				).then(() => {					
					this.$router.go(this.$router.path)
				})
				e.preventDefault();
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
