<template>
	<view class="content">
		<view class="logo">
			<image src="/static/log/logo.png" mode=""></image>
		</view>
		<view class="form">
			<form>
				<view class="input-mobile">
					<input type="text" value="" v-model="user.username">
				</view>
				<view class="input-password">
					<input type="text" value="" v-model="user.password">
				</view>
				<view class="uni-btn-v">
					<button form-type="submit" @tap="formSubmit">登录</button>
				</view>
			</form>
			<view class="find-password">
				<div class="left">找回密码</div>
				<view class="line">

				</view>
				<div class="right">注册账号</div>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		doLogin,
		getMemberInfo
	} from "@/api/user/log/index.js"
	export default {
		data() {
			return {
				user: {
					username: '17596496508',
					password: '123456'
				}
			}
		},
		methods: {
			formSubmit() {
				// 点击 登录 按钮 发起请求 
				doLogin(this.user)
					.then(res => {
						// console.log(res);
						uni.setStorageSync("leju-token", res.data.token)
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					})
				getMemberInfo()
					.then(res => {
						// console.log(res);
						uni.setStorageSync("user-info", res.data.userInfo)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1ece7;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.logo {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 70%;
			margin-top: 154rpx;

			image {
				width: 212rpx;
				height: 212rpx;
			}
		}

		.form {
			margin-top: 186rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			.input-mobile {
				input {
					width: 496rpx;
					height: 78rpx;
					background: #e3dfda;
					border-radius: 40rpx;
					padding-left: 40rpx;
				}

			}

			.input-password {
				margin-top: 36rpx;

				input {
					width: 496rpx;
					height: 78rpx;
					background: #e3dfda;
					border-radius: 40rpx;
					padding-left: 40rpx;
				}
			}

			.uni-btn-v {
				button {
					width: 536rpx;
					height: 94rpx;
					margin-top: 48rpx;
					background: #354E44;
					border-radius: 40rpx;
					color: #ffffff;
				}
			}

			.find-password {
				display: flex;
				font-size: 26rpx;
				margin-top: 35rpx;
				color: rgba(0, 0, 0, .7);
				text-align: center;
				width: 35%;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					height: 40rpx;
					line-height: 22rpx;
				}

				.line {
					width: 2rpx;
					height: 30rpx;
					background-color: rgba(0, 0, 0, .7);
				}

				.right {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					height: 40rpx;
					line-height: 22rpx;
				}
			}
		}

	}
</style>
