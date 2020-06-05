import { request } from '../../networks/index.js'
import { wxPay, wxToast } from '../../networks/wx-async'

// pages/cart/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		totalPrice: 0,
		totalNumber: 0,
		addressInfo: {}, // 地址数据
		cart: [] //原数组
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (e) {
		// 获取缓存的购物车数据
		const cart = wx.getStorageSync('cart') || []
		// 获取缓存的地址信息
		const address = wx.getStorageSync('address') || {}
		this.setData({ cart, addressInfo: address })
		// 根据购物车的数据计算
		this.handleCartChange(cart)
	},
	/**
	 * 函数
	 */
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

	// 点击支付
	async handlePay() {
		// 缓存中有没有token
		const token = wx.getStorageSync('token')
		if (!token) {
			wx.navigateTo({
				url: '/pages/auth/index'
			})
			return
		}
		// 创建订单
		// const header = { Authorization: token }
		const order_price = this.data.totalPrice
		const consignee_addr = this.data.addressInfo.detailInfo
		let goods = []
		this.data.cart.map(item => {
			goods.push({
				goods_id: item.goods_id,
				goods_number: item.goods_number,
				goods_price: item.goods_price
			})
		})
		try {
			const data = { order_price, consignee_addr, goods }
			const res = await request({ url: 'my/orders/create', method: 'post', data })
			// 订单编号是模拟的
			const order_number = '123123123123123'
			// 发起预支付接口
			const res2 = await request({
				url: 'my/orders/req_unifiedorder',
				method: 'post',
				data: { order_number }
			})
			// 发起微信支付.模拟失败
			const res3 = await wxPay({})
			await wxToast({ title: '支付成功' })
		} catch (error) {
			await wxToast({ title: '支付失败' })
		}
		// 删除缓存中的购物车数据（已经支付的）
		let newCart = wx.getStorageSync('cart')
		newCart = newCart.filter(item => !item.isChecked)
		wx.setStorage({
			key: 'cart',
			data: newCart
		})
		wx.navigateBack({
			delta: 1
		})
	}
})
