export const request = params => {
	let index = 0
	// 显示加载中的效果
	wx.showLoading({
		title: '加载中'
	})
	index++

	// 判断URL是否是私密的路径
	let header = { ...params.header }
	if (params.url.includes('my/')) {
		header['Authorization'] = wx.getStorageSync('token')
	}

	// 定义公共UR
	const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1/'
	return new Promise((res, rej) => {
		wx.request({
			...params,
			header,
			url: baseURL + params.url,
			success: result => {
				res(result)
			},
			fail: reject => {
				rej(reject)
			},
			complete: () => {
				index--
				if (index === 0) wx.hideLoading()
			}
		})
	})
}
