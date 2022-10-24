<template>
	<view class="content">
		<view class="nav-box">
			<view class="item" :class="current==0?'active':''" @tap="changeCol(0)">
				待付款
			</view>
			<view class="item" :class="current==1?'active':''" @tap="changeCol(1)">
				已付款
			</view>
			<view class="item" :class="current==2?'active':''" @tap="changeCol(2)">
				待收货
			</view>
			<view class="item" :class="current==3?'active':''" @tap="changeCol(3)">
				已收货
			</view>
			<view class="item" :class="current==4?'active':''" @tap="changeCol(4)">
				售后
			</view>
		</view>
		<!-- 订单部分数据 -->
		<view class="info-box" v-if="current !=4">
			<view class="item-box" v-for="(item,index) in filterArr" :key="index">
				<view class="wait">
					<view class="left">
						订单编号:{{item.items[0].orderSn}}
					</view>
					<view class="right">
						{{item.order.status | statusText}}
					</view>
				</view>
				<view class="wait b" v-for="(item,index) in item.items" :key="index">
					<view class="left">
						<image :src="item.productPic" mode=""></image>
					</view>
					<view class="right">
						<view class="namePrice">
							<view class="name">
								{{item.productName}}
							</view>
							<view>
								￥{{item.productPrice}}
							</view>
						</view>
						<view class="sort">
							<view>
								编号:{{item.orderId}}
							</view>
							<view>
								X{{item.productQuantity}}
							</view>
						</view>
						<view class="rule">
							<view class="title">
								规格:
							</view>
							<view v-for="(items,index) in item.productAttr" :key="index" class="rule-info">
								{{items.key}}:{{items.value}}

							</view>
						</view>
					</view>
				</view>
				<view class="return" v-if="current==2" @tap="returnOrder(item)">
					退货
				</view>
				<view class="time">
					<view class="info">
						<view>
							时间:{{item.items[0].createTime}}
						</view>
						<view>
							合计:{{item.items[0].totalPrice}}￥
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="right" v-if="current==0">
						<button @tap="resetOder(item.items[0].orderId)">取消订单</button>
						<button @tap="paybtn(item.items[0].orderId)">付款</button>
					</view>
					<view class="right" v-if="current==2">
						<button @tap="sure(item.items[0].orderId)">确认收货</button>
					</view>
					<view class="right" v-if="current==3">
						<button @tap="delOrdedr(item.items[0].orderId)">删除订单</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 退单部分数据 -->
		<view class="info-box" v-else>
			<view class="item-box" v-for="(item,index) in returnOrderList" :key="index">
				<view class="wait">
					<view class="left">
						退单编号:{{item.orderSn}}
					</view>
					<view class="right" @tap="openReturn(item)">
						{{item.status | returnStatusText}}
					</view>
				</view>
				<view class="wait b">
					<view class="left">
						<image :src="item.productPic" mode=""></image>
					</view>
					<view class="right">
						<view class="namePrice">
							<view>
								{{item.productName}}
							</view>
							<view>
								￥{{item.productPrice}}
							</view>
						</view>
						<view class="sort">
							<view>
								编号:{{item.productId}}
							</view>
							<view>
								X{{item.productCount}}
							</view>
						</view>
						<view class="rule">
							<view class="title">
								规格:
							</view>
							<view v-for="(items,index) in item.productAttr" :key="index" class="rule-info">
								{{items.key}}:{{items.value}}

							</view>
						</view>
					</view>
				</view>
				<view class="time">
					<view class="info">
						<view>
							时间:{{item.createTime}}
						</view>
						<view>
							合计:{{item.productPrice * item.productCount}}￥
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findAllOrders,
		orderReturnApplys,
		cancelOrder,
		receiveDone,
		deleteOrder
	} from "@/api/user/waitPay/index.js"
	import mix from "@/mixins/index.js"
	export default {
		mixins: [mix],
		data() {
			return {
				current: '',
				orderListData: [],
				returnOrderList: []
			}
		},
		computed: {
			// 计算属性 可以返回一个新的 数据
			filterArr() { //用于返回 筛选之后的 数据
				return this.orderListData.filter(ele => {
					// 订单 状态 为 3 和 4 的 数据 在 已收货 tabbar 中展示
					if (this.current == 3) {
						return ele.order.status == 3 || ele.order.status == 4
					}
					return ele.order.status == this.current
				})
			}
		},
		filters: {
			statusText(val) {
				if (val == 0) {
					return "未付款"
				} else if (val == 1) {
					return "确认付款,等待发货"
				} else if (val == 2) {
					return "已发货"
				} else if (val == 3) {
					return "已收货"
				} else if (val == 4) {
					return "已退单"
				} else {
					return "无效订单"
				}
			},
			returnStatusText(val) {
				if (val == 0) {
					return "待处理"
				} else if (val == 1) {
					return "退货中"
				} else if (val == 2) {
					return "已完成"
				} else {
					return "已拒绝"
				}
			}
		},
		onLoad(options) {
			this.current = options.value
			//  混入 判断 是否登录
			if (this.isLogin()) {
				// 订单列表 数据
				this.init()
				// 退单列表数据
				orderReturnApplys()
					.then(res => {
						// console.log(res.data.items);
						res.data.items.forEach(ele => {
							ele.productAttr = JSON.parse(ele.productAttr)
						})
						this.returnOrderList = res.data.items
					})
			}
		},
		methods: {
			// 订单列表数据
			init() {
				findAllOrders()
					.then(res => {
						// console.log(res.data.orderList);
						res.data.orderList.forEach(el => {
							el.items.forEach(ele => {
								ele.productAttr = JSON.parse(ele.productAttr)
							})

						})
						this.orderListData = res.data.orderList
					})
			},
			// 点击 改变 颜色
			changeCol(val) {
				this.current = val
				uni.redirectTo({
					url: "pages/user/waitPay/waitPay"
				})
			},
			// 点击 取消订单
			resetOder(id) {
				cancelOrder(id)
					.then(res => {
						if (res.success) {
							uni.showToast({
								title: "退单成功,后台数据已接受",
								icon: "none"
							})
							this.init()
						}
					})
			},
			// 点击 付款
			paybtn(id) {
				// 跳转至 付款页面
				uni.navigateTo({
					url: `/pages/home/orders/orders?id=${id}`
				})
			},
			// 点击 确确认 收获
			sure(id) {
				receiveDone(id)
					.then(res => {
						// console.log(res);
						if (res.success) {
							uni.showToast({
								title: "已确认收货,收获成功",
								icon: "success"
							})
							this.init()
						}
					})
			},
			// 点击 删除订单
			delOrdedr(id){
				deleteOrder(id)
				.then(res=>{
					// console.log(res);
					uni.showToast({
						title: "删除成功",
						icon: "success"
					})
					this.init()
				})
			},
			// 点击  打开 退货页面
			returnOrder(item){
				uni.navigateTo({
					url:`/pages/user/waitPay/returnOrder/returnOrder?info=${JSON.stringify(item)}`
				})
			},
			// 点击 售后 的 状态  打开 退单明细 页面
			openReturn(item){
				uni.navigateTo({
					url:`/pages/user/waitPay/returnOrder/returnOrder?val=${JSON.stringify(item)}&idx=1`
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
		.nav-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 80rpx;
			background-color: #354e44;
			margin-top: 10rpx;
			color: #FFFFFF;

			:first-child {
				margin-left: 30rpx;
			}

			:last-child {
				margin-right: 30rpx;
			}

			.active {
				color: red;
			}
		}

		.info-box {
			.item-box {
				position: relative;
				width: 700rpx;
				background-color: #FFFFFF;
				margin: 20rpx auto;
				padding-bottom: 40rpx;
				border-radius: 40rpx;

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
					font-size: 24rpx;
				}

				.wait.b {
					padding: 0 20rpx;
					font-size: 26rpx;
					color: #494949;
					height: 200rpx;
					border-bottom: 1px solid #ccc;
					line-height: 88rpx;
					margin: 0 25rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 24rpx;

					.left {

						display: flex;

						image {
							display: inline-block;
							width: 170rpx;
							height: 170rpx;
						}
					}

					.right {
						width: calc(100% - 170rpx);
						height: 100%;
						margin-left: 40rpx;
						display: flex;
						flex-wrap: wrap;

						.namePrice {
							width: 100%;
							height: 50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.name {
								width: 60%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.sort {
							width: 100%;
							color: #ccc;
							font-size: 22rpx;
							height: 50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;

						}

						.rule {
							color: #ccc;
							font-size: 22rpx;
							display: flex;
							justify-content: flex-start;
							flex-wrap: wrap;
							align-items: center;

							.title {
								width: 100%;
								height: 30rpx;
							}

							.rule-info {

								display: flex;

								view {
									display: flex;
								}
							}
						}
					}
				}

				.return {
					position: absolute;
					right: 40rpx;
					bottom: 225rpx;
					text-align: right;
					color: #8d8d8d;
					font-size: 24rpx;
					line-height: 30rpx  ;
					text-decoration: underline;
				}

				.time {
					.info {
						width: 90%;
						margin: 0 auto;
						margin-top: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28rpx
					}
				}

				.btn {
					width: 100%;
					margin-top: 40rpx;
					display: flex;
					justify-content: flex-end;

					.right {
						display: flex;
						justify-content: flex-end;

						button {
							width: 170rpx;
							height: 54rpx;
							border: 1px solid #2d4f43;
							font-size: 28rpx;
							border-radius: 10rpx;
							color: #2d4f43;
							text-align: center;
							line-height: 54rpx;
							background-color: #FFFFFF;
							margin: 0;
							padding: 0;
							margin-right: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
