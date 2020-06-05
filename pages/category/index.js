// pages/category/index.js
import { request } from '../../networks/index.js'
// async语法编译
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		categoryList: [], // 接口源数据，
		leftCateName: [], // 左侧分类名称数组
		leftIndex: 0, //左侧菜单默认点击的所索引
		rigthConent: [], // 右侧内容数组,
		scrollTop: 0 // 点不不同分类还是滚动到顶部
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		/** 
    0 web中的本地存储和 小程序中的本地存储的区别
      1 写代码的方式不一样了 
        web: localStorage.setItem("key","value") localStorage.getItem("key")
    		小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
      2:存的时候 有没有做类型转换
        web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
			小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
			
    1 先判断一下本地存储中有没有旧的数据
			{time:Date.now(),data:[...]}
			
		2 没有旧数据 直接发送新请求 
		
    3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
    */
		//  获取本地存储中的数据  (小程序中也是存在本地存储 技术)
		const Cates = wx.getStorageSync('cates')
		// 不存在时
		if (!Cates) {
			this.getCatData()
		}
		// 存在时
		else {
			// 如果存在，判断是否过期 6000
			if (Date.now() - Cates.timer < 1000 * 6000) {
				let leftCateName = []
				let data = Cates.data.data.message
				data.map(item => {
					leftCateName.push(item.cat_name)
				})
				let rigthConent = data[0].children
				this.setData({
					categoryList: data,
					leftCateName,
					rigthConent
				})
			}
			// 如果过期了
			else {
				this.getCatData()
			}
		}
	},
	// 网络请求函数
	async getCatData() {
		console.log('网络请求')
		let cateParams = {
			url: 'categories',
			method: 'GET'
		}
		const res = await request(cateParams)
		// 请求成功，存储数据到本地
		wx.setStorageSync('cates', { timer: Date.now(), data: res })
		// 保存数据到 data
		let leftCateName = []
		res.data.message.map(item => {
			leftCateName.push(item.cat_name)
		})
		let rigthConent = res.data.message[0].children
		// 筛选数据
		this.setData({
			categoryList: res.data.message,
			leftCateName,
			rigthConent
		})
	},
	// 左侧链接点击函数
	leftItemClick(e) {
		const res = e.currentTarget.dataset.index

		this.setData({
			leftIndex: res,
			rigthConent: this.data.categoryList[res].children,
			scrollTop: 0
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {}
})
