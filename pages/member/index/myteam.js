// pages/member/index/myteam.js
var t = getApp(),
  e = t.requirejs("core"),
  a = (t.requirejs("icons"), t.requirejs("jquery"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // twoValue:''
    // turnshow: ''
    show: true,
    twoshow: false


  },
  change() {

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
    
    this.setData({
      turnshow:true
    })
   var _this = this
    e.get("commission.down.getOneList", {}, function (res) {
     
      // _this.setData({
      //   two: res.list
      // })
      // let t = _this.data.two
      // t.forEach((item) => {
      //   console.log(item)
      //   item['turnshow'] = 'false'
      // })
      
      // _this.setData({
      //   one: t
      // })

      _this.setData({
        one:res.list
      })
    })
  },

  getTwo(y) {
    console.log(JSON.stringify(y),'111111111111111111111')
    var s =  this.data.show
    this.setData({
      show:!this.data.show,
      twoValue : y.currentTarget.dataset.id,
      twoshow:!this.data.twoshow
    })

        
//     let arr = this.data.one
    
//      let newone = arr.map((a,b,c)=>{
//      if(b==y.currentTarget.dataset.index &&a.turnshow !== true ){
//           a.turnshow = true
//           return a
//      } else if(b==y.currentTarget.dataset.index && a.turnshow == true){
//             a.turnshow = false
//      }
//      return a
//   })
//   console.log(newone,'newewewewewewewew')

//   this.setData({
//     one:newone
//  })

    let _this = this
    let id = {
      id: y.currentTarget.dataset.id
    }
    e.get("commission.down.getTwoList", id, function (rs) {


      // _this.data.two.forEach((item)=>{
      //   console.log(item)
      //   item['turnshow']  = "true"
      // })
      _this.setData({
        two: rs.list
      })
      console.log(_this.data.two, '24923840280')
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