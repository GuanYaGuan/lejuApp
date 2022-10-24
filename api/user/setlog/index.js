import request from "@/api/index.js"

// 用户注册
function register(data) {
	return request({
		url: '/lejuClient/member/register',
		method:'post',
		data
	})
}

export {
	register
}
