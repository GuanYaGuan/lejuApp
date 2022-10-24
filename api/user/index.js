import request from "@/api/index.js"

// 上传头像
function uploadAvatar(data) {
	return request({
		url: '/lejuClient/login/uploadAvatar',
		method:'post',
		data
	})
}

export {
	uploadAvatar
}
