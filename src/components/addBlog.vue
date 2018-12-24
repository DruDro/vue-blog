<template lang="pug">
.container
	md-card#add-blog
		md-card-header
			h2 Add a New Blog Post
		form.md-card-content(v-if="!submitted")
			main.main
				.md-layout.md-gutter.md-alignment-center-center
					.md-layout-item.md-size-75
						md-field
							label Blog Title:
							md-input(v-model.lazy="blog.title" required)
					.md-layout-item.md-size-25
						md-chips(v-model="blog.tags" md-placeholder="Add tag...")
					.md-layout-item.md-size-100
						md-field
							label Blog Content:
							froala(:tag="'textarea'" :config="editorConfig" v-model="blog.content" videoResponsive="true")
				md-button.md-raised.md-primary(@click.prevent="post") Add Blog
			
	section.md-card#preview
		md-card-header
			h2 Preview
		md-card-content
			h1(v-if="blog.title") {{ blog.title }}
			p.details
				span.author(v-if="blog.author") {{ blog.author.displayName }}
				span.date(v-if="blog.title") {{ blog.date }}
			froalaView(v-model="blog.content")
			.tags(v-if="blog.tags.length")
				md-list
					md-list-item(v-for="(tag,index) in blog.tags" :key="index") {{ tag }}
	md-snackbar(:md-active="submitted")
		p Thanks for adding your post.
			router-link(:to="`/blog/${blog.blogId}`") View post
</template>

<script>
// Imports
import Vue from 'vue';
import VueFroala from 'vue-froala-wysiwyg';
import moment from 'moment';
import axios from 'axios';
import firebase from 'firebase';
import fb from './firebaseConfig';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/css/froala_style.min.css';

Vue.use(VueFroala);

export default {
	components:{

	},
	data() {
		return {
			pageTitle:'Add Blog Post',
			blog: {
				title: '',
				content: '',
				tags: [],
				author: firebase.auth().currentUser,
				blogId: '',
				date:moment().format("D.M.YYYY")
			},
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
					}
				},
				placeholderText: 'Edit Your Content Here!',
				videoResponsive: true,
				charCounterCount: false,
				inlineClasses: {
					'fr-class-code': 'Code',
					'fr-class-highlighted': 'Highlighted',
					'fr-class-transparency': 'Transparent',
					'responsive-media': 'Responsive Media'
				}
			},
		}
	},
	methods: {
		post: function() {
			const {title,tags,content,date,author} = this.blog;
			axios.post(`${fb.databaseURL}/posts.json`,{
				title,tags,content,date,author
			})
			.then(({data}) => {
				this.blog.blogId = data.name
				this.submitted = true;
			})
		}
	}
}
</script>

<style  lang="scss">
#add-blog{
	margin: 0 auto;
}
.fr-box{
	width: 100%;
	z-index:6;
}
	#preview {
		margin: 30px auto;
		position: relative;
		overflow:hidden;
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
