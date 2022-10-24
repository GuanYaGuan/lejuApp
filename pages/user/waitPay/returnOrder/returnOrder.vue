<template>
	<view class="content">
		<!-- 商品信息卡片展示 -->
		<view class="info-box" v-if="ishsow">
			<view class="item-box" v-for="(item,index) in orderListData.items" :key="index">
				<view class="wait">
					<view class="left">
						订单编号:{{item.orderSn}}
					</view>

				</view>
				<view class="wait b">
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
								X{{item.productQuantity||item.productCount}}
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
							合计:{{item.totalPrice}}￥
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 退单明细 商品展示 -->
		<view class="info-box" v-else>
			<view class="item-box">
				<view class="wait">
					<view class="left">
						退单编号:{{orderListData.orderSn}}
					</view>

				</view>
				<view class="wait b">
					<view class="left">
						<image :src="orderListData.productPic" mode=""></image>
					</view>
					<view class="right">
						<view class="namePrice">
							<view class="name">
								{{orderListData.productName}}
							</view>
							<view>
								￥{{orderListData.productPrice}}
							</view>
						</view>
						<view class="sort">
							<view>
								编号:{{orderListData.productId}}
							</view>
							<view>
								X{{orderListData.productCount}}
							</view>
						</view>
						<view class="rule">
							<view class="title">
								规格:
							</view>
							<view v-for="(items,index) in orderListData.productAttr" :key="index" class="rule-info">
								{{items.key}}:{{items.value}}

							</view>
						</view>
					</view>
				</view>
				<view class="time">
					<view class="info">
						<view>
							时间:{{orderListData.createTime}}
						</view>
						<view>
							合计:{{orderListData.productPrice * orderListData.productCount}}￥
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品退单原因等信息的填写 -->
		<view class="return-box">
			<view class="number">
				<view>
					请选择退单数量
				</view>
				<view>
					1
				</view>
			</view>
			<view class="number">
				<view>
					请输入退货原因
				</view>
				<view>
					<input type="text" v-model="resaon" placeholder="请输入退货原因">
				</view>
			</view>
			<view class="number">
				<view>
					请选择退货地址
				</view>
				<view v-if="ishsow">
					<!-- 地址选择组件 picker -->
					<picker mode="selector" :range="addressData" :value="index" @change="selAddress"
						range-key="addressName">
						<view v-if="addressData[index]">{{addressData[index].addressName}}</view>
					</picker>
				</view>

				<view v-else>

				</view>
			</view>
			<view class="number textArea">
				<view>
					请输入问题描述
				</view>
				<view>
					<textarea cols="30" rows="80" v-model="description" name="" value="" placeholder="请输入问题描述"
						style="width: 100%;text-align: right;"></textarea>
				</view>
			</view>
		</view>
		<!-- 图片上传 -->
		<view class="img">
			<view class="title">
				<h4>温馨提示:</h4>
				上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张
			</view>
			<view class="loadImg" v-if="ishsow">
				<view class="name" @tap="loadImg">
					点击上传图片
				</view>
				<view class="see">
					<image v-for="item in imgPath" :src="item.path"
						style="width: 150rpx; height: 180rpx; margin-left: 20rpx;" mode="">
					</image>
				</view>
			</view>
			<view v-else>
				<view class="see">
					<image :src="orderReturnData.proofPics" style="width: 150rpx; height: 180rpx; margin-left: 20rpx;"
						mode="">
					</image>
				</view>
			</view>
		</view>
		<button class="btn" v-if="ishsow" @tap="save">提交</button>
	</view>
</template>

<script>
	import {
		orderReturn,
		addOrderReturnApply,
		getCompanyAddrss
	} from "@/api/user/waitPay/index.js"
	import baseUrl from "@/api/baseurl.js"

	export default {
		data() {
			return {
				orderListData: [],
				resaon: '',
				description: '',
				orderReturnData: [],
				ishsow: true,
				addressData: [],
				imgPath: [],
				index: 0,
				addInfo: []
			}
		},
		onLoad(options) {
			if (options.idx == 1) {
				this.ishsow = false
				// console.log("打开的是退单明细页面");
				// console.log(JSON.parse(options.val));
				this.orderListData = JSON.parse(options.val)
				orderReturn(JSON.parse(options.val).id)
					.then(res => {
						// console.log(res.data.orderReturnApply);
						// res.data.orderReturnApply.productAttr=JSON.parse(res.data.orderReturnApply.productAttr)
						this.orderReturnData = res.data.orderReturnApply
						this.resaon = res.data.orderReturnApply.reason
						this.description = res.data.orderReturnApply.returnName
					})
			} else {
				this.ishsow = true
				// console.log("退货页面");
				console.log(JSON.parse(options.info));
				this.orderListData = JSON.parse(options.info)
				// 退货页面 获取 退货公司 地址 收货地址 数据
				getCompanyAddrss()
					.then(res => {
						// console.log(res.data.items);
						this.addressData = res.data.items
					})
			}
		},
		methods: {
			// picker 组件 监听 地址 选择 变化
			selAddress(e) {
				this.index = e.detail.value
				// 保存 地址改变 之后的 数据
				this.addInfo = this.addressData[e.detail.value]
				console.log(this.addressData[e.detail.value]);
			},
			// 点击 上传 图片
			loadImg() {
				var _this = this
				uni.chooseImage({
					// #ifndef H5
					sizeType: ["original"],
					// #endif
					sourceType: ["album"],
					success(res) {
						// console.log(res);
						var img = res.tempFiles;
						// 限制 单次 上传 图片大小 以上的 size 属性 大小 是字节  byte 1m = 1024kb = 1024 * 1024 byte
						var item = img.find(ele => ele.size > 1024 * 1024)
						if (item) {
							uni.showToast({
								title: "选择图片的大小超出限制,请重新选择图片",
								icon: "none"
							})
							return
						}
						// 限制  单次 上传 图片 张数  不可以超过 3 张
						if (img.length > 3) {
							uni.showToast({
								title: "选择图片数量超过3张,请重新选择图片",
								icon: "none"
							})
							return
						}
						// 限制 页面 中 总的图片上传 张数
						if (_this.imgPath.length + img.length > 3) {
							uni.showToast({
								title: "图片总数量超过3张,请重新选择图片",
								icon: "none"
							})
							return
						}
						// 用户如果 多次 选择图片 赋值 操作 不行
						_this.imgPath.push(...img)

					}
				})
			},
			// 点击 提交 退单请求
			save() {
				var urlArr = []
				this.imgPath.forEach(ele => {
					// 点击的时候 一个个 上传 图片
					// 解决 同步 异步执行  无法获取到 urlArr 的数据问题
					var pro = new Promise((resolve) => {
						uni.uploadFile({
							url: baseUrl + "/lejuClient/orderReturn/uploadImg",
							filePath: ele.path,
							name: "file",
							header: {
								token: uni.getStorageSync("leju-token")
							},
							success(result) {
								// console.log(result);
								resolve(JSON.parse(result.data).data.fileUrl)
							}
						})
					})
					urlArr.push(pro)
				})
				console.log(urlArr); // 得到地结果 是一个 promise 数组 使用 promise.all 的方式 获取 或者 .then的方式
				Promise.all(urlArr).then(function(posts) {
					// console.log(posts);
					// 拿到 申请退单的数据
					addOrderReturnApply({
							"companyAddressId": this.addInfo.id,
							"count": 1,
							"description": this.description,
							"orderId": this.orderListData.order.id,
							"orderItemId": this.orderListData.order.memberId,
							"proofPics": posts.join(","),
							"reason": this.resaon
						})
						.then(res => {
							if (res.success) {
								uni.showToast({
									title: "退单请求提交完成",
									icon: "success"
								})
							}
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
								width: 160rpx;
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
					line-height: 30rpx;
					text-decoration: underline;
				}

				.time {
					.info {
						width: 90%;
						margin: 0 auto;
						margin-top: 40rpx;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						font-size: 28rpx
					}
				}
			}
		}

		.return-box {
			width: 660rpx;
			background-color: #FFFFFF;
			margin: 0 auto;
			padding: 20rpx;

			.number {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #f1ece7;
				height: 90rpx;

				:last-child {
					input {
						text-align: right;
						display: flex;
						justify-content: flex-end;
						align-items: center;
					}
				}
			}

			.number.textArea {
				display: flex;
				justify-content: space-between;

				height: 300rpx;

				:first-child {

					width: 35%;

				}

				:last-child {
					display: flex;
					justify-content: flex-end;
					width: 65%;

					.uni-textarea-wrapper {
						width: 100% !important;
						margin: 0;

						.uni-textarea-placeholder.textarea-placeholder {
							width: 100%;
						}

						uni-resize-sensor {
							width: 100% !important;
						}

					}
				}

				view {
					margin-top: 40rpx;
					height: 100%;

				}
			}
		}

		.img {
			width: 660rpx;
			padding: 20rpx;
			background-color: #FFFFFF;
			margin: 20rpx auto;

			.loadImg {
				margin-top: 50rpx;
				display: flex;
				height: 200rpx;
				align-items: center;
				vertical-align: bottom;

				.name {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 180rpx;
					width: 150rpx;
					border: 1px solid #000;
					font-size: 24rpx;
				}

				.see {
					margin-left: 40rpx;
				}
			}
		}

		.btn {

			margin: 132rpx auto;
			width: 580rpx;
			height: 102rpx;
			font-size: 32rpx;
			text-align: center;
			line-height: 102rpx;
			background: #354e44;
			color: #fff;
			border-radius: 28rpx;
		}
	}
</style>
