import { request } from '../../networks/index.js'

import regeneratorRuntime from '../../libs/runtime/runtime'
// priviewImage
Page({
	data: {
		isCollect: false,
		goodsObj: {} // 筛选数据
	},
	originGoods: {}, // 源数据
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getGoodsDetail(options.goods_id) // 网络请求获取商品详细数据
	},
	// 页面多次切换加载数据
	onShow: function () {
		let pages = getCurrentPages()
		let currentPage = pages[pages.length - 1]
		let options = currentPage.options
		// option 是拿onLoad 的option
		let { goods_id } = options
		goods_id = String(goods_id)
		this.initCollect(goods_id)
	},
	/**
	 * 普通函数
	 */
	// 异步请求函数
	async getGoodsDetail(goods_id, callback) {
		const res = await request({ url: 'goods/detail', data: { goods_id } })
		// 不建议在小程序中存放太多没有使用的数据
		let goodsObj = {
			// iPhone部分手机不是被webp图片格式
			// 1.沟通后台
			// 2.后台存在jpg图格式，自己替换
			goods_id: res.data.message.goods_id,
			pics: res.data.message.pics,
			goods_price: res.data.message.goods_price,
			goods_name: res.data.message.goods_name,
			goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg')
		}
		this.setData({
			goodsObj
		})
		this.originGoods = res.data.message
		callback && callback().call(this)
	},

	initCollect(goods_id) {
		const collectArr = wx.getStorageSync('collectArr') || []
		if (collectArr.length > 0) {
			let isCollect = collectArr.some(item => {
				return item.goods_id == goods_id
			})
			this.setData({
				isCollect
			})
		}
	},

	// 点击图片预览
	previewImage(e) {
		// 图片预览数组
		let urls = []
		this.data.goodsObj.pics.map(item => {
			urls.push(item.pics_big_url)
		})
		wx.previewImage({
			current: e.currentTarget.dataset.url,
			urls
		})
	},

	// 点击添加购物车
	addCart() {
		// 获取缓存中的购物车数组
		let cart = wx.getStorageSync('cart') || []
		// 判断商品对象是否存在数组中
		let index = cart.findIndex(item => {
			return item.goods_id === this.originGoods.goods_id
		})
		console.log(index)
		// 第一次添加
		if (index === -1) {
			cart.push({ ...this.originGoods, num: 1, isChecked: true })
		}
		// 已经存在，num++
		else {
			cart[index].num++
		}
		// 把购物车数据更新
		wx.setStorageSync('cart', cart)
		// 提示用户加入成功
		wx.showToast({
			title: '加入成功',
			icon: 'none',
			image: 'success',
			duration: 1500,
			// 五秒钟之后才能点击
			mask: true
		})
	},
	// 点击收藏
	collectClick() {
		this.setData({
			isCollect: !this.data.isCollect
		})
		let collectArr = wx.getStorageSync('collectArr') || []
		let index = collectArr.findIndex(item => {
			return item.goods_id === this.data.goodsObj.goods_id
		})
		if (index === -1) {
			collectArr.push(this.data.goodsObj)
		} else if (!this.isCollect) {
			collectArr.splice(index, 1)
		}

		wx.setStorageSync('collectArr', collectArr)
	}
})
