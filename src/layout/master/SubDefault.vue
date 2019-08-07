<template>
	<div class="default">
		<Header /> 
		<Navigator />
		<router-view class="inner ov" />
		<Bottom />
		<Footer />
	</div>
</template>

<script>
	import Header from "@/layout/components/header.mini"; 
	import Navigator from "@/layout/components/navigator"; 
	import Footer from "@/layout/footer";
	import Bottom from '@/layout/bottom';

	export default {
		name: "home",
		components: {
			Header, 
			Navigator,
			Footer,
			Bottom
		},
	};
</script>
