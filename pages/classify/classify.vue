<template>
	<view class="content">
		<view class="nav-box">
			<image class="chect" src="/static/home/cheat.png" mode=""></image>

			<view class="right">
				<image class="icons-right" src="../../static/icons/search.png" mode=""></image>
				<image class="icons-right" src="../../static/home/cart-white.png" mode=""></image>
			</view>
		</view>
		<view @tap="openDetail(item.id)" class="item first" v-for="item in categoryData" :key="item.id">
			<view class="title">
				{{item.name}}
			</view>
			<image :src="item.icon" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		findCategory
	} from "../../api/classify/index.js"
	export default {
		data() {
			return {
				categoryData: []
			}
		},
		async onLoad() {
			// 请求 分类的数据
			const res = await findCategory("1308336521604599809")
			// console.log(res);
			this.categoryData = res.data.category.children
		},
		methods: {
			// 点击 跳转至 分类详情
			openDetail(id) {
				uni.navigateTo({
					url:`/pages/classify/kindDetail/kindDetail?id=${id}`
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #354e44;
		}
</style>
<style lang="scss" scoped>
	

		.content {
			padding-bottom: 100rpx;
			position: relative;
			width: 100%;
			height: 1332rpx;
			background: #F1ECE7;
			box-shadow: 0 16rpx 24rpx 0 rgba(83, 66, 49, 0.08);
			border-radius: 40rpx 40rpx 0 0;
			transform: translateY(100rpx);
			display: flex;
			justify-content: center;
			align-items: flex-start;
			flex-wrap: wrap;

			.nav-box {
				position: fixed;
				top: -134rpx;
				width: 100%;
				height: 60rpx;
				margin-top: 60rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.chect {
					width: 42rpx;
					height: 42rpx;
					margin-left: 30rpx;

				}

				.right {
					width: 200rpx;
					height: 100%;

					:last-child {
						margin-left: 100rpx;
					}

					.icons-right {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

			.item {
				color: #3e3e3e;
				font-size: 60rpx;
				width: 670rpx;
				height: 302rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;

				.title {
					margin-left: 40rpx;
				}
			}

			.item.first {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 64rpx;

				image {
					width: 442rpx;
					height: 100%;
				}

			}

			:last-child {
				position: relative;
				width: 312rpx;
				height: 442rpx;
				overflow: hidden;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 312rpx;
					height: 442rpx;
				}

				.title {
					margin-left: 0;
					width: 50%;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					z-index: 1;
				}
			}

			:nth-child(4) {
				position: relative;
				width: 312rpx;
				height: 442rpx;
				margin-right: 40rpx;
				overflow: hidden;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 312rpx;
					height: 442rpx;
				}

				.title {
					margin-left: 0;
					width: 50%;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					z-index: 1;
				}
			}
		}
</style>
