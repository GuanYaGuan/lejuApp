import baseUrl from "@/api/baseurl.js"

var fun = function(config) {
	return new Promise((resolve, rejected) => {
		uni.request({
			// url: `http://bufantec.com/api/douban/movie/top250?start=1&limit=5`,
			//  url: config.url,
			header: {
				token: uni.getStorageSync("leju-token")
			},
			//  timeout: 5000,
			//  // 小程序中 不管请求类型是get还是post等 传递的参数都是写在data当中
			//  data: config.data,
			//  method: config.method,
			...config,
			url: baseUrl + config.url,
			success(res) {
				if (res.data.success) {
					resolve(res.data)
				}else{
					if(res.data.code==20002){
						uni.showToast({
							title:"登陆已过期,2s之后请重新登录",
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/user/log/log'
							})
						},1000)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				}
			},
			fail(res) {
				rejected(res)
			}
		})
	})
}


export default fun
