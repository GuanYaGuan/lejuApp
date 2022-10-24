export default {
	data() {
		return {

		}
	},
	methods: {
		isLogin() {
			var token = uni.getStorageSync("leju-token");
			if (!token) {
				uni.showModal({
					title: "登录提示",
					content: '暂未登录，是否跳转到登录界面',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/user/log/log"
							})
						}
					}
				})
				return false
			} else {
				return true
			}
		}
	}
}
