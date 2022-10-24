<template>
	<view class="content">
		<view>


			<view class="item" v-for="(item,index) in findAllCartItemData" :key="item.id">
				<view class="check-box">
					<evan-checkbox v-model="item.isselected"></evan-checkbox>
				</view>
				<image class="img" :src="item.productPic" mode=""></image>
				<view class="info">
					<view class="title">
						{{item.productBrand}}
					</view>
					<view class="code">
						编号:{{item.memberId}}
					</view>
					<view class="number">
						数量:{{item.quantity}}
					</view>
					<view class="price">
						价格:{{item.price}}￥
					</view>
				</view>
				<view class="stepper">
					<view class="item" @tap="cut(index,item.id)">
						-
					</view>
					<view class="item-center">
						{{item.quantity}}
					</view>
					<view class="item" @tap="add(index)">
						+
					</view>
				</view>
			</view>
		</view>
		<view class="nav-bottom">
			<view class="checkAll">
				全选:<evan-checkbox v-model="isAllcheck"></evan-checkbox>
			</view>
			<view class="right">
				<view class="total">
					合计:{{total}}￥
				</view>
				<button @tap="openorder">结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findAllCartItem,
		delCartItems
	} from "@/api/user/cart/index.js"
	import {
		addPreOrder
	} from "@/api/home/productDetail/index.js"
	export default {
		data() {
			return {
				findAllCartItemData: [],
				params: []
			}
		},
		computed: {
			isAllcheck: {
				get() {
					if (this.findAllCartItemData.length > 0) {
						return this.findAllCartItemData.every((ele) => ele.isselected == true)
					} else {
						return false
					}
				},
				set(val) {

					this.findAllCartItemData.forEach((e) => {
						e.isselected = val
					})
				}
			},
			//  计算 总和
			total() {
				return this.findAllCartItemData.reduce((current, order) => {
					if (order.isselected) {
						return current + order.price * order.quantity
					} else {
						return current
					}
				}, 0)
			},
		},
		onLoad() {
			this.init()

		},
		methods: {
			// 初始化
			init() {
				findAllCartItem()
					.then(res => {
						console.log(res.data.items);
						res.data.items.forEach(ele => ele.isselected = false)
						this.findAllCartItemData = res.data.items
					})
			},
			// 点击 减号 减
			cut(index, id) {
				if (this.findAllCartItemData[index].quantity >= 1) {

					this.findAllCartItemData[index].quantity--
				}
				if (this.findAllCartItemData[index].quantity == 0) {
					delCartItems([id])
						.then(res => {
							// console.log(res);
							if (res.success) {
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								})
								this.init()
							}
						})
				}
			},
			//  点击 加号
			add(index) {
				this.findAllCartItemData[index].quantity++
			},
			// 点击结算按钮 打开 订单页面
			openorder() {
				var params = {
					"addressId": "",
					"orderId": "",
					"orderItemList": [],
					"payType": "",
					"sourceType": ""
				}
				this.findAllCartItemData.filter(ele => ele.isselected).forEach(ele => {
					var obj = {
						"cartId": ele.id,
						"productId": ele.productId,
						"productQuantity": ele.quantity,
						"productSkuId": ele.productSkuId
					}
					params.orderItemList.push(obj)


				})

				// 提交订单 生成订单
				addPreOrder(params)
					.then(res => {
						// console.log(res);
						if (res.success) {
							uni.showToast({
								title: "正在为您生成订单,1S之后跳转",
								icon: "none"
							})
							setTimeout(() => {
								uni.navigateTo({
									url: `/pages/home/orders/orders?id=${res.data.orderId}`
								})
							}, 1000)
						}
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
		height: 100vh;
		overflow: auto;
		border-radius: 50rpx 50rpx 0 0;
		background-color: #f1ece7;
		padding-bottom: 150rpx;

		.item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 40rpx;
			width: 700rpx;
			height: 208rpx;
			background-color: #FFFFFF;

			.check-box {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img {
				width: 136rpx;
				height: 136rpx;
			}

			.info {
				font-size: 22rpx;
				color: #8D8D8D;

				view {
					margin-bottom: 5rpx;
				}

				.code {
					width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.title {
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
				}
			}

			.stepper {
				display: flex;
				align-items: center;
				justify-content: center;

				.item {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 40rpx;
					height: 40rpx;
					background-color: #F1ECE7;
					border-radius: 45%;
					margin-top: 0;
				}

				.item-center {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 60rpx;
					height: 40rpx;
					border-radius: 60rpx;
					background-color: #F1ECE7;
					margin: 0 10rpx;
				}
			}
		}

		.nav-bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.checkAll {
				margin-left: 40rpx;
				display: flex;
			}

			.right {
				display: flex;
				align-items: center;
				margin-right: 40rpx;

				.total {
					margin-right: 20rpx;
				}

				button {
					display: inline-block;
					width: 208rpx;
					height: 80rpx;
					background: #354e44;
					border-radius: 28rpx;
					color: #fff;
					font-size: 36rpx;
					line-height: 80rpx;
					text-align: center;
				}
			}
		}
	}
</style>
