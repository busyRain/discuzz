<template>
	<div class="search-pane">
		<div class="search-pane-inner">
			<div class="is-left">
				<div class="logo"><img src="@/assets/images/logo.png" /></div>				
			</div>
			<div class="search-box">
				<el-input v-model="keyword" @keyup.enter.native="doSearch">
					<template slot="append">
						<el-button type="primary" @click="doSearch">搜索</el-button>
					</template>
				</el-input>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				keyword: '',
				areaList: [],
				selectedProvince: null,
				selectedCity: null
			};
		},
		computed: {
			province: function() {
				if (this.$store.state.province) {
					return JSON.parse(this.$store.state.province);
				} else return null;
			},
			city: function() {
				if (this.$store.state.city) {
					return JSON.parse(this.$store.state.city);
				} else return null;
			},
			showAllArea: function() {
				return location.pathname.toLowerCase().indexOf('/list.html') > -1 ? true : false;
			}
		},
		methods: {
			doSearch: function() {
				this.$router.push({
					name: 'search',
					query: {
						keyword: this.keyword
					}
				});
			},
			shopEnter() {
				this.$message({
					message: '该功能暂未开通，有意合作请联系09774853947。',
					type: 'warning',
					showClose: true,
					duration: 0
				});
			},
			doSelectedArea: function(selected_province, selected_city) {
				var that = this;
				that.selectedProvince = selected_province;
				that.selectedCity = selected_city;
				that.$store.dispatch("UpdateLocation", {
					province: that.selectedProvince,
					city: that.selectedCity
				});
			},
			async getAreas() {
				var that = this;
				await api.getAreas().then(function(data) {
					if (data.code == 0) {
						that.areaList = data.data;
					}
				});
			}
		},
		mounted: function() {
			this.keyword = this.$route.query.keyword;
		}
	};
</script>
