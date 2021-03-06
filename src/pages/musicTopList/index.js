import { getMusicTopList } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    id: '',
    musicTopList: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { id, } = options

    this.setData({
      id,
    })
  },
  onShow () {
    this.getData()
  },
  onShareAppMessage (options) {
    let title = '排行榜'
    if (this.data.musicTopList && this.data.musicTopList.topinfo && this.data.musicTopList.topinfo.ListName) {
      title = `${this.data.musicTopList.topinfo.ListName}【免费好听音乐】`
    }

    return {
      title,
      path: `/pages/musicTopList/index?id=${this.data.id}`,
      success: res => {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
        })
      },
      fail: res => {
        wx.showToast({
          title: '取消分享',
          icon: 'none',
        })
      },
    }
  },
  async getData () {
    const id = this.data.id
    if (!id) return

    const res = await getMusicTopList(id)

    this.setData({
      musicTopList: res,
    })

    if (res.topinfo && res.topinfo.ListName) {
      wx.setNavigationBarTitle({
        title: res.topinfo.ListName
      })
    }
  },
  async musicSong (event) {
    const { songmid = '', songname = '未知歌曲', albumname = '未知专辑', singername = '未知歌手', } = event.currentTarget.dataset

    // navigateTo(`/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)

    wx.showToast({
      title: songname,
      icon: 'none',
    })
  },
  showInfo (event) {
    const { text, } = event.currentTarget.dataset

    if (text) {
      wx.showToast({
        title: text,
        icon: 'none',
      })
    }
  },
})
