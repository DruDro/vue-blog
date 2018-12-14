<template lang="pug">
	div.app-wrapper
		app-header
		main
			router-view
</template>

<script>
// Imports
import addBlog from './components/addBlog.vue';
import showBlogs from './components/showBlogs.vue';
import appHeader from './components/header.vue';

export default {
    components: {
        'add-blog': addBlog,
        'show-blogs': showBlogs,
        'app-header': appHeader,
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
body{
    margin: 0;
    font-family:'Roboto', sans-serif;
}
.container {
	width:1200px;
	max-width:100%;
	margin:0 auto;
	padding:0 15px;
}
.router-link-active {
	color:#000;
	pointer-events:none;
}
</style>
