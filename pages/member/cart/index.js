var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), i = t.requirejs("jquery");

Page({
    data: {
        route: "cart",
        icons: t.requirejs("icons"),
        merch_list: !1,
        list: !1,
        edit_list: [],
        can_sync_goodscircle: !1,
        modelShow: !1
    },
    onLoad: function(a) {
        console.log(a, "121323");
        var i = this;
        e.get("black", {}, function(t) {
            t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(t) {
                    t.confirm && i.close(), t.cancel && i.close();
                }
            });
        }), t.url(a);
    },
    onShow: function() {
        t.scanCarts(), this.get_cart();
        var e = this;
        e.setData({
            imgUrl: t.globalData.approot,
            isgoods: t.globalData.isgoods
        }), wx.getSetting({
            success: function(t) {
                var a = t.authSetting["scope.userInfo"];
                e.setData({
                    limits: a
                });
            }
        });
    },
    get_cart: function() {
        var a, i = this;
        e.get("member/cart/get_cart", {}, function(e) {
            t.scanCarts(), a = {
                show: !0,
                ismerch: !1,
                ischeckall: e.ischeckall,
                can_sync_goodscircle: e.can_sync_goodscircle,
                total: e.total,
                cartcount: e.total,
                totalprice: e.totalprice,
                empty: e.empty || !1,
                sysset: e.sysset
            }, void 0 === e.merch_list ? (a.list = e.list || [], i.setData(a)) : (a.merch_list = e.merch_list || [], 
            a.ismerch = !0, i.setData(a));
        });
    },
    edit: function(t) {
        if ((o = this).data.limits) {
            var s, c = e.data(t), o = this;
            switch (c.action) {
              case "edit":
                this.setData({
                    edit: !0
                });
                break;

              case "complete":
                this.allgoods(!1), this.setData({
                    edit: !1
                });
                break;

              case "move":
                s = this.checked_allgoods().data, i.isEmptyObject(s) || e.post("member/cart/tofavorite", {
                    ids: s
                }, function(t) {
                    o.get_cart();
                });
                break;

              case "delete":
                s = this.checked_allgoods().data, i.isEmptyObject(s) || e.confirm("是否确认删除该商品?", function() {
                    e.post("member/cart/remove", {
                        ids: s
                    }, function(t) {
                        o.get_cart();
                    });
                });
                break;

              case "pay":
                this.data.total > 0 && e.get("member/cart/submit", {}, function(t) {
                    if (0 != t.error) return a.toast(o, t.message), void o.get_cart();
                    wx.navigateTo({
                        url: "/pages/order/create/index"
                    });
                });
            }
        }
    },
    checkall: function(t) {
        e.loading();
        var a = this, i = this.data.ischeckall ? 0 : 1;
        e.post("member/cart/select", {
            id: "all",
            select: i
        }, function(t) {
            a.get_cart(), e.hideLoading();
        });
    },
    update: function(t) {
        var a = this, i = this.data.ischeckall ? 0 : 1;
        e.post("member/cart/select", {
            id: "all",
            select: i
        }, function(t) {
            a.get_cart();
        });
    },
    number: function(t) {
        var i = this, s = e.pdata(t), c = a.number(this, t), o = s.id, r = s.optionid;
        1 == c && 1 == s.value && "minus" == t.target.dataset.action || s.value == s.max && "plus" == t.target.dataset.action || e.post("member/cart/update", {
            id: o,
            optionid: r,
            total: c
        }, function(t) {
            i.get_cart();
        });
    },
    selected: function(t) {
        e.loading();
        var a = this, i = e.pdata(t), s = i.id, c = 1 == i.select ? 0 : 1;
        e.post("member/cart/select", {
            id: s,
            select: c
        }, function(t) {
            a.get_cart(), e.hideLoading();
        });
    },
    allgoods: function(t) {
        var e = this.data.edit_list;
        if (!i.isEmptyObject(e) && void 0 === t) return e;
        if (t = void 0 !== t && t, this.data.ismerch) for (var a in this.data.merch_list) for (var s in this.data.merch_list[a].list) e[this.data.merch_list[a].list[s].id] = t; else for (var a in this.data.list) e[this.data.list[a].id] = t;
        return e;
    },
    checked_allgoods: function() {
        var t = this.allgoods(), e = [], a = 0;
        for (var i in t) t[i] && (e.push(i), a++);
        return {
            data: e,
            cartcount: a
        };
    },
    editcheckall: function(t) {
        var a = e.pdata(t).check, i = this.allgoods(!a);
        this.setData({
            edit_list: i,
            editcheckall: !a
        }), this.editischecked();
    },
    editischecked: function() {
        var t = !1, e = !0, a = this.allgoods();
        for (var i in this.data.edit_list) if (this.data.edit_list[i]) {
            t = !0;
            break;
        }
        for (var s in a) if (!a[s]) {
            e = !1;
            break;
        }
        this.setData({
            editischecked: t,
            editcheckall: e
        });
    },
    edit_list: function(t) {
        var a = e.pdata(t), i = this.data.edit_list;
        void 0 !== i[a.id] && 1 == i[a.id] ? i[a.id] = !1 : i[a.id] = !0, this.setData({
            edit_list: i
        }), this.editischecked();
    },
    url: function(t) {
        var a = e.pdata(t);
        wx.navigateTo({
            url: a.url
        });
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    },
    close: function() {
        t.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});