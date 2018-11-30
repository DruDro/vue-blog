<template lang="pug">
	div.app-wrapper
		app-header
		main
			router-view
		app-footer
</template>

<script>
// Imports
import addBlog from './components/addBlog.vue';
import showBlogs from './components/showBlogs.vue';
import appHeader from './components/header.vue';
import appFooter from './components/footer.vue';

export default {
    components: {
        'add-blog': addBlog,
        'show-blogs': showBlogs,
        'app-header': appHeader,
        'app-footer': appFooter,
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
* {
	box-sizing: border-box
}
body{
    margin: 0;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color:#000;
}
h1,h2,h3,h4,h5,h6{
    font-weight: 300;
}
.container {
	width:1200px;
	max-width:100%;
	margin:0 auto;
	padding:0 15px;
}
label{
    display: block;
    margin: 20px 0 10px;
	font-weight:400;
}
.input,select, textarea{
    display: block;
    width: 100%;
    padding: 8px;
	font-weight: 400;
}
.btn{
	background: #fff;
	border:1px solid #000;
	border-radius: 0;
	margin:10px; 	
    display: block;
	width:auto;
    padding: 8px;
	transition:all .15s ease-in-out;
	cursor:pointer;
	appearance:none;
	background-clip:rect(0, 100);
	font-weight: 500;
	text-transform: uppercase;
	&:hover,&:active,&:focus{
		box-shadow: 0 0 8px 2px rgba(0,0,0,.3);
		outline:0;
	}
	&--center{
		margin: 10px auto;
	}
}
h3{
    margin-top: 10px;
}
ul,ol{
	padding:0;
	margin:0;
	list-style-position: inside;
	li {
		padding:0;
		margin:0;
	}
}
.clearfix{
	clear:both;
	display:table;
	width:100%;
}
hr{
	margin:10px 0;
	border:0;
	border-top:1px solid #000;
	height:0;
	background: transparent;
}

.router-link-active {
	color:#000;
	pointer-events:none;
}
</style>
