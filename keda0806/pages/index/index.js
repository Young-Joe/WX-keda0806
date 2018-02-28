//index.js
//获取应用实例
const app = getApp()
var Bmob = require("../../utils/bmob.js");
var that;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    completeInfo: false,
    students: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("1")
    } else if (this.data.canIUse) {
      that.getUserInfo();
    } else {
      that.getUserInfo();
    }
  },

  getUserInfo: function () {
    if (that.data.hasUserInfo) {
      return;
    }
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  onShow: function () {
    that.checkCompleteInfo();
    that.loadStudents();
  },

  completeInfo: function (e) {
    wx.navigateTo({
      url: '../create/create'
    })
  },

  updateComplete: function (e) {
    that.setData({
      completeInfo: e
    })
  },

  checkCompleteInfo: function() {
    var Student = Bmob.Object.extend("Student");
    var student = new Bmob.Query(Student);
    student.equalTo("nickName", that.data.userInfo.nickName);
    //查询单条数据，第一个参数是这条数据的objectId值
    student.find({
      success: function (result) {
        var phone = result[0].get("phone");
        if (phone != null) {
          that.updateComplete(true);
        }
      },
      error: function (object, error) {
        // 查询失败
        console.log("error");
        that.updateComplete(false);
      }
    });
  },

  loadStudents: function () {
    var Student = Bmob.Object.extend("Student");
    var student = new Bmob.Query(Student);
    // 查询所有数据
    student.find({
      success: function (results) {
        that.setData({
          students: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " +                      error.message);
      }
    });
  },

  itemClick: function (e) {
    var itemInfo = e.currentTarget.dataset;
    wx.addPhoneContact({
      nickName: itemInfo.nickname,
      firstName: itemInfo.name,
      mobilePhoneNumber: itemInfo.phone,
      addressCity: itemInfo.city,
      title: itemInfo.job
    })
  },

  openSetting: function() {
    if (that.data.hasUserInfo) {
      return;
    }
    wx.openSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    })
  },

  /**
 * 分享
 */
  onShareAppMessage: function (options) {
  },

})
