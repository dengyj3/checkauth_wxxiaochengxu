// pages/main/hotquery.js
var requests = require('../../requests/request.js');
//刷新动态球颜色
var iconColor = [
  '#42BD56', '#31A040'
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    pageIndex: 0, //页码
    totalRecord: 0, //记录总数
    isInit: true, //是否第一次进入应用
    loadingMore: false, //是否正在加载更多
    footerIconColor: iconColor[0], //下拉刷新球初始颜色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("------first enter in----"+options.id);
    var that = this;
    that.setData({ currentTab: options.id , pageIndex: 0, pageData: []})
    requestData.call(that);
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
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
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current, pageIndex: 0, pageData: [] });
    console.log("blur switch tab is ...... "+this.data.pageData)
    requestData.call(that);
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current, pageIndex: 0, pageData: []
      })
      console.log("click switch tab is ...... " + this.data.pageData)
      // requestData.call(that);
    }
  }
})


/**
 * 请求页面数据
 */
function requestData() {
  var _this = this;
  var start = this.data.pageIndex;

  this.setData({ loadingMore: true, isInit: false });
  updateRefreshBall.call(this);
  //请求之前清空列表数据
  _this.setData({
    pageData: [],
    totalRecord: 0
  });
  console.log("请求flag is : "+this.data.currentTab);
  requests.requestHotQuery({
    pageNum: start,
    queryFlag: this.data.currentTab
  }, (data) => {
    // console.log(data.retCode);
    if (data.retCode == '02') {
      //没有记录
      _this.setData({ totalRecord: 0 });
    } else if (data.retCode == '00') {
      console.log("return from server is : "+data.data.pageList);
      for (var i = 0; i < data.data.pageList.length; i++) {
        var logoName = data.data.pageList[i].instName.substr(0, 1);
        data.data.pageList[i].logoName = logoName;//截取第一个字为logo
      }
      _this.setData({
        pageData: _this.data.pageData.concat(data.data.pageList),
        pageIndex: start + 1,
        totalRecord: data.data.total,
      });
    }
  }, () => {
    _this.setData({ totalRecord: 0 });
  }, () => {
    _this.setData({ loadingMore: false });
  });
}

/**
 * 刷新下拉效果变色球
 */
function updateRefreshBall() {
  var cIndex = 0;
  var _this = this;
  var timer = setInterval(function () {
    if (!_this.data['loadingMore']) {
      clearInterval(timer);
    }
    if (cIndex >= iconColor.length)
      cIndex = 0;
    _this.setData({ footerIconColor: iconColor[cIndex++] });
  }, 100);
}
