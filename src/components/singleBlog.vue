<template lang="pug">
	md-card.article
		md-card-header.article__header
			h1.md-title.md-layout.md-alignment-center-space-between {{ blog.title }}
				span.article__data.md-subhead {{ blog.date }}
			.md-subhead
				span.article__author {{ blog.author.displayName }}
		md-card-content.article__content(v-html="blog.content")
		md-card-actions(md-alignment="space-between")
			div.tags
				router-link(tag="md-chip" v-for="tag in blog.tags" md-clickable :to="`/?tag=${tag}`") {{ tag }}
			div
				md-button.md-icon-button
					md-icon favorite
				md-button.md-icon-button
					md-icon bookmark
				md-button.md-icon-button
					md-icon share

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