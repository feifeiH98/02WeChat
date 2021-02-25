// pages/detail/detail.js
let datas=require('../../datas/list_data.js');
let appData=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailDatas:{},
    index:0,
    isPlay:false,
    isCollected:false
  },

  // 控制音乐播放
  musicPlay() {
    let isPlay = !this.data.isPlay;
    let { dataUrl, title, coverImgUrl } = this.data.detailDatas.music;
    if (isPlay) {//音乐播放
      wx.playBackgroundAudio({
        dataUrl, title, coverImgUrl
      })
    } else {//音乐暂停
      wx.pauseBackgroundAudio()
    }
    // 更新isPlay的状态
    this.setData({ isPlay })
  },
  // 是否收藏
  collection() {
    let isCollected = !this.data.isCollected;
    // 考虑用户是否收藏过，1.没有收藏，2.收藏过则取消
    // 所以先从本地存储 中获取数据
    let obj = wx.getStorageSync('isCollected');
    obj[this.data.index] = isCollected;
    // 提示用户收藏的状态
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    });
    // 异步缓存收藏状态
    wx.setStorage({
      key: 'isCollected',
      data: obj
    });
    // 更新收藏状态
    this.setData({ isCollected })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ detailDatas: datas.list_data[options.id], index: options.id});
    // 获取本地存储数据
    let storageObj=wx.getStorageSync('isCollected');
    // 判断是否存储过
    if (!storageObj){// 无
      storageObj = {};
      wx.setStorage({
        key: 'isCollected',
        data: storageObj
      })     
    }else{//有
      // 根据是否收藏动态生成isCollected状态
      let isCollected = storageObj[options.id] ? true : false;
      this.setData({ isCollected })
    }

    // 判断当前音乐是否播放
    if (appData.data.isMusicPlay && appData.data.playIndex===this.data.index){
      this.setData({
        isPlay:true
      })
    }
    // 监听背景音乐的播放
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        isPlay:true
      });
      appData.data.isMusicPlay=true;
      appData.data.playIndex=this.data.index;
    });
    // 监听背景音乐的暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isPlay:false
      })
    })
  },
  // 是否分享 
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享给朋友',
        '分享到朋友圈',
        '分享到QQ空间',
        '分享到微博'
      ],
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