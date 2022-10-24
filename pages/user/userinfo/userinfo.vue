<template>
	<view class="content">
		<view class="edit-box">

			<button class="edit-btn" @tap="onchangeUserInfo">修改用户信息</button>
		</view>
		<view class="info-box" v-if="ishsow">
			<view class="avator">
				<view class="left">
					头像
				</view>
				<view class="right">
					<image :src="userinfo.icon" mode=""></image>
				</view>
			</view>
			<view class="item username">
				<view class="left">
					用户名
				</view>
				<view class="right">
					<input type="text" v-model="userinfo.username">
				</view>
			</view>
			<view class="item nickname">
				<view class="left">
					昵称
				</view>
				<view class="right">
					<input type="text" v-model="userinfo.nickname">
				</view>
			</view>
			<view class="item mobile">
				<view class="left">
					手机号
				</view>
				<view class="right">
					<input type="text" v-model="userinfo.phone">
				</view>
			</view>
			<button class="return-btn" @tap="returnlast">退出登录</button>
		</view>
		<view class="infobox-b" v-else>
			<view class="avator">
				<view class="left">
					头像
				</view>
				<view class="right" @tap="uploadImg">
					<image :src="userinfo.icon" mode=""></image>
				</view>
			</view>
			<view class="item username">
				<view class="left">
					用户名
				</view>
				<view class="right">
				</view>
			</view>
			<view class="item nickname">
				<view class="left">
					昵称
				</view>
				<view class="right">
					<input type="text" v-model="userinfo.nickname">
				</view>
			</view>
			<view class="item mobile">
				<view class="left">
					手机号
				</view>
				<view class="right">
					<input type="text" v-model="userinfo.phone">
				</view>
			</view>
			<button class="return-btn" @tap="resetUserInfo">更新</button>
		</view>
	</view>
</template>

<script>
	import mix from "@/mixins/index.js"
	import baseUrl from "@/api/baseurl.js"
	import {
		updateMemberInfo
	} from "@/api/user/userinfo/index.js"
	import {getMemberInfo} from "@/api/user/log/index.js"
	export default {
		mixins:[mix],
		data() {
			return {
				userinfo: {
					icon:''
				},
				ishsow: true,
				icon:''
			}
		},
		onShow() {
			// console.log(this);
			if (this.isLogin()) {
				this.userinfo=uni.getStorageSync("user-info")
			}
		},
		methods: {
			// 点击退出登录是清楚 token 
			returnlast() {
				uni.clearStorageSync()
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/user/log/log'
					})
				}, 500)
			},
			// 点击修改 用户信息
			onchangeUserInfo() {
				this.ishsow = false

			},
			// 用户 点击 更新
			resetUserInfo() {
				this.userinfo.icon=this.icon
				uni.setStorageSync("user-info",this.userinfo)
				// 没 接口 更新 本地 即可
				setTimeout(() => {
					this.ishsow = true
				}, 600)
			},
			// 上传头像
			uploadImg() {
				// console.log(this);
				var _this=this
				uni.chooseImage({
					// #ifndef H5
					sizeType: ["original"],
					// #endif
					sourceType: ["album"],
					success(res) {
						// console.log(res);
						var img = res.tempFilePaths[0];
						// console.log(img);
						// this.avatorUrl = img
						uni.uploadFile({
							url: baseUrl + "/lejuClient/login/uploadAvatar",
							filePath: img,
							name: "file",
							header: {
								token: uni.getStorageSync("leju-token")
							},
							success(result) {
								// console.log(result.data);
								// console.log(this);
								_this.icon = JSON.parse(result.data).data.fileUrl
							}
						})
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
		.edit-box {
			width: 100%;
			display: flex;
			justify-content: flex-end;

			.edit-btn {
				width: 200rpx;
				color: #353535;
				border: 1px solid #353535;
				background-color: rgba(0, 0, 0, 0);
				display: inline-block;
				line-height: 2.3;
				font-size: 13rpx;
				padding: 0 10rpx;
				margin: 20rpx 20rpx;
			}
		}

		.info-box {

			.avator {
				display: flex;
				border-bottom: 1px solid #e5e5e5;
				margin: 40rpx;
				padding-bottom: 20rpx;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 20%;
				}

				.right {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					width: 80%;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 50%;
					}
				}
			}

			.item {
				display: flex;
				border-bottom: 1px solid #e5e5e5;
				padding-bottom: 20rpx;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 20%;
					padding-left: 40rpx;
				}

				.right {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80%;

					input {
						text-align: right;
						width: 100%;
						height: 80rpx;
						margin-right: 40rpx;
					}
				}
			}

			.return-btn {
				position: fixed;
				left: 50%;
				bottom: 20%;
				transform: translateX(-50%);
				width: 408rpx;
				height: 96rpx;
				font-size: 34rpx;
				color: #fff;
				text-align: center;
				line-height: 96rpx;
				background: #1c4b47;
				border-radius: 16rpx;
			}
		}

		.infobox-b {
			.avator {
				display: flex;
				border-bottom: 1px solid #e5e5e5;
				margin: 40rpx;
				padding-bottom: 20rpx;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 20%;
				}

				.right {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					width: 80%;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 50%;
					}
				}
			}

			.item {
				display: flex;
				border-bottom: 1px solid #e5e5e5;
				padding-bottom: 20rpx;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 20%;
					padding-left: 40rpx;
				}

				.right {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80%;

					input {
						text-align: right;
						width: 100%;
						height: 80rpx;
						margin-right: 40rpx;
					}
				}
			}

			.return-btn {
				position: fixed;
				left: 50%;
				bottom: 20%;
				transform: translateX(-50%);
				width: 408rpx;
				height: 96rpx;
				font-size: 34rpx;
				color: #fff;
				text-align: center;
				line-height: 96rpx;
				background: #1c4b47;
				border-radius: 16rpx;
			}
		}
	}
</style>
