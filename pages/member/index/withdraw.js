// pages/member/index/withdraw.js
var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));

Page({

  /**
   * 页面的初始数据
   */
  data: {
     
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
  try(){
     if(!this.data.value){
       wx.showModal({
         title:'提示',
         content:'金额不能为空',
         showCancel:false,
         success(){
          //  console.log(JSON.stringify(res))
          e.get("",{},function(res){
            console.log(JSON.stringify(res))
          })
         }
         
       })
     }else{
       console.log(22222222222222)
     }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.setData({
        value:''
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

  }
})