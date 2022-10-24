import request from "@/api/index.js"

// 更新 用户信息
function updateMemberInfo(data) {
	return request({
		url: '/lejuClient/member/updateMemberInfo',
		method:'post',
		data
	})
}

export {
	updateMemberInfo
}
