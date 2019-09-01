<template>
	<div class="medal-wear-container">
		<el-image :src="$store.state.imgurl + medal.icon" class="icon"></el-image> 
	</div>
</template>

<script>
	export default {
		props: ["medal"]
	}
</script>

<style lang="scss">
	.medal-wear-container {
		padding: 15px 0; 		
		text-align: center;
		.icon {
			width: 105px;
			height: 105px;
			// border: solid 1px #409eff;
			background:#fff;
			
			img {
				border: solid 5px #fff;
			}
			
			&:hover{
				box-shadow:0px 0px 6px rgba(64,158,255,0.5);
			}
		}

		.title {
			font-size: 18px;
			color: #0a0a0a;
			line-height: 1.8;
			text-align: center;
		} 
	}
</style>
