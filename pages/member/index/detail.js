var e = getApp(), n = e.requirejs("core");

e.requirejs("wxParse/wxParse"), e.requirejs("biz/diypage"), e.requirejs("jquery");

Page({
    data: {
        avatar: "",
        nickname: "",
        mobile: ""
    },
    onLoad: function(e) {
        console.log(e), this.setData({
            avatar: e.avatar,
            nickname: e.nickname
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        n.get("member", {}, function(n) {
            e.setData({
                mobile: n.mobile
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});