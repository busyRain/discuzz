<template>
	<div class="container-pane">
		<div class="inner">
			<top :user="user" v-if="user"></top>
			<div class="content-pane">
				<div class="left-pane">
					<el-tabs v-model="activeMainTab" class="main">
						<el-tab-pane label="个人主页" name="first">
							<el-tabs class="sub-main" v-model="activeSubMainTab">
								<el-tab-pane label="发表的帖子" name="first">

								</el-tab-pane>
								<el-tab-pane label="回复的帖子" name="second">

								</el-tab-pane>
							</el-tabs>
						</el-tab-pane>
						<el-tab-pane label="个人勋章" name="second">
							<template v-if="medal.all.length==0">
								<el-card shadow="never">
									暂未获得勋章
								</el-card>
							</template>
							<template v-else>
								<el-row class="medal-list">
									<el-col :span="4" v-for="(item,index) in medal.all" class="medal-list-item">
										<medal :medal="item"></medal>
									</el-col>
								</el-row>
							</template>
						</el-tab-pane>
					</el-tabs>
				</div>
				<div class="right-pane">
					<module-box>
						<span slot="title">佩戴（{{medal.wear.length}}/9）</span>
						<div slot="content">
							<template v-if="medal.wear.length==0">
								<el-card shadow="never">
									暂未佩戴勋章
								</el-card>
							</template>
							<template v-else>
								<el-row class="medal-list">
									<el-col :span="8" v-for="(item,index) in medal.wear" class="medal-list-item">
										<medal-wear :medal="item"></medal-wear>
									</el-col>
								</el-row>
							</template>
						</div>
					</module-box>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '@/components/userhome/top';
	import moduleBox from '@/components/container/module-box';
	import medal from '@/components/userhome/medal';
	import medalWear from '@/components/userhome/medal-wear';
	import * as api from '@/api/userhome.js';
	export default {
		data: function() {
			return {
				user: null,
				activeMainTab: "first",
				activeSubMainTab: "first",
				medal: {
					all: [],
					wear: [],
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		components: {
			top,
			moduleBox,
			medal,
			medalWear
		},
		methods: {
			async getUserHome() {
				var that = this;
				await api.getUserInfo(this.$route.params.id).then(function(result) {
					if (result.code == 0) {
						result.data.imgurl = that.$store.state.imgurl + result.data.imgurl;
						that.user = result.data;
						that.getUserTopicList();
						that.getUserReplyTopicList();
						that.getUserMedalList();
						that.getUserWearMedalList();
					}
				})
			},
			async getUserWearMedalList() {
				var that = this;
				await api.getUserMedalList({
					userid: this.$route.params.id,
					page: 1,
					limit: 10,
					status: 1
				}).then(function(result) {
					if (result.code == 0) {
						that.medal.wear = result.data;
					}
				})
			},
			async getUserMedalList() {
				var that = this;
				await api.getUserMedalList({
					userid: this.$route.params.id,
					page: this.medal.pageIndex,
					limit: this.medal.pageSize,
				}).then(function(result) {
					if (result.code == 0) {
						that.medal.all = result.data;
					}
				})
			},
			async getUserTopicList() {
				var that = this;
				await api.getUserTopicList(this.$route.params.id).then(function(result) {
					if (result.code == 0) {

					}
				})
			},
			async getUserReplyTopicList() {
				var that = this;
				await api.getUserReplyTopicList(this.$route.params.id).then(function(result) {
					if (result.code == 0) {

					}
				})
			}
		},
		mounted: function() {
			this.getUserHome()
		}
	}
</script>

<style lang="scss">
	.container-pane {
		background-image: url(../assets/images/user-home/bg/bg-default.jpg);
		background-color: #fff;
		background-position: bottom center;
		background-repeat: no-repeat;
		background-size: 100% auto;
		padding: 20px 0;

		.inner {
			margin-bottom: 0;

			.content-pane {
				margin-top: 20px;

				.left-pane {
					float: left;
					width: 790px;
					background: #fff;

					.el-tabs.main {
						>.el-tabs__header {
							>.el-tabs__nav-wrap {
								&::after {
									background-color: #409EFF;
								}

								.el-tabs__nav {
									.el-tabs__item {
										font-size: 18px;
										height: auto;
										padding: 8px 35px;
										font-weight: bold;

										&.is-active {
											background: #409eff;
											color: #fff;
										}
									}
								}
							}
						}

						.el-tabs__content {
							padding: 0 15px 15px;
						}
					}

					.el-tabs.sub-main {
						>.el-tabs__header {
							>.el-tabs__nav-wrap {
								&::after {
									background-color: #eee;
								}

								.el-tabs__nav {
									.el-tabs__active-bar {
										height: 5px;
									}

									.el-tabs__item {
										font-size: 18px;
										height: auto;
										color: #0a0a0a;
										padding-bottom: 8px;

										&.is-active {
											font-weight: bold;
										}
									}
								}
							}
						}

						.el-tabs__content {
							padding: 0 15px 15px;
						}
					} 
				}

				.right-pane {
					float: right;
					width: 390px;
					background: #fff;
				}

				&::after {
					display: block;
					content: " ";
					clear: both;
				}
				
				.medal-list{
					.medal-list-item{
						padding: 10px 0;
						text-align: center;
					}
				}
			}
		}
	}
</style>
