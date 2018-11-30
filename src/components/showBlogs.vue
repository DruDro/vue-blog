<template lang="pug">
.container
	.blog
		h2 All posts
		input.input(v-model="search" placeholder="Search posts")
		.posts
			.post(v-for="blog in filteredBlogs")
				h3(v-rainbow="" v-if="blog.title") {{ blog.title | toUpperCase }}
				article.blog-content {{ blog.body | snippet }}
</template>


<script>

	import moment from 'moment';
	import axios from 'axios';
	import searchMixin from '../mixins/searchMixin';

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
		},
		filters: {
			snippet: val => `${val.slice(0,100)}...`,
			toUpperCase: val => val.toUpperCase(),
		},
		mixins:[
			searchMixin
		],
		created(){
			axios.get('http://jsonplaceholder.typicode.com/posts').then(res=>{
				console.log(res)
				this.blogs = res.data.slice(0,10);
			})
		}
	}
</script>

<style scoped lang="scss">
	.posts {
		display:flex;
		flex-flow:row wrap;
		margin:0 -15px;
		.post{
			flex: 0 0 calc(50% - 30px);
			margin:15px;
		}
	}
</style>