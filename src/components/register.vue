<template lang="pug">
		form.login-form(@submit.prevent="validateUser" novalidate)
			md-field(:class="getValidationClass('displayName')")
				label(for="displayName") Display Name
				md-input#displayName(v-model="form.displayName" name="displayName" type="text" required)
				span.md-error(v-if="!$v.form.displayName.required") The display name is required
				span.md-error(v-if="!$v.form.displayName.minLength || !$v.form.displayName.maxLength") The display name must be from 3 to 10 characters
			md-field(:class="getValidationClass('photoURL')")
				label(for="photoURL") Photo URL
				md-input#photoURL(v-model="form.photoURL" name="photoURL" type="url")
				span.md-error(v-if="!$v.form.photoURL.url") The photo URL is invalid
			md-field(:class="getValidationClass('email')")
				label(for="email") Email
				md-input#emailReg(v-model="form.emailReg" type="email" name="emailReg" reuired)
				span.md-error(v-if="!$v.form.emailReg.required") The email is required
			md-field(:class="getValidationClass('passwordReg')")
				label(for="passwordReg") Password
				md-input#passwordReg(v-model="form.passwordReg" type="password" name="passwordReg" reuired)
				span.md-error(v-if="!$v.form.passwordReg.required") The password is required
				span.md-error(v-if="!$v.form.passwordReg.minLength") The password must contain 5 characters at least
			md-field(:class="getValidationClass('repeatPassword')")
				label(for="repeatPassword") Repeat password
				md-input#repeatPassword(v-model="form.repeatPassword" type="password" name="repeatPassword" reuired)
				span.md-error(v-if="!$v.form.repeatPassword.sameAsPassword") Passwords must be identical
			.md-card-actions.md-layout.md-alignment-top-center
				md-button.md-accent(type="submit") Register
			md-snackbar(md-position="center" :md-duration="4000" :md-active.sync="showSnackbar") {{ snackText }}
</template>


<script>
import firebase from 'firebase';
import {
	validationMixin
} from 'vuelidate'
import {
	required,
	email,
	url,
	sameAs,
	minLength,
	maxLength
} from 'vuelidate/lib/validators'
export default {
	data: function () {
		return {
			snackText: '',
			showSnackbar: false,
			form: {
				emailReg: '',
				passwordReg: '',
				photoURL: '',
				displayName: ''
			}
		};
	},
	mixins: [validationMixin],
	validations: {
		form: {
			emailReg: {
				required,
				email,
				minLength: minLength(5)
			},
			passwordReg: {
				required,
				minLength: minLength(5)
			},
			repeatPassword: {
				sameAsPassword: sameAs('passwordReg')
			},
			displayName: {
				minLength: minLength(3),
				maxLength: maxLength(10),
				required
			},
			photoURL: {
				url
			}
		}
	},
	methods: {
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName]
			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty
				}
			}
		},
		validateUser() {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				this.register()
			}
		},
		register: function () {
			firebase.auth().createUserWithEmailAndPassword(this.form.emailReg, this.form.passwordReg)
				.then(user => {
						if (user) {
							firebase
								.auth()
								.currentUser
								.updateProfile({
									displayName: this.form.displayName,
									photoURL: this.form.photoURL
								})
								.then(() => {
									this.snackText = 'User created'
									this.showSnackbar = true;
								})
								.then(() => {
									setTimeout(() => this.$router.go({
										path: '/'
									}), 4000)
								})
						}
					},
					err => {
						this.snackText = err.message
						this.showSnackbar = true
					}
				)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
