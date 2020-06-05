// pages/auth/index.js
import { wxLogin, wxPay } from '../../networks/wx-async'
import { request } from '../../networks/index.js'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {},
	// 点击授权按钮
	async getuserinfo(e) {
		// 1 获取用户信息
		try {
			const { encryptedData, rawData, iv, signature } = e.detail
			// 2 获取小程序登录后的code
			const { code } = await wxLogin()
			// 发送1请求
			const loginData = { encryptedData, rawData, iv, signature, code }
			const res = await request({ url: 'users/wxlogin', data: loginData, method: 'post' })
			console.log(res)
			// 不是企业级别的app ... 模拟实现
			let token = 'edsefsdfwe098wef7sdf7sdfd72'
			wx.setStorageSync('token', token)
			wx.navigateBack({
				delta: 1
			})
		} catch (e) {
			console.log(e)
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
})
