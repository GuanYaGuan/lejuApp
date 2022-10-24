<template>
	<view class="content">
		<view class="nav">
			<view :class="isAddClass?'active':''" @tap="changeAdd">
				精选文章
			</view>
			<view :class="isAddClass?'':'active'" @tap="changeAdd">
				品牌列表
			</view>
		</view>

		<view class="content-a" v-if="isAddClass">
			<view class="item" v-for="item in findArticleByPageData" :key="item.id">
				<view class="item-top">
					<image @tap="openArticleDetail(item.id)" :src="item.coverImg" mode=""></image>
					<view class="names">
						{{item.title}}
					</view>
					<view class="eng">
						{{item.author}}
					</view>
				</view>
				<view class="item-bottom">
					<view class="left">
						<image src="/static/find/eye.png" mode=""></image>
						<view class="see">
							{{item.productCount}}
						</view>
					</view>
					<view class="right">
						<image src="/static/find//finger.png" mode=""></image>
						<uni-icons @tap="changeCol(item)" type="star" size="30" :color="item.iscollect?'red':'black'">
						</uni-icons>
					</view>
				</view>
			</view>
		</view>

		<view class="content-box" v-else>
			<view class="top">
				<view :class="index==0?'active':''" @tap="changeBgc(0)">
					<image v-if="ishsow0" src="/static/find/one.png" mode=""></image>
					<image v-else src="/static/find//one-active.png" mode=""></image>
				</view>
				<view :class="index==1?'active':''" @tap="changeBgc(1)">
					<image v-if="ishsow1" src="/static/find/two.png" mode=""></image>
					<image v-else src="/static/find//two-white.png" mode=""></image>
				</view>
				<view :class="index==2?'active':''" @tap="changeBgc(2)">
					<image v-if="ishsow2" src="/static/find/three.png" mode=""></image>
					<image v-else src="/static/find//three-white.png" mode=""></image>
				</view>
				<view :class="index==3?'active':''" @tap="changeBgc(3)">
					<image v-if="ishsow3" src="/static/find/ping.png" mode=""></image>
					<image v-else src="/static/find//ping-white.png" mode=""></image>
				</view>
			</view>
			<view class="bottom">
				<view class="item" v-for="item in findBrandsByPageData" :key="item.id">
					<view class="item-top">
						<image :src="item.logo" mode=""></image>
						<view class="names">
							{{item.name}}
						</view>
						<view class="eng">
							originality
						</view>
					</view>
					<view class="item-bottom">
						<view class="left">
							<image src="/static/find/eye.png" mode=""></image>
							<view class="see">
								{{item.productCount}}
							</view>
						</view>
						<view class="right">
							<image src="/static/find//finger.png" mode=""></image>
							<image src="/static/find/send.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findBrandsByPage,
		findArticleByPage
	} from "@/api/find/index.js"
	export default {
		data() {
			return {
				isAddClass: true,
				index: 0,
				ishsow0: false,
				ishsow1: true,
				ishsow2: true,
				ishsow3: true,
				findBrandsByPageData: [],
				findArticleByPageData: []
			}
		},
		onLoad() {
			// 品牌列表
			findBrandsByPage(1, 7)
				.then(res => {
					// console.log(res);
					this.findBrandsByPageData = res.data.rows
				})
			// 精选文章
			findArticleByPage(1, 10)
				.then(res => {
					// console.log(res.data.rows);
					res.data.rows.forEach(el => {
						// 解决 页面刷新之后 状态 未保存  判断 当前循环的数据 是否在 本地当中
						var list = uni.getStorageSync("articleList");
						if (!list) {
							el.iscollect = false
						}else{
							//  如果本地有 相同的文章数据
							var item = list.find(elt => elt.id == el.id);
							if(item){
								el.iscollect=true
							}else{
								el.iscollect=false
							}
						}
					})
					this.findArticleByPageData = res.data.rows
				})
		},
		methods: {
			// 点击 改变 收藏按钮 的状态
			changeCol(val) {

				/*
				     1. 先判断本地是否 有收藏的 文章数据
					         如果 本地有 收藏的 文章数据
							         如果 本地收藏的数据 有相同的   则取消收藏
									 如果本地 收藏的数据 没有相同的 执行  push  操作
							如果本地 没有 收藏的文章数据 则执行 收藏操作
				 */
				var list = uni.getStorageSync("articleList");
				if (!list) {
					// 收藏
					uni.setStorageSync("articleList", [val])
					val.iscollect = true
				} else {
					// 找到 本地相同的 文章 的 id
					var item = list.find(ele => ele.id == val.id)
					var index = list.findIndex(ele => ele.id == val.id)
					if (item) {
						// 取消收藏 如果 本地收藏的数据 有相同的   则取消收藏
						list.splice(index, 1)
						uni.setStorageSync("articleList", list)
						val.iscollect = false
					} else {
						//收藏  如果本地 收藏的数据 没有相同的 执行  push  操作
						list.push(val)
						uni.setStorageSync("articleList", list)
						val.iscollect = true
					}
				}
			},
			// 导航 下 的滑条
			changeAdd() {
				this.isAddClass = !this.isAddClass
			},
			// 点击 跳转 至 精选文章的详情页	
			openArticleDetail(id) {
				uni.navigateTo({
					url: `/pages/find/findDetail/findDetail?id=${id}`
				})
			},
			// 改变 图片 导航样式
			changeBgc(val) {
				// 默认的初始 样式
				this.index = val,
					this.ishsow0 = false
				this.ishsow1 = true
				this.ishsow2 = true
				this.ishsow3 = true
				if (val == 1) {
					this.ishsow1 = false
					this.ishsow2 = true
					this.ishsow3 = true
					this.ishsow0 = true
				}
				if (val == 2) {
					this.ishsow2 = false
					this.ishsow3 = true
					this.ishsow1 = true
					this.ishsow0 = true
				}
				if (val == 3) {
					this.ishsow3 = false
					this.ishsow2 = true
					this.ishsow1 = true
					this.ishsow0 = true
				}
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
		padding-bottom: 100rpx;
		position: relative;
		width: 100%;
		height: 100vh;
		background: #F1ECE7;
		box-shadow: 0 16rpx 24rpx 0 rgba(83, 66, 49, 0.08);
		border-radius: 40rpx 40rpx 0 0;
		transform: translateY(100rpx);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;

		.nav {
			position: fixed;
			top: -80rpx;
			width: 360rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #ffffff;

			view {
				height: 60rpx;
			}

			.active {
				border-bottom: 6rpx solid #ffffff;
			}
		}

		.content-a {
			padding-top: 46rpx;

			.item {
				width: 674rpx;
				height: 482rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				box-shadow: 0 12rpx 16rpx 0 rgba(83, 66, 49, 0.03);
				margin-bottom: 56rpx;
			}

			.item-top {
				position: relative;
				width: 100%;
				height: 382rpx;

				image {
					width: 100%;
					height: 100%;
				}

				.names {
					font-size: 48rpx;
					color: #FFFFFF;
					letter-spacing: 3.43rpx;
					position: absolute;
					bottom: 71rpx;
					left: 20rpx;
				}

				.eng {
					font-size: 30rpx;
					color: #FFFFFF;
					letter-spacing: 2.14rpx;
					position: absolute;
					bottom: 24rpx;
					left: 20rpx;
				}
			}

			.item-bottom {
				height: calc(100% - 382rpx);
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					margin-left: 54rpx;

					image {
						width: 43.7rpx;
						height: 28rpx;
					}

					.see {
						font-size: 26rpx;
						color: #3E3E3E;
						letter-spacing: 1.86rpx;
						margin-left: 17rpx;
						transform: translateY(-5rpx);
					}
				}

				.right {
					margin-right: 57rpx;
					display: flex;
					align-items: center;

					:first-child {
						margin-right: 43rpx;
					}

					image {
						width: 42rpx;
						height: 42rpx;
					}
				}
			}
		}

		.content-box {
			.top {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 30rpx;

				view {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 84rpx;
					height: 84rpx;
					border-radius: 50%;
					background-color: #ffffff;
					padding: 5rpx;
					margin-right: 40rpx;

					image {
						width: 80%;
						height: 80%;
						z-index: 1;
					}
				}

				.active {
					background-color: #354e44;
				}

			}

			.bottom {
				margin-top: 46rpx;

				.item {
					width: 674rpx;
					height: 482rpx;
					background-color: #ffffff;
					border-radius: 24rpx;
					box-shadow: 0 12rpx 16rpx 0 rgba(83, 66, 49, 0.03);
					margin-bottom: 56rpx;
				}

				.item-top {
					position: relative;
					width: 100%;
					height: 382rpx;

					image {
						width: 100%;
						height: 100%;
					}

					.names {
						font-size: 48rpx;
						color: #FFFFFF;
						letter-spacing: 3.43rpx;
						position: absolute;
						bottom: 71rpx;
						left: 20rpx;
					}

					.eng {
						font-size: 30rpx;
						color: #FFFFFF;
						letter-spacing: 2.14rpx;
						position: absolute;
						bottom: 24rpx;
						left: 20rpx;
					}
				}

				.item-bottom {
					height: calc(100% - 382rpx);
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						display: flex;
						margin-left: 54rpx;

						image {
							width: 43.7rpx;
							height: 28rpx;
						}

						.see {
							font-size: 26rpx;
							color: #3E3E3E;
							letter-spacing: 1.86rpx;
							margin-left: 17rpx;
							transform: translateY(-5rpx);
						}
					}

					.right {
						margin-right: 57rpx;
						display: flex;

						:first-child {
							margin-right: 43rpx;
						}

						image {
							width: 42rpx;
							height: 42rpx;
						}
					}
				}
			}

		}
	}
</style>
