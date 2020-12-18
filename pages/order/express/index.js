var t = getApp(), s = t.requirejs("core");

Page({
    data: {
        value:''
    },
    onLoad: function(s) {
        this.setData({
            options: s
        }), t.url(s), this.get_list();
    },
    copy(){
         let _this = this
        console.log(this.data.value)
        wx.setClipboardData({
          data: _this.data.sn,
          success(rs){
              console.log(JSON.stringify(rs));
          }
        })
    },
    get_list: function() {
        var t = this;
        s.get("order/express", t.data.options, function(e) {
            0 == e.error ? (e.show = !0, t.setData(e)) : s.toast(e.message, "loading");
        });
    }
});