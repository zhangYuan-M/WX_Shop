// pages/cart/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isCheckeAll: false, //全选
		totalPrice: 0,
		totalNumber: 0,
		addressInfo: {}, // 地址数据
		cart: [] //原数组
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},
	onShow: function (e) {
		// 获取缓存的购物车数据
		const cart = wx.getStorageSync('cart') || []
		this.setData({ cart })
		// 根据购物车的数据计算
		this.handleCartChange(cart)
	},
	/**
	 * 函数
	 */
	// 添加收货地址按钮
	btnClick() {
		// 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
		// result.authSetting
		wx.getSetting({
			success: result => {
				// result 包含用户给予的权限
				const scopeAddress = result.authSetting['scope.address']
				// 1.用户没有点过，或者用户点过确定给予权限
				if (scopeAddress === true || typeof scopeAddress === 'undefined') {
					wx.chooseAddress({
						success: result1 => {
							wx.setStorage({
								key: 'address',
								data: result1
							})
							this.setData({
								addressInfo: result1
							})
						}
					})
				}
				// 2. 用户拒绝过授予权限(二次给予权限)
				else {
					wx.openSetting({
						success: result => {
							wx.chooseAddress({
								success: result1 => {
									wx.setStorage({
										key: 'address',
										data: result1
									})
									this.setData({
										addressInfo: result1
									})
								}
							})
						}
					})
				}
			},
			fail: () => {},
			complete: () => {}
		})
	},
	// 复选框改变
	checkChange(e) {
		const goods_id = e.currentTarget.dataset.id
		// 获取缓存的购物车数据
		let cart = wx.getStorageSync('cart') || []
		const index = cart.findIndex(item => item.goods_id === goods_id)
		// 选择状态取反
		console.log(cart[index].isChecked)
		cart[index].isChecked = !cart[index].isChecked
		// 根据购物车的数据计算
		console.log(cart[index].isChecked)
		this.handleCartChange(cart)
	},
	// 根据购物车的数据计算
	handleCartChange(cart) {
		//  商品的全选状态，假如是空数组，every方法返回值就是true
		const isCheckeAll = cart.length ? cart.every(item => item.isChecked) : false
		// 商品的总数量
		const totalNumber = cart
			.filter(item => item.isChecked)
			.reduce((total, currentValue) => total + currentValue.goods_number, 0)
		// 商品的价格
		let totalPrice = cart
			.filter(item => item.isChecked)
			.reduce((total, currentValue) => total + currentValue.goods_price * currentValue.goods_number, 0)
		this.setData({ isCheckeAll, totalPrice, totalNumber })
		// 重新设置缓存
		wx.setStorage({
			key: 'cart',
			data: cart
		})
		this.setData({ cart })
	},
	// 添加一个或者减少一个数量
	changeNum(e) {
		const num = e.currentTarget.dataset.num
		const goods_id = e.currentTarget.dataset.id
		// 获取缓存的购物车数据
		let cart = wx.getStorageSync('cart') || []
		// 获取索引
		const index = cart.findIndex(item => item.goods_id === goods_id)

		// 判断是否删除该商品
		if (cart[index].goods_number <= 1) {
			wx.showModal({
				title: '提示',
				content: '是否删除该商品',
				success: result => {
					if (result.confirm) {
						// 删除
						cart.splice(index, 1)
						this.handleCartChange(cart)
					} else {
						console.log('不删除')
					}
				}
			})
		}
		// 重置数量
		else {
			cart[index].goods_number = cart[index].goods_number + num
			this.handleCartChange(cart)
		}
	},
	// 全选按钮
	allCheckChange(e) {
		// 全选按钮的状态
		const state = !!e.detail.value.length
		// console.log(e)
		let cart = this.data.cart
		cart = cart.map(item => {
			return { ...item, isChecked: state }
		})
		this.handleCartChange(cart)
	},
	// 点击结算
	handlePay() {
		console.log()
		if (!this.data.addressInfo.userName) {
			wx.showToast({
				title: '您还没选收货地址',
				image: '',
				duration: 1500,
				mask: false,
				success: result => {},
				fail: () => {},
				complete: () => {}
			})
			return
		} else if (!this.data.totalNumber) {
			wx.showToast({
				title: '您还没选购商品',
				image: '',
				duration: 1500,
				mask: false,
				success: result => {},
				fail: () => {},
				complete: () => {}
			})
			return
		} else {
			wx.navigateTo({
				url: '/pages/pay/index'
			})
		}
	}
})
