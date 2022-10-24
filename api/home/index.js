import request from "@/api/index.js"

// 查询轮播广告
// function bannerAds(){
// 	return request({
// 		url:"/lejuClient/home/bannerAds"
// 	})
// }
// 分类列表
function categorys(id) {
	return request({
		url: `/lejuClient/home/categorys/${id}`
	})
}
// 限时活动 列表

function recommendList() {
	return request({
		url:'/lejuClient/home/recommendList'
	})
}
// 推荐 新品 列表接口 即 品牌
function lejuLatestProducts(){
	return request({
		url:'/lejuClient/home/lejuLatestProducts'
	})
}
// 推荐 最热 列表
function hotList(){
	return request({
		url:'/lejuClient/home/hotList'
	})
}
export {
	// bannerAds,
	categorys,
	recommendList,
	lejuLatestProducts,
	hotList
}
