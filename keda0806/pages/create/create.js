// pages/create/create.js
const app = getApp()
var Bmob = require("../../utils/bmob.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    job: "",
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
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

  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  inputJob: function (e) {
    this.setData({
      job: e.detail.value
    })
  },

  handleSaveTap: function(e) {
    // wx.setStorage({
    //   key: "name",
    //   data: name
    // });
    // wx.setStorage({
    //   key: "phone",
    //   data: this.data.phone
    // });
    if (this.data.name === "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (this.data.phone === ""){
      wx.showToast({
        title: '请输入电话号码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log("return:" )
    var Student = Bmob.Object.extend("Student");
    var student = new Student();
    student.set("name", this.data.name);
    student.set("phone", this.data.phone);
    student.set("job", this.data.job);
    student.set("nickName", this.data.userInfo.nickName);
    student.set("gender", this.data.userInfo.gender + "");
    student.set("city", this.data.userInfo.city);
    student.set("avatarUrl", this.data.userInfo.avatarUrl);
    //添加数据，第一个入口参数是null
    student.save(null, {
      success: function (result) {
        console.log("提交个人信息成功, objectId:" + result.id);
      },
      error: function (result, error) {
        // 添加失败
        console.log('提交个人信息失败');
      }
    });
    wx.showLoading({
      title: '开启ヾ(❀╹◡╹)ﾉ~...',
    })

    setTimeout(function(){
      wx.hideLoading()
      wx.navigateBack()
    },1000)
  }

})