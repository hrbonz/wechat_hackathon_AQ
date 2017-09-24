//index.js
//获取应用实例
const app = getApp()

var borderColor, backgroundColor, currentLocation, currentAqi, couldbeAqi;

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
    aqi: {},
    location: {
      pm25: 0
    },
    maskState: 'mask-off',
    backgroundColor: '#999999',
    borderColor: '#999999'
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
    if ( this.data.maskState == 'mask-off' ) {
      this.setData({ 
        maskState: 'mask-on',
        backgroundColor: '#8cebfc',
        border: borderColor,
        aqi: couldbeAqi,
        location: {
          en: 'Honolulu'
        }
      });
    } else {
      this.setData({
        maskState: 'mask-off',
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        aqi: currentAqi,
        location: currentLocation
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

    // GET SET borderColor and backgroundColor
    var aqi = this.data.aqi.pm25;
    couldbeApi = {
      pm25: ( this.data.aqi.pm25 * 0.9 )
    };
  
    if ( aqi < 15.4 ) borderColor = 'greenyellow';
    else if ( aqi < 40.4 ) borderColor = 'yellow';
    else if ( aqi < 65.4 ) borderColor = 'orange';
    else if ( api < 150.4 ) borderColor = '#ff5858';
    else if ( api < 251 ) borderColor = 'purple';
    else borderColor = 'maroon';

    if (aqi < 15.4) backgroundColor = '#8cebfc';
    else if (aqi < 35) backgroundColor = '#93d8e4';
    else if (aqi < 100) backgroundColor = '#b4ced3';
    else backgroundColor = '#d4d4d4';

    // To Be replaced with Backend
    this.setData({
      borderColor: borderColor,
      backgroundColor: backgroundColor,
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
  },
  onHide: function() {
    this.setData({
      maskState: 'mask-off'
    });
  }
})
