var t = getApp(), e = t.requirejs("core"), a = t.requirejs("biz/order");

Page({
    data: {
        code: !1,
        consume: !1,
        store: !1,
        cancel: a.cancelArray,
        cancelindex: 0,
        diyshow: {},
        city_express_state: 0,
        showInvoice: !1
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), t.url(e);
    },
    onShow: function() {
        this.get_list();
        t.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    get_list: function() {
        var t = this;
        e.get("order/detail", t.data.options, function(a) {
            if (a.error > 0 && (5e4 != a.error && e.toast(a.message, "loading"), wx.redirectTo({
                url: "/pages/order/index"
            })), null != a.nogift[0].fullbackgoods) {
                var o = a.nogift[0].fullbackgoods.fullbackratio, i = a.nogift[0].fullbackgoods.maxallfullbackallratio;
                o = Math.round(o), i = Math.round(i);
            }
            if (0 == a.error) {
                a.show = !0;
                var n = Array.isArray(a.ordervirtual);
                t.setData(a), t.setData({
                    ordervirtualtype: n,
                    fullbackgoods: a.nogift[0].fullbackgoods,
                    maxallfullbackallratio: i,
                    fullbackratio: o,
                    invoice: a.order.invoicename,
                    membercard_info: a.membercard_info
                });
            }
        });
    },
    more: function() {
        this.setData({
            all: !0
        });
    },
    code: function(t) {
        var a = this, o = e.data(t).orderid;
        e.post("verify/qrcode", {
            id: o
        }, function(t) {
            0 == t.error ? a.setData({
                code: !0,
                qrcode: t.url
            }) : e.alert(t.message);
        }, !0);
    },
    diyshow: function(t) {
        var a = this.data.diyshow, o = e.data(t).id;
        a[o] = !a[o], this.setData({
            diyshow: a
        });
    },
    close: function() {
        this.setData({
            code: !1
        });
    },
    toggle: function(t) {
        var a = e.pdata(t), o = a.id, i = a.type, n = {};
        n[i] = 0 == o || void 0 === o ? 1 : 0, this.setData(n);
    },
    phone: function(t) {
        e.phone(t);
    },
    cancel: function(t) {
        a.cancel(this.data.options.id, t.detail.value, "/pages/order/detail/index?id=" + this.data.options.id);
    },
    delete: function(t) {
        var o = e.data(t).type;
        a.delete(this.data.options.id, o, "/pages/order/index");
    },
    finish: function(t) {
        a.finish(this.data.options.id, "/pages/order/index");
    },
    refundcancel: function(t) {
        var e = this;
        a.refundcancel(this.data.options.id, function() {
            e.get_list();
        });
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    },
    bindCopy: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.content.value, a = t.currentTarget.dataset.content.key;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: a + "已复制",
                    duration: 2e3,
                    icon: "success"
                });
            }
        });
    },
    bindCopyText: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.content;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "发货信息已复制",
                    duration: 2e3,
                    icon: "success"
                });
            }
        });
    },
    seeInvoice: function() {
        this.setData({
            showInvoice: !0
        });
    },
    closeInvoice: function() {
        this.setData({
            showInvoice: !1
        });
    },
    previewImage: function(t) {
        var e = t.target.dataset.src;
        wx.previewImage({
            current: e,
            urls: [ e ]
        });
    }
});