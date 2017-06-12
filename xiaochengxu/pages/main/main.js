// pages/main/main.js
var requests = require('../../requests/request.js');

//刷新动态球颜色
var iconColor = [
  '#42BD56', '#31A040'
];
var flag;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0, //scroll-view高度
    pageIndex: 0, //页码
    totalRecord: 0, //记录总数
    isInit: true, //是否第一次进入应用
    loadingMore: false, //是否正在加载更多
    footerIconColor: iconColor[0], //下拉刷新球初始颜色
    pageData: [], //返回数据
    searchKey: null, //搜索关键字
    bvisiable: 'display:block',//设置热搜词是否显示
    hotword: {},//热搜词
    placehoder: "",//搜索框提示信息
    queryString: ""//用户输入的查询词
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const keyword = options.keyword;
    console.log(keyword);
    _this.setData({ queryString: keyword });
    if (keyword != undefined) {//按关键字查询查询
      //return;
    }
    const name = options.name;
    if (name != undefined) {
      wx.setNavigationBarTitle({
        title: "按" + name + "查询",
      })
    } else {
      wx.setNavigationBarTitle({
        title: "认证查询",
      })
    }
    if (name == "机构名称") {
      flag = "1";
      console.log("机构名称")
      _this.setData({ hotword: { "word1": "中创", "word2": "国新" }, isInit: false, placehoder: "请输入机构名称" });
    } else if (name == "认证领域") {
      flag = "2";
      console.log("认证领域")
      _this.setData({ hotword: { "word1": "质量", "word2": "食品" }, isInit: false, placehoder: "请输入认证领域" });
    } else if (name == "所在地区") {
      flag = "3";
      console.log("所在地区")
      _this.setData({ hotword: { "word1": "北京", "word2": "上海" }, isInit: false, placehoder: "请输入地区" });
    } else {
      flag = "4";
      console.log("认可情况")
      _this.setData({ hotword: { "word1": "cnas认可", "word2": "境外认可" }, isInit: false, placehoder: "请输入认可情况" });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*var queryWord = this.data.queryString;
    var _this = this;
    requests.requestSearchInstByKeyWord(
      queryWord,
      { fields: 'id,companyName,logoName,rafiydate,status,cnas,out,hinew,instType' },
      (data) => {
        console.log(data)
        _this.setData({
          bookData: data
        });
      }, () => {
        wx.navigateBack();
      }, () => {
        _this.setData({
          loadingMore: true
        });
      }
    );*/
  },

  /**
   * 生命周期函数--监听页面显示
   * //页面显示获取设备屏幕高度，以适配scroll-view组件高度
   */
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
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

  searchClickEvent: function (event) {
    if (!this.data.searchKey) {
      return;
    }
    this.setData({ pageIndex: 0, pageData: [] });
    requestData.call(this);

  },
  //下拉请求数据
  scrollLowerEvent: function (e) {
    if (this.data.loadingMore)
      return;
    requestData.call(this);
  },
  //跳转到详细页面
  //toDetailPage: function (e) {
    //console.log("enter detail page");
    /*var bid = e.currentTarget.dataset.bid; //图书id [data-bid]
    wx.navigateTo({
      url: 'detail?id=' + bid
    });*/
  //},
  searchInputEvent: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  }

});


/**
 * 请求页面数据
 */
function requestData() {
  var _this = this;
  var q = this.data.searchKey;
  var start = this.data.pageIndex;

  this.setData({ loadingMore: true, isInit: false });
  updateRefreshBall.call(this);
  //请求之前清空列表数据
  _this.setData({
    pageData: [],
    totalRecord: 0
  });
  requests.requestSearchInstByKeyWord({
    q: q, start: start, 
    queryContent: this.data.searchKey,
    queryFlag: flag
  }, (data) => {
    if (data.retCode == '02') {
      //没有记录
      _this.setData({ totalRecord: 0 });
    } else if(data.retCode == '00') {
      console.log("sucess count is ... " + data.retCode)
      console.log("sucess data is ... " + data.data)
      /*var obj = JSON.parse(data.data)*/;
      console.log(data.data.pageList.length);
      _this.setData({
        pageData: _this.data.pageData.concat(data.data.pageList),
        pageIndex: start + 1,
        totalRecord: data.data.total,
        bvisiable: "display:none"
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