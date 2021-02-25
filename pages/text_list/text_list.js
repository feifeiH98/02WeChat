// pages/text_list/text_list.js
let datas = require('../../datas/list_data');
// console.log(datas) 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({datas:datas.list_data})
  },
  // 列表详情点击跳转
  textDetail(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail_text/detail_text?id='+id
    })
  },
  // 轮播图点击跳转页面
  PictureDetail(event) {
    let id = event.target.dataset.detailid;
    wx.navigateTo({
      url: '/pages/detail_text/detail_text?id='+id
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

  }
})