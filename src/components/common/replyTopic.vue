<template>
	<div>
		<el-dialog :visible="replyDialog" title="回复帖子" center :before-close="cancel">
			<div class="editor-container">
				<div class="reply" v-if="noShow">
					<div class="replyname">
						<em>{{replyContent.replyusername}}</em>
						<em>发表于:</em>
						{{replyContent.ctime|dateTime}}

					</div>

					<p class="content" v-html="replyContent.content"></p>
				</div>
				<ueditor :defaultMsg=defaultMsg :config=config ref="ueditor">
				</ueditor>
				<el-button class="add" @click="replay" type="primary" size="medium">发表回复</el-button>
			</div>
			<!-- <login-block :loginVisible="loginVisible" @cancel="loginCancel"></login-block> -->
		</el-dialog>
	</div>
</template>
<script>
	import ueditor from '@/components/common/ueditor';
	import * as api from '@/api/detail';
	import loginBlock from '@/components/common/login'
	import {
		setTimeout
	} from 'timers';
	export default {
		name: "replay",
		props: ['replyDialog', 'topicid', 'replyContent', 'noShow', 'sectionid'],
		components: {
			ueditor,
			loginBlock
		},
		data() {
			return {
				defaultMsg: "",
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
					'fontsize': [14, 16, 18, 20, 24],
					zIndex: 2000
				},
				data: {},
			}
		},
		methods: {
			// loginCancel(data){
			//     this.loginVisible=data
			// },
			cancel() {
				this.$emit("cancel", false, '')
			},
			async replay() {
				let content = encodeURIComponent(this.$refs.ueditor.getUEContent())
				if (this.noShow) {
					this.data = {
						sectionid: this.sectionid,
						topicid: this.replyContent.topicid,
						content: content,
						replyuserid: this.replyContent.replyuserid,
						replyusername: this.replyContent.replyusername,
						replyid: this.replyContent.replyid,
						buildingno: this.replyContent.buildingno
					}
				} else {
					this.data = {
						sectionid: this.sectionid,
						topicid: this.topicid,
						content: content,
					}
				}
				await api.addReply(this.data).then(res => {
					if (res.code == 0) {
						this.$message({
							message: "回复成功",
							type: "success"
						})
						this.$refs.ueditor.clearContent()
						this.$emit("getNewList")
					} else if (res.status == 403) {
						this.$emit("cancel", false, 'showLogin')

					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.reply {
		line-height: 30px;
		background: #f1f1f1;
		padding: 20px 20px 20px 0;

		.replyname {
			color: #999;
		}

		em {
			padding-right: 10px;
		}
	}

	.add {
		margin-top: 20px;
	}
</style>
