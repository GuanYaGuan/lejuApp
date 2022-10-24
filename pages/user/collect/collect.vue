<template>
	<view class="content">
		<view class="item" v-for="item in data" :key="item.id">
			<view class="item-top">
				<image @tap="openArticleDetail(item.id)" :src="item.coverImg" mode=""></image>
				<view class="names">
					{{item.title}}
				</view>
				<view class="eng">
					{{item.author}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: []
			}
		},
		onLoad() {
			this.data = uni.getStorageSync("articleList")
		},
		methods: {
			// 点击 跳转 至 精选文章的详情页
			openArticleDetail(id) {
				uni.navigateTo({
					url: `/pages/find/findDetail/findDetail?id=${id}`
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F1ECE7;
	}
</style>
<style lang="scss" scoped>
	.content {
		padding-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;

		.item {
			width: 674rpx;
			height: 482rpx;
			background-color: #ffffff;
			border-radius: 24rpx;
			box-shadow: 0 12rpx 16rpx 0 rgba(83, 66, 49, 0.03);
			margin-bottom: 56rpx;
		}

		.item-top {
			position: relative;
			width: 100%;
			height: 382rpx;

			image {
				width: 100%;
				height: 100%;
			}

			.names {
				font-size: 48rpx;
				color: #aaa;
				letter-spacing: 3.43rpx;
				position: absolute;
				bottom: 71rpx;
				left: 20rpx;
			}

			.eng {
				font-size: 30rpx;
				color: #aaa;
				letter-spacing: 2.14rpx;
				position: absolute;
				bottom: 24rpx;
				left: 20rpx;
			}
		}

	}
</style>
