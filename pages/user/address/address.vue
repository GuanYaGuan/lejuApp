<template>
	<view class="content">
		<view class="list-box">
			<view class="item" v-for="item in addressData" :key="item.id">
				<view class="left" @tap="setAddress(item)">
					<view class="top">
						<view class="name">
							{{item.name}}
						</view>
						<view class="default" v-if="item.defaultStatus==1">
							默认
						</view>
					</view>
					<view class="bottom">
						{{item.phoneNumber}}
					</view>
				</view>
				<view class="right">
					<image @tap="targetEdit" src="/static/icons/edit.png" mode=""></image>
					<view class="del" @tap="delAddress(item.id)">
						删除
					</view>
				</view>
			</view>
		</view>
		<button @tap="addAddress">新增地址</button>
	</view>
</template>

<script>
	import {
		findAllAddress,
		delAddressInfo
	} from "@/api/user/address/index.js"
	export default {
		data() {
			return {
				addressData: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始请求
			init() {
				findAllAddress()
					.then(res => {
						// console.log(res.data.items);
						this.addressData = res.data.items
					})
			},
			// 点击 新增地址
			addAddress() {
				uni.navigateTo({
					url: "/pages/user/address/add/add"
				})
			},
			// 点击 向本地保存 地址 并返回
			setAddress(addressInfo) {
				// console.log(addressInfo);
				uni.setStorageSync("select-address", addressInfo)
				uni.navigateBack({
					delta: 1
				})
			},
			// 点击 删除 地址
			delAddress(id) {
				delAddressInfo(id)
					.then(res => {
						// console.log(res);
						if (res.success) {
							uni.showToast({
								title: "删除成功",
								icon: "none"
							})
							this.init()
						}
					})
			},
			// 点击 跳转至 编辑 页面
			targetEdit(){
				uni.navigateTo({
					url:"/pages/user/address/edit/edit"
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
		.list-box {
			.item {
				width: 94%;
				padding: 20rpx 0;
				border-bottom: 1Px solid #ccc;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					width: 90%;

					.top {
						display: flex;
						align-items: center;
						margin-left: 30rpx;

						.default {
							width: 50rpx;
							font-size: 22rpx;
							background-color: #354e44;
							color: #fff;
							padding: 0 18rpx;
							border-radius: 8rpx;
							margin-left: 20rpx;
						}
					}

					.bottom {
						margin-left: 30rpx;
						font-size: 24rpx;
						color: #999;
						margin-top: 20rpx;
					}
				}

				.right {
					width: 10%;
					height: 100%;
					border-left: 1px solid #aaa;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 20%;
					}

					.del {
						color: darkred;
						font-size: 24rpx;
						margin-top: 20rpx;
						margin-left: 20%;
					}
				}
			}
		}

		button {
			position: fixed;
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 80rpx;
			border-radius: 80rpx;
			background-color: #354e44;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
		}
	}
</style>
