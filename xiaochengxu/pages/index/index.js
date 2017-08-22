//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bannerIcon: [
      { "Pic": "../images/logo3.png", "Link": "../main/main?name=机构名称", "Name": "机构名称" },
      { "Pic": "../images/logo2.png", "Link": "../main/main?name=认证领域", "Name": "认证领域" },
      { "Pic": "../images/logo1.png", "Link": "../main/main?name=所在地区", "Name": "所在地区" },
      { "Pic": "../images/logo4.png", "Link": "../main/main?name=认可情况", "Name": "认可情况" }
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

  getResult: function (event) {//首页搜索按钮事件
    var that = this;
    if (that.data.queryString.length > 0) {
      wx.navigateTo({
        url: '../main/main?keyword=' + that.data.queryString + '&index=0',
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

  seachClick: function(e){//完成按钮触发事件
    wx.navigateTo({
      url: '../main/main?keyword=' + e.detail.value + '&index=0',
    })
  },
  onShareAppMessage: function () {//设置分享
    return {
      title: '中认宝',
      desc: '中认宝!',
      path: '/pages/index/index'
    }
  },
  //意见收集图标移动事件
  ballMoveEvent: function (e) {
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    //防止坐标越界,view宽高的一般
    if (pageX < 30) return;
    if (pageX > this.data.screenWidth - 30) return;
    if (this.data.screenHeight - pageY <= 30) return;
    if (pageY <= 30) return;
    //这里用right和bottom.所以需要将pageX pageY转换
    var x = this.data.screenWidth - pageX - 30;
    var y = this.data.screenHeight - pageY - 30;
    this.setData({
      ballBottom: y,
      ballRight: x
    });
  }
 
})
