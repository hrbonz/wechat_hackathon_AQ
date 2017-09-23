//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude : 0,
    latitude : 0,
    buttonclass: 'mask-button',
    buttonText : 'Mask On'
  },
  /**
   * TIDBITS BUTTON CLICK ACTION
   */
  tidbitsClicked : function(e){
    wx.navigateTo({
      url: '../tidbits/tidbits',
    })
  },
  /**
   * OPENS THE QR SCANNER
   */
  openQRScanner: function () {
    console.log('scanner')
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  /**
   * CLICK ACTION FOR MASK BUTTON
   */
  buttonClicked : function(e){
    if (this.data.buttonclass == 'mask-button'){
      
      this.setData({
        buttonclass: 'mask-button-red',
        buttonText : 'Mask Off'
      });
    }else{
      this.setData({
        buttonclass: 'mask-button',
        buttonText : 'Mask On'
      });
    }
  },
  listenerBtnGetLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        this.setData({
          longitude : res.longitude,
          latitude: res.latitude
        })
        console.log('location = '  +  res);
      }
    })
  },
  getSystemInfo : function(){
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: 'Air Quality MP' });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * GET USER INFORMATION
   */
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
