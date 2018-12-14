<template lang="pug">
.container
	.blog
		h2 All posts
		md-field
			label Search posts
			md-input.input(v-model="search" placeholder="Search posts")
		.posts
			.post(v-for="blog in filteredBlogs")
				h3(v-if="blog.title") 
					router-link(:to="`/blog/${blog.id}`") {{ blog.title }}
				article.blog-content(v-html="trimHtml(blog.content, 200)")
</template>


<script>

	import moment from 'moment';
	import axios from 'axios';
	import fb from './firebaseConfig';
	import searchMixin from '../mixins/searchMixin';
	import trimHTML from 'trim-html';

	export default {
		
		data() {
			return {
				blogs:[],
				search:""
			}
		},
		computed: {
		},
		methods: {
			trimHtml: (val,n) => trimHTML(val,n).html
		},
		filters:{
		},
		mixins:[
			searchMixin
		],
		created(){
			axios.get(`${fb.databaseURL}/posts.json`).then(({data}) => {
				const blogs = [];
				for(let key in data){
					data[key].id = key;
					blogs.push(data[key]);
					this.blogs = blogs;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
</style>