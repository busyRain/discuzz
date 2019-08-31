<template>
	<div class="medal-container">
		<el-image :src="$store.state.imgurl + medal.icon" class="icon"></el-image>
		<div class="title">{{medal.medalName}}</div>
	</div>
</template>

<script>
	export default {
		props: ["medal"]
	}
</script>

<style lang="scss">
	.medal-container {
		.icon {
			width: 105px;
			height: 105px;
			border: solid 1px #409eff;
			background:#fff;
			img {
				border: solid 5px #fff;
			}
		}

		.title {
			font-size: 18px;
			color: #0a0a0a;
			line-height: 1.8;
		}
	}
</style>
