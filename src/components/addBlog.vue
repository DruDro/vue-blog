<template lang="pug">
.container
	#add-blog
		h2 Add a New Blog Post
		form(v-if="!submitted")
			main.main
				md-field
					label Blog Title:
					md-input(v-model.lazy="blog.title" required)
				md-field
					label Tags:
					md-select(v-model="blog.tags" multiple)
						md-option(v-for="(tag,index) in tags" :value="tag" :key="index") {{ tag }}
				md-field
					label Blog Content:
					froala(:tag="'textarea'" :config="editorConfig" v-model="blog.content")
			md-button.btn--center(@click.prevent="post") Add Blog
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
			blog: {
				title: '',
				content: '',
				tags: [],
				author: firebase.auth().currentUser.displayName
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
				charCounterCount: false
			},
		}
	},
	methods: {
		post: function() {
			axios.post(`${fb.databaseURL}/posts.json`,this.blog)
			.then(data => this.submitted = true)
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
