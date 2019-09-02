<template>
	<div>
		<div class="content board-box">
			<div class="ov commit" id="floor__1">
				<div class="detailLeft fl" ref="detailLeft">
					<div class="detailLeft_top">
						<span>查看：<span class="highlight-color">{{detail.viewcount}}</span></span>
						<span class="pipe">|</span>
						<span>回复：<span class="highlight-color">{{detail.replycount}}</span></span>
					</div>
					<user-card class="detailLeft_content" :user="detail" :from="'list'" @reload="reloadDetail"></user-card>
				</div>
				<div class="detailRight fr" :style="'background:url('+imgUrl+') no-repeat center center;backgroundSize:10%'">
					<div class="detailRight_info">
						<div class="detailRight_info_title">{{detail.title}}</div>
						<div class="detailRight_info_content ov" ref="detailRight_info_content">
							<div class="pi" @click="selectText(1)">
								<em>楼主&nbsp;|&nbsp;发表于&nbsp;<span class="highlight-color">{{detail.ctime|dateComment}}</span></em>
								<strong>楼主</strong>
							</div>
							<div class="contentDetail">
								<p v-html="detail.content" ref="contentDetail"></p>
								<div ref="openfullbtn" class="open-full-btn" v-if="isShowReplay==true">
									<i class="el-icon-unlock"></i>
									<a href="#editorTwo"> 回贴查看隐藏内容</a></div>
								<vote-block :content="detail" @getDetailNew="getDetailNew"></vote-block>
							</div>
						</div>
					</div>
					<div class="detailRight_site">
						<a class="replayBtn" @click="addReplay(detail.id)">回复</a>
						<!-- <a class="editBtn" v-if="loginStatus">编辑</a> -->
						<p class="fr">
							<a class="editBtn" v-if="topCid==getUserId" @click="goEdit(detail.id)">编辑</a>
							<!-- <span>删除</span> -->
							<span v-if="islogin && ismon" @click="noAdd(detail.userId)">禁言</span>
						</p>
					</div>
					<template v-if="!!detail.isessence || !!detail.isHomeRecommend">
						<div class="is-flag" :class="{'is-b':!!detail.isessence,'is-o':!!detail.isHomeRecommend,'is-b-o':(!!detail.isessence && !!detail.isHomeRecommend)}"></div>
					</template>
				</div>
			</div>
			<div class="ov commit replay" v-for="(item,index) in replyList" :key="index.toString()" :id="'floor__'+((page-1)*limit+index+2)">
				<div class="detailLeft fl">
					<user-card class="detailLeft_content" :user="item" :from="'list'" @reload="getDetailReply"></user-card>
				</div>
				<div class="detailRight fr">
					<div class="detailRight_info">
						<div class="detailRight_info_content">
							<div class="pi" @click="selectText((page-1)*limit+index+2)">
								<em>{{item.nickname}}&nbsp;|&nbsp;发表于&nbsp;<span class="highlight-color">{{item.ctime|dateComment}}</span></em>
								<strong>{{(page-1)*limit+index+2}}楼</strong>
							</div>
							<div class="contentDetail">
								<div v-if="item.replyModel!=null">
									<div class="quote">
										<blockquote>
											{{item.replyModel.nickname}} 表示于 {{item.replyModel.ctime|dateComment}}
											<strong>楼层{{item.buildingno}}</strong>
											<br>
											<p v-html="item.replyModel.content"></p>
										</blockquote>
									</div>
									<p class="replyContent" v-html="item.content"></p>
								</div>
								<p v-html="item.content" v-else></p>
							</div>
						</div>
					</div>
					<div class="detailRight_site">
						<a class="replayBtn" @click="addReplayIndex(detail.id,item.cid,item.nickname,item.id,index+2,item.content,item.ctime)">回复</a>
						<!-- <a class="editBtn" v-if="loginStatus">编辑</a> -->
						<span class="fr" v-if="islogin && ismon" @click="noAdd(item.userId)">禁言</span>
						<span class="fr" v-if="islogin && (item.isavailable==true || ismon)">
							<!-- <span>举报</span> -->
							<i class="el-icon-delete" @click="delDis(item.id)">删除</i>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="page">
			<el-pagination class="pagination" @current-change="handleCurrentChange" background layout="prev,pager,next,jumper"
			 :page-size="50" :total="count"></el-pagination>
		</div>
		<el-card>
			<editortwo :defaultMsg='defaultMsg' :config='config' ref='ue' id="editorTwo">
			</editortwo>
			<el-button class="add" @click="reply(detail.id)" type="primary" size="medium">发表回复</el-button>
		</el-card>
		<el-dialog title="禁言时间" :visible.sync="noAddDialog" width="30%">
			<el-form :model="ruleForm" :rules="rulesForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item prop="time">
					<el-date-picker v-model="time" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="noAddDialog = false">取 消</el-button>
				<el-button type="primary" @click="noAddTopic('ruleForm')">确 定</el-button>
			</span>
		</el-dialog>
		<login-block :loginVisible="loginVisible" @cancel="loginCancel"></login-block>
		<show-reply :replyDialog="replyDialog" :topicid="topicid" @cancel="cancel" :replyContent="replyContent" :noShow="noShow"
		 @getNewList="getNewList" :sectionid="sectionid"></show-reply>
		<div class="scroll-top-btn">
			<el-button type="text" class="el-button-goTop" @click="goTop">
				<img src="@/assets/images/goTop.png" />
			</el-button>
			<el-button type="text" class="el-button-collect" :disabled="colDisabled" @click="doCollected">
				<img src="@/assets/images/addCollect.png" v-show="!isCollected" />
				<img src="@/assets/images/delCollect.png" v-show="isCollected" />
			</el-button>
		</div>
	</div>
</template>
<script>
	import editortwo from "@/components/common/ueditortwo"
	import * as api from "@/api/detail"
	import showReply from '@/components/common/replyTopic'
	import voteBlock from '@/components/detail/voteBlock';
	import userCard from '@/components/detail/userCard'
	import loginBlock from '@/components/common/login'

	// import orginUrl from '@/assets/images/original.png'
	// import boUrl from "@/assets/images/bo.png"
	// import boutiqueUrl from "@/assets/images/boutique.png"
	export default {
		name: "detail",
		data() {
			return {
				//orginUrl:'@/assets/images/original.png',
				topCid: '', //发贴人id
				detail: [],
				defaultMsg: '',
				replyList: [],
				wrapperHeight: "",
				count: 0,
				page: 1,
				replyDialog: false,
				topicid: "",
				//loginStatus:false,
				noShow: false,
				limit: 50,
				sectionid: 0, //贴子id
				time: "", //禁言时间
				noAddDialog: false,
				userId: "",
				replyContent: {},
				ruleForm: {},
				isShowReplay: false, //没有回复可见
				loginVisible: false,
				isCollected: false, //是否收藏
				colDisabled: false, //收藏按钮
				followDisabled: false, //关注按钮
				config: {
					toolbars: [
						[
							'undo', 'redo', 'removeformat', 'formatmatch', '|',
							'paragraph', 'fontfamily', 'fontsize', 'forecolor', '|',
							'bold', 'italic', 'underline', '|', 'link', '|',
							'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
							'simpleupload', 'insertvideo', 'horizontal', '|',
							'emotion', '|',
							'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol',
							'mergecells',
							'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols'
						]
					],
					'insertorderedlist': {
						decimal: "1,2,3...",
						"lower-alpha": "a,b,c...",
						"lower-roman": "i,ii,iii...",
						"upper-alpha": "A,B,C...",
						"upper-roman": "I,II,III..."
					},
					'insertunorderedlist': {
						circle: "○ 大圓圈",
						disc: "● 小黑點",
						square: "■ 小方塊 ",
						dash: "— 破折號"
					},
					'paragraph': {
						'h2': '标题 1',
						'h3': '标题 2',
						'h4': '标题 3',
					},
				},
				rulesForm: {
					time: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]
				}
			}
		},
		components: {
			showReply,
			editortwo,
			voteBlock,
			loginBlock,
			userCard
		},
		computed: {
			imgUrl: function() {
				// if (!!this.detail.isessence && !!this.detail.isHomeRecommend) {
				// 	return boUrl
				// } else if (!!this.detail.isessence) {
				// 	return boutiqueUrl
				// } else if (!!this.detail.isHomeRecommend) {
				// 	return orginUrl
				// }

			},
			islogin: {
				get: function() {
					return !!this.$store.state.token;
				},
				set: function() {}
			},
			ismon: {
				get: function() {
					if (this.$store.state.sectionIds && this.$store.state.sectionIds.indexOf(this.sectionid) > -1) {
						return true;
					}
					return false;
				}
			},
			reachFloor: function() {
				return this.$route.query.floor || 0;
			},
			getUserId: {
				get: function() {
					return this.$store.state.userId;
				},
				set: function() {}
			}
		},
		methods: {
			goTop() {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			},
			async getCollected() { //查看当前是否收藏
				if (this.islogin) {
					await api.getCollected({
						"outid": this.$route.params.id,
						"typeid": 4
					}).then(res => {
						if (res.code === 0) {
							this.isCollected = res.data;
						}
					})
				}
			},
			doCollected() { //收藏
				if (this.islogin) {
					if (this.isCollected) {
						this.cancelCollected();
					} else {
						this.setCollected();
					}
				} else {
					this.loginVisible = true
				}
			},
			async setCollected() { //去收藏		
				this.colDisabled = true;
				await api.setCollected({
					"outid": this.$route.params.id,
					"typeid": 4
				}).then(res => {

					if (res.code == 0) {
						this.colDisabled = false;
						this.$message({
							message: '收藏成功~',
							type: 'success'
						})
						this.isCollected = true;
					} else {
						this.colDisabled = true;
						this.$message({
							message: '收藏贴子失败~',
							type: 'warning',

						});
					}
				});
			},
			async cancelCollected() {
				this.colDisabled = true;
				await api.cancelCollected({
					"outid": this.$route.params.id,
					"typeid": 4
				}).then(res => {
					if (res.code == 0) {
						this.colDisabled = false;
						this.$message({
							message: '取消收藏~',
							type: 'success',

						});
						this.isCollected = false;
					} else {
						this.colDisabled = true;
						this.$message({
							message: '取消贴子失败~',
							type: 'warning',

						});
					}
				});
			},
			goLogin() {
				this.loginVisible = true
			},
			goEdit(id) {
				window.open('/editTopic?id=' + id)
			},
			selectText: function(floor) {
				var text = this.$BBS_domain + "disDetail/" + this.$route.params.id + "?floor=" + floor;
				const textarea = document.createElement('textarea');
				textarea.value = text;
				document.body.appendChild(textarea);
				textarea.select();
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					alert("楼层复制成功");
				}
				document.body.removeChild(textarea);
			},
			loginCancel(data) {
				this.loginVisible = data
			},
			getDetailNew() {
				this.getDetail(this.$route.params.id)
			},
			noAdd(id) {
				this.noAddDialog = true;
				this.userId = id;
			},
			//时间格式化
			getTime(dt) {
				var year = dt.getFullYear(); //年
				var month = dt.getMonth() + 1; //月
				var date = dt.getDate(); //日
				month = month < 10 ? "0" + month : month;
				date = date < 10 ? "0" + date : date;
				var str = year + "-" + month + "-" + date;
				return str;
			},
			noAddTopic(formName) { //禁言
				this.time = this.getTime(new Date(this.time))
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.noTopic()
					}
				})
			},
			async noTopic() {
				await api.noAddTopic({
					id: this.userId,
					time: this.time
				}).then(res => {
					this.noAddDialog = false
					if (res.code == 0) {
						this.$message({
							message: '禁言成功',
							type: 'success'
						})
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
			},
			getNewList() {
				this.replyDialog = false;
				this.getDetailReply(this.$route.params.id);
				this.getDetail(this.$route.params.id);
			},
			cancel(val, showLogin) {
				this.replyDialog = val
				if (showLogin == 'showLogin') {
					this.loginVisible = true
				}
			},
			reply(id) { //发表回复
				if (this.islogin) {
					let data = {
						topicid: id,
						content: encodeURIComponent(this.$refs.ue.getUEContent())
					}
					this.commonReply(data)
				} else {
					this.loginVisible = true
				}
			},
			async commonReply(data) {
				let that = this;
				await api.addReply(data).then(res => {
					if (res.code == 0) {
						this.$message({
							message: "回复成功",
							type: 'success'
						})
						this.getDetail(this.$route.params.id)
						this.getDetailReply(this.$route.params.id)
						this.$refs.ue.clearContent()
					} else if (res.status == 403) {
						this.loginVisible = true
					}
				})
			},
			goBack() { //返回
				window.history.back(-1);
			},
			handleCurrentChange(val) {
				this.page = val
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				this.getDetailReply(this.$route.params.id)
			},
			async delDis(id) { //删除回复
				await this.$confirm('确定要删除该楼层的回复么？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.ismon) {
						api.deletebymoderator({
							id: id
						}).then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getDetailReply(this.$route.params.id)
						})
					}
					api.deleteDis({
						id: id
					}).then(res => {
						if (res.code == 0) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getDetailReply(this.$route.params.id)
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			addReplay(id) {
				if (this.islogin) {
					this.noShow = false
					this.topicid = id
					this.replyDialog = true
				} else {
					this.loginVisible = true
				}
			},
			addReplayIndex(topicid, replyuserid, replyusername, replyid, buildingno, content, ctime) {
				this.replyContent = {
					topicid: topicid,
					replyuserid: replyuserid,
					replyusername: replyusername,
					replyid: replyid,
					buildingno: buildingno,
					content: content,
					ctime: ctime
				}
				if (this.islogin) {
					this.replyDialog = true
					this.noShow = true
				} else {
					this.loginVisible = true
				}
			},
			reloadDetail(id) {
				this.getDetail(id);
				this.getDetailReply(id);
			},
			async getDetail(id) {
				await api.getDetail(id).then(res => {
					const data = res.data
					if (res.code == 0) {
						this.detail = data
						this.detail.content = data.content
						this.sectionid = data.sectionid
						this.topCid = data.cid
						if (this.detail.content.indexOf('回复可见') > -1 && this.detail.visible == 0) {
							this.isShowReplay = true
							this.$nextTick(function() {
								this.$refs.openfullbtn.style.display = 'block'
								this.detail.content = this.detail.content.replace(/&lt;回复可见&gt;.*&lt;\/回复可见&gt;/g, '')
							})
						} else {
							this.isShowReplay = false;
							this.detail.content = this.detail.content.replace(/&lt;回复可见&gt;/g, '')
							this.detail.content = this.detail.content.replace(/&lt;\/回复可见&gt;/g, '')
						}
					}
				})
			},
			async getDetailReply(id) {
				var that = this;
				await api.getReplay({
					topicid: id,
					page: this.page,
					limit: this.limit
				}).then(res => {
					const data = res.data
					if (res.code == 0) {
						data.map(item => {
							item.content = item.content;
							if (item.replyModel) {
								item.replyModel.content = item.replyModel.content
							}
						});
						this.replyList = data
						this.count = res.count
					}

					that.$nextTick(function() {
						setTimeout(function() {
							that.scrollToFloor();
						}, 600);
					});
				})
			},
			async updateCount(id) {
				await api.updateCount(id).then(res => {})
			},
			scrollToFloor: function() {
				if (this.$route.query.floor) {
					if (document.getElementById("floor__" + this.$route.query.floor))
						document.getElementById("floor__" + this.$route.query.floor).scrollIntoView({
							behavior: "smooth",
							block: "start",
							inline: "nearest"
						});
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.wrapperHeight = this.$refs.detailLeft.clientHeight
			})
		},
		created() {
			this.updateCount(this.$route.params.id);
			if (this.islogin)
				this.$store.dispatch('getUser');
			this.getDetail(this.$route.params.id);
			this.getCollected();
			if (this.$route.query.floor) {
				var _page = Math.ceil(this.$route.query.floor / this.limit);
				this.handleCurrentChange(_page);
			} else
				this.getDetailReply(this.$route.params.id)
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		position: relative;
		margin: 0 auto 20px;
		padding: 0;
		width: 100%;

		.commit {
			position: relative;
		}

		.operation-wrap {
			clear: both;
			padding: 10px;
			position: relative;
			background: #F5F5F5;
			border: 1px solid #E5E5E5;
			border-bottom-width: 0;
		}

		.detailLeft {
			overflow: hidden;
			width: 180px;
			min-width: 180px;
			padding: 0 0 22px 0;

			//background: #E6E6E6;
			.detailLeft_top {
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				word-wrap: normal;
				padding: 14px 10px 10px 10px;
				color: #999;
				border-bottom: 4px solid #C3C3C3;
				font-size: 14px;
			}

			// .detailLeft_content 
		}

		.detailRight {
			width: 1019px;
			min-height: 400px;
			border-left: 1px solid #CDCDCD;
			position: relative;

			.detailRight_info {
				margin-bottom: 40px;

				.detailRight_info_title {
					border-bottom: 4px solid #E6E6E6;
					overflow: hidden;
					white-space: nowrap;
					word-wrap: normal;
					padding: 14px 10px 8px 20px;
					font-size: 16px;
					font-weight: bold;
				}

				.detailRight_info_content {
					padding: 0 20px;
					vertical-align: top;

					.pi {
						margin-bottom: 10px;
						overflow: hidden;
						height: 36px;
						line-height: 36px;
						border-bottom: 1px dashed #E6E7E1;
						position: relative;
						cursor: pointer;
						background-image: url(../../assets/images/ico_lz.png);
						background-repeat: no-repeat;
						background-position: 0px 10px;
						background-size: 15px;
						padding-left: 25px;

						em {
							font-style: normal;
						}

						strong {
							border: 1px solid #FFFFFF;
							float: right;
							font-weight: 400;
							margin-top: -6px;
							padding: 4px 6px;
							font-style: normal;
						}
					}

					a {
						text-decoration: underline;
					}

					.contentDetail {
						line-height: 30px;

						.quote {
							overflow: hidden;
							margin: 10px 0;
							background: #F9F9F9 url(../../assets/images/icon_quote_s.gif) no-repeat 20px 6px;
							color: #666;
							padding: 10px 10px 10px 65px;
							zoom: 1;

							blockquote {
								display: block;
								margin: 0;
								padding: 0 65px 10px 0;
								background: url(../../assets/images/icon_quote_e.gif) no-repeat 100% 100%;
								line-height: 1.6;
								zoom: 1;
							}

							strong {
								font-weight: bold
							}
						}
					}
				}
			}

			.is-flag {
				position: absolute;
				top: 15px;
				right: 65px;
				height: 100px;
				width: 200px;
				background-repeat: no-repeat;
				background-position: right top;

				&.is-o {
					background-image: url(../../assets/images/flag-topic-original.png);
				}
				&.is-b {
					background-image: url(../../assets/images/flag-topic-boutique.png);
				}
				&.is-b-o {
					background-image: url(../../assets/images/flag-topic-b-o.png);
				}
			}
		}
	}

	.detailRight_site {
		position: absolute;
		bottom: 1px;
		color: #999;
		border-top: 1px dashed #e6e7e1;
		line-height: 36px;
		height: 36px;
		margin: 0 20px;
		width: 972px;
		cursor: pointer;
		opacity: 0.4;

		span {
			margin: 0 5px;
		}

		a {
			padding: 0 20px 0 25px;
		}

		.replayBtn {
			background: url(../../assets/images/fastreply.gif) no-repeat 0 50%;
		}

		.editBtn {
			background: url(../../assets/images/edit.gif) no-repeat 0 50%;
		}

		i {
			margin-left: 20px;
		}
	}

	.detailRight_site:hover {
		color: #333;
		opacity: 1;
	}

	.replay {
		.detailLeft {
			border-top: 4px solid #c3c3c3;
		}

		.detailRight {
			min-height: 365px;
		}

		.detailRight_info {
			border-top: 4px solid #e6e6e6;
		}
	}

	.page {
		margin-top: 40px;

		.pagination {
			margin-bottom: 40px;

		}
	}

	.el-progress-bar__outer {
		height: 10px;
	}

	.add {
		margin-top: 40px;
	}

	.open-full-btn {
		width: 100%;
		background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), color-stop(70%, #fff));
		background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
		padding-bottom: 26px;
		position: relative;
		z-index: 999;
		padding-top: 160px;
		bottom: 2px;
		margin-top: -200px;
		color: #409efe;
		cursor: pointer;
		text-align: center;

		a {
			color: #409efe;
			font-size: 18px;
		}
	}

	.hide {
		display: block !important;
	}

	.scroll-top-btn {
		position: fixed;
		bottom: 100px;
		width: 40px;
		z-index: 99;
		margin-left: 1210px;
	}

	.el-button-goTop {
		margin-left: 10px;
	}
</style>
