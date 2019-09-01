<template>
	<div class="user-card">
		<div class="avatar" :class="{'is-admin':user.systemUser==1,'is-writer':user.systemUser==2,'is-auth':user.authenticationname,'is-host':user.systemUser==66,}">
			<router-link tag="a" :to="'/userhome/'+user.userId" target="_blank">
				<el-image :src="$IMG_URL+ user.userImgUrl" :fit="'cover'">
					<div slot="error" class="image-slot">
						<i class="el-icon-picture-outline"></i>
					</div>
				</el-image>
				<div v-if="user.authenticationname" class="title-auth">{{user.authenticationname}}</div>
			</router-link>
		</div>
		<div class="userTopic">
			<span class="author">{{user.nickName || user.nickname}}</span>
			<user-level :level="user.userLvl"></user-level>
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
	import progressBar from '@/components/common/progressBar';
	import userLevel from '@/components/common/user-level';
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
			userLevel
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
	.userTopic {
		padding: 0 15px;
		overflow: hidden;

		.author {
			font-weight: 700;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 90px;
			display: inline-block;
			line-height: 1.5;
			float: left;
		}

		.user-level {
			display: inline-block;
			float: right;
		}

		&::after {
			content: " ";
			clear: both;
			display: block;
		}
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
		padding: 10px 20px;
		position: relative;

		>a {
			display: block;
			border: 1px solid #e6e6e6;

			.el-image {
				width: 100%;
				height: 130px;
				box-sizing: border-box;
				border: solid 5px #FFFFFF;

				img {
					font-size: 0;
				}
			}
		}

		&.is-auth {
			background-image: url(../../assets/images/bg-auth-avatar.png);
			background-repeat: no-repeat;
			background-size: 169px 138px;
			background-position: 5px 5px;

			.title-auth {
				position: absolute;
				bottom: 20px;
				left: 20px;
				width: 140px;
				box-sizing: border-box;
				text-align: center;
				background-image: url(../../assets/images/icon-auth-flag.png);
				background-position: -10px;
				background-size: 160px 50px;
				background-repeat: no-repeat;
				padding: 5px 8px;
				font-size: 14px;
				color: #fff;
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		&.is-admin {
			>a {
				&::after {
					display: block;
					content: "";
					position: absolute;
					background: url("../../assets/images/icon-admin-flag.png") no-repeat 22px -17px;
					width: 95px;
					height: 70px;
					position: absolute;
					top: 10px;
					right: 20px;
				}
			}
		}

		&.is-writer {
			>a {
				&::after {
					display: block;
					content: "";
					position: absolute;
					background: url("../../assets/images/icon-writer-flag.png") no-repeat 32px -5px;
					width: 95px;
					height: 70px;
					position: absolute;
					top: 10px;
					right: 20px;
				}
			}
		}
		&.is-host {
			>a {
				&::after {
					display: block;
					content: "";
					position: absolute;
					background: url("../../assets/images/icon-host-flag.png") no-repeat 32px -5px;
					width: 95px;
					height: 70px;
					position: absolute;
					top: 9px;
					right: 18px;
				}
			}
		}
	}

	.otherinfo {
		overflow: hidden;
		margin: 5px 10px 5px 20px;

		li {
			overflow: hidden;
			line-height: 28px;
			position: relative;

			label {
				width: 80px;
			}
		}
	}
</style>
