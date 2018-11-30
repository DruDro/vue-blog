<template lang="pug">
.container
	#add-blog
		h2 Add a New Blog Post
		form(v-if="!submitted")
			main.main
				label Blog Title:
				input.input(v-model.lazy="blog.title" required)
				label Author:
				select.input(v-model="blog.author" required)
					option(selected value="" hidden) -
					option(v-for="author in authors") {{ author }}
				label Blog Content:
				froala(:tag="'textarea'" :config="editorConfig" v-model="blog.content")
			aside.sidebar
				.tags
					h4 Blog Tags:
					ul
						li(v-for="tag in tags") 
							label #[input(type="checkbox" name="tags" :value="tag" v-model="blog.tags")] {{ tag }}
			.clearfix
			br
			button.btn.btn--center(@click.prevent="post") Add Blog
		.message(v-if="submitted") Thanks for adding your post.
		section#preview
			h3(v-if="blog.title") {{ blog.title }}
			p.details
				span.author(v-if="blog.author") {{ blog.author }}
				span.date(v-if="blog.title") {{ date }}
			froalaView(v-model="blog.content")
			.tags(v-if="blog.tags.length")
				ul
					li(v-for="tag in blog.tags") {{ tag }}
</template>

<script>
// Imports
import moment from 'moment';
import axios from 'axios';

export default {
	components:{

	},
	data() {
		return {
			blog: {
				title: '',
				content: '',
				tags: [],
				author: ""
			},
			authors: [
				"Dru",
				"Dro",
				"DruDro"
			],
			tags: [
				"Ninjas",
				"Wizards",
				"Mario",
				"Cheese"
			],
			submitted:false,

			editorConfig: {
				events: {
					'froalaEditor.initialized': function () {
						console.log('initialized')
					}
				},
				placeholderText: 'Edit Your Content Here!',
				charCounterCount: false
			},
		}
	},
	methods: {
		post: function() {
			axios.post('http://jsonplaceholder.typicode.com/posts',{
				title: this.blog.title,
				body: this.blog.content	,
				userId:1
			}).then(data=> this.submitted = true)
		}
	},
	computed: {
		date: () => {
			return moment().format("D.M.YYYY")
		}
	}
}
</script>

<style scoped lang="scss">
	#add-blog * {
		box-sizing: border-box;
	}

	#add-blog {
		margin: 20px auto;
		form {
			overflow:auto;
			.main,.sidebar{
				float:left;
			}
			.main{
				width:70%;
				padding-right: 15px;
				@media screen and (max-width: 1023px){
					float:none;
					width:100%;
					padding:0;
				} 
			}
			.sidebar{
				width:30%;
				padding-left:15px;
				@media screen and (max-width: 1023px){
					float:none;
					padding:0;
					width:100%;
				}
		ul {
			list-style: none;
		}

		input {
			display: inline-block;
			margin: 0 10px 0 0;
			vertical-align: middle;
		}

		label {
			display: inline-block;
			vertical-align: middle;
			line-height: normal;
			padding: 0;
			margin: 0;
		}
			}
		}
	}

	#preview {
		margin: 30px auto;
		position: relative;
		overflow:hidden;
		border-top:1px solid #000;
		.details{
			display:flex;
			flex-flow:row wrap;
			justify-content:space-between;
			align-items:flex-end;
			margin: 0 -10px;
			.date,.author{
				margin:10px;
				display:block;
			}
		}
	}

</style>
