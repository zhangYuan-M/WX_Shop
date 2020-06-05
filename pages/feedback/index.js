// pages/feedback/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [
			{
				id: 0,
				name: '体验问题'
			},
			{
				id: 1,
				name: '商品/商家投诉'
			}
		],
		imgArr: [],
		texVal: ''
	},
	btnClick() {
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: result => {
				console.log(result)
				this.setData({
					// 图片数组进行拼接
					imgArr: [...this.data.imgArr, ...result.tempFilePaths]
				})
			},
			fail: () => {},
			complete: () => {}
		})
	},
	imgClick(e) {
		const { index } = e.currentTarget.dataset
		console.log(index)
		let imgArr = this.data.imgArr
		imgArr.splice(index, 1)
		this.setData({
			imgArr
		})
	},
	handleInput(e) {
		this.setData({
			texVal: e.detail.value
		})
	},
	formSubmitBtn() {
		const { texVal, imgArr } = this.data
		if (!texVal.trim()) {
			wx.showToast({
				title: '输入不合法'
			})
			return
		}
		imgArr.forEach(item => {
			// 上传图片到服务费，只能上传一次一张
			var upTask = wx.uploadFile({
				url: 'https://images.ac.cn/Home/Index/UploadAction/',
				filePath: item,
				name: 'file',
				formData: {},
				success: result => {
					console.log(result)
				},
				fail: () => {},
				complete: () => {}
			})
		})
	}
})
