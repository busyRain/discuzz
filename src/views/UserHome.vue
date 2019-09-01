<template>
	<div class="container-pane">
		<div class="inner">
			<top :user="user" v-if="user"></top>
			<div class="content-pane">
				<div class="left-pane">
					<el-tabs v-model="activeMainTab" class="main">
						<el-tab-pane label="个人主页" name="first">
							<el-tabs class="sub-main" v-model="activeSubMainTab">
								<el-tab-pane label="发表的帖子" name="first" v-loading="topic.post.isLoading" element-loading-text="加载中"
								 element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
									<template v-if="topic.post.data.length==0">
										<el-card shadow="never">
											暂未发表过帖子
										</el-card>
									</template>
									<template v-else>
										<div class="topic-list">
											<topic v-for="(item,index) in topic.post.data" :topic="item"></topic>
										</div>
										<div class="topic-list-pager">
											<template v-if="topic.post.isNoData">
												<el-button type="text" disabled>全部加载完成</el-button>
											</template>
											<template v-else>
												<el-button type="text" @click="getUserTopicList">查看更多<i class="el-icon-arrow-down"></i></el-button>
											</template>
										</div>
									</template>
								</el-tab-pane>
								<el-tab-pane label="回复的帖子" name="second" v-loading="topic.reply.isLoading" element-loading-text="加载中"
								 element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
									<template v-if="topic.reply.data.length==0">
										<el-card shadow="never">
											暂未发表过帖子
										</el-card>
									</template>
									<template v-else>
										<div class="topic-list">
											<topic-reply v-for="(item,index) in topic.reply.data" :topic="item"></topic-reply>
										</div>
										<div class="topic-list-pager">
											<template v-if="topic.reply.isNoData">
												<el-button type="text" disabled>全部加载完成</el-button>
											</template>
											<template v-else>
												<el-button type="text" @click="getUserReplyTopicList">查看更多<i class="el-icon-arrow-down"></i></el-button>
											</template>
										</div>
									</template>
								</el-tab-pane>
							</el-tabs>
						</el-tab-pane>
						<el-tab-pane label="个人勋章" name="second" class="medal-tab-pane" v-loading="medal.isLoading" element-loading-text="加载中"
								 element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
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
								<div class="medal-list-pager">
									<template v-if="medal.isNoData">
										<el-button type="text" disabled>全部加载完成</el-button>
									</template>
									<template v-else>
										<el-button type="text" @click="getUserMedalList">查看更多<i class="el-icon-arrow-down"></i></el-button>
									</template>
								</div>
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
	import topic from '@/components/userhome/topic';
	import topicReply from '@/components/userhome/topicReply';
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
					pageSize: 12,
					isLoading: false,
					isNoData: false
				},
				topic: {
					post: {
						data: [],
						pageSize: 10,
						pageIndex: 1,
						isLoading: false,
						isNoData: false
					},
					reply: {
						data: [],
						pageSize: 10,
						pageIndex: 1,
						isLoading: false,
						isNoData: false
					}
				}
			}
		},
		components: {
			top,
			moduleBox,
			medal,
			medalWear,
			topic,
			topicReply
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
				that.medal.isLoading = true;
				await api.getUserMedalList({
					userid: this.$route.params.id,
					page: this.medal.pageIndex,
					limit: this.medal.pageSize,
				}).then(function(result) {
					if (result.code == 0) {
						that.medal.all = [...that.medal.all, ...result.data];						
						that.medal.pageIndex++; 
						
						if (result.data.length < that.medal.pageSize) {
							that.medal.isNoData = true;
						}
					}
					that.medal.isLoading = false;
				})
			},
			async getUserTopicList() {
				var that = this;
				that.topic.post.isLoading = true;
				await api.getUserTopicList({
					uid: this.$route.params.id,
					page: that.topic.post.pageIndex,
					limit: that.topic.post.pageSize,
				}).then(function(result) {
					if (result.code == 0) {
						that.topic.post.data = [...that.topic.post.data, ...result.data];
						that.topic.post.pageIndex++;

						if (result.data.length < that.topic.post.pageSize) {
							that.topic.post.isNoData = true;
						}
					}
					that.topic.post.isLoading = false;
				})
			},
			async getUserReplyTopicList() {
				var that = this;

				that.topic.reply.isLoading = true;
				await api.getUserReplyTopicList({
					uid: this.$route.params.id,
					page: that.topic.reply.pageIndex,
					limit: that.topic.reply.pageSize,
				}).then(function(result) {
					if (result.code == 0) {
						that.topic.reply.data = [...that.topic.reply.data, ...result.data];
						that.topic.reply.pageIndex++;
						if (result.data.length < that.topic.reply.pageSize) {
							that.topic.reply.isNoData = true;
						}
					}
					that.topic.reply.isLoading = false;
				})
			},
		},
		mounted: function() {
			this.getUserHome()
		}
	}
</script>

<style lang="scss">
	.container-pane {
		background-image: url(../assets/images/user-home/bg/bg-default.jpg);
		background-attachment: fixed;
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
							padding: 0 0 15px 0;

							.medal-tab-pane {
								padding: 0 15px;
							}
						}
					}

					.el-tabs.sub-main {
						>.el-tabs__header {
							padding: 0 15px;
							margin: 0;

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
							padding: 0 15px;
						}
					}

					.topic-list-pager {
						text-align: center;

						.el-button {
							font-size: 16px;
						}
					}

					.medal-list-pager {
						text-align: center;
						border-top: solid 1px #c7c7c7;

						.el-button {
							font-size: 16px;
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
			}
		}
	}
</style>
