Page({
  data: {
    tidbits: []
  },
  onLoad: function (options) {
    this.getTidbits();
    //SET PAGE TITLE
    wx.setNavigationBarTitle({ title: 'Tidbits' });
  },
  /**
   * TAKES THE APP TO TIDBIT DETAIL PAGE
   */
  goToDetailPage: function (e) {
    console.log("tidbit  :" + e.target.id);
    wx.navigateTo({
      url: '../tidbitDetail/tidbitDetail?id=' + e.target.id,
    })
  },

  getTidbits: function () {
    wx.showLoading({
      title: 'Loading',
    })
    var url = 'https://mask.measureofquality.com/tidbits';
    console.log("calling tibits list api = " +  url);
    var ctx = this;
    wx.request({
      url: url,
      success: function (res) {
        console.log(res);
        ctx.setData({
          tidbits: res.data
        });
        wx.hideLoading();
      },
      fail: function (err) {
        wx.showModal({
          title: 'Error',
          content: 'Something',
          showCancel: false,
          success: function (res) { }
        });
        wx.hideLoading();
      }
    })
  }
})