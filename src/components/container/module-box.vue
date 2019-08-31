<template>
	<div class="m-box">
		<div class="m-box__header">
			<div class="title">
				<slot name="title"></slot>
			</div>
		</div>
		<div class="m-box__content">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script></script>

<style lang="scss">
	$content-width: 1200px;
	$font-yellow: #ffbe24;
	$font-red: #ff0000;
	$font-blue: #409eff;
	$font-gray: #a0a0a0;
	$font-black: #0a0a0a;

	$borderColor: #c7c7c7;

	.m-box {
		padding: 0 20px;
		background: #fff;

		.m-box__header {
			border-bottom: solid 1px $borderColor;
			padding-top: 10px;

			.nav-title {
				display: inline-block;
				padding-bottom: 10px;
				padding-right: 30px;
				cursor: pointer;

				span {
					line-height: 1.5;
					font-size: 18px;
				}

				.is-active {
					padding-bottom: 10px;
					color: $font-black;
					font-weight: bold;
					border-bottom: solid 5px $font-blue;
				}
			}

			.title {
				color: $font-black;
				font-size: 18px;
				font-weight: bold;
				line-height: 1.5;
				display: inline-block;
				border-bottom: solid 5px $font-blue;
				padding-bottom: 10px;
			} 
		}

		.m-box__content {
			padding: 20px 0;
		}
	}
</style>
