import md5 from 'crypto-js/md5'
import { Base64 } from 'js-base64'
import queryString, { parse, stringify, } from 'query-string'

import { langDetect } from '../../utils/actions'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

const plugin = requirePlugin('WechatSI')
const manager = plugin.getRecordRecognitionManager()

Page({
  data: {
    systemInfo: {},
    userInfo: {},
    address: {},
    modal: {},
    speacialValue: '',
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    console.log(Base64)
    console.log(Base64.encode('你好'))
    console.log(Base64.decode('5L2g5aW9'))
    console.log(md5('12345'))
    console.log(queryString)
    console.log(parse('a=1&b=2'))
    console.log(stringify({ a: 1, b: 2 }))

    const { systemInfo, userInfo, address, } = app.globalData

    console.log(systemInfo)

    this.setData({
      systemInfo,
      userInfo,
      address,
    })

    manager.onStart = function (res) {
      console.log('开始识别', res)

      wx.showToast({
        title: '请说话',
        icon: 'none',
      })
    }

    manager.onStop = async function (res) {
      console.log('识别结果', res)

      const value = res.result

      if (!value) {
        wx.showToast({
          title: '你说啥',
          icon: 'none',
        })
      } else {
        try {
          const res = await langDetect(value)

          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }
    }

    manager.onError = function (res) {
      console.log('识别错误', res)

      manager.stop()

      wx.showToast({
        title: '出错了',
        icon: 'none',
      })
    }
  },
  onShow () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo
          wx.getUserInfo({
            withCredentials: true,
            lang: this.data.systemInfo.language || 'en',
            success: res => {
              const { userInfo, } = res

              if (userInfo) {
                this.setData({
                  userInfo,
                })

                app.globalData.userInfo = userInfo
              }
            },
          })
        } else {
          this.showModal({
            content: '登录',
            confirmOpenType: 'getUserInfo',
          })
        }
      }
    })
  },
  onShareAppMessage (options) {
    return {
      title: '小工具',
      path: '/pages/tool/index',
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
      }
    }
  },
  getUserInfo (res) {
    const { userInfo, } = res.detail

    if (userInfo) {
      this.setData({
        userInfo,
      })

      app.globalData.userInfo = userInfo

      this.hideModal()
    } else {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.showToast({
              title: '未授权无法获取您的信息呦～',
              icon: 'none',
            })
          }
        },
      })
    }
  },
  chooseAddress () {
    wx.chooseAddress({
      success: res => {
        if (res) {
          this.setData({
            address: res,
          })

          app.globalData.address = res
        }
      },
      fail: res => {
        wx.getSetting({
          success: res => {
            if (!res.authSetting['scope.address']) {
              wx.showToast({
                title: '未授权无法获取您的地址呦～',
                icon: 'none',
              })
            }
          },
        })
      },
    })
  },
  clearStorage () {
    wx.showModal({
      title: '提示',
      content: '清除缓存',
      success: res => {
        if (res.confirm) {
          // 清理本地数据缓存
          try {
            wx.clearStorageSync()
          } catch (e) {
            console.log(e)
          }
        }
      }
    })
  },
  showModal (options = {}) {
    this.setData({
      modal: {
        visible: true,
        ...options,
      },
    })
  },
  hideModal () {
    this.setData({
      modal: {
        visible: false,
      },
    })
  },
  modalCancel () {
    wx.showToast({
      title: '不登录无法获取头像呦～',
      icon: 'none',
    })
  },
  speacialInput (event) {
    const { value } = event.detail

    this.setData({
      speacialValue: value,
    })
  },
  speacialSearch () {
    const value = this.data.speacialValue

    if (!value) return

    if (value === '我爱徐蜗牛') {
      navigateTo(`/pages/musicSong/index?speacial=1`)
    } else {
      wx.showToast({
        title: '待开发功能～',
        icon: 'none',
      })
    }
  },
  voiceAssistant () {
    manager.start({
      duration: 3000,
      lang: 'zh_CN'
    })
  },
})
