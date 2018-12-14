<template lang="pug">
	article(v-html="blog.content")

</template>


<script>
import axios from 'axios';
import fb from './firebaseConfig';
	export default {
		data(){
			return{
				blog:{}
			}
		},
		methods:{
			getPost:function(){
				axios.get(`${fb.databaseURL}/posts/${this.$route.params.id}.json`)
				.then(({data}) => 
				{
					console.log(data)
					this.blog = data;
				})
			}
		},
		created(){
			this.getPost()
		}
	}
</script>

<style scoped>

</style>