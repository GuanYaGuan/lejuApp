import request from "@/api/index.js"

function findCategory(id){
	return request({
		url:`/lejuClient/productCategory/findCategory/${id}`
	})
}

export {
	findCategory
}