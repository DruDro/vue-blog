<template lang="pug">
	section.article
		header.article__header
			.article__author {{ blog.author }}
			.article__data {{ blog.date }}
		article.article__content(v-html="blog.content")

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
					this.blog = data;
					this.$store.state.title = this.blog.title
				})
			}
		},
		created(){
			this.getPost();
		}
	}
</script>

<style scoped>

</style>