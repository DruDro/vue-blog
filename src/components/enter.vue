<template lang="pug">
.md-layout.md-alignment-top-center
	.md-card.md-layout-item.md-size-25.md-medium-size-45.md-small-size-60.md-xsmall-size-100
		md-tabs(md-alignment="fixed" md-dynamic-height @md-changed="setTitle" :md-active-tab="activeTab" md-sync-route )
			md-tab#tab-login(md-label='Login' to="/enter/login")
				login
			md-tab#tab-register(md-label='Register' to="/enter/register")
				register
</template>


<script>
	import login from './login.vue'
	import register from './register.vue'
	export default {
		components: {
			'login': login,
			'register': register
		},
		data() {
			return {
				activeTab:''
			}
		},
		computed:{
			title:()=>{
				this.$store.state.title
			}
		},
		methods:{
			setTitle: function(tab) {
				this.$store.state.title = `${tab}` === "tab-login" ? 'Login' : 'Register'
			}
		},
		created(){
			if(this.$route.params.logreg) {
				this.activeTab = `tab-${this.$route.params.logreg}`
			}
			else {
				this.activeTab = 'tab-login'
			}
			this.setTitle(this.activeTab)
		}
	}
</script>

<style scoped>

</style>