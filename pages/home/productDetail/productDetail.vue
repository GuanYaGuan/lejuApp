<template>
	<view class="content">
		<!-- 
		    导航栏不自己写时, 即 pages.json 文件中本页面 的 "navigationStyle": "custom" 不设置时  , 顶部 会有一个 自动生成的 返回导航栏
			其它 普通方式 将标题 写在导航栏内 会被导航栏遮盖 , 将数据 传到 pages.json 中动态 设置 "navigationBarTitleText": ""  又太麻烦
			可以使用 uni-app 提供的  uni.setNavigationBarTitle({title: '新的标题'});
			即可动态设置
		 -->
		<!-- <view class="nav-box">
			<image @tap="returnLast" src="/static/home/arrow-left.png" mode=""></image>
			<view class="title">
				{{detailData.detailTitle}}
			</view>
		</view> -->
		<view class="big-banner">
			<swiper circular="true" style="width: 100%;height: 600rpx;" :indicator-dots="true" :autoplay="true"
				:interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="collect">
			<uni-icons @tap="changeCol" type="star" size="40" :color="iscollect?'red':'white'"></uni-icons>
		</view>
		<view class="desc-info">
			<div class="promotionPrice">￥{{detailData.promotionPrice}}</div>
			<view class="zero">
				.00
			</view>
			<div class="price">￥{{detailData.price}}.00</div>
			<view class="line">
				没有促销使用原价
			</view>

		</view>
		<h3 class="name">
			{{detailData.name}}
		</h3>
		<p class="name-b">{{detailData.brandName}}</p>
		<mp-html class="detail-html" :content="detailData.detailMobileHtml" />
		<view class="tabbar">
			<image src="/static/user/kf.png" mode=""></image>
			<view class="right">
				<button @tap="showMask(0)">添加购物车</button>
				<button @tap="showMask(1)">立即购买</button>
			</view>
		</view>
		<!-- 弹窗 -->
		<view class="mask animate__animated" @tap="isMaskShow = !isMaskShow" :class="isMaskShow?'animate__fadeIn':''"
			v-if="isMaskShow">
			<view class="box" @tap.stop>
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="text" v-if="detailData.skuList">
						<view class="top">
							<view class="left">
								<image :src="detailData.skuList[current].pic" mode="" v-if="detailData.skuList"></image>
							</view>
							<view class="right">
								<p class="name">{{detailData.name}}</p>
								<p class="number" v-if="detailData.skuList">
									库存数量:{{detailData.skuList[current].stock}}</p>
							</view>
							<image @tap="cancle" class="re" src="/static/home/re.png" mode=""></image>
						</view>
						<!-- 商品选择 -->
						<view class="select-prd first">
							<h3>商品选择</h3>
							<view class="size-select">
								<view class="size-item" v-for="(item,idx) in detailData.skuList" :key="idx"
									@tap="current=idx" :class="current == idx?'borderSty':''">
									<text v-for="(ele,index) in item.spData" :key="index">
										{{ ele.key }}: {{ ele.value }}
									</text>
								</view>
							</view>
						</view>
						<!-- 特色服务 -->
						<view class="select-prd">
							<h3>特色服务</h3>
							<view class="size-item">
								送货上门
							</view>
							<view class="size-item">
								上门安装
							</view>
						</view>
						<!-- 购买数量 -->
						<view class="select-prd">
							<h3>购买数量</h3>
							<view class="stepper">
								<view class="item" @tap="cut">
									-
								</view>
								<view class="item-center">
									{{count}}
								</view>
								<view class="item" @tap="add">
									+
								</view>
							</view>
						</view>
						<!-- 确定 -->
						<button class="sure" @tap="submitCart">确定</button>
					</view>
					<view class="tips" v-else>
						没有数据,请选择其他商品吧!
					</view>
				</view>
			</view>
		</view>

		<!--  
		<view>
			<uni-popup ref="popup">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="text" v-if="detailData.skuList">
						<view class="top">
							<view class="left">
								<image :src="detailData.skuList[current].pic" mode="" v-if="detailData.skuList"></image>
							</view>
							<view class="right">
								<p class="name">{{detailData.name}}</p>
								<p class="number" v-if="detailData.skuList">
									库存数量:{{detailData.skuList[current].stock}}</p>
							</view>
							<image @tap="cancle" class="re" src="/static/home/re.png" mode=""></image>
						</view>
						商品选择
						<view class="select-prd first">
							<h3>商品选择</h3>
							<view class="size-select">
								<view class="size-item" v-for="(item,idx) in detailData.skuList" :key="idx"
									@tap="current=idx" :class="current == idx?'borderSty':''">
									<text v-for="(ele,index) in item.spData" :key="index">
										{{ ele.key }}: {{ ele.value }}
									</text>
								</view>
							</view>
						</view>
						特色服务
						<view class="select-prd">
							<h3>特色服务</h3>
							<view class="size-item">
								送货上门
							</view>
							<view class="size-item">
								上门安装
							</view>
						</view>
						购买数量
						<view class="select-prd">
							<h3>购买数量</h3>
							<view class="stepper">
								<view class="item" @tap="cut">
									-
								</view>
								<view class="item-center">
									{{count}}
								</view>
								<view class="item" @tap="add">
									+
								</view>
							</view>
						</view>
						确定
						<button class="sure" v-if="isshow" @tap="submitCart">确定</button>
						<button class="sure" v-else @tap="addorders">确定</button>
					</view>
					<view class="tips" v-else>
						没有数据,请选择其他商品吧!
					</view>
				</view>
			</uni-popup>
		</view>
		-->
	</view>
</template>

<script>
	import mix from "@/mixins/index.js"
	import {
		productDetail,
		addCart,
		addPreOrder
	} from "@/api/home/productDetail/index.js"
	export default {
		mixins: [mix],
		data() {
			return {
				detailData: [],
				bannerList: [],
				iscollect: false,
				isMaskShow: false,
				id: 0,
				type: 'center',
				count: 1,
				current: 0,
				// isshow: ''
			}
		},
		onLoad(options) {
			// 判断 是否登录
			this.isLogin()
			// 判断
			var collectData = uni.getStorageSync('collectList') || [];
			var item = collectData.find(ele => ele.id == options.id)
			if (item) {
				this.iscollect = true
			} else {
				this.iscollect = false
			}
			// console.log(options.id);
			productDetail(options.id)
				.then(res => {
					// console.log(res.data.product);
					res.data.product.skuList.forEach(ele => {
						ele.spData = JSON.parse(ele.spData)
					})
					this.detailData = res.data.product,
						this.bannerList = res.data.product.albumPics.split(',')
					uni.setNavigationBarTitle({
						title: this.detailData.name
					})
				})

		},
		methods: {
			// 点击 出现   mask  弹窗
			showMask(val) {
				this.id = val
				this.isMaskShow = !this.isMaskShow
			},
			// 点击返回 home 页面
			// returnLast() {
			// 	uni.navigateBack({
			// 		url: "pages/home/home"
			// 	})
			// },
			// 点击 改变 收藏图标的颜色
			changeCol() {
				/*
				因为没有点击收藏的接口 我们使用 本地存储来模拟 收藏功能
				  + 首先我们要判断本地是否存储了 数据 如果没有保存 则 进行保存
				  + 如果本地 存储了 数据 则后续需要考虑, 
				         1. 这个数据 是否已经在本地村粗过   若存过 收藏按钮状态 为选中
						                                  若未存储过 收藏按钮 未 未选中的 的状态 同时 对于新保存的 collectData 要进行保存push 或者 删除splice 的操作
				*/
				var collectData = uni.getStorageSync('collectList');
				if (!collectData) {
					// 保存当前商品数据
					uni.setStorageSync("collectList", [this.detailData])
					this.iscollect = true
				} else {
					// 找不到本地存储的商品id 即 没有存储
					var item = collectData.find(ele => ele.id == this.detailData.id)
					var index = collectData.findIndex(ele => ele.id == this.detailData.id)
					console.log(index);
					if (item) {
						// 取消收藏
						collectData.splice(index, 1)
						this.iscollect = false
						uni.setStorageSync("collectList", collectData)
					} else {
						// 收藏
						collectData.push(this.detailData)
						this.iscollect = true
						uni.setStorageSync("collectList", collectData)
					}

				}

			},
			// 点击打开  popuple  弹窗
			// toggle(val) {
			// 	if (val == 0) {
			// 		// console.log("添加购物车");
			// 		this.$refs.popup.open('center')
			// 		this.isshow = true
			// 	} else {
			// 		// console.log("提交订单");
			// 		this.$refs.popup.open('center')
			// 		this.isshow = false
			// 	}
			// 	// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性

			// 	// 混入 是否登录的判断
			// 	

			// },
			// 点击 减号 减
			cut() {
				if (this.count > 1) {
					this.count--
				}
			},
			//  点击 加号
			add() {
				this.count++
			},
			// 点击 添加到 购物车
			submitCart() {
				if (this.id == 0) {
					// console.log("添加购物车")
					addCart({
							productId: this.detailData.id,
							productSkuId: this.detailData.skuList[this.current].id,
							quantity: this.count
						})
						.then(res => {
							// console.log(res);
							if (res.data.success) {
								uni.showToast({
									title: "添加成功",
									icon: "none"
								})
							} else {
								uni.showToast({
									title: res.message,
									icon: "none"
								})
							}
						})
					this.isMaskShow = !this.isMaskShow
					this.count = 1
				} else {
					// console.log("立即购买")
					// 提交订单
					var idindex=this.current
					addPreOrder({
							"orderItemList": [{
								"productId": this.detailData.id,
								"productQuantity": this.count,
								"productSkuId": this.detailData.skuList[idindex].id
							}]
						})
						.then(res => {
							// console.log(res.data.orderId);
							if (res.success) {
								uni.showToast({
									title: '购买成功.1S后跳转至订单页面',
									icon: 'none'
								})
								setTimeout(() => {
									uni.navigateTo({
										url: `/pages/home/orders/orders?id=${res.data.orderId}`
									})
								}, 1000)
							}
							// console.log(res);
						})
				}

			},
			// 点击 取消 图标 关闭 模态框
			cancle() {
				// this.$refs.popup.close('center')
				this.isMaskShow = !this.isMaskShow
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F1ECE7;
	}

	.content {
		position: relative;
		padding-bottom: 110rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: flex-start;

		.nav-box {
			width: 100%;
			height: 88rpx;
			background-color: #354e44;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 8%;
				height: 70%;
				margin-left: 20rpx;
			}

			.title {
				width: 30%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 30%;
				color: #FFFFFF;
			}
		}

		.big-banner {
			width: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.collect {
			position: absolute;
			top: 645rpx;
			left: 80%;
			width: 80rpx;
			height: 80rpx;
			background-color: #354e44;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
		}

		.desc-info {
			width: 80%;
			display: flex;
			margin-top: 130rpx;
			align-items: baseline;

			.promotionPrice {
				font-family: fantasy;
				font-size: 66rpx;
				line-height: 66rpx;
				color: #f2270c;
			}

			.zero {
				color: #f2270c;
				font-family: fantasy;
			}

			.price {
				margin: 0 0 0 2rpx;
				text-decoration: line-through;
				color: #b5b5b5;
				font-size: 13rpx;
				font-weight: 400;
			}

			.line {
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				line-height: normal;
				margin-right: 6rpx;
				padding: 0 10rpx;
				border: 1rpx solid #ff8373;
				border-radius: 2.5rpx;
				height: 30rpx;
				color: #f2270c;
				font-size: 10rpx;
				color: #fff;
				background-color: #f2270c;
				border-color: #f2270c;
				margin-left: 5rpx;
			}

			.line:after {
				position: absolute;
				content: "";
				width: 15rpx;
				height: 15rpx;
				background: #fff;
				border-radius: 50%;
				right: 0;
				top: 50%;
				transform: translate(50%, -50%);
			}

			.line:before {
				position: absolute;
				content: "";
				width: 15rpx;
				height: 15rpx;
				background: #fff;
				border-radius: 50%;
				left: 0;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.name {
			margin-top: 10rpx;
			width: 80%;
			padding-left: 30rpx;
		}

		.name-b {
			margin-top: 60rpx;
			width: 80%;
			padding-left: 30rpx;
			color: #666;
		}

		.detail-html {
			display: flex;
			overflow: hidden;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			margin-top: 60rpx;
			width: 100%;

			img {
				width: 80%;
			}
		}

		.tabbar {
			width: 100%;
			height: 110rpx;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-left: 20rpx;
			}

			.right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-right: 20rpx;

				:last-child {
					margin-left: 20rpx;
					background-color: #354e44;
					color: #FFFFFF;
				}
			}
		}

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			justify-content: center;

			// animation: fadeIn1 1s linear;
			// transition: 1s linear;
			.box {
				width: 568rpx;
				padding: 30rpx;
				background-color: #FFFFFF;
				border-radius: 40rpx;

				.popup-content {
					display: flex;
					align-items: flex-start;
					justify-content: center;

					.text {

						.top {
							display: flex;
							align-items: flex-end;
							justify-content: space-between;
							transform: translateY(-50%);

							.re {
								width: 40rpx;
								height: 40rpx;
								margin-bottom: 10%;
							}

							.left {
								image {
									width: 200rpx;
									height: 200rpx;
								}

							}

							.right {
								display: flex;
								flex-wrap: wrap;
								justify-content: flex-start;
								padding-left: 40rpx;

								.name {
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									padding-left: 0;
								}

								.number {
									color: #b0b0b0;
									font-size: 26rpx;
									margin-top: 10rpx;
								}
							}
						}

						.select-prd.first {
							margin-top: -70rpx;
						}

						.select-prd {
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							margin-bottom: 40rpx;

							.size-select {
								width: 100%;
								display: flex;
								justify-content: space-between;
								flex-wrap: wrap;

								.size-item {
									box-sizing: border-box;
									float: left;
									padding: 0 20rpx;
									height: 66rpx;
									color: #3e3e3e;
									font-size: 28rpx;
									line-height: 66rpx;
									background: #f2f4f3;
									border-radius: 20rpx;
									border-radius: 20rpx;
									margin: 10rpx
								}
							}

							.borderSty {
								border: 2px solid #3e3e3e;
							}

							.stepper {
								display: flex;

								.item {
									display: flex;
									justify-content: center;
									align-items: center;
									width: 50rpx;
									height: 50rpx;
									background-color: #F1ECE7;
									border-radius: 45%;
								}

								.item-center {
									display: flex;
									justify-content: center;
									align-items: center;
									width: 100rpx;
									height: 50rpx;
									border-radius: 60rpx;
									background-color: #F1ECE7;
									margin: 0 10rpx;
								}
							}
						}

						.sure {
							width: 228rpx;
							height: 88rpx;
							background: #354e44;
							border-radius: 28rpx;
							border-radius: 28rpx;
							margin: 52rpx auto;
							color: #fff;
							font-size: 34rpx;
							text-align: center;
							line-height: 88rpx;
						}
					}

					.tips {
						height: 100%;
						display: flex;
						align-items: center;
					}
				}

				.item {
					border: 1px solid transparent;
				}

				.active {
					border: 1px solid red;
				}

			}
		}




	}
</style>
