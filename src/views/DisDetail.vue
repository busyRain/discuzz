<template>
	<div class="detail">
		<el-breadcrumb separator="/" class="postnav">
			<el-breadcrumb-item :to="{ path: '/' }">
				<i class="el-icon-map-location"></i>
				首页
			</el-breadcrumb-item>
			<template v-if="navList.length>0">
				<span v-if="navList.length==2">
					<el-breadcrumb-item :to="{path:navList[0].url}">{{navList[0].name}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{path:navList[1].url}">{{navList[1].name}}</el-breadcrumb-item>
				</span>
				<span v-else>
					<el-breadcrumb-item :to="{path:navList[0].url}">{{navList[0].name}}</el-breadcrumb-item>
				</span>
			</template>
		</el-breadcrumb>
		<el-popover placement="left" trigger="hover">
			<ul class="sectionList">
				<li v-for="(item,index) in section" :key="index" class="listLi">
					<label class="fl">{{item.name}}</label>
					<div class="childUL" v-if="item.childList.length>0">
						<router-link v-for="(childItem,childIndex) in item.childList" :key="childIndex" :to="{path:`/disList/${childItem.id}`}">{{childItem.name}}</router-link>
					</div>
				</li>
			</ul>
			<el-button class="sectionBtn fr" size="small" slot="reference">版块切换</el-button>
		</el-popover>
		<keep-alive>
			<content-list></content-list>
		</keep-alive>
	</div>
</template>
<script>
	import * as api from "@/api/detail"
	import * as apiSec from '@/api/home'
	import contentList from '@/components/detail/content'
	export default {
		name: "detail",
		components: {
			contentList
		},
		data() {
			return {
				navList: [],
				detail: {},
				section: {}
			}
		},
		methods: {
			sitDiscuzz() {},
			async getDetail(id) {
				var that = this;
				await api.getDetail(id).then(res => {
					const data = res.data
					if (res.code == 0) {
						that.detail = data;
						var currentSectionId = that.detail.sectionid;
						if (sessionStorage.getItem('navList')) {
							that.navList = JSON.parse(sessionStorage.getItem('navList'))
						} else {
							if (that.section.length > 0) {
								that.section.forEach(function(item) {
									if (item.id == currentSectionId) {
										that.navList.push({
											url: '/disList/' + item.id,
											name: item.name
										})
									} else {
										item.childList.forEach(function(itemChild) {
											if (itemChild.id == currentSectionId) {
												that.navList.push({
													url: '/disList/' + itemChild.id,
													name: itemChild.name
												})
											}
										})
									}
								});
							}
						}
						that.navList.push({
							url: that.$route.path,
							name: that.detail.title
						})
					}
				})
			},
			async getSection() {
				await apiSec.getSection().then(res => {
					const {
						data
					} = res
					if (res.code == 0) {
						this.section = data;
					}
				})
			},
		},
		created() {
			this.getSection();
			this.getDetail(this.$route.params.id)
		}
	}
</script>
<style lang="scss" scoped>
	.detail {
		margin: 20px auto;
		font-size: 14px;

		.postnav {
			height: 30px;
			line-height: 30px;
			color: #777;
			margin: 0 0 8px;
			display: inline-block;
		}

		.sectionBtn {
			display: inline-block;
		}
	}

	.sectionList {
		padding: 0 20px 20px;

		label {
			padding: 0 25px 14px 0;
			font-size: 14px;
			color: #999;
		}

		.listLi {
			padding-top: 14px;
			overflow: hidden;
		}

		.childUL {
			margin: 0 0 0 81px;
			border-bottom: dashed 1px #a3a1a1;
			padding-bottom: 15px;

			a {
				padding: 0 25px 14px 0;

			}

			a:hover {
				color: #1C8CE9;
			}
		}
	}
</style>
