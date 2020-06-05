// pages/user/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		col_num: 0,
		userInfo: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function (options) {
		const userInfo = wx.getStorageSync('userInfo')
		const collectArr = wx.getStorageSync('collectArr')

		this.setData({ userInfo, col_num: collectArr.length })
	}
})
