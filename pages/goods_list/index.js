import { request } from '../../networks/index.js'

import regeneratorRuntime from '../../libs/runtime/runtime'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeIndex: 0,
		tabs: [
			{
				id: 0,
				name: '综合'
			},
			{
				id: 1,
				name: '销量'
			},
			{
				id: 2,
				name: '推荐'
			}
		],
		goods_list_params: {
			query: '',
			cid: '',
			pagenum: 1, // 当前的页码
			pagesize: 10
		},
		goodsListData: [],
		totalPages: 0 //一共的页数
	},
	itemClick(e) {
		this.setData({
			activeIndex: e.detail
		})
	},
	goodsListData: [],
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 路由参数 get请求请求体
		this.setData({
			'goods_list_params.cid': options.cid
		})
		console.log(options)
		this.getGoodsListData()
	},
	onShow: function (options) {
		console.log(options)
	},

	/**
	 * 生命周期函数--页面触底回调函数
	 */
	async onReachBottom() {
		let page = this.data.goods_list_params.pagenum
		let total = this.data.totalPages
		if (page > total) {
			wx.showToast({
				title: '没有更多了',
				icon: 'none',
				image: '',
				duration: 1500,
				mask: false
			})
		} else {
			this.setData({ 'goods_list_params.pagenum': this.data.goods_list_params.pagenum + 1 })
			this.getGoodsListData()
		}
	},
	// 网络请求函数
	async getGoodsListData() {
		let params = {
			url: 'goods/search',
			data: this.data.goods_list_params
		}
		const res = await request(params)
		this.goodsListData.push(...res.data.message.goods)
		this.setData({
			goodsListData: this.goodsListData
		})
		// 获取总记录数
		const totalPages = res.data.message.total
		this.setData({ totalPages: Math.ceil(totalPages / this.data.goods_list_params.pagesize) })
	},
	/**
	 * 生命周期函数--上拉沙刷新
	 */
	onPullDownRefresh() {
		this.setData({
			'goods_list_params.pagenum': 1
		})
		this.goodsListData = []
		this.data.goodsListData = []
		this.getGoodsListData()
		wx.stopPullDownRefresh()
	}
})
