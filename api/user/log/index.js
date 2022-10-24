import request from "@/api/index.js"

// 用户登录 接口 返回一个 token
function doLogin(data) {
	return request({
		url: '/lejuClient/login/doLogin',
		method:'post',
		data
	})
}
// 获取用户信息 接口
function getMemberInfo(){
	return request({
		url:'/lejuClient/login/getMemberInfo'
	})
}
export {
	doLogin,
	getMemberInfo
}
