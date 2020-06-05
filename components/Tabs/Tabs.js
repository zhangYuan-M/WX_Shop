// components/Tabs/Tabs.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabs: {
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		activeIndex: 0 //
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		itemClick(e) {
			const index = e.currentTarget.dataset.index
			this.setData({ activeIndex: index })
			this.triggerEvent('itemClick', index)
		}
	}
})
