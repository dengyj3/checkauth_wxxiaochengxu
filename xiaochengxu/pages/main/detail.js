// pages/main/detail.js
var requests = require('../../requests/request.js');
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    instDetail: {},
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    toView: 'baseInfo',
    _num : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const instCode = options.instCode;
    var _this = this;
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    requests.requestInstDetailInfo(
      instCode,
      { instCode: instCode },
      (data) => {
        if (data.retCode == '02') {
          //没有记录
          
        } else if (data.retCode == '00') {
          var logoName = data.data.instName.substr(0, 1);//截取第一个字为logo
          data.data.logoName = logoName;
          _this.setData({
            instDetail: data.data
          });
          wx.setNavigationBarTitle({//修改标题为机构名称
            title: data.data.instName
          })
        }
      }, () => {
        wx.navigateBack();
      }, () => {
        _this.setData({
          loadidngHidden: true
        });
      });

    
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

  },
  
  tapBaseInfo : function(e){
    this.setData({ toView: 'baseInfo',_num : 1});
  },

  tapAuthArea: function (e) {
    this.setData({ toView: 'authArea', _num: 2 });
  },

  tapCerNum: function (e) {
    this.setData({ toView: 'cerNum',_num : 3 });
  },

  tapPerNum: function (e) {
    this.setData({ toView: 'perNum',_num : 4 });
  },

  tapCNASArea: function (e) {
    this.setData({ toView: 'cnasArea', _num: 5 });
  }
})