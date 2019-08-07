<template>
	<div class="nav-pane">
		<div class="pane-inner">
			<div class="main-nav-container">
				<ul class="main-nav">
					<li class="main-nav-item"><a :href="domain + pages.home" target="_blank">首页</a></li>
					<li class="main-nav-item"><a :href="domain + pages.news" target="_blank">资讯</a></li>
					<li class="main-nav-item is-active"><a :href="bbs" target="_blank">论坛</a></li>
					<li class="main-nav-item"><a :href="domain + pages.topic" target="_blank">专题</a></li>
					<li class="main-nav-item"><a :href="domain + pages.activity" target="_blank">活动</a></li>
					<li class="main-nav-item"><a :href="live" target="_blank">便民</a></li>
					<li class="main-nav-item"><a :href="job" :target="target">招聘</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:["target"],
		data: function() {
			return {
				categories: [],
				domain: '',
				pages: {
					home: '/',
					news: '/news',
					topic: '/topic',
					activity: '/activity'
				},
				bbs: '',
				live: '',
				job: ''
			};
		},
		computed: {
			firstId() {
				return this.$route.query.first || '';
			},
			secondId() {
				return this.$route.query.second || '';
			}
		},
		mounted: function() {
			if (process.env.NODE_ENV == 'development') {
				this.domain = 'localhost';
				this.bbs = 'http://bbs.feileyuan.club';
				this.live = 'http://live.feileyuan.club';
				this.job='http://zhaopin.feileyuan.club';
			} else if (process.env.NODE_ENV == 'production') {
				this.domain = 'http://www.feileyuan.com';
				this.bbs = 'http://bbs.feileyuan.com';
				this.live = 'http://live.feileyuan.com';
				this.job='http://zhaopin.feileyuan.com';
			} 
		}
	};
</script>
