<template lang="pug">
	.blog
		md-field
			label Search posts
			md-input.input(v-model="search")
		.md-layout-gutter
			main.feed.md-layout-item.md-size-70.md-small-size-100
				md-card.post(v-for="(blog,index) in searchedBlogs" :key="index")
					md-ripple
						md-card-header
							md-card-header-text
								router-link.md-title(v-if="blog.title" :to="`/blog/${blog.id}`") {{ blog.title }}
						md-card-content.blog-content(v-html="trim(blog.content,180)")
						md-card-actions(md-alignment="space-between")
							md-button(:to="`/blog/${blog.id}`") More
							div
								md-button.md-icon-button
									md-icon favorite
								md-button.md-icon-button
									md-icon bookmark
								md-button.md-icon-button
									md-icon share
			aside.sidebar.card.md-layout-item.md-size-30.md-small-size-100
</template>


<script>

	import moment from 'moment';
	import axios from 'axios';
	import fb from './firebaseConfig';
	import searchMixin from '../mixins/searchMixin';
	import trimHtml from 'trim-html';

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
			trim: (val,n) => {
				return trimHtml(val,{limit:n}).html
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
  .md-card {
    margin: 0 0 20px!important;
  }
</style>