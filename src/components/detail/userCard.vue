<template>
	<div class="user-card">
		<div class="avatar" :class="{1:'is-admin',2:'is-writer'}[user.systemUser]">
			<el-image style="height: 130px" :src="$IMG_URL+ user.userImgUrl" :fit="'cover'">
				<div slot="error" class="image-slot">
					<i class="el-icon-picture-outline"></i>
				</div>
			</el-image>
		</div>
		<div class="userTopic">
			<span class="author">{{user.nickName || user.nickname}}</span>
			<span class="level">Lv{{user.userLvl}}</span>
		</div>
		<div class="probar">
			<progress-bar :current="user.userPoints" :total="user.nextLvlPoints"></progress-bar>
		</div>
		<div class="followBtn">
			<span class="follow" v-if="!islogin || !user.isfollow" @click="getFollow(user.cid)"><i class="el-icon-plus"></i>&nbsp;关注</span>
			<span class="follow followed" v-else-if="islogin && user.isfollow" @click="delFollow(user.cid)">已关注</span>
		</div>
	</div>
</template>

<script>
	import * as api from "@/api/detail";
	import progressBar from '@/components/common/progressBar'
	export default {
		props: ["user", "from"],
		computed: {
			islogin: {
				get: function() {
					return !!this.$store.state.token;
				},
				set: function() {}
			}
		},
		components: {
			progressBar,
		},
		methods: {
			reload() {
				this.$emit('reload', this.$route.params.id);
			},
			async getFollow(id) { //关注
				if (this.islogin) {
					await api.getFollow(id).then(res => {
						if (res.code == 0) {
							this.$message({
								message: '关注成功~',
								type: 'success'
							})
							this.reload(this.$route.params.id);
						}
					})
				} else {
					this.goLogin();
				}
			},
			async delFollow(id) {
				await api.delFollow(id).then(res => {
					if (res.code == 0) {
						this.$message({
							message: '取消关注成功~',
							type: 'success'
						})
						this.reload(this.$route.params.id);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.author {
		font-weight: 700;
		padding-left: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 90px;
		display: inline-block;
	}

	.level {
		background-color: #ffbe24;
		padding: 2px 8px 2px 30px;
		border-radius: 4px;
		color: #fff;
		margin-left: 5px;
		background-image: url(../../assets/images/icon-level.png);
		background-repeat: no-repeat;
		background-position: 6px 5px;
	}

	.probar {
		width: 150px;
		margin: 15px auto 0 auto;
	}

	.followBtn {
		text-align: center;
		padding-top: 15px;

		.follow {
			color: #409eff;
			border: 1px solid #409eff;
			display: inline-block;
			text-align: center;
			padding: 8px 10px;
			border-radius: 4px;
			background: #ebf5ff;
			cursor: pointer;
			box-sizing: border-box;

			&.followed {
				background: #f3f3f3;
				color: #a0a0a0;
				border-color: #ccc;
			}
		}
	}

	.avatar { 
		margin: 10px 20px;
		position: relative;
		font-size: 0;
		.el-image{
			width: 100%;
			height: 100%;
			border: 1px solid #e6e6e6;
			box-sizing: border-box;
			img{
				font-size: 0;
			}
		} 

		&.is-admin {
			&::after {
				display: block;
				content: "";
				position: absolute;
				background: url("../../assets/images/icon-admin-flag.png") no-repeat 22px -17px;
				width: 95px;
				height: 70px;
				position: absolute;
				top: 0;
				right: 0;
			}
		}

		&.is-writer {
			&::after {
				display: block;
				content: "";
				position: absolute;
				background: url("../../assets/images/icon-writer-flag.png") no-repeat 32px -5px;
				width: 95px;
				height: 70px;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}

	.otherinfo {
		overflow: hidden;
		margin: 5px 10px 5px 20px;

		li {
			overflow: hidden;
			// height: 28px;
			line-height: 28px;
			position: relative;

			label {
				width: 80px;
			}

			.proNum {
				// margin-left:-5px;
			}
		}
	}
</style>
