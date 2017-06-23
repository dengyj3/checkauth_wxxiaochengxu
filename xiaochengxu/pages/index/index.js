//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /*motto: 'Hello World',
    userInfo: {}*/
    imgUrls: [
//'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
//'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
//'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    '../images/banner2.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerIcon: [
      { "Pic": "../images/allIcon.png", "Link": "../main/main?name=机构名称", "Name": "机构名称" },
      { "Pic": "../images/bjIcon.png", "Link": "../main/main?name=认证领域", "Name": "认证领域" },
      { "Pic": "../images/manIcon.png", "Link": "../main/main?name=所在地区", "Name": "所在地区" },
      { "Pic": "../images/manufacturing.png", "Link": "../main/main?name=认可情况", "Name": "认可情况" }
    ],
    queryString: '',
    ballBottom: 5,
    ballRight: 5,
    screenHeight: 0,
    screenWidth: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
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
  getResult: function (event) {//首页搜索按钮事件
    if (this.data.queryString.length > 0) {
      console.log(this.data.queryString);
      wx.navigateTo({
        url: '../main/main?keyword=' + this.data.queryString + '&index=0',
      })
    } else {
      console.log("长度为0");
    }
  },

  getInput: function (e) {//获取输入框的值
    this.setData({
      queryString: e.detail.value
    })
  },
  onShareAppMessage: function () {//设置分享
    return {
      title: '检测认证宝',
      desc: '检测认证宝!',
      path: '/index/index'
    }
  },

  ballMoveEvent: function (e) {
    //console.log('我被拖动了....')
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    //console.log('pageX: ' + pageX)
    //console.log('pageY: ' + pageY)
    //防止坐标越界,view宽高的一般
    if (pageX < 30) return;
    if (pageX > this.data.screenWidth - 30) return;
    if (this.data.screenHeight - pageY <= 30) return;
    if (pageY <= 30) return;
    //这里用right和bottom.所以需要将pageX pageY转换
    var x = this.data.screenWidth - pageX - 30;
    var y = this.data.screenHeight - pageY - 30;
    //console.log('x: ' + x)
    //console.log('y: ' + y)
    this.setData({
      ballBottom: y,
      ballRight: x
    });
  },
  //点击事件
  ballClickEvent: function () {
    //console.log('点击了....')
  }
})
