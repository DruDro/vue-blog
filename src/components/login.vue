<template lang="pug">
		form.login-form(@submit.prevent="validateUser" novalidate)
			md-field(:class="getValidationClass('email')")
				label(for="email") Email
				md-input#email(type="email" name="email" autocomplete="email" v-model="form.email" required)
				span.md-error(v-if="!$v.form.email.required") The email is required
				span.md-error(v-else-if="!$v.form.email.email") Invalid email
			md-field(:class="getValidationClass('password')")
				label(for="password") Password
				md-input#password(v-model="form.password" name="password" type="password" required)
				span.md-error(v-if="!$v.form.password.required") The password is required
			.md-card-actions.md-layout.md-alignment-top-center
				md-button.md-accent(type="submit") Login
</template>


<script>
	import firebase from 'firebase';
	import { validationMixin } from 'vuelidate'
	import {
		required,
		email,
		minLength,
		maxLength
	} from 'vuelidate/lib/validators'

export default {
	data: function () {
		return {
			form:{
				email: null,
				password: null
			}
		};
	},
    mixins: [validationMixin],
	validations: {
		form:{
			email: {
				required,
				email,
				minLength: minLength(5)
			},
			password:{
				required
			}
		}
	},
	methods: {
		getValidationClass (fieldName) {
			const field = this.$v.form[fieldName]
			if (field) {
				return {
					'md-invalid': field.$invalid || field.$dirty
				}
			}
		},
		validateUser () {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				this.login()
			}
		},
		login: function (e) {
			firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
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
