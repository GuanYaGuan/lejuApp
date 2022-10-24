<template>
	<view class="content">
		<image class="edit" src="/static/user/edit.png" mode=""></image>
		<view class="user-avatior" :style="[navigatorHig]">
			<view>
				<image class="usersAv" v-if="!isshow" :src="userinfo.icon" mode=""></image>
				<image class="usersAv" v-else src="/static/user//user-icon.png" mode=""></image>
			</view>
			<view>
				<view class="user-name" v-if="!isshow" @tap="editUserInfo">
					{{userinfo.nickname}}
				</view>
				<view class="user-name" v-else>
					hi~
				</view>
			</view>
			<view class="user-tips" v-if="isshow">
				你还没有登录呢
			</view>
			<button class="edit-set" v-if="isshow" @tap="reset">注册</button>
			<button class="load" @tap="openLog" v-if="isshow">登录</button>
		</view>
		<view class="my-orders">
			<div class="top">
				<div class="left">我的订单</div>
				<image src="/static/user/arr-r-1.png" mode=""></image>
			</div>
			<view class="line">

			</view>
			<div class="bottom">
				<view class="item" @tap="openDetail(0)">
					<image src="/static/user/icon-pay.png" mode=""></image>
					待付款
				</view>
				<view class="item" @tap="openDetail(1)">
					<image src="/static/user//pay-done.png" mode=""></image>
					已付款
				</view>
				<view class="item" @tap="openDetail(2)">
					<image src="/static/user//icon-car.png" mode=""></image>
					待收货
				</view>
				<view class="item" @tap="openDetail(3)">
					<image src="/static/user//icon-done.png" mode=""></image>
					已完成
				</view>
				<view class="item" @tap="openDetail(4)">
					<image src="/static/user//icon-back.png" mode=""></image>
					售后
				</view>
			</div>
		</view>
		<view class="function">
			<div class="fun-box">
				<view class="fun-item" @tap="openCollectArticle">
					<image src="/static/user/save.png" mode=""></image>
					<p>收藏</p>
				</view>
				<view class="line-ver">

				</view>
				<view class="fun-item">
					<image src="/static/user/brand.png" mode=""></image>
					<p>品牌</p>
				</view>
				<view class="line-ver">

				</view>
				<view class="fun-item">
					<image src="/static/user/article.png" mode=""></image>
					<p>文章</p>
				</view>
				<view class="fun-item" @tap="openAddress">
					<image src="/static/user/address.png" mode=""></image>
					<p>地址</p>
				</view>
				<view class="line-ver">

				</view>
				<view class="fun-item">
					<image src="/static/user/card.png" mode=""></image>
					<p>卡包</p>
				</view>
				<view class="line-ver">

				</view>
				<view class="fun-item" @tap="openCartList">
					<image src="/static//icons/cart2.png" mode=""></image>
					<p>购物车</p>
				</view>
				<view class="fun-item">
					<image src="/static/user/kf.png" mode=""></image>
					<p>客服</p>
				</view>
				<view class="line-ver">

				</view>
				<view class="fun-item">
					<image src="/static/user/about.png" mode=""></image>
					<p>关于</p>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import mix from "@/mixins/index.js"
	export default {
		mixins: [mix],
		data() {
			return {
				userinfo: [],
				isshow: true,
				navigatorHig: {
					height: '424rpx'
				}
			}
		},
		onShow() {
			this.isLogin()
			this.userinfo = uni.getStorageSync("user-info")
			if (this.userinfo) {
				this.isshow = false
				this.navigatorHig = {
					height: '250rpx'
				}
			}
		},
		methods: {
			// 打开登陆页面
			openLog() {
				uni.navigateTo({
					url: '/pages/user/log/log'
				})
			},
			// 点击 打开 用户信息 界面
			editUserInfo() {
				uni.navigateTo({
					url: "/pages/user/userinfo/userinfo"
				})
			},
			// 点击 打开 购车列表 页面
			openCartList() {
				uni.navigateTo({
					url: "/pages/user/cart/cart"
				})
			},
			// 点击 打开 注册 页面
			reset() {
				uni.navigateTo({
					url: "/pages/user/setlog/setlolg"
				})
			},
			// 点击 打开 地址列表
			openAddress() {
				uni.navigateTo({
					url: "/pages/user/address/address"
				})
			},
			// 点击 打开 已支付... 的详情页面
			openDetail(val){
				uni.navigateTo({
					url:`/pages/user/waitPay/waitPay?value=${val}`
				})
			},
			// 点击 打开 收藏的 发现页 文章 数据
			openCollectArticle(){
				uni.navigateTo({
					url:"/pages/user/collect/collect"
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
		.edit {
			position: fixed;
			top: 40rpx;
			right: 40rpx;
			width: 50rpx;
			height: 50rpx;
		}

		.user-avatior {
			position: relative;
			width: 100%;

			.usersAv {
				position: absolute;
				top: 40rpx;
				left: 40rpx;
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}

			.user-name {
				position: absolute;
				top: 76rpx;
				left: 222rpx;
			}

			.user-tips {
				position: absolute;
				top: 116rpx;
				left: 222rpx;
			}

			.edit-set {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				bottom: 52rpx;
				left: 164rpx;
				width: 182rpx;
				height: 76rpx;
				border: 2rpx solid #3D4C46;
				background-color: #f1ece7;
				border-radius: 10rpx;
			}

			.load {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				bottom: 52rpx;
				right: 162rpx;
				color: #ffffff;
				width: 182rpx;
				height: 76rpx;
				background: #354E44;
				border-radius: 10rpx;
			}
		}

		.my-orders {
			width: 80%;
			height: 208rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.top {
				width: 100%;
				height: 72rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
					margin-left: 56rpx;
				}

				image {
					width: 15.2rpx;
					height: 26rpx;
					margin-right: 57.4rpx;
				}
			}

			.line {
				width: 564rpx;
				height: 2rpx;
				background-color: #DDDDDD;
			}

			.bottom {
				width: 100%;
				height: calc(100% - 72rpx);
				display: flex;
				justify-content: space-around;
				align-items: center;

				.item {
					width: 15%;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-wrap: wrap;
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;

					image {
						width: 44rpx;
						height: 36.3rpx;
						margin-bottom: 15rpx;
					}
				}

				:last-child {
					width: 13%;
				}
			}
		}

		.function {
			width: 80%;
			height: 600rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			margin: 40rpx auto 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.fun-box {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 80%;
				height: 80%;

				:last-child {
					margin-right: 40%;
				}

				.line-ver {
					width: 2rpx;
					height: 36rpx;
					background-color: #D5D5D5;
					margin: 30rpx 40rpx;
				}

				.fun-item {
					image {
						width: 55rpx;
						height: 48rpx;
					}

					p {
						width: 100rpx;
						height: 37rpx;
						font-size: 26rpx;
						color: #3E3E3E;
						letter-spacing: 1.86rpx;
						margin-top: 23.1rpx;
					}
				}
			}
		}

	}
</style>
