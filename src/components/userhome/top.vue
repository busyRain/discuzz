<template>
	<el-row class="top-wrapper">
		<el-col :span="24" class="top-inner">
			<el-col :span="16" class="account">
				<el-image :src="user.imgurl" class="avatar">
				</el-image>
				<el-col :span="24">
					<span class="name">{{user.nickname}}</span>
					<user-level :level="user.userlvl"></user-level>
				</el-col>
				<el-col :span="24" style="padding:5px 0;">
					<el-row :gutter="15">
						<el-col :span="12">
							<el-col :span="8" class="progress-bar"><span class="progress-bar-label">经验值：</span></el-col>
							<el-col :span="16" class="progress-bar">
								<progress-bar :current="user.userpoints" :total="user.nextlvluserpoints"></progress-bar>
							</el-col>
						</el-col>
						<el-col :span="12">
							<el-button size="small" :type="user.isfollow?'info':'primary'" @click="FollowUser" plain>{{user.isfollow ?'取消关注':'立即关注'}}</el-button>
							<!-- <el-button type="primary" size="small" plain class="el-button-custom custom-jubao">
							</el-button> -->
							<el-button :type="user.isBlack?'info':'primary'" size="small" plain class="el-button-custom custom-lahei" @click="addBlackList">
							</el-button>
						</el-col>
					</el-row>
				</el-col>
			</el-col>
			<el-col :span="8" class="meta-container">
				<el-row type="flex" justify="space-between" align="middle" class="meta-group">
					<el-col :span="8" class="meta">
						<div class="value">{{user.fansCount}}</div>
						<div class="label">粉丝</div>
					</el-col>
					<el-col :span="8" class="meta">
						<div class="value">{{user.followCount}}</div>
						<div class="label">关注</div>
					</el-col>
					<el-col :span="8" class="meta">
						<div class="value">{{user.usermoney}}</div>
						<div class="label">乐豆</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="24" class="signature" v-if="user.signtxt">
				{{user.signtxt}}
			</el-col>
		</el-col>
	</el-row>
</template>

<script>
	import userLevel from "@/components/common/user-level.vue";
	import progressBar from "@/components/common/progressBar.vue";
	import * as apiFollow from '@/api/detail.js';
	import * as apiUserHome from '@/api/userhome.js';
	export default {
		props: ["user"],
		components: {
			userLevel,
			progressBar
		},
		computed: {
			islogin: {
				get: function() {
					return !!this.$store.state.token;
				}
			}
		},
		methods: {
			FollowUser: function() {
				if (this.islogin) {
					if (this.user.isfollow) {
						this.cancelFollow()
					} else {
						this.setFollow();
					}
				}
			},
			async setFollow() { //关注
				var that = this;
				await apiFollow.getFollow(this.user.id).then(res => {
					if (res.code == 0) {
						that.user.isfollow = true;
						this.$message({
							message: '关注成功~',
							type: 'success'
						})
					}
				});
			},
			async cancelFollow() {
				var that = this;
				await apiFollow.delFollow(this.user.id).then(res => {
					if (res.code == 0) {
						that.user.isfollow = false;
						that.$message({
							message: '取消关注成功~',
							type: 'success'
						})
					}
				})
			},
			async addBlackList() { //拉黑
				var that = this;
				if (this.islogin) {
					await apiUserHome.addblacklist({
						touserid: this.user.id
					}).then(res => {
						if (res.code == 0) {
							this.$message({
								message: '拉黑成功~',
								type: 'success'
							})
						}
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.top-wrapper {
		background-image: url(../../assets/images/user-home/top/7.jpg);
		background-color: #fff;
		background-position: top left;
		background-repeat: no-repeat;
		background-size: contain;

		.top-inner {
			background: #fff;
			margin-top: 160px;
			padding: 10px 20px 20px 20px;

			.account {
				position: relative;
				padding-left: 160px;

				.avatar {
					width: 120px;
					height: 120px;
					overflow: hidden;
					position: absolute;
					border: solid 4px #fff;
					border-radius: 2px;
					background: #fff;
					top: -50px;
					left: 20px;
					z-index: 99999;
					box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
				}

				.name {
					font-size: 24px;
					padding-right: 10px;
				}

				.progress-bar {
					padding: 8px 0;
					margin: 0 -28px 0 0;

					.progress-bar-label {
						font-size: 16px;
						line-height: 1.5;
						color: #A0A0A0;
					}
				}

				.el-button-custom {
					height: 32px;
					width: 40px;
					background-size: 18px;
					background-repeat: no-repeat;
					background-position: center center;
					
					&.el-button--info{
						&.custom-jubao {
							background-image: url(../../assets/images/user-home/icon-jubao-disabled.png);
						}
						
						&.custom-lahei {
							background-image: url(../../assets/images/user-home/icon-lahei-disabled.png);
						}
					}
					
					&.custom-jubao {
						background-image: url(../../assets/images/user-home/icon-jubao.png);
					}

					&.custom-lahei {
						background-image: url(../../assets/images/user-home/icon-lahei.png);
					}

					&:hover {
						&.custom-jubao {
							background-image: url(../../assets/images/user-home/icon-jubao-hover.png);
						}

						&.custom-lahei {
							background-image: url(../../assets/images/user-home/icon-lahei-hover.png);
						}
					}
				}
			}

			.meta {
				text-align: center;
				position: relative;

				.value {
					font-size: 36px;
					color: #409EFF;
					line-height: 1.5;
				}

				.label {
					font-size: 16px;
					color: #0a0a0a;
					line-height: 1.8;
				}

				&:not(:last-child) {
					&::after {
						position: absolute;
						content: '';
						border-left: 1px solid #e5e5e5;
						top: 15%;
						bottom: 15%;
						right: 0;
					}
				}
			}

			.signature {
				font-size: 16px;
				line-height: 1.8;
				color: #a0a0a0;
				border-top: solid 1px #e5e5e5;
				margin-top: 10px;
				padding: 5px 0px;
			}
		}
	}
</style>
