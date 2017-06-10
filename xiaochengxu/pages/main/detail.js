// pages/main/detail.js
var requests = require('../../requests/request.js');
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    instDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const instCode = options.instCode;
    console.log("instCode is ...... " + instCode);
    var _this = this;
    /*this.setData({
      instDetail: {
        "id": 1,
        "companyName": "CHINA-ISUR",
        "logoName": "isur",
        "rafiydate": "2002-01-01",
        "status": "有效",
        "cnas": "CNAS认可",
        "out": "境外认可",
        "hinew": "高新技术企业",
        "instType": "上市公司"
      }

    })*/

    requests.requestInstDetailInfo(
      instCode,
      { instCode: instCode },
      (data) => {
        if (data.retCode == '02') {
          //没有记录
          
        } else if (data.retCode == '00') {
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

  }
})