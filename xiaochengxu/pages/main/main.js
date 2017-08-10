// pages/main/main.js
var requests = require('../../requests/request.js');
var WxSearch = require('../../wxSearch/wxSearch.js')
//刷新动态球颜色
var iconColor = [
  '#42BD56', '#31A040'
];
var flag="";
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
    hotword: [],//热搜词
    placehoder: "",//搜索框提示信息
    isShow:false,
    pageSize : 15,//返回数据个数
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const keyword = options.keyword;
    // console.log(keyword)
    const index = options.index;
    // console.log(index)
    if(index == 0){//如果是首页搜索框直接过来的
      flag = "0";//flag默认置0
      _this.setData({
        bvisiable: "display:none",
        searchKey: keyword,
        isShow:true
      });
      _this.setData({ pageIndex: 0, pageData: [] });
      WxSearch.init(_this, 43, ["管理体系认证", "服务认证", "自愿性工业产品认证", "自愿性农产品认证", "强制性产品认证"]);
      requestData.call(_this);
    }

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
        var tmp = [];
        requests.requestGetTopN({
        }, (data) => {
          if(data.retCode == '00'){
            for(var i=0;i<data.data.length;i++){
              tmp.push(data.data[i].instName);
            }
          }
        }, () => {
          // _this.setData({ totalRecord: 0 });
          //console.log("failed ....... "+_this.data.data);
        }, () => {
          // _this.setData({ loadingMore: false });
          _this.setData({ hotword: tmp, placehoder: "请输入机构名称" });
          //console.log("hotword is : "+_this.data.hotword);
          //初始化的时候渲染wxSearchdata 第二个为你的search高度
          WxSearch.init(_this, 43, _this.data.hotword);
          // WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
        });
        // console.log("abc is ....... "+tmp);
      } else if (name == "认证领域") {
        flag = "2";
        _this.setData({  placehoder: "请输入认证领域" });
        WxSearch.init(_this, 43, ["管理体系认证", "服务认证", "自愿性工业产品认证", "自愿性农产品认证","强制性产品认证"]);
      } else if (name == "所在地区") {
        flag = "3";
        _this.setData({  placehoder: "请输入地区" });
        WxSearch.init(_this, 43, ["北京", "上海", "广州", "深圳"]);
      } else if (name == "认可情况") {
        flag = "4";
        _this.setData({  placehoder: "请输入认可情况" });
        WxSearch.init(_this, 43, ["cnas认可", "境外认可"]);
      } 
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   * //页面显示获取设备屏幕高度，以适配scroll-view组件高度
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

  searchClickEvent: function (event) {
    if (!this.data.searchKey) {
      return;
    }
    this.setData({ pageIndex: 0, pageData: [] });
    requestData.call(this);

  },
  //下拉请求数据
  scrollLowerEvent: function (e) {
    let that = this;
    if (that.data.loadingMore && that.data.searchLoadingComplete){//如果没有数据了,则直接返回
      return;
    }else{//如果有数据,则当前页码+1
      that.setData({pageIndex : that.data.pageIndex+1})
      updateRefreshBall.call(that);
      requestData.call(that);
    }
  },
  pullDownRefresh: function (e){
    // console.log("call download......");
    //requestData.call(this);
  },
  searchInputEvent: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  // searchClick: function (e) {
  //   var that = this;
  //   that.setData({ searchKey: e.detail.value, pageIndex: 0, pageData: [] });
  //   requestData.call(that);

  // },
  wxSearchFn: function (e) {
    // console.log("query is ...... "+this.data.searchKey);
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    if (!that.data.searchKey) {
      return;
    }
    that.setData({ pageIndex: 0, pageData: [], isShow: true, searchLoadingComplete: false });
    requestData.call(that);
    // console.log("search data is ...... " + that.data.wxSearchData.value)
  },
  wxSearchInput: function (e) {
    var that = this
    that.setData({
      searchKey: e.detail.value
    })
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    that.setData({isShow:false});
    WxSearch.wxSearchFocus(e, that);
    // console.log("focus view is ...... " + this.data.wxSearchData.view);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    // console.log("this.searchKey is : "+that.data.wxSearchData.value);
    WxSearch.wxSearchKeyTap(e, that);
    that.setData({
      searchKey: that.data.wxSearchData.value
    });
    // console.log("call back is ....... " + that.data.wxSearchData.value)
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }

});


/**
 * 请求页面数据
 */
function requestData() {
  let _this = this;
  var q = _this.data.searchKey;
  var start = _this.data.pageIndex;
  var pageSize = _this.data.pageSize;
  // console.log(start);
  //_this.setData({ loadingMore: true, isInit: false });
  // updateRefreshBall.call(_this);
  //请求之前清空列表数据
  if(_this.isInit){//如果是首次加载,清空数据
    _this.setData({
      pageData: [],
      totalRecord: 0
    });
  }
  _this.setData({ loadingMore: true, isInit: false });
  requests.requestSearchInstByKeyWord({
    pageNum: start, 
    queryContent: q,
    queryFlag: flag,
    pageSize: pageSize
  }, (data) => {
    // console.log(data.retCode);
    if (data.retCode == '02') {
      //没有记录
      _this.setData({ totalRecord: 0 });
    } else if(data.retCode == '00') {
      // console.log(data.data);
      /*var obj = JSON.parse(data.data);*/
      var myDate = new Date();
      var currentYear = myDate.getFullYear();//获得当前年份
      var countYear = 0;
      var ratifyYear = "";
      // console.log(data.data.pageList.length);
      if (data.data.pageList.length>0){      
        for (var i = 0; i < data.data.pageList.length;i++){
          var logoName = data.data.pageList[i].instName.substr(0,1);
          data.data.pageList[i].logoName = logoName;//截取第一个字为logo
          countYear = currentYear - data.data.pageList[i].ratifyDate.split('-')[0];
          if(countYear<1){
            ratifyYear = "成立不足1年";
          }else if (countYear < 5){
            ratifyYear = "成立1到5年";
          } else if (countYear < 10) {
            ratifyYear = "成立5到10年";
          } else if (countYear < 15) {
            ratifyYear = "成立10到15年";
          } else {
            ratifyYear = "成立15年以上";
          }
          data.data.pageList[i].ratifyYear = ratifyYear;
        }
        _this.setData({
          pageData: _this.data.pageData.concat(data.data.pageList),
          pageIndex: start + 1,
          totalRecord: data.data.total,
          bvisiable: "display:none"
        });
      }else{
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