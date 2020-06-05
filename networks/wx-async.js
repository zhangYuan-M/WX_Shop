export const wxLogin = () => {
	return new Promise((res, rej) => {
		wx.login({
			timeout: 10000,
			success: result => {
				res(result)
			},
			fail: err => {
				rej(err)
			},
			complete: () => {}
		})
	})
}
/**
 * @param {object} 微信支付必要的参数
 */
export const wxPay = () => {
	return new Promise((res, rej) => {
		wx.requestPayment({
			timeStamp: '',
			nonceStr: '',
			package: '',
			signType: '',
			paySign: '',
			success: result => {
				res(result)
			},
			fail: err => {
				rej(err)
			},
			complete: () => {}
		})
	})
}
/**
 * @param {object} 微信支付必要的参数
 */
export const wxToast = obj => {
	return new Promise((res, rej) => {
		wx.showToast({
			...obj,
			success: result => {
				res(result)
			},
			fail: err => {
				rej(err)
			},
			complete: () => {}
		})
	})
}
