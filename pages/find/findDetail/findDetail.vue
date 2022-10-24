<template>
	<view class="content">
		<view class="title">
			{{articleDetailData.title}}
		</view>
		<view class="author">
			作者:{{articleDetailData.author}}
		</view>
		<view class="time">
			时间:{{articleDetailData.createTime}}
		</view>
		<view class="desc">
			概要描述:{{articleDetailData.content1}}
		</view>
		<image :src="articleDetailData.coverImg" mode=""></image>
		<view class="summary">
			{{articleDetailData.summary}}
		</view>
	</view>
</template>

<script>
	import {
		productArticle
	} from "@/api/find/index.js"
	export default {
		data() {
			return {
				articleDetailData:[]
			}
		},
		onLoad(options) {
			productArticle(options.id)
				.then(res => {
					console.log(res);
					this.articleDetailData=res.data.productArticle
				})
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.content{
		.title{
			width: 80%;
			margin: 0 auto;
			margin-bottom:40rpx;
		}
		.author{
			display: flex;
			justify-content: flex-end;
			width: 50%;
			float:right;
			margin-right: 40rpx;
			margin-bottom:40rpx;
		}
		.time{
			display: flex;
			justify-content: flex-end;
			width: 50%;
			float:right;
			margin-right: 40rpx;
			margin-bottom:40rpx;
		}
		.desc{
			float:left;
			margin-left: 40rpx;
			margin-bottom:40rpx;
		}
		image{
			margin-left:50%;
			transform: translateX(-50%);
			margin-bottom:40rpx;
		}
		.summary{
			margin-left: 40rpx;
		}
	}
</style>
