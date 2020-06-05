// pages/login/index.js
Page({
	getUserInfo(e) {
		wx.setStorageSync('userInfo', e.detail)
		wx.navigateBack({
			delta: 1
		})
	}
})
