<template>
	<view class="content">
		<!-- <view class="nav-box">
			<image @tap="returnLast" src="/static/home/arrow-left.png" mode=""></image>
			<view class="title">
				乐居
			</view>
		</view> -->
		<view class="nav-tabbar">
			<view class="item" v-for="(item,index) in tabbarList" :key="index">
				<div :class="current==index?'active':''" @tap="changeClass(index)">{{item.name}}</div>
				<view class="arrow-and" v-if="index==1||index==2">
					<uni-icons class="top" type="top" :color="item.isCurrentIdx=='up'?'#dd524d':''"></uni-icons>
					<uni-icons class="bottom" type="bottom" :color="item.isCurrentIdx=='down'?'#dd524d':''"></uni-icons>
				</view>
			</view>
		</view>
		<view class="product-box">
			<view @tap="openDetail(item.id)" class="item" v-for="item in ProductListData" :key="item.id">
				<image :src="item.pic" mode=""></image>
				<p class="name">{{item.name}}</p>
				<view class="bottom">
					<div class="left">￥{{item.price}}元</div>
					<div class="right">{{item.brandName}}</div>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		findProductList
	} from "@/api/classify/kindDetail/index.js"
	export default {
		data() {
			return {
				ProductListData: [],
				current: 0,
				tabbarList: [{
						name: '新品'
					},
					{
						name: '销量',
						isCurrentIdx: 'default'
					},
					{
						name: '价格',
						isCurrentIdx: 'default'
					},
					{
						name: '筛选'
					}
				],
				start: 1,
				limit: 6,
				sort: '',
				desc: '',
				id: '',
				total: ''
			}
		},
		onLoad(options) {
			// console.log(options.id);
			// 因为 将请求封装在 methods 中了 无法直接获取传递的参数 optons.id 所以先保存
			this.id = options.id
			this.init()
		},
		// 监听 上拉触底
		onReachBottom() {
			this.start++
			if (this.ProductListData.length >= this.total) {
				return
			}
			this.init()
		},
		// 首先须在pages.jspn中开启本页面的下拉刷新,监听用户下拉 刷新
		onPullDownRefresh() {
			this.ProductListData = []
			this.start = 1
			this.init()
		},
		methods: {
			// 多次使用请求 封装

			init() {
				findProductList(this.start, this.limit, {
						categoryId: this.id,
						isDesc: this.desc,
						sortBy: this.sort,
					})
					.then(res => {
						// console.log(res);
						this.ProductListData.push(...res.data.rows)
						this.total = res.data.total
						// 数据 相应之后  关闭 下拉刷新
						uni.stopPullDownRefresh()
					})
			},
			// 点击 返回上一级页面
			// returnLast() {
			// 	uni.navigateBack({
			// 		url: "pages/classify/classify"
			// 	})
			// },
			changeClass(val) {
				// 点谁 给谁添加上 类名
				this.current = val
				// 因为是 使用 .push 的方法 所以 点击 另一个  导航栏时 需要 清空 数据 和 初始 start 不然  ProductListData 数据 会在 上一个导航兰的数据基础上继续增加 push, 而 start 会 继续 ++ 超出请求范围
				this.ProductListData = []
				this.start = 1
				// 点击 导航之前 先将 为点击选中 的 初始化 默认 default 不然 修改过的 点击下一个之后 这个之前被修改过的不会还原
				this.tabbarList.forEach((ele, idx) => {
					if (val != idx) {
						ele.isCurrentIdx = 'default'
					}
				})
				// 这里 价格 销量 后的 图标颜色状态的控制 类比导航栏的   不同之处 在于 图标的状态控制 定义在 data 的tabbar 数据当中
				if (this.tabbarList[val].isCurrentIdx == 'default') {
					this.tabbarList[val].isCurrentIdx = 'up'
					this.desc = 1
				} else if (this.tabbarList[val].isCurrentIdx == 'up') {
					this.tabbarList[val].isCurrentIdx = 'down'
					this.desc = 0
				} else {
					this.tabbarList[val].isCurrentIdx = 'up'
					this.desc = 1
				}
				// 这里是当点击 销量或者价格 的时候 请求的接口中会 传递 不同的参数
				if (val == '1') {
					this.sort = 'sale'
				} else if (val == '2') {
					this.sort = 'price'
				} else {
					// 除以上这两种情况外 需要恢复默认 不传递参数
					this.desc = ''
					this.sort = ''
				}
				this.init()
			},
			// 点击 打开 商品详情页面
			openDetail(id) {
				uni.navigateTo({
					url: `/pages/home/productDetail/productDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F1ECE7;
	}

	.content {
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
				margin-right: 25%;
				color: #FFFFFF;
			}
		}

		.nav-tabbar {
			width: 100%;
			height: 60rpx;
			background-color: #354e44;
			margin-top: 5rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 40rpx;

			.item {
				display: flex;
				justify-content: center;
				align-items: center;

				.active {
					color: #dd524d;
				}

				.arrow-and {
					margin-left: 10rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					justify-content: center;
					width: 24rpx;

					.top {
						transform: translateY(2rpx);
					}

					.bottom {
						transform: translateY(-2rpx);
					}

					// 条件 编译 下面这个是 除了 H5 平台下面代码在其它平台均存在
					// #ifndef H5
					.top {
						transform: translateY(8rpx);
					}

					.bottom {
						transform: translateY(-8rpx);
					}

					// #endif
				}
			}
		}

		.product-box {
			margin-top: 20rpx;
			width: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			display: flex;

			.item {
				width: 47%;
				background-color: #FFFFFF;
				
				padding-bottom: 40rpx;
				margin: 10rpx;

				image {
					width: 100%;
					height: 260rpx;
				}

				.name {
					width: 80%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin: 20rpx 20rpx;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						margin-left: 20rpx;
					}

					.right {
						width: 60rpx;
						overflow: hidden;
						text-overflow: none;
						white-space: nowrap;
						margin-right: 20rpx;
					}

				}
			}

			::after {
				content: "";
				flex: auto;
			}
		}

	}
</style>
