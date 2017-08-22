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
    isShow: false,
    pageSize: 15,//返回数据个数
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
    scrollHeight: 0 //scroll-view高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("------first enter in----"+options.id);
    var that = this;
    that.setData({ currentTab: options.id, pageIndex: 0, pageData: [], isShow: true})
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750) //80为顶部搜索框区域高度 rpx转px 屏幕宽度/750
        });
      }
    })
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
    requestData.call(that);
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current, pageIndex: 0, pageData: []
      })
      // requestData.call(that);
    }
  },
  //下拉请求数据
  scrollLowerEvent: function (e) {
    // console.log("call upload....");
    let that = this;
    if (that.data.loadingMore && that.data.searchLoadingComplete) {//如果没有数据了,则直接返回
      return;
    } else {//如果有数据,则当前页码+1
      that.setData({ pageIndex: that.data.pageIndex + 1 })
      updateRefreshBall.call(that);
      requestData.call(that);
    }
  },
  pullDownRefresh: function (e) {
    // console.log("call download......");
    //requestData.call(this);
  }
})


/**
 * 请求页面数据
 */
function requestData() {
  var _this = this;
  var start = _this.data.pageIndex;
  var pageSize = _this.data.pageSize;
  //updateRefreshBall.call(_this);
  if (_this.isInit) {//如果是首次加载,清空数据
    _this.setData({
      pageData: [],
      totalRecord: 0
    });
  }
  _this.setData({ loadingMore: true, isInit: false });
  requests.requestHotQuery({
    pageNum: start,
    queryFlag: _this.data.currentTab,
    pageSize: pageSize
  }, (data) => {
    // console.log(data.retCode);
    if (data.retCode == '02') {
      //没有记录
      _this.setData({ totalRecord: 0 });
    } else if (data.retCode == '00') {
      // console.log(data.data.pageList.length)
      var myDate = new Date();
      var currentYear = myDate.getFullYear();//获得当前年份
      var countYear = 0;
      var ratifyYear = "";
      if (data.data.pageList.length > 0) { 
        for (var i = 0; i < data.data.pageList.length; i++) {
          var logoName = data.data.pageList[i].instName.substr(0, 1);
          data.data.pageList[i].logoName = logoName;//截取第一个字为logo
          countYear = currentYear - data.data.pageList[i].ratifyDate.split('-')[0];
          if (countYear < 1) {
            ratifyYear = "批准不足1年";
          } else if (countYear < 5) {
            ratifyYear = "批准1到5年";
          } else if (countYear < 10) {
            ratifyYear = "批准5到10年";
          } else if (countYear < 15) {
            ratifyYear = "批准10到15年";
          } else {
            ratifyYear = "批准15年以上";
          }
          data.data.pageList[i].ratifyYear = ratifyYear;
        }
        _this.setData({
          pageData: _this.data.pageData.concat(data.data.pageList),
          pageIndex: start + 1,
          totalRecord: data.data.total
        });
      } else {
        // console.log("没有数据了......");
        _this.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示 
          loadingMore: false //把"上拉加载"的变量设为false，隐藏 
        });
      }
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
