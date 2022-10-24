<template>
	<view class="content">
		<view class="item">
			<view class="title">
				订单编号:
			</view>
			{{orderSn}}
		</view>
		<view class="item">
			<view class="title">
				订单金额:
			</view>
			{{totalAmount}}
		</view>
		<view class="pay">
			<view class="title">
				请选择支付方式
			</view>
			<view class="pay-item">
				<image src="/static/icons/wxpay.png" mode=""></image>
				<evan-checkbox class="ridos" @change="changePayType(2)" v-model="isSelect1"></evan-checkbox>
			</view>
			<view class="pay-item">
				<image src="/static/icons/alipay.png" mode=""></image>
				<evan-checkbox class="ridos" @change="changePayType(1)" v-model="isSelect2"></evan-checkbox>
			</view>
		</view>
		<button @tap="pay">立即支付</button>
	</view>
</template>

<script>
	import {payConfirm} from "@/api/home/orders/index.js"
	export default {
		data() {
			return {
				orderSn: "",
				totalAmount:"",
				id:'',
				payType:0,
				isSelect1:false,
				isSelect2:false
			}
		},
		onLoad(options) {
			this.orderSn = options.orderSn
			this.totalAmount = options.totalAmount
			this.id=options.id
		},
		methods: {

			// 点击 立即 支付
			pay() {
				payConfirm({
					orderId:this.id,
					payType:this.payType
				})
				.then(res=>{
					// console.log(res);
					if(res.success){
						uni.showToast({
							title:"支付成功",
							icon:"success"
						})
						uni.navigateTo({
							url:`/pages/home/orders/pay/paySuccess/paySuccess?price=${this.totalAmount}`
						})
					}
				})
			},
			// 点击 单选 按钮 
			changePayType(val){
				
				
				if(val==1){
					// 支付宝
					this.isSelect1=false
					this.isSelect2=true
					this.payType=1
				}
				if(val==2){
					this.isSelect2=false
					this.isSelect1=true
					this.payType=2
				}
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
		.item {
			font-size: 34rpx;
			display: flex;
			align-items: center;
			height: 80rpx;
			margin-left: 40rpx;

			.title {
				color: #7d7d7d;
			}
		}

		.pay {
			font-size: 34rpx;
			margin-left: 40rpx;
			margin-top: 80rpx;

			.pay-item {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 40rpx;

				image {
					width: 88rpx;
					height: 88rpx;

				}

				.ridos {
					margin-right: 40rpx;
				}
			}
		}

		button {
			width: 70%;
			height: 88rpx;
			border-radius: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #354e44;
			margin-top: 150rpx;
		}
	}
</style>
