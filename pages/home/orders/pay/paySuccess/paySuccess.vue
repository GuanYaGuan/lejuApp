<template>
	<view class="content">
		<view class="box">
			<view class="title">
				订单支付成功
			</view>
			<view class="price">
				支付金额:{{price}}元
			</view>
		</view>
		<view class="user-info" @tap="openUser">
			个人中心
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: ''
			}
		},
		onLoad(options) {
			this.price = options.price
		},
		methods: {
			// 点击 跳转至 个人中心 页面
			openUser(){
				uni.navigateTo({
					url:"/pages/user/user"
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #f1ece7;

	}
</style>
<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		.box {
			width: 100%;

			.title {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 60rpx;
			}

			.price {
				display: flex;
				justify-content: center;
				width: 100%;
			}
		}

		.user-info {
			padding: 10rpx;
			border: 1px solid #000;
		}
	}
</style>
