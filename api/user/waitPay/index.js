import request from "@/api/index.js"

// 获取 订单列表
function findAllOrders() {
	return request({
		url: '/lejuClient/order/findAllOrders'
	})
}
// 退单
function orderReturnApplys() {
	return request({
		url: '/lejuClient/orderReturn/orderReturnApplys'
	})
}
// 取消订单
function cancelOrder(id) {
	return request({
		url: `/lejuClient/order/cancelOrder/${id}`,
		method:"post"
	})
}
// 确认收货
function receiveDone(data) {
	return request({
		url: `/lejuClient/order/receiveDone`,
		method:"post",
		data
	})
}
// 删除 订单
function deleteOrder(orderId) {
	return request({
		url: `/lejuClient/order/deleteOrder/${orderId}`,
		method:"delete"
	})
}
// 查看 退单明细页面
function orderReturn(id) {
	return request({
		url: `/lejuClient/orderReturn/${id}`
	})
}
// 申请退单页面
function addOrderReturnApply(data) {
	return request({
		url: `/lejuClient/orderReturn/addOrderReturnApply`,
		method:"post",
		data
	})
}
// 获取 退单公司 地址
function getCompanyAddrss() {
	return request({
		url: `/lejuClient/orderReturn/getCompanyAddrss`
	})
}
export {
	findAllOrders,
	orderReturnApplys,
	cancelOrder,
	receiveDone,
	deleteOrder,
	orderReturn,
	addOrderReturnApply,
	getCompanyAddrss
}
