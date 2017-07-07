// pages/advice/advice.js
var requests = require('../../requests/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../images/normal.png',
    selectedSrc: '../images/selected.png',
    halfSrc: '../images/half.png',
    key: 0,//评分
    userName:'',//姓名
    tel:'',//手机号
    advice:'',//意见或建议
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  /**
   * button点击事件监听
   */
  formBindsubmit: function (e) {
    //打印所有关于点击对象的信息
    var that = this;
    // console.log("comment is --->>> "+this.data.key);
    that.setData({
      userName:e.detail.value.userName,
      tel:e.detail.value.tel,
      advice:e.detail.value.advice
    })
    var name = that.data.userName;
    var mobilePhone = that.data.tel;
    var content = that.data.advice;

    requests.requestUserAdvice({
      name: name,
      mobilePhone: mobilePhone,
      content: content
    }, (data) => {
      if (data.retCode == '02') {
        // console.log(data.retMsg);
        //没有记录
      } else if (data.retCode == '00') {
        // console.log(data.data);
        that.modalTap();//提交成功弹出提示信息
        //提交完成,返回上层页面
        /*wx.navigateBack({
          
        });*/
      } else {
        // console.log(data.retMsg)
      }
    }, () => {
      
    }, () => {
      
    });    
  },
  formReset: function () {
    // console.log('form发生了reset事件');
    this.modalTap2();
  },

  /*
  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },*/
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    // console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    // console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },  
})