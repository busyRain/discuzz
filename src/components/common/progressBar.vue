<template>
	<div class="progressBar">
		<div class="bar" :style="{width:progress}">{{(current ||0)+"/"+(total || 1)}}</div>
	</div>
</template>
<script>
	export default {
		name: "detailProgress",
		props: ['current', 'total'],
		computed: {
			progress() {
				var _v = (parseFloat(this.current) / parseFloat(this.total)) * 100;
				return _v + "%";
			}
		}
	}
</script>
<style lang="scss" scoped>
	.progressBar {
		display: inline-block;
		width: 100%;
		font-size: 12px;
		background: #ebeef5;
		line-height: 20px;
		border-radius: 32px;
		color: #585858;
		overflow: hidden;
	}

	.bar {
		background-color: #409EFF; 
		padding-left: 5px;
		color: #fff;
	}
</style>
