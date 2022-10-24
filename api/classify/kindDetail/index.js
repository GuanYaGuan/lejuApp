import request from "@/api/index.js"

function findProductList(start,limit,data) {
	return request({
		url: `/lejuClient/product/findProductList/${start}/${limit}`,
		method: 'post',
		data
	})
}
export {
	findProductList
}
