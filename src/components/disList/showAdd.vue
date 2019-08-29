<template>
	<div class="addTop board-box">
		<div class="editor-container">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="板块切换" prop="sectionid">
					<el-cascader v-model="sectionid" :options="section" :props="props" @change="handleChangeEl">
					</el-cascader>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="ruleForm.title" style="width: 50%;"></el-input>
				</el-form-item>
				<el-form-item label="投票贴" prop="isvote">
					<el-checkbox v-model="isvote" @change="handleChange">是否投票贴</el-checkbox>
				</el-form-item>
				<div v-if="!!isvote">
					<el-form-item label="投票形式" prop="votetype">
						<el-radio-group v-model="ruleForm.votetype">
							<el-radio :label="1">单选</el-radio>
							<el-radio :label="2">多选</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="过期时间" prop="voteendtime">
						<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.voteendtime"></el-date-picker>
					</el-form-item>
					<el-form-item v-for="(domain, index) in ruleForm.domains" :label="'选项' + (index+1)+'内容'" :key="domain.key" :prop="'domains.' + index + '.value'"
					 :rules="{
                        required: true, message: '名称', trigger: 'blur'
                    }">
						<el-input v-model="domain.value" style="width: 50%;"></el-input>
						<el-button @click.prevent="removeDomain(domain)">删除</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click="addDomain">新增投票选项</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
			<ueditor :defaultMsg=defaultMsg :config=config ref="ue">
			</ueditor>
			<el-button class="add" @click="save('ruleForm')" type="primary" size="medium">发表贴子</el-button>
		</div>
	</div>
</template>
<script>
	import ueditor from '@/components/common/ueditor';
	import * as api from "@/api/detail"
	import * as apiSec from '@/api/home'
	import {
		mapGetters
	} from 'vuex';
	export default {
		// name:"showAdd",
		props: ['show'],
		components: {
			ueditor,
		},
		computed: {
			...mapGetters({
				isShowAdd: 'isShowAdd'
			})
		},
		data() {
			return {
				ruleForm: {
					title: '',
					domains: [{
						value: ''
					}],
				},
				isvote: false,
				defaultMsg: '',
				sectionid: 0,
				section: [],
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
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, ]
				},
				props: {
					label: "name",
					children: "childList",
					value: "id"
				},
			}
		},
		created() {
			this.sectionid = parseInt(this.$route.query.id)
			this.getSection()
		},
		methods: {
			handleChangeEl(val) {
				this.sectionid = val[val.length - 1];
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				var index = this.ruleForm.domains.indexOf(item)
				if (index !== -1) {
					this.ruleForm.domains.splice(index, 1)
				}
			},
			addDomain() {
				this.ruleForm.domains.push({
					value: '',
					key: Date.now()
				});
			},
			handleChange(val) {
				this.isvote = val
			},
			async getSection() {
				await apiSec.getSection().then(res => {
					const {
						data
					} = res
					if (res.code == 0) {
						data.map(item => {
							if (item.childList.length > 0) {
								item.childList.map(index => {
									if (index.childList.length == 0) {
										delete index.childList
									}
								})
							}
						}) 
						this.section = data
					}
				})
			},
			cancel() {
				this.$emit('cancel', false)
			},
			//时间格式化
			getTime(dt) { 
				var str = new Date(dt).getTime();
				return str;
			},
			save(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.isvote) {
							let test = []
							this.ruleForm.domains.map(index => {
								console.log(index.value)
								test.push(index.value)
							})

							let data = {
								sid: parseInt(this.sectionid),
								title: this.ruleForm.title,
								isvote: this.isvote,
								votevals: test.join(","),
								votetype: this.ruleForm.votetype,
								voteendtime: this.getTime(this.ruleForm.voteendtime ? this.ruleForm.voteendtime : ''),
								content: encodeURIComponent(this.$refs.ue.getUEContent()),
							}
							this.add(data)
						} else {
							let data = {
								sid: parseInt(this.sectionid),
								title: this.ruleForm.title,
								content: encodeURIComponent(this.$refs.ue.getUEContent()),
								isvote: this.isvote,
							}
							this.add(data)
						}


					}
				})
			},
			async add(data) {
				await api.addDis(data).then(res => { 
					if (res.code == 0) {
						this.$emit('cancel', false)
						this.title = ''
						this.defaultMsg = ''
						this.$refs.ue.clearContent()
						this.$message({
							message: '发贴成功',
							type: 'success'
						})
						this.$router.push(`/disDetail/${res.data}`)
					} else if (res.status == 403) {
						location.href = 'https://www.feileyuan.com/login'
					}

				})
			}
		},

	}
</script>
<style lang="scss" scoped>
	.addTop {
		margin-top: 40px;
	}

	.add {
		margin-top: 30px;
	}
</style>
