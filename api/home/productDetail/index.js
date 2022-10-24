import request from '@/api/index.js'

// 商品详情接口
function productDetail(productId){
	return request({
		url:`/lejuClient/product/productDetail/${productId}`
	})
}
// 添加 购物车 按钮
function addCart(data){
	return request({
		url:`/lejuClient/cart/addCart`,
		method:'post',
		data
	})
}
// 点击 提交订单
function addPreOrder(data){
	return request({
		url:`/lejuClient/order/addPreOrder`,
		method:'post',
		data
		
	})
}
export{
	productDetail,
	addCart,
	addPreOrder
}