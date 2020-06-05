//index.js
//获取应用实例
const app = getApp()

import { request } from '../../networks/index.js'

//Page Object
Page({
	data: {
		swiperList: [], // 轮播图数组
		navList: [], // 分类导航数据
		floorList: [] //楼层数据
	},
	//options(Object)
	// 页面开始加载的时候触发
	onLoad: function (options) {
		let swiperParams = {
			url: 'home/swiperdata',
			method: 'GET'
		}
		request(swiperParams).then(res => {
			this.setData({
				swiperList: res.data.message
			})
		})
		let navParams = {
			url: 'home/catitems',
			method: 'GET'
		}
		request(navParams).then(res => {
			this.setData({
				navList: res.data.message
			})
		})
		let floorParams = {
			url: 'home/floordata',
			method: 'GET'
		}
		request(floorParams).then(res => {
			this.setData({
				floorList: res.data.message
			})
		})
	},
	onReady: function () {},
	onShow: function () {},
	onHide: function () {},
	onUnload: function () {},
	onPullDownRefresh: function () {},
	onReachBottom: function () {},
	onShareAppMessage: function () {},
	onPageScroll: function () {},
	//item(index,pagePath,text)
	onTabItemTap: function (item) {}
})
