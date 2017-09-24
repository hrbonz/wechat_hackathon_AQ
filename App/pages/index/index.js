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
    buttonText : 'Mask On',
    aqi : {},
    location : {}
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
  getUserLocation: function () {
    var ctx = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        ctx.setData({
          longitude : res.longitude,
          latitude: res.latitude
        })
        console.log('User location  = '  +  res);
        ctx.getClosestStation();
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
    this.getUserLocation();
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
  getClosestStation : function () {
    var ctx = this;
    var url = "http://mask.measureofquality.com/outdoor/closest?long=" + this.data.longitude + "?lat=" +    this.data.latitude;
    console.log('Calling getClosestStation method with url = ' + url);
    wx.request({
      url: url,
      success : function(res){
        ctx.getStationInfo(res.details_uri);
        ctx.getAQI(res.pm25_uri);
      },
      fail : function(err){

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
    console.log('Calling getStationInfo method with url = ' + url);
    var ctx: this;
    wx.request({
      url: url,
      success: function (res) {
        ctx.setData({
          location: res.name
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
    var ctx : this;
    console.log('Calling getAQI method with url = ' + url);
    wx.request({
      url: url,
      success: function (res) {
        ctx.setData({
          aqi: res.fields
        })
      },
      fail: function (err) {

      }
    })

  },

  
})
