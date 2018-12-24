<template lang="pug">
	section.article
		header.article__header
			h1.article__title {{ blog.title }}
			.article__author {{ blog.author.displayName }}
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
					this.$store.state.title = 'Blog';
					document.title = this.blog.title
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