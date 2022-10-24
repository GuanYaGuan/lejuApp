<template>
	<view class="content">
		<view class="form">
			<view class="item">
				<view class="left">
					收件人
				</view>
				<view class="right">
					<input type="text" placeholder="请输入收件人姓名" v-model="form.name">
				</view>
			</view>
			<view class="item">
				<view class="left">
					电话号码
				</view>
				<view class="right">
					<input type="text" placeholder="请输入收件人电话号码" v-model="form.phoneNumber">
				</view>
			</view>
			<view class="item">
				<view class="left">
					所在地区
				</view>
				<view class="right other" @click="btnClick">
					<view v-if="isshow">
						点击选择地址
					</view>
					<view v-else>
						<span v-for="(item,index) in address" :key="index">
							{{item}}
						</span>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="left">
					详细地址
				</view>
				<view class="right">
					<input type="text" placeholder="请输入详细地址" v-model="form.detailAddress">
				</view>
			</view>
			<view class="item last">
				<view class="left">
					设置默认地址
				</view>
				<switch color="#354e44" v-model="form.defaultStatus" @change="switch2Change" />
			</view>
		</view>
		<button @tap="Addaddress">保存地址</button>
		<!-- 地址 选矿 -->
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
	</view>
</template>

<script>
	import {
		addAddressInfo
	} from "@/api/user/address/index.js"
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				form: {
					"city": "",
					"cityCode": 11-1101-110102,
					"detailAddress": "",
					"name": "",
					"phoneNumber": "",
					"postCode": "",
					"province": "",
					"region": "",
					"tag": "",
					"defaultStatus": 0
				},
				address: [],
				isshow: true
			}
		},
		onLoad() {

		},
		methods: {
			// switch 开关状态的改变
			switch2Change(e) {
				// console.log(e.detail.value);
				if (e.detail.value) {
					this.form.defaultStatus = 1
				} else {
					this.form.defaultStatus = 0
				}
			},
			// 点击 打开 选择 地址
			btnClick() {
				this.$refs.selectAddress.show()
			},
			// 选择 完毕之后的 回调
			successSelectAddress(address) { //选择成功回调
				// console.log(address)
				this.form.province = address[0]
				this.form.city = address[1]
				this.form.region = address[2]
				this.address=address
				this.isshow = false
			},
			// 点击 保存按钮  提交
			Addaddress(){
				addAddressInfo(this.form)
				.then(res=>{
					console.log(res);
					if(res.success){
						uni.showToast({
							title:"添加成功",
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
					}
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
		.form {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 94%;
				margin: 0 3%;
				padding: 3% 0;
				border-bottom: 1Px solid #ccc;

				.left {
					width: 20%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				.right.other {
					display: flex;
					justify-content: flex-start;
					height: 80rpx;
				}

				.right {
					width: 80%;
					display: flex;
					justify-content: center;
					align-items: center;

					input {
						width: 100%;
						height: 80rpx;
					}
				}
			}

			.item.last {
				width: 94%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 3%;
				padding: 3% 0;
				border-bottom: 1Px solid #ccc;

				.left {
					width: 30%;
					height: 80rpx;
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
