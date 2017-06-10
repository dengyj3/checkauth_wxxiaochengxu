//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /*motto: 'Hello World',
    userInfo: {}*/
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerIcon: [
      {"Pic":"../images/allIcon.png","Link":"../main/main?name=机构名称","Name":"机构名称"},
      { "Pic": "../images/bjIcon.png", "Link": "../main/main?name=认证领域", "Name": "认证领域"},
      { "Pic": "../images/manIcon.png", "Link": "../main/main?name=地区", "Name": "地区"},
      { "Pic": "../images/manufacturing.png", "Link": "../main/main?name=机构类型", "Name": "机构类型" }
    ],
    queryString: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getResult: function (event) {
    if (this.data.queryString.length > 0) {
      console.log(this.data.queryString);
      console.log("get result ....");
    } else {
      console.log("长度为0");
    }
  },

  getInput: function (e) {
    this.setData({
      queryString: e.detail.value
    })

    wx.request({
      url: 'http://localhost:8080/checkauth/authInst/query?instCode=CNCA-R-2002-002', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })

  }
})
