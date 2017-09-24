Page({

  /**
   * 页面的初始数据
   */
  data: {
    tidbits: [
      {
        id :1,
        question: 'WHAT DOES MY MASK DO?',
      },
      {
        id: 2,
        question: 'WHY SHOULD I WEAR A MASK?',
      },
      {
        id: 3,
        question: 'WHAT IS PARTICULATE MATTER?',
      },
      {
        id: 4,
        question: 'WHAT DO THESE WORDS MEAN ARGH?!?',
      },
      {
        id: 5,
        question: 'WHAT\'S SO BAD ABOUT AQI?',
      },
      {
        id: 6,
        question: 'BEWARE OF FAKE MASKS',
      },
      {
        id: 7,
        question: 'PROPER MASK USAGE'
      },
      {
        id: 8,
        question: 'HEALTH EFFECTS'
      },
      {
        id: 9,
        question: 'FOR THE NERDS (REFERENCES YAY!)',
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