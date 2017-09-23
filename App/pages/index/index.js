//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude : 0,
    latitude : 0,
    currentCity: '',
    couldBeCity: '',
    maskState: 'mask-off',
    backgroundColor: '#999',
    getBackgroundColor: function(){
      return '#999';
    }
  },
  openTidbits: function(e){
    wx.navigateTo({
      url: '../tidbits/tidbits',
    })
  },
  bindScan: function () {
    console.log('scanner')
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  putOnMask: function(e){
    console.log(this.data.maskState);
    if ( this.data.maskState == 'mask-off' ) {
      this.setData({ 
        maskState: 'mask-on',
        backgroundColor: '#8cebfc'
      });
    } else {
      this.setData({
        maskState: 'mask-off',
        backgroundColor: '#999'
      });
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

    // To Be replaced with Backend
    this.setData({
      currentCity: 'Shanghai',
      couldBeCity: 'Honolulu'
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
