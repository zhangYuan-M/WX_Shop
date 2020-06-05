// pages/cart/index.js
Page({
	data: {
		cart: [] //原数组
	},

	onLoad: function (options) {},
	onShow: function (e) {
		// 获取缓存的购物车数据
		const cart = wx.getStorageSync('collectArr') || []
		this.setData({ cart })
	},

	checkChange(e) {
		const id = e.currentTarget.dataset.id
		let collectArr = wx.getStorageSync('collectArr')
		const index = collectArr.findIndex(item => item.goods_id === id)
		collectArr.splice(index, 1)
		this.setData({ cart: collectArr })
		wx.setStorageSync('collectArr', collectArr)
	},
	shopClick(e) {
		const id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: `/pages/goods_detail/index?goods_id=${id}`
		})
	}
})
