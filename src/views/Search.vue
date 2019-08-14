<template>
	<block-list :list="blockList" @getPage="getPage" :count="count" :sectionid="blockTop.id" :limit="limit"></block-list>
</template>

<script>
	import * as api from "@/api/list";
	import blockList from '@/components/disList/blockList'
	export default {
		data: function() {
			return {
				blockList: {},
				page: 0,
				limit: 10,
				count: 0,
				blockTop: {
					id: 0
				}
			}
		},
		computed: {
			keyword: function() {
				
				return this.$route.query.keyword;
			}
		},
		components:{
			blockList
		},
		watch:{
			keyword(newval){
				this.doSearch()
			},
			blockList:{
				handler(val){
					this.blockList =val
					console.log(this.blockList)
				},deep:true
			}
		},
		methods: {
			async doSearch() {
				var that = this;
				await api.search({
					page: that.page,
					limit: that.limit,
					key: that.keyword
				}).then(function(res) {
					if (res.code == 0) {
						that.blockList = res.data;
						that.count = res.count;
					}
				})
			},
			getPage(val) {
				this.page = val;
				this.doSearch();
			},
		},
		mounted: function() {
			this.doSearch();
		}
	}
</script>

<style>
</style>
