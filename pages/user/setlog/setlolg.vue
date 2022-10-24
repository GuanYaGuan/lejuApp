<template>
	<view class="content">
		<image class="logo" src="/static/log/logo.png" mode=""></image>
		<view class="content-info">
			<view class="item">
				<input type="text" placeholder="手机号" v-model="formData.phone">
			</view>
			<view class="item">
				<input type="text" placeholder="请输入登录密码" v-model="formData.password">
			</view>
			<view class="item">
				<input type="text" placeholder="请输入用户名该用户名将被用作账户登录" v-model="formData.username">
			</view>
			<view class="item">
				<input type="text" placeholder="请输入昵称" v-model="formData.nickname">
			</view>
			<view class="item">
				<input type="text" placeholder="请输入验证码">
				<view class="code-box">
					<view v-if="isGetCode" @tap="getCode" class="getCode">
						获取验证码
					</view>
					<view v-else class="time">
						{{time}}
					</view>
				</view>
			</view>
		</view>
		<button class="set" @tap="register">注册</button>
	</view>
</template>

<script>
	import {
		register
	} from "@/api/user/setlog/index.js"
	export default {
		data() {
			return {
				isGetCode: true,
				time:60,
				isshow: true,
				formData: {
					"birthday": "",
					"city": "",
					"email": "",
					"growth": 0,
					"historyIntegration": 0,
					"icon": "@/static/log/logo.png",
					"integration": 0,
					"isDisabled": 0,
					"memberLevelId": "",
					"nickname": "",
					"password": "",
					"personalizedSignature": "",
					"phone": "",
					"realname": "",
					"sex": 0,
					"sourceType": 0,
					"status": 1,
					"username": "",
					"wxOpenId": ""
				}
			}
		},
		onLoad() {

		},
		methods: {
			// 模拟倒计时
			getCode() {
				this.isGetCode = !this.isGetCode;
				var time = 60;
				this.time = 60
				var timer = setInterval(() => {
					time--;
					if (time == 0) {
						this.isGetCode = !this.isGetCode;

						clearInterval(timer)

					}
					this.time = time
				}, 1000)
			},
			// 点击 提交  注册
			register() {
				register(this.formData)
					.then(res => {
						console.log(res);
						if (res.success) {
							uni.showToast({
								title: "注册成功",
								icon: "none"
							})
						}
					})

				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/user/log/log"
					})
				}, 1000)
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		.logo {
			width: 212rpx;
			height: 212rpx;
			margin-top: 120rpx;
		}

		.content-info {
			margin-top: 40rpx;
			width: 100%;

			.item {
				position: relative;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				width: 100%;

				input {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					width: 80%;
					height: 90rpx;
					color: #333;
					padding-left: 40rpx;
					margin-top: 26rpx;
					margin-bottom: 26rpx;
					background-color: #ffffff;
					border-radius: 40rpx;
				}
				.code-box{
					position: absolute;
					top: 50%;
					right: 10%;
					transform: translateY(-50%);
					width: 150rpx;
					display: flex;
					justify-content: flex-end;
					color:gray;
					.time{
						margin-right: 20rpx;
					}
				}
			}
		}

		.set {
			width: 70%;
			border-radius: 40rpx;
			background: rgb(53, 78, 68);
			color: rgb(255, 255, 255);
			margin-top: 60rpx;
		}
	}
</style>
