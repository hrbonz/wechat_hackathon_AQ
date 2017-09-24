//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude: 0,
    latitude: 0,
    buttonclass: 'mask-button',
    buttonText: 'Mask On',
    aqi: {},
    location: {
      'en' : 'Shanghai'
    },
    couldBeCity: '',
    maskState: 'mask-off',
    backgroundColor: '#999',
    getBackgroundColor: function () {
      return '#999';
    }
  },
  openTidbits: function (e) {
    wx.navigateTo({
      url: '../tidbits/tidbits',
    })
  },
  putOnMask: function (e) {
    console.log(this.data.maskState);
    if (this.data.maskState == 'mask-off') {
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
  getSystemInfo: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        console.log('location = ' + res);
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
    } else if (this.data.canIUse) {
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
      couldBeCity: 'Honolulu'
    });
    this.data.couldBeCity = 'Honolulu';
    this.listenerBtnGetLocation();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  listenerBtnGetLocation: function () {
    var ctx = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        ctx.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        console.log('User location  = ' + res);
        ctx.getClosestStation();
      }
    })
  },

  /**
   * THIS METHOD WILL CALL THE SERVER TO GET THE DATA FOR NEAREST STATION .
   * THE RESPONSE IS SUPPOSE TO LOOK SOMETHING LIKE THIS :
   * {
        "closest": "jinganjiancezhan",
        "details_uri": "/outdoor/station/shanghai/jinganjiancezhan",
        "distance": 2.383912763469309,
        "pm25_uri": "/outdoor/station/shanghai/jinganjiancezhan/pm25"
      }
   */
  getClosestStation: function () {
    var url = "https://mask.measureofquality.com/outdoor/closest?long=" + this.data.longitude + "&lat=" + this.data.latitude;
    console.log('Calling getClosestStation method with url = ' + url);
    var ctx = this;
    wx.request({
      url: url,
      method : 'GET',
      success: function (res) {
        console.log('getClosestStation res = ' +  res.data);
        ctx.getStationInfo(res.data.details_uri);
        ctx.getAQI(res.data.pm25_uri);
      },
      fail: function (err) {
        console.log('getClosestStation err = ' + err);

      }
    })
  },



  /**
   * THIS METHOD WILL CALL THE SERVER TO GET THE NAME FOR THE STATION . THE URL COMES FROM THE  getClosestStaion METHOD ABOVE
   * THE RESPONSE IS SUPPOSE TO LOOK SOMETHING LIKE THIS :
   * {
        "lat": "31.221",
        "long": "121.4448",
        "name": {
            "cn": "静安监测站",
            "en": "Jing'an"
        }
      }
      WE ONLY NEED THE NAME OBJECT HERE
   */
  getStationInfo: function (url) {
    var u = 'https://mask.measureofquality.com' + url;
    console.log('Calling getStationInfo method with url = ' + u);
    var ctx =  this;
    wx.request({
      url: u,
      method: 'GET',
      success: function (res) {
        ctx.setData({
          location: res.data.name
        })
      },
      fail: function (err) {

      }
    })
  },



  /**
  * THIS METHOD WILL CALL THE SERVER TO GET AQI DATA FOR THE STATION . THE URL COMES FROM getClosestStaion METHOD ABOVE
  * THE RESPONSE IS SUPPOSE TO LOOK SOMETHING LIKE THIS :
  * {
       "fields": {
           "co": "0.9",
           "no2": "45.0",
           "o3_1h": "71.0",
           "o3_8h": "58.0",
           "pm10": null,
           "pm25": "13.0",
           "so2": "8.0"
       },
       "ts": "2017-09-24T03:54:00+00:00",
       "uuid": "pm25in:cn:shanghai:jinganjiancezhan"
     }
  */
  getAQI: function (url) {
    var ctx = this;
    var u = 'https://mask.measureofquality.com' + url;
    console.log('Calling getAQI method with url = ' + u);
    wx.request({
      url: u,
      method: 'GET',
      success: function (res) {
        ctx.setData({
          aqi: res.data.fields
        })
      },
      fail: function (err) {

      }
    })

  }

})
