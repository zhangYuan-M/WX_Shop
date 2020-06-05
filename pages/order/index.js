// pages/order/index.js
import { request } from '../../networks/index'
Page({
	data: {
		tabs: [
			{
				id: 0,
				name: '全部'
			},
			{
				id: 1,
				name: '待付款'
			},
			{
				id: 2,
				name: '待发货'
			},
			{
				id: 3,
				name: '退款'
			}
		],
		index: 0,
		type: 0
	},
	itemClick(e) {
		this.setData({ index: e.detail })
	},

	// 小程序的页面栈最多是10个
	onLoad: function (options) {
		this.setData({
			type: options.type
		})
	},

	onShow: function (options) {
		const token = wx.getStorageSync('token')
		if (!token) {
			wx.navigateTo({
				url: '/pages/auth/index'
			})
			wx.navigateBack({
				delta: 1
			})
			return
		}

		let pages = getCurrentPages()
		let currentPage = pages[pages.length - 1]
		// 页面参数 type
		let type = currentPage.options.type
		this.getOrderData()
	},
	async getOrderData(type) {
		const res = await request({ url: 'my/orders/all', data: { type } })
		// 无效的token
		console.log(res)
	}
})
