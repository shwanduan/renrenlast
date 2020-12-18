var t = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/defineProperty")), s = getApp(), e = s.requirejs("core"), a = (s.requirejs("icons"), 
s.requirejs("foxui"));

s.requirejs("wxParse/wxParse"), s.requirejs("jquery");

Page({
    data: {
        paymentmodal: !1,
        showmodal: !1,
        successmodal: !1,
        member: [],
        goods: [],
        options: [],
        carrierInfo: [],
        stores: [],
        is_openmerch: !1,
        isverify: !1,
        iswechat: !0,
        iscredit: !0,
        paytype: "",
        togglestore: "",
        addressid: 0,
        dispatchprice: 0,
        allprice: 0,
        logid: 0,
        successmessage: "",
        successstatus: !1,
        storeids: ""
    },
    onLoad: function(t) {
        var s = this;
        t = t || {}, wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), s.setData({
            options: t
        });
    },
    onShow: function() {
        var t = this, e = s.getCache("isIpx"), a = s.getCache("orderAddress"), d = s.getCache("orderShop");
        d && t.setData({
            carrierInfo: d
        });
        t.data.addressid;
        a.id > 0 && (t.data.addressid = a.id, t.setData({
            addressid: a.id
        }), t.setData({
            address: a
        }), t.getDetail()), e ? t.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : t.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), "" == t.data.member && t.getDetail(), wx.getSetting({
            success: function(s) {
                var e = s.authSetting["scope.userInfo"];
                t.setData({
                    limits: e
                });
            }
        });
    },
    listChange: function(t) {
        var s = this.data.member;
        switch (t.target.id) {
          case "realname":
            s.realname = t.detail.value;
            break;

          case "mobile":
            s.mobile = t.detail.value;
        }
        this.setData({
            member: s
        });
    },
    getDetail: function() {
        var t = this, s = t.data.options;
        console.log(s, "options"), e.get("creditshop/create", s, function(s) {
            if (0 == s.error) {
                s.goods.num = 1, t.setData({
                    storeids: s.goods.storeids,
                    goods: s.goods,
                    shop: s.shop,
                    stores: s.stores,
                    isverify: s.goods.isverify,
                    member: s.member,
                    addressid: t.data.addressid ? t.data.addressid : s.address.id,
                    credittext: s.sysset.texts.credit
                }), console.log(s.address.id, "addressssss");
                0 == s.goods.isverify && 0 == s.goods.type && s.address.id > 0 ? (e.get("creditshop/create/getaddress", {
                    addressid: t.data.addressid
                }, function(s) {
                    0 == s.error && t.setData({
                        address: s.address
                    });
                }), t.dispatch()) : t.setData({
                    allprice: s.goods.money
                });
            }
        });
    },
    dispatch: function() {
        var t = this;
        e.get("creditshop/create/dispatch", {
            goodsid: t.data.goods.id,
            addressid: t.data.addressid,
            optionid: t.data.options.optionid
        }, function(s) {
            var e = s.dispatch;
            e = parseFloat(e) + parseFloat(t.data.goods.money), t.setData({
                dispatchprice: s.dispatch,
                allprice: e
            });
        });
    },
    number: function(t) {
        var s = this, d = s.data.goods, i = s.data.options, o = t.target.dataset.action;
        "minus" == o ? d.num = parseInt(d.num) - 1 : "plus" == o && (d.num = parseInt(d.num) + 1), 
        d.num < 1 && (d.num = 1);
        var r = d.num;
        e.get("creditshop/create/number", {
            goodsid: d.id,
            optionid: i.id,
            num: r,
            addressid: s.data.addressid
        }, function(t) {
            if (0 == t.goods.canbuy) return d.num > 1 && (d.num = parseInt(d.num) - 1), s.setData({
                goods: d
            }), void a.toast(s, t.goods.buymsg);
            (d = t.goods).num = r;
            var e = parseFloat(d.money * r) + parseFloat(d.dispatch);
            s.setData({
                goods: d,
                allprice: e
            }), s.setData({
                dispatchprice: t.goods.dispatch
            });
        });
    },
    pay: function() {
        var t = this.data.goods, s = this.data.dispatchprice, e = t.money * t.num + parseFloat(s);
        if (e = e.toFixed(2), t.canbuy) {
            if (t.isverify > 0) {
                var d = this.data.member;
                if ("" == d.realname) return void a.toast(this, "请填写真实姓名");
                if ("" == d.mobile) return void a.toast(this, "请填写联系电话");
                if (0 == this.data.carrierInfo.length) return void a.toast(this, "请选择兑换门店");
            }
            if (0 == t.isverify && 0 == t.goodstype && 0 == t.type) {
                var i = this.data.addressid;
                if (0 == i || null == i) return void a.toast(this, "请选择收货地址");
            }
            1 == t.type && this.setData({
                addressid: 0
            }), 0 == e ? this.setData({
                showmodal: !0
            }) : this.setData({
                paymentmodal: !0
            });
        } else a.toast(this, this.data.goods.buymsg);
    },
    cancel: function() {
        this.setData({
            paymentmodal: !1,
            showmodal: !1
        });
    },
    payClick: function(t) {
        var s = t.target.dataset.type;
        this.setData({
            paymentmodal: !1,
            showmodal: !0,
            paytype: s
        });
    },
    confirm: function() {
        var s, d = this, i = d.data.paytype;
        1 != d.data.clickYes && (d.data.clickYes = 1, e.get("creditshop/detail/pay", (s = {
            id: d.data.goods.id,
            addressid: d.data.addressid,
            optionid: d.data.options.optionid,
            num: d.data.goods.num,
            paytype: d.data.paytype
        }, (0, t.default)(s, "addressid", d.data.addressid), (0, t.default)(s, "storeid", d.data.carrierInfo.id), 
        s), function(t) {
            if (t.error > 0) return a.toast(d, t.message), void (d.data.clickYes = 0);
            d.setData({
                logid: t.logid
            }), t.wechat && t.wechat.success && e.pay(t.wechat.payinfo, function(t) {
                "requestPayment:ok" == t.errMsg && (d.lottery(), d.data.clickYes = 0);
            }), "credit" == i && t.logid > 0 && (d.lottery(), d.data.clickYes = 0), "" == i && t.logid > 0 && (d.lottery(), 
            d.data.clickYes = 0);
        }));
    },
    success: function() {
        var t = this.data.logid;
        wx.redirectTo({
            url: "/pages/creditshop/log/detail/index?id=" + t
        });
    },
    lottery: function() {
        var t = this, s = t.data.goods.type, d = "";
        0 == s ? e.get("creditshop/detail/lottery", {
            id: t.data.goods.id,
            logid: t.data.logid
        }, function(s) {
            s.error > 0 ? a.toast(t, s.message) : (2 == s.status && (d = "恭喜您，商品兑换成功"), 3 == s.status && (1 == s.goodstype ? d = "恭喜您，优惠券兑换成功" : 2 == s.goodstype ? d = "恭喜您，余额兑换成功" : 3 == s.goodstype && (d = "恭喜您，红包兑换成功")), 
            t.setData({
                successmessage: d,
                successstatus: !0
            }));
        }) : (d = "努力抽奖中，请稍后....", t.setData({
            successmessage: d,
            successstatus: !0
        }), setTimeout(function() {
            e.get("creditshop/detail/lottery", {
                id: t.data.goods.id,
                logid: t.data.logid
            }, function(s) {
                s.error > 0 ? a.toast(t, s.message) : (2 == s.status ? d = "恭喜您，您中奖啦" : 3 == s.status ? 1 == s.goodstype ? d = "恭喜您，优惠券已经发到您账户啦" : 2 == s.goodstype ? d = "恭喜您，余额已经发到您账户啦" : 3 == s.goodstype && (d = "恭喜您，红包兑换成功") : d = "很遗憾，您没有中奖", 
                t.setData({
                    successmessage: d,
                    successstatus: !0
                }));
            });
        }, 1e3)), t.setData({
            successmodal: !0
        });
    },
    toggle: function(t) {
        "" == this.data.togglestore ? this.setData({
            togglestore: "toggleSend-group"
        }) : this.setData({
            togglestore: ""
        });
    }
});