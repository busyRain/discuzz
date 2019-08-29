<template>
	<div class="default subpage">
		<Header />
		<Navigator />
		<router-view/>
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
