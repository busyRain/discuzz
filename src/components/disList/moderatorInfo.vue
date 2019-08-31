<template>
	<div class="moderator">
		<h3>版主</h3>
		<ul>
			<li v-for="(item,index) in infoData" :key="index">
				<el-image :src="$IMG_URL+item.imgurl" :fit="'cover'">
					<div slot="error" class="image-slot">
						<i class="el-icon-picture-outline"></i>
					</div>
				</el-image>
				<label>{{item.nickname}}</label>
				<user-level :level="item.userlvl"></user-level>
			</li>
		</ul>
	</div>

</template>
<script>
	import * as api from '@/api/list';
	import userLevel from '@/components/common/user-level';
	export default {
		name: "moderatorInfo",
		data() {
			return {
				infoData: []
			}
		},
		components:{
			userLevel
		},
		methods: {
			async getModerator(id) {
				await api.getModeratorInfo(id).then(res => {
					if (res.code == 0) {
						this.infoData = res.data.slice(0, 4)
					}
				})
			}
		},
		created() {
			this.getModerator(this.$route.params.id)
		}
	}
</script>
<style lang="scss" scoped>
	.moderator {
		h3 {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 20px;
		}

		li {
			padding: 5px 0;
			position: relative;
		}

		.el-image {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}

		label {
			position: relative;
			bottom: 14px;
			left: 15px;
			display: inline-block;
			width: 60px;
			overflow: hidden;
			text-overflow: ellipsis;
			-o-text-overflow: ellipsis;
			-webkit-text-overflow: ellipsis;
			-moz-text-overflow: ellipsis;
			white-space: nowrap;
		}

		.user-level { 
			position: absolute;
			bottom: 17px;
			right: 0;			 
		}

	}
</style>
