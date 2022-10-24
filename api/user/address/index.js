import request from "@/api/index.js"

// 获取 地址列表
function findAllAddress() {
	return request({
		url: '/lejuClient/address/findAllAddress'
	})
}
// 添加 地址
function addAddressInfo(data){
	return request({
		url:'/lejuClient/address/addAddressInfo',
		method:'post',
		data
	})
}
// 删除地址
function delAddressInfo(id){
	return request({
		url:`/lejuClient/address/delAddressInfo/${id}`,
		method:'delete'
	})
}
// 更新地址
function updateAddressInfo(data){
	return request({
		url:"/lejuClient/address/updateAddressInfo",
		method:"post",
		data
	})
}
export {
	findAllAddress,
	addAddressInfo,
	delAddressInfo,
	updateAddressInfo
}
