<template>
	<span class="user-level">Lv{{level}}</span>
</template>

<script>
	export default{
		props:["level"]
	}
</script>

<style lang="scss">
	.user-level{
		background-color: #ffbe24;
		background-image: url(../../assets/images/icon-level.png);
		background-position: 5px 5px;
		background-repeat: no-repeat;
		color: #fff;
		padding:1px 6px 1px 25px;
		border-radius: 2px;
		font-size: 14px;
		line-height: 1.5;
	}
</style>
