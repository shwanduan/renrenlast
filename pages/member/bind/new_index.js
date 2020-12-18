var t = getApp(), a = t.requirejs("core"), s = t.requirejs("foxui"), e = t.requirejs("jquery");

Page({
    data: {
        binded: !1,
        endtime: 0,
        submit: !1,
        subtext: "立即绑定",
        smsimgcode: "",
        mobile: "",
        password: "",
        password1: "",
        confirm: 1
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "绑定手机号"
        }), console.log(t), this.setData({
            mobile: t.mobile,
            show: !0
        });
    },
    inputChange: function(t) {
        var a = e.trim(t.detail.value);
        this.setData({
            password: a
        });
    },
    iptChange: function(t) {
        var a = e.trim(t.detail.value);
        this.setData({
            password1: a
        });
    },
    submit: function(t) {
        if (!this.data.submit) {
            var e = this;
            e.data.password && "" != e.data.password ? e.data.password1 && "" != e.data.password1 ? e.data.password.length < 6 || e.data.password1.length < 6 ? s.toast(this, "至少输入6位密码") : e.data.password == e.data.password1 ? (this.setData({
                submit: !0,
                subtext: "正在绑定..."
            }), a.post("member/bind/submit", {
                mobile: e.data.mobile,
                password: e.data.password
            }, function(t) {
                return 92001 == t.error || 92002 == t.error ? (a.confirm(t.message, function() {
                    a.post("member/bind/submit", {
                        mobile: e.data.mobile,
                        password: e.data.password,
                        confirm: 1
                    }, function(t) {
                        console.log(t, "90909"), t.error > 0 ? s.toast(e, t.message) : wx.navigateBack();
                    }, !0, !0, !0);
                }), void e.setData({
                    submit: !1,
                    subtext: "立即绑定",
                    confirm: 0
                })) : 0 != t.error ? (s.toast(e, t.message), void e.setData({
                    submit: !1,
                    subtext: "立即绑定"
                })) : void wx.navigateBack();
            }, !0, !0, !0)) : s.toast(this, "两次输入的密码不一致") : s.toast(this, "请确认登录密码") : s.toast(this, "请填写登录密码");
        }
    }
});