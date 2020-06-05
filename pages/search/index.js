// pages/search/index.js
import { request } from '../../networks/index'
Page({
	data: {
		isShowCancle: false,
		errCode: '\u2718',
		data: []
	},
	timer: 1,
	//输入框改变
	inputChange(e) {
		const { value } = e.detail
		if (!value.trim()) {
			return
		}
		clearInterval(this.timer)
		this.timer = setTimeout(() => {
			this.getShopData(value)
			this.setData({
				isShowCancle: true
			})
		}, 1000)
	},
	async getShopData(query) {
		const res = await request({ url: 'goods/qsearch', data: { query } })
		this.setData({
			data: res.data.message
		})
	},
	cancleClick() {
		console.log(123)
		this.setData({
			isShowCancle: false,
			data: []
		})
	}
})
