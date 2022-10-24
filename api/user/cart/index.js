import request from "@/api/index.js"

// 获取购物车 列表
function findAllCartItem() {
	return request({
		url: '/lejuClient/cart/findAllCartItem'
	})
}
// 删除 购物车
function delCartItems(data){
	return request({
		url:'/lejuClient/cart/delCartItems',
		method:'post',
		data
	})
}
export {
	findAllCartItem,
	delCartItems
}
