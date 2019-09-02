<template>
	<div class="editTopic  board-box">
		<div class="editor-container">
			<div class="title">
				<span>贴子标题：</span>
				<span>{{detail.title}}</span>
			</div>
			<ueditor :defaultMsg=defaultMsg :config=config ref="ue">
			</ueditor>
			<el-button type="primary" @click="updateTopic">确 定</el-button>
		</div>
	</div>
</template>
<script>
	import ueditor from '@/components/common/ueditor';
	import * as api from "@/api/detail";
	export default {
		components: {
			ueditor,
		},
		data() {
			return {
				defaultMsg: '',
				config: {
					toolbars: [
						[
							'undo', 'redo', 'removeformat', 'formatmatch', '|',
							'paragraph', 'fontfamily', 'fontsize', 'forecolor', '|',
							'bold', 'italic', 'underline', '|', 'link', '|',
							'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
							'simpleupload', 'insertvideo', 'horizontal', '|',
							'emotion', 'hide', , '|',
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
				detail: {}
			}
		},
		methods: {
			async getDetail(id) {
				await api.getDetail(id).then(res => {
					const data = res.data
					if (res.code == 0) {
						this.detail = data
						this.detail.content = data.content
						this.defaultMsg = data.content || ''
						console.log(this.defaultMsg)
					}
				})
			},
			async updateTopic() {
				let data = {
					id: this.detail.id,
					content: encodeURIComponent(this.$refs.ue.getUEContent()),
					title: this.detail.title,
					isvote: this.detail.isvote,
					votetype: this.detail.votetype,
					voteendtime: this.detail.voteendtime,
					votevals: this.detail.votevals,
				}

				await api.updateTopic(data).then(res => {
					if (res.code == 0) {
						this.$message({
							message: '修改成功',
							type: 'success'
						})
						this.$router.push(`/disDetail/${this.$route.query.id}`)
					}
				})
			}
		},
		created() {
			//this.sectionid = parseInt(this.$route.query.id)
			this.getDetail(this.$route.query.id)
		}
	}
</script>
<style lang="scss" scoped>
	.editTopic {
		margin-top: 20px;
		padding:15px;
		.title {
			padding: 20px 0;
			font-size: 16px;
		}

		button {
			margin-top: 20px;
		}
	}
</style>
