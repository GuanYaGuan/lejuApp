import request from "@/api/index.js"

// 根据 orderId 获取 订单明细
function getPreOrderById(id) {
	return request({
		url: `/lejuClient/order/getPreOrderById/${id}`
	})
}
// 提交确认订单 传如 address 等等
function addConfirmOrder(data) {
	return request({
		url: `/lejuClient/order/addConfirmOrder`,
		method: "post",
		data
	})
}
// 确认付款
function payConfirm(data) {
	return request({
		url: `/lejuClient/order/payConfirm`,
		method: "post",
		data
	})
}
export {
	getPreOrderById,
	addConfirmOrder,
	payConfirm
}
