<template>
	<div>
		<div v-if="!!content.isvote && content.userisvote==false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" :label-position="'top'">
				<el-form-item label="单选投票" prop="votevals" v-if="content.votetype==1">
					<el-radio-group v-model="ruleForm.votevals">
						<el-radio :label="item.id" :key="item.id" v-for="item in content.topicvotelist">{{item.votename}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="多选投票" prop="votevals" v-else>
					<el-checkbox-group v-model="ruleForm.votevalsChk">
						<el-checkbox v-for="(value,index) in  content.topicvotelist" :key="index.toString()" :label="value.id" name="votevals"
						 @change="chooseItem(value.id)">{{value.votename}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button @click="submitForm('ruleForm')">保存投票</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-else-if="!!content.userisvote" class="demo-ruleForm">
			<h3>投票结果：</h3>
			<ul>
				<li v-for="(value,index) in content.topicvotelist">
					{{value.votename}}: <span class="voteblock" :style="{width:value.votecount+'px'}"></span>
					{{value.votecount}}票
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import * as api from "@/api/detail"
	export default {
		name: "voteBlock",
		data() {
			return {
				val: [],
				form: {},
				ruleForm: {
					votevalsChk: []
				},
				rules: {}
			}
		},
		computed: {
			islogin: {
				get: function() {
					return !!this.$store.state.token;
				},
			},
		},
		props: ['content'],
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let data = {}
						if (this.content.votetype == 1) {
							data = {
								topicid: this.content.id,
								votevals: this.ruleForm.votevals.toString()
							}
						} else {
							data = {
								topicid: this.content.id,
								votevals: this.ruleForm.votevalsChk.join(',')
							}
						}
						if (this.islogin) {
							this.add(data)
						} else {
							location.href = 'https://www.feileyuan.com/login'
						}
						this.add(data)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async add(data) {
				await api.addVoteTop(data).then(res => {
					if (res.code == 0) {
						this.$emit("getDetailNew")
					}
				})
			},
			chooseItem(data) {
				console.log(data)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.demo-ruleForm {
		border-top: 2px solid #E6E6E6;
		margin-top: 20px;

		.el-radio-group {
			.el-radio {
				padding: 10px;
				display: block;
			}
		}
	}

	.voteblock {
		background: #409EFF;
		display: inline-block;
		height: 10px;
	}
</style>
