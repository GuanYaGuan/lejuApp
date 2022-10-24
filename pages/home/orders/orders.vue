<template>
	<view class="content">
		<view class="wait">
			等待支付
		</view>
		<view class="wait address" @tap="targetAddress">
			<view v-if="ishsow">
				选择地址
			</view>
			<view v-else>
				姓名:{{selectAddress.name}};
				电话号码:{{selectAddress.phoneNumber}};收货地址:{{selectAddress.province}}{{selectAddress.city}}{{selectAddress.region}}{{selectAddress.detailAddress}}
			</view>
		</view>
		<view class="order-card">
			<view class="wait">
				<view class="left" v-if="getPreOrderData.orderBase">
					订单编号:{{getPreOrderData.orderBase.orderSn}}
				</view>
				<view class="right">
					等待支付
				</view>
			</view>
			<view class="wait b" v-for="item in getPreOrderData.orderItems" :key="item.id">
				<image style="width: 160rpx;height: 160rpx;" :src="item.productPic" mode=""></image>
				<view class="info">
					<view class="title">
						<view class="name">{{item.productName}}</view>
						<view>￥{{item.productPrice}}元</view>
					</view>
					<view class="sort">
						<view>编号:{{item.productSkuCode}}</view>
						<view>X{{item.productQuantity}}</view>
					</view>
					<view class="rule">
						规格:
						<view v-for="(item,index) in item.productAttr" :key="index">
							{{item.key}}; {{item.value}}
						</view>
					</view>
				</view>
			</view>
			<view class="last">
				<view class="total" v-if="getPreOrderData.orderBase">
					总计:{{getPreOrderData.orderBase.totalAmount}}￥
				</view>
				<button @tap="openPay(getPreOrderData)">确认付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById,
		addConfirmOrder
	} from "@/api/home/orders/index.js"
	export default {
		data() {
			return {
				getPreOrderData: [],
				ishsow: true,
				selectAddress: ''
			}
		},
		onShow() {
			if (uni.getStorageSync("select-address")) {
				this.selectAddress = uni.getStorageSync("select-address")
				this.ishsow = false
			} else {
				this.ishsow = true
			}
		},
		onLoad(options) {
			uni.removeStorageSync("select-address")
			// console.log(options.id);
			getPreOrderById(options.id)
				.then(res => {
					// console.log(res.data);
					res.data.orderItems.forEach(el => {
						el.productAttr = JSON.parse(el.productAttr)
					})
					this.getPreOrderData = res.data
				})
		},
		methods: {
			// 点击 打开 选择地址 页面
			targetAddress() {
				uni.navigateTo({
					url: "/pages/user/address/address"
				})
			},
			// 点击 打开 支付页面
			openPay() {
				var params = {
					"addressId": uni.getStorageSync("select-address").id,
					"orderId": this.getPreOrderData.orderBase.id,
					"orderItemList": [],
					"payType": 0,
					"sourceType": 1
				}
				this.getPreOrderData.orderItems.forEach(ele => {
					var obj = {
						"cartId": ele.cartId,
						"productId": ele.productId,
						"productQuantity": ele.productQuantity,
						"productSkuId": ele.productSkuId
					}
					params.orderItemList.push(obj)
				})
				addConfirmOrder(params)
					.then(res => {
						// console.log(res);
						uni.navigateTo({
							url: `/pages/home/orders/pay/pay?id=${res.data.orderId}&orderSn=${res.data.orderSn}&totalAmount=${res.data.totalAmount}`
						})
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

		.wait {
			font-size: 26rpx;
			color: #494949;
			border-bottom: 1px solid #ccc;
			line-height: 88rpx;
			margin: 0 60rpx;
			box-sizing: border-box;
		}

		.order-card {
			width: 672rpx;
			box-sizing: border-box;
			padding: 26rpx;
			border-radius: 24rpx;
			background-color: #fff;
			margin: 30rpx auto;
			font-size: 24rpx;
			color: #3e3e3e;

			.wait {
				font-size: 26rpx;
				color: #494949;
				height: 88rpx;
				border-bottom: 1px solid #ccc;
				line-height: 88rpx;
				margin: 0 25rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx
			}

			.wait.b {
				font-size: 26rpx;
				color: #494949;
				height: 200rpx;
				border-bottom: 1px solid #ccc;
				line-height: 88rpx;
				margin: 0 25rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;

				.info {
					width: calc(100% - 200rpx);
					height: 160rpx;

					.title {
						height: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.name {
							width: 100rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.sort {
						height: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 20rpx 0;
					}

					.rule {
						height: 40rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
					}
				}
			}

			.last {
				margin-top: 20rpx;

				.total {
					display: flex;
					justify-content: flex-end;
				}

				button {
					width: 170rpx;
					height: 50rpx;
					border: 1px solid #2d4f43;
					font-size: 26rpx;
					border-radius: 10rpx;
					color: #2d4f43;
					text-align: center;
					line-height: 50rpx;
					margin-top: 20rpx;
					margin-left: 70%;
				}
			}
		}
	}
</style>
