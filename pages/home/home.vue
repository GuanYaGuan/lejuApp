<template>
	<view class="content">
		<!-- 轮播 有图片 已写死 -->
		<view class="nav-icon">
			<swiper :current="currentIndex" :style="swiperHe" indicator-active-color="#ffffff" :indicator-dots="true"
				:interval="3000">
				<swiper-item @touchmove.stop="">
					<image class="banner-a" src="/static/home/banner1.png" mode=""></image>
				</swiper-item>
				<swiper-item @touchmove.stop="">
					<image class="banner-b" src="/static/home/banner2.png" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="nav-box">
				<image class="chect" src="/static/home/cheat.png" mode=""></image>
				<view class="center">
					<view :class="ishsow?'active':''" @tap="targetIsshow">

						<view class="title">
							推荐
						</view>
					</view>
					<view :class="ishsow?'':'active'" @tap="targetIsshow">

						<view class="title">
							品牌
						</view>
					</view>
				</view>
				<view class="right">
					<image @tap="targetSearch" class="icons-right" src="../../static/icons/search.png" mode="">
					</image>
					<image class="icons-right" src="../../static/home/cart-white.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 切割家具系列的展示 -->
		<view class="content-a" v-if="ishsow">
			<!-- 纵向轮播 -->
			<view class="vertical-swiper">
				<view class="left">
					<image
						src="data:image/png;base64,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"
						mode=""></image>
					<h4>限时活动:</h4>
				</view>
				<view class="right">
					<swiper style="height: 100%;" circular="true" vertical="true" :autoplay="true" :interval="3000"
						:duration="1000">
						<swiper-item v-for="(item,index) in verBannerData" :key="index">
							<view class="swiper-item">
								<view class="left">
									{{item.brandName}}
								</view>
								<view class="right">
									<s>{{item.price}}</s>
									现价:{{item.promotionPrice}}元
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 品类 -->
			<view class="kind">
				<view class="top">
					<view class="left">
						品类推荐
					</view>
					<div class="right">
						更多
						<image src="/static/user/arr-r-1.png" mode=""></image>
					</div>
				</view>
				<view class="content">

					<view class="bottom">
						<view class="item"  @tap="openDetail(item.id)"  v-for="item in categorysData.children" :key="item.id">
							<image :src="item.icon" mode=""></image>
							<view class="desc-a">
								{{item.keywords}}
							</view>
							<view class="desc-b">
								by common
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 特色优选 -->
			<view class="featured">
				<view class="top">
					<view class="left">
						特色优选
					</view>
					<div class="right">
						更多
						<image src="/static/user/arr-r-1.png" mode=""></image>
					</div>
				</view>
				<view class="content">

					<swiper class="bottom" circular="true" previous-margin="100rpx" next-margin="100rpx">
						<swiper-item class="item" v-for="(item,index) in 3" :key="index">
							<view class="info-box">
								<view class="info">

									<view class="title">
										极简现代吊灯
									</view>
									<view class="eng">
										by Adrianne Ho
									</view>
									<view class="circle">
										<view class="a">

										</view>
										<view style="margin: 0 8rpx;" class="a">

										</view>
										<view class="a">

										</view>
									</view>
									<view class="desc">
										切割平整圆滑，运用漫反…
									</view>
								</view>
							</view>
							<image src="/static/home/jian.png" mode=""></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 品牌 -->
		<view class="content-b" v-else>
			<view class="top">
				<h4>热门推荐</h4>
				<view class="item">
					<swiper next-margin="20rpx" :autoplay="true" :interval="3000" :duration="1000" display-multiple-items="3"
						circular="true" style="margin: 40rpx 0;">
						<swiper-item v-for="item in hotListData" :key="item.id">
							<image @tap="targetDetail(item.id)" style="width: 228rpx; height: 194rpx; margin: 0 20rpx;" :src="item.pic" mode=""></image>
							<h4 class="name">{{item.brandName}}</h4>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="bottom">
				<h4>猜你喜欢</h4>
				<view class="item-list">
					<view @tap="targetDetail(item.id)" class="item" v-for="item in LatestProductsData" :key="item.id">
						<image :src="item.pic" mode=""></image>
						<view class="name">
							{{item.name}}
						</view>
						<view class="next-box">
							<view class="price">
								￥{{item.price}}元
							</view>
							<view class="kind">
								{{item.productCategoryName}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		// bannerAds,
		categorys,
		recommendList,
		lejuLatestProducts,
		hotList
	} from "@/api/home/index"
	export default {
		data() {
			return {
				// bannerAdsData: [],
				ishsow: true,
				currentIndex: 0,
				swiperHe: 'height:480rpx;',
				categorysData: [],
				verBannerData: [],
				LatestProductsData: [],
				hotListData: []
			}
		},
		onLoad(options) {
			// 请求 轮播广告数据
			// bannerAds()
			// .then(res=>{
			// 	console.log(res);
			// })
			// 请求分类数据
			categorys("1308336521604599809")
				.then(res => {
					// console.log(res);
					this.categorysData = res.data.category
				})
			// 请求 的限时活动 纵向轮播数据
			recommendList()
				.then(res => {
					// console.log(res.data.items);
					this.verBannerData = res.data.items
				})


		},
		methods: {
			// 点击 改变 isshow
			targetIsshow() {
				this.ishsow = !this.ishsow
				if (this.currentIndex == 0) {
					this.currentIndex = 1,
						this.swiperHe = 'height:250rpx;',
						// 点击 跳转时 请求 品牌 接口数据
						this.initLejuLatestProducts(),
						this.initHotList()
				} else {
					this.currentIndex = 0,
						this.swiperHe = 'height:480rpx;'
				}
			},
			// 禁止 用户 滑动 swiper  在 swiper-item 上添加 @touchmove.stop="" 即可
			// 封装 品牌 列表数据 请求
			initLejuLatestProducts() {
				lejuLatestProducts()
					.then(res => {
						// console.log(res);
						this.LatestProductsData = res.data.productList
					})
			},
			// 封装 请求 热门 商品的 接口
			initHotList() {
				hotList()
					.then(res => {
						// console.log(res);
						this.hotListData = res.data.items
					})
			},
			// 点击 打 开 商品详情页面
			targetDetail(id){
				uni.navigateTo({
					url:`/pages/home/productDetail/productDetail?id=${id}`
				})
			},
			// 点击 跳转至 分类详情
			openDetail(id) {
				uni.navigateTo({
					url:`/pages/classify/kindDetail/kindDetail?id=${id}`
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

		// 轮播 分类
		.nav-icon {
			.banner-a {
				width: 100%;
				border-radius: 0 0 30px 30px;
			}

			.banner-b {
				transform: translateY(-240rpx);
				width: 100%;
			}

			.nav-box {
				position: fixed;
				top: 0;
				width: 100%;
				margin-top: 60rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.chect {
					width: 42rpx;
					height: 42rpx;
					margin-left: 30rpx;

				}

				.center {
					width: 30%;
					height: 70rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					letter-spacing: 2.29rpx;
					transform: translateX(25rpx);

					view {
						height: 60rpx;
						transition: linear;
						transition-duration: 1000;

						.title {
							width: 70rpx;
							height: 40rpx;
							margin-right: 0;
						}
					}

					:first-child {
						margin-right: 33rpx;
					}

					.active {
						border-bottom: 6rpx solid #FFFFFF;
					}

				}

				.right {
					:first-child {

						margin-right: 36rpx;
					}

					:last-child {
						margin-right: 30rpx;
					}

					.icons-right {
						width: 36rpx;
						height: 36rpx;
						
					}
				}
			}
		}

		// 纵向图

		.vertical-swiper {
			width: 80%;
			height: 80rpx;
			background-color: #FFFFFF;
			margin: 0 auto;
			display: flex;

			.left {
				width: 35%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				@keyframes actions {
					0% {
						opacity: 0;
					}

					50% {
						opacity: 0.5;
					}

					100% {
						opacity: 1;
					}
				}

				image {
					animation-name: actions;
					animation-iteration-count: infinite;
					animation-duration: 700ms;
					width: 60rpx;
					height: 60rpx;
				}

				h4 {
					color: orange;
					margin-left: 5rpx;
				}
			}

			.right {
				width: 65%;
				height: 100%;

				.swiper-item {
					width: 100%;
					display: flex;
					height: 100%;

					.left {
						display: flex;
						justify-content: flex-start;
						width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.right {
						width: 50%;
						height: 100%;
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						align-items: center;

						s {
							display: flex;
							justify-content: center;
							width: 100%;
						}
					}
				}
			}
		}

		// 品类推荐
		.kind {
			margin-top: 40rpx;

			.top {
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 32rpx;
					color: #3E3E3E;
					letter-spacing: 2.29rpx;
					margin-left: 40rpx;
				}

				.right {
					font-size: 26rpx;
					color: #8C8C8C;
					letter-spacing: 1.86rpx;
					margin-right: 39.3rpx;

					image {
						width: 11.4rpx;
						height: 18rpx;
					}
				}
			}

			.content {
				width: 100%;
				height: 320rpx;
				overflow: auto;

				.bottom {
					width: 130%;
					margin-top: 39rpx;
					display: flex;
					justify-content: space-around;

					.item {
						width: 208rpx;
						height: 140rpx;
						background-color: #FFFFFF;
						box-shadow: 0 8rpx 24rpx 0 rgba(122, 98, 75, 0.06);
						border-radius: 20rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						align-items: flex-start;

						image {
							margin-top: 42rpx;
							width: 144rpx;
							height: 124rpx;
						}

						.desc-a {
							margin-top: 44rpx;
							font-size: 26rpx;
							color: #3E3E3E;
							letter-spacing: 1.86rpx;
						}

						.desc-b {
							font-size: 20rpx;
							color: #B0B0B0;
							letter-spacing: 1.43rpx;
						}
					}
				}
			}
		}

		// 优选

		.featured {
			margin-top: 46rpx;

			.top {
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 32rpx;
					color: #3E3E3E;
					letter-spacing: 2.29rpx;
					margin-left: 40rpx;
				}

				.right {
					font-size: 26rpx;
					color: #8C8C8C;
					letter-spacing: 1.86rpx;
					margin-right: 39.3rpx;

					image {
						width: 11.4rpx;
						height: 18rpx;
					}
				}
			}

			.content {
				width: 100%;
				height: 320rpx;
				margin-top: 103rpx;

				.bottom {
					display: flex;


					.item {
						position: relative;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding-right: 40rpx;

						.info-box {
							width: 590rpx;
							height: 260rpx;
							background-color: #FFFFFF;
							box-shadow: 0 16rpx 48rpx 0 rgba(122, 98, 75, 0.12);
							border-radius: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;

							.info {
								transform: translateX(42%);

								.title {
									font-size: 26rpx;
									color: #3E3E3E;
									letter-spacing: 1.86rpx;
								}

								.eng {
									font-size: 18rpx;
									color: #B0B0B0;
									letter-spacing: 1.29rpx;
								}

								.circle {
									display: flex;
									margin-top: 19rpx;

									:nth-child(1) {
										background: #446675;

									}

									:nth-child(2) {
										background: #6A4826;

									}

									:nth-child(3) {
										background: #E7D8BB;

									}

									.a {
										width: 20rpx;
										height: 20rpx;
										border-radius: 50%;
									}
								}

								.desc {
									font-size: 22rpx;
									color: #3E3E3E;
									letter-spacing: 1.57rpx;
									margin-top: 28rpx;
								}
							}
						}

						image {
							width: 194rpx;
							height: 280rpx;
							margin-left: 44rpx;
							position: absolute;
							bottom: 34rpx;
						}

					}
				}
			}
		}

		.content-b {
			.top{
				h4{
					margin-left: 40rpx;
				}
				.item{
					.name{
						width: 180rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-left: 20rpx;
						margin-top: 20rpx;
						margin-bottom: 20rpx;
					}
				}
			}
			.bottom {

				h4 {
					margin-left: 40rpx;
				}

				.item-list {
					width: 100%;
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;
					margin-top: 60rpx;

					.item {
						width: 45%;
						height: 400rpx;
						background-color: #FFFFFF;
						margin-bottom: 40rpx;

						image {
							width: 100%;
							height: 60%;
						}

						.name {
							width: 60%;
							color: #3e3e3e;
							line-height: 30rpx;
							margin-top: 50rpx;
							margin-left: 20rpx;
							font-weight: 700;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.next-box {
							margin-top: 20rpx;
							display: flex;
							margin-left: 20rpx;
							margin-right: 20rpx;
							font-size: 13rpx;
							align-items: center;
							justify-content: space-between;

							.price {}

							.kind {
								margin-top: 0;
							}
						}
					}
				}
			}
		}
	}
</style>
