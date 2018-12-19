<template lang="pug">
.md-layout
	.blog
		h2 All posts
		md-field
			label Search posts
			md-input.input(v-model="search")
		md-card.post(v-for="(blog,index) in filteredBlogs" :key="index")
			md-card-header
				router-link(v-if="blog.title" :to="`/blog/${blog.id}`")
					h3 {{ blog.title }}
			md-card-content
				article.blog-content(v-html="trimHtml(blog.content,34)")
</template>


<script>

	import moment from 'moment';
	import axios from 'axios';
	import fb from './firebaseConfig';
	import searchMixin from '../mixins/searchMixin';
	import trim from 'trim-html';

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
			trimHtml: (val,n) => {
				return trim(val,n).html
			}
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
			this.$store.state.title="Home"
		}
	}
</script>

<style scoped lang="scss">
</style>