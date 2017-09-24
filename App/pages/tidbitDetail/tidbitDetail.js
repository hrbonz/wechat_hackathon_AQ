// pages/tidbitDetail/tidbitDetail.js
Page({
  data: {
    tidbit: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // SET PAGE TITLE
    wx.setNavigationBarTitle({ title: 'Detail' });
    // GET TIDBIT DETAIL FROM LAST PAGE
    var id = options.id;
    console.log("tidbit Detail :" + id);
    //GET THE TIDBIT BY ID FROM SERVER
    this.geteTidbitDetail(id);
  },
  geteTidbitDetail: function (id) {
    var url = 'https://mask.measureofquality.com/tidbits/'+id;
    var ctx = this;
    wx.request({
      url: url,
      success: function (res) {
        ctx.setData({
          tidbit: res.data
        });
      },
      fail: function (err) {
        wx.showModal({
          title: 'Error',
          content: 'Something',
          showCancel: false,
          success: function (res) {}
        });
      }
    })
  },
})