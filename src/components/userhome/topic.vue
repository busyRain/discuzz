<template>
	<div class="widget-topic">
		<router-link class="widget-topic__link" :to="'/disDetail/' + topic.id" target="_blank">
			<div class="widget-topic__subject">
				<div class="is-left">
					<span class="is-top" v-if="topic.isrecommend">置顶</span>
					<span class="title" v-text="topic.title"></span>
				</div>
				<div class="is-right date">
					<span>{{topic.ctime|dateTime}}</span>
				</div>
			</div>
			<div class="widget-topic__content">
				{{topic.content|subString(50)}}
				<el-link type="primary">查看更多>></el-link>
			</div>
			<div class="widget-topic__other">
				<div class="is-left section">
					<span class="widget-topic__meta meta__section" v-text="topic.sectionText"></span>
				</div>
				<div class="is-right meta">
					<span class="widget-topic__meta meta__view">
						浏览（<span v-text="topic.viewcount"></span>）
					</span>
					<span class="widget-topic__meta meta__reply">
						回复（<span v-text="topic.replycount"></span>）
					</span>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	export default {
		props: {
			topic: {
				type: Object,
				default: null
			}
		}
	};
</script>

<style lang="scss">
	$borderColor: #c7c7c7;
	$font-gray: #a0a0a0;
	$font-black: #0a0a0a;
	$font-blue: #409eff;
	$font-white:#fff;

	.widget-topic {
		padding: 15px 0;
		position: relative;
		border-bottom: solid 1px $borderColor;

		&::after {
			position: absolute;
			top: 0;
			bottom: 0;
			left: -15px;
			content: " ";
			display: block;
			border-left: transparent 5px solid;
		}

		&:hover {
			&::after {
				border-left-color: $font-blue;
			}
		}

		>a {
			text-decoration: none;
			display: block;
		}

		.widget-topic__subject {
			display: flex;
			justify-content: space-between;

			.is-top {
				display: inline-block;
				color: #ff0101;
				font-size: 14px;
				line-height: 18px;
				border: solid 1px #ff0101;
				text-align: center;
				width: 60px;
				border-radius: 3px;
				margin-right: 15px;
			}

			.title {
				font-size: 20px;
				font-weight: 500;
				line-height: 1.8;
				color: $font-black;
			}

			.date {
				font-size: 16px;
				line-height: 2;
				color: $font-gray;
				white-space: nowrap;
			}
		}

		.widget-topic__content {
			font-size: 16px;
			color: $font-gray;
			line-height: 1.8;
			word-break: break-word;
			padding: 8px 0;

			.el-link {
				font-size: 16px;
			}
		}

		.widget-topic__other {
			display: flex;
			justify-content: space-between;
			color: $font-gray;
			line-height: 1.8;

			.section {
				font-size: 16px;
				color: $font-blue;
			}

			.meta {
				font-size: 16px;

				.widget-topic__meta {
					>span {
						color: $font-blue;
					}
				}
			}
		}
	}
</style>
