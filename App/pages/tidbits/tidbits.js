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
  goToDetailPage : function(e){
    console.log("tidbit  :" + e.target.id);
    var tidbit = {};
    this.data.tidbits.forEach(function(t){
      if(t.id == e.target.id){
        tidbit = t;
      }
    });
    wx.navigateTo({
      url: '../tidbitDetail/tidbitDetail?id=' + e.target.id,
    })
  },
  getTidbits: function () {
    var url = 'https://mask.measureofquality.com/tidbits';
    var ctx : this;
    wx.request({
      url: url,
      success: function (res) {
        ctx.setData({
          tidbits: res
        });
      },
      fail: function (err) {
        wx.showModal({
          title: 'Error',
          content: 'Something',
          showCancel: false,
          success: function (res) { }
        });
      }
    })
  }
})