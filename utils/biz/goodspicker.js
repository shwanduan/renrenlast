var t = require("../../@babel/runtime/helpers/interopRequireDefault");

require("../../@babel/runtime/helpers/Objectvalues");

var a = t(require("../../@babel/runtime/helpers/typeof")), e = getApp(), o = (e.requirejs("jquery"), 
e.requirejs("core")), i = e.requirejs("foxui"), d = e.requirejs("biz/diyform");

module.exports = {
    number: function(t, a) {
        var e = o.pdata(t), d = i.number(a, t), s = (e.id, e.optionid, e.min);
        e.max;
        1 == d && 1 == e.value && "minus" == t.target.dataset.action || d < s && "minus" == t.target.dataset.action ? i.toast(a, "单次最少购买" + e.value + "件") : e.value == e.max && "plus" == t.target.dataset.action || (parseInt(a.data.stock) < parseInt(d) ? i.toast(a, "库存不足") : a.setData({
            total: d
        }));
    },
    inputNumber: function(t, a) {
        var e = a.data.goods.maxbuy, o = a.data.goods.minbuy, d = t.detail.value;
        if (d > 0) {
            if (e > 0 && e <= parseInt(t.detail.value) && (d = e, i.toast(a, "单次最多购买" + e + "件")), 
            o > 0 && o > parseInt(t.detail.value) && (d = o, i.toast(a, "单次最少购买" + o + "件")), 
            parseInt(a.data.stock) < parseInt(d)) return void i.toast(a, "库存不足");
        } else d = o > 0 ? o : "";
        a.setData({
            total: d
        });
    },
    chooseGift: function(t, a) {
        a.setData({
            giftid: t.currentTarget.dataset.id
        });
    },
    buyNow: function(t, a, e) {
        t.currentTarget.dataset.type && (e = t.currentTarget.dataset.type);
        var s = a.data.optionid, r = a.data.goods.hasoption, n = a.data.diyform, l = a.data.giftid;
        if (9 == a.data.goods.type) var g = a.data.checkedDate / 1e3;
        if (r > 0 && !s) i.toast(a, "请选择规格"); else if (n && n.fields.length > 0) {
            if (!d.verify(a, n)) return;
            o.post("order/create/diyform", {
                id: a.data.id,
                diyformdata: n.f_data
            }, function(t) {
                0 == a.data.goods.isgift || "goods_detail" != e ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + a.data.id + "&total=" + a.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&selectDate=" + g
                }) : l ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + a.data.id + "&total=" + a.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + l
                }) : "" != l ? (a.data.goods.giftinfo && 1 == a.data.goods.giftinfo.length && (l = a.data.goods.giftinfo[0].id), 
                a.data.goods.gifts && 1 == a.data.goods.gifts.length && (l = a.data.goods.gifts[0].id), 
                wx.redirectTo({
                    url: "/pages/order/create/index?id=" + a.data.id + "&total=" + a.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + l
                })) : i.toast(a, "请选择赠品");
            });
        } else l ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + a.data.id + "&total=" + a.data.total + "&optionid=" + s + "&giftid=" + l
        }) : 0 == a.data.goods.isgift || "goods_detail" != e ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + a.data.id + "&total=" + a.data.total + "&optionid=" + s + "&selectDate=" + g
        }) : "" != l ? (a.data.goods.giftinfo && 1 == a.data.goods.giftinfo.length && (l = a.data.goods.giftinfo[0].id), 
        a.data.goods.gifts && 1 == a.data.goods.gifts.length && (l = a.data.goods.gifts[0].id), 
        wx.navigateTo({
            url: "/pages/order/create/index?id=" + a.data.id + "&total=" + a.data.total + "&optionid=" + s + "&giftid=" + l
        })) : i.toast(a, "请选择赠品");
    },
    getCart: function(t, a) {
        var s = a.data.optionid, r = a.data.goods.hasoption, n = a.data.diyform;
        if (r > 0 && !s) i.toast(a, "请选择规格"); else if (a.data.quickbuy) {
            if (n && n.fields.length > 0) {
                if (!d.verify(a, n)) return;
                a.setData({
                    formdataval: {
                        diyformdata: n.f_data
                    }
                });
            }
            a.addCartquick(s, a.data.total);
        } else if (n && n.fields.length > 0) {
            if (!d.verify(a, n)) return;
            o.post("order/create/diyform", {
                id: a.data.id,
                diyformdata: n.f_data
            }, function(t) {
                o.post("member/cart/add", {
                    id: a.data.id,
                    total: a.data.total,
                    optionid: s,
                    diyformdata: n.f_data
                }, function(t) {
                    0 == t.error ? (a.setData({
                        "goods.cartcount": t.cartcount,
                        active: "",
                        slider: "out",
                        isSelected: !0,
                        tempname: ""
                    }), e.scanCarts(), i.toast(a, "添加成功")) : i.toast(a, t.message);
                });
            });
        } else o.post("member/cart/add", {
            id: a.data.id,
            total: a.data.total,
            optionid: s
        }, function(t) {
            if (0 == t.error) {
                e.scanCarts(), i.toast(a, "添加成功");
                var o = a.data.goods;
                a.setData({
                    "goods.cartcount": t.cartcount,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    goods: o
                });
            } else i.toast(a, t.message);
        });
    },
    selectpicker: function(t, a, d, s) {
        1 == t.currentTarget.dataset.home && a.setData({
            giftid: ""
        }), e.checkAuth();
        var r = a.data.active, n = t.currentTarget.dataset.id;
        "" == r && a.setData({
            slider: "in",
            show: !0
        }), o.get("goods/get_picker", {
            id: n
        }, function(e) {
            if (e.goods.presellstartstatus || null == e.goods.presellstartstatus || "1" != e.goods.ispresell) if (e.goods.member_discount > 0 && a.setData({
                "goods.member_discount": e.goods.member_discount
            }), e.goods.presellendstatus || null == e.goods.presellstartstatus || "1" != e.goods.ispresell) {
                e.goods && e.goods.giftinfo && 1 == e.goods.giftinfo.length && a.setData({
                    giftid: e.goods.giftinfo[0].id
                });
                var o = e.options;
                if ("goodsdetail" == d) if (a.setData({
                    pickerOption: e,
                    canbuy: a.data.goods.canbuy,
                    buyType: t.currentTarget.dataset.buytype,
                    options: o,
                    minpicker: d,
                    "goods.thistime": e.goods.thistime
                }), 0 != e.goods.minbuy && a.data.total < e.goods.minbuy) var r = e.goods.minbuy; else r = a.data.total; else if (a.setData({
                    pickerOption: e,
                    goods: e.goods,
                    options: o,
                    minpicker: d
                }), a.setData({
                    optionid: !1,
                    specsData: [],
                    specs: []
                }), 0 != e.goods.minbuy && a.data.total < e.goods.minbuy) r = e.goods.minbuy; else r = 1;
                e.diyform && a.setData({
                    diyform: {
                        fields: e.diyform.fields,
                        f_data: e.diyform.lastdata
                    }
                }), a.setData({
                    id: n,
                    pagepicker: d,
                    total: r,
                    tempname: "select-picker",
                    active: "active",
                    show: !0,
                    modeltakeout: s
                });
            } else i.toast(a, e.goods.presellstatustitle); else i.toast(a, e.goods.presellstatustitle);
        });
    },
    sortNumber: function(t, a) {
        return t - a;
    },
    specsTap: function(t, e) {
        console.log(t), console.log(e);
        var o = e.data.specs;
        o[t.target.dataset.idx] = {
            id: t.target.dataset.id,
            title: t.target.dataset.title
        };
        var d, s = "", r = [];
        o.forEach(function(t) {
            s += t.title + ";", r.push(t.id);
        });
        var n = r.sort(this.sortNumber);
        d = n.join("_");
        var l = e.data.options;
        "object" == (0, a.default)(l) && (l = Object.values(l)), "" != t.target.dataset.thumb && e.setData({
            "goods.thumb": t.target.dataset.thumb
        }), console.log(111111111111), console.log(l), console.log(111111111111), l.forEach(function(t) {
            t.specs == d && (console.log(111111111111), console.log(t), console.log(111111111111), 
            e.setData({
                optionid: t.id,
                "goods.total": t.stock,
                "goods.maxprice": t.marketprice,
                "goods.minprice": t.marketprice,
                "goods.marketprice": t.marketprice,
                "goods.member_discount": t.member_discount,
                "goods.seecommission": t.seecommission,
                "goods.presellprice": e.data.goods.ispresell > 0 ? t.presellprice : e.data.goods.presellprice,
                optionCommission: !0
            }), parseInt(t.stock) < parseInt(e.data.total) ? (e.setData({
                canBuy: "库存不足",
                stock: t.stock
            }), i.toast(e, "库存不足")) : e.setData({
                canBuy: "",
                stock: t.stock
            }));
        }), e.setData({
            specsData: o,
            specsTitle: s
        });
    }
};