Page({

  /**
   * 页面的初始数据
   */
  data: {
    tidbits: [
      {
        id :1,
        question: 'What does my mask do?',
      },
      {
        id: 2,
        question: 'Why should I wear a mask?',
      },
      {
        id: 3,
        question: 'What is particulate matter?',
      },
      {
        id: 4,
        question: 'What do these words mean argh?!?',
      },
      {
        id: 5,
        question: 'What\'s so bad about AQI?',
      },
      {
        id: 6,
        question: 'Beware of fake masks?',
      },
      {
        id: 7,
        question: 'Proper mask usage'
      },
      {
        id: 8,
        question: 'Health effects'
      },
      {
        id: 9,
        question: 'For the nerds (references yay!)',
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})