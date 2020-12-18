var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../../@babel/runtime/helpers/defineProperty")), a = e(require("../../../@babel/runtime/helpers/typeof")), i = e(require("../../../utils/address-parse")), s = getApp(), r = s.requirejs("core"), d = s.requirejs("foxui"), o = s.requirejs("jquery");

Page({
    data: {
        id: null,
        posting: !1,
        subtext: "保存地址",
        detail: {
            realname: "",
            mobile: "",
            areas: "",
            street: "",
            address: ""
        },
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        street: [],
        streetIndex: 0,
        noArea: !1,
        color: "#c8c8cd",
        intelShow: !1,
        runAM: !1,
        intellshow: !1,
        height: 0,
        textRemark: "粘贴地址信息，可自动识别并填写如：姓名，电话，山东省青岛市xxx区xxx街道xxxxxxx",
        showText: !0,
        onFacus: !1,
        isnew: !1
    },
    onLoad: function(e) {
        var t = this;
        if (e.params) {
            var i = JSON.parse(e.params);
            r.get("member/address/get_detail", {
                id: Number(e.id)
            }, function(e) {
                t.data.need_open_street = e.openstreet, t.data.isnew = e.new, t.data.isnew ? i.province = "天津市" == i.province ? "天津" : i.province : i.city = "天津市" == i.city ? "天津辖区" : i.city, 
                "object" == (0, a.default)(i) ? t.setData({
                    detail: i
                }) : t.setData({
                    detail: JSON.parse(i)
                });
            });
        }
        this.setData({
            id: Number(e.id)
        }), this.setData({
            areas: s.getCache("cacheset").areas,
            type: e.type
        }), s.url(e), this.getDetail(), e.id || wx.setNavigationBarTitle({
            title: "添加收货地址"
        });
    },
    getDetail: function() {
        var e = this, t = e.data.id;
        r.get("member/address/get_detail", {
            id: t
        }, function(t) {
            var a = {
                openstreet: t.openstreet,
                show: !0
            };
            if (o.isEmptyObject(t.detail)) {
                if (e.data.detail) {
                    console.log(e.data.detail);
                    i = e.data.detail.province + " " + e.data.detail.city + " " + e.data.detail.area, 
                    s = e.getIndex(i, e.data.areas);
                    a.pval = s, a.pvalOld = s;
                }
            } else {
                wx.setNavigationBarTitle({
                    // title: "编辑收货地址"
                });
                var i = t.detail.province + " " + t.detail.city + " " + t.detail.area, s = e.getIndex(i, e.data.areas);
                a.pval = s, a.pvalOld = s, a.detail = t.detail;
            }
            console.log(s), e.setData(a), t.openstreet && s && e.getStreet(e.data.areas, s);
        });
    },
    submit: function() {
        var e = this, t = e.data.detail;
        e.data.posting || ("" != t.realname && t.realname ? "" != t.mobile && t.mobile ? "" != t.city && t.city ? !(e.data.street.length > 0) || "" != t.street && t.street ? "" != t.address && t.address ? (console.log(t), 
        t.is_from_wx && e.onConfirm("is_from_wx"), console.log(t.datavalue), t.datavalue ? /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(t.mobile) ? (t.id = e.data.id || "", 
        e.setData({
            posting: !0
        }), r.post("member/address/submit", t, function(a) {
            if (0 != a.error) return e.setData({
                posting: !1
            }), void d.toast(e, a.message);
            e.setData({
                subtext: "保存成功"
            }), r.toast("保存成功"), setTimeout(function() {
                t.id = a.addressid, console.log(e.data.type), console.log("member" == e.data.type), 
                "member" != e.data.type ? "quickaddress" == e.data.type ? (s.setCache("orderAddress", t, 30), 
                wx.navigateBack()) : wx.navigateTo({
                    url: "/pages/member/address/select"
                }) : wx.navigateBack();
            }, 1e3);
        })) : d.toast(e, "请填写正确联系电话") : d.toast(e, "地址数据出错，请重新选择")) : d.toast(e, "请填写详细地址") : d.toast(e, "请选择所在街道") : d.toast(e, "请选择所在地区") : d.toast(e, "请填写联系电话") : d.toast(e, "请填写收件人"));
    },
    onChange: function(e) {
        var t = this.data.detail, a = e.currentTarget.dataset.type, i = o.trim(e.detail.value);
        "street" == a && (t.streetdatavalue = this.data.street[i].code, i = this.data.street[i].name), 
        t[a] = i, this.setData({
            detail: t
        });
    },
    getStreet: function(e, t) {
        if (console.log(e, t), e && t) {
            var a = this;
            if (a.data.detail.province && a.data.detail.city && this.data.openstreet) {
                var i = e[t[0]].city[t[1]].code, s = e[t[0]].city[t[1]].area[t[2]].code;
                r.get("getstreet", {
                    city: i,
                    area: s
                }, function(e) {
                    var t = e.street, i = {
                        street: t
                    };
                    if (t && a.data.detail.streetdatavalue) for (var s in t) if (t[s].code == a.data.detail.streetdatavalue) {
                        i.streetIndex = s, a.setData({
                            "detail.street": t[s].name
                        });
                        break;
                    }
                    a.setData(i);
                });
            }
        }
    },
    selectArea: function(e) {
        var t = e.currentTarget.dataset.area, a = this.getIndex(t, this.data.areas);
        this.setData({
            pval: a,
            pvalOld: a,
            showPicker: !0
        });
    },
    bindChange: function(e) {
        var t = this.data.pvalOld, a = e.detail.value;
        t[0] != a[0] && (a[1] = 0), t[1] != a[1] && (a[2] = 0), this.setData({
            pval: a,
            pvalOld: a
        });
    },
    onCancel: function(e) {
        this.setData({
            showPicker: !1
        });
    },
    onConfirm: function(e) {
        var t = this.data.pval, a = this.data.areas, i = this.data.detail;
        i.province = a[t[0]].name, i.city = a[t[0]].city[t[1]].name, i.datavalue = a[t[0]].code + " " + a[t[0]].city[t[1]].code, 
        a[t[0]].city[t[1]].area && a[t[0]].city[t[1]].area.length > 0 ? (i.area = a[t[0]].city[t[1]].area[t[2]].name, 
        i.datavalue += " " + a[t[0]].city[t[1]].area[t[2]].code, this.getStreet(a, t)) : i.area = "", 
        "is_from_wx" != e && (i.street = ""), this.setData({
            detail: i,
            streetIndex: 0,
            showPicker: !1
        });
    },
    getIndex: function(e, t) {
        if ("" == o.trim(e) || !o.isArray(t)) return [ 0, 0, 0 ];
        var a = e.split(" "), i = [ 0, 0, 0 ];
        for (var s in t) if (t[s].name == a[0]) {
            for (var r in i[0] = Number(s), t[s].city) if (t[s].city[r].name == a[1]) {
                for (var d in i[1] = Number(r), t[s].city[r].area) if (t[s].city[r].area[d].name == a[2]) {
                    i[2] = Number(d);
                    break;
                }
                break;
            }
            break;
        }
        return i;
    },
    chooseAddress: function() {
        this.data.can = !1, wx.chooseAddress({
            success: function(e) {
                var t = {
                    realname: e.userName,
                    mobile: e.telNumber,
                    address: e.detailInfo,
                    province: e.provinceName,
                    city: e.cityName,
                    area: e.countyName,
                    is_from_wx: 1
                };
                setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/member/address/post?type=quickaddress&params=" + JSON.stringify(t)
                    });
                }, 0);
            }
        });
    },
    bindtextarea: function(e) {
        this.setData({
            textRemark: e.detail.value
        });
    },
    intelligenceSubmit: function() {
        var e;
        if ("粘贴地址信息，可自动识别并填写如：姓名，电话，山东省青岛市xxx区xxx街道xxxxxxx" == this.data.textRemark) return this.setData({
            showText: !0
        }), void d.toast(this, "粘贴内容不能为空");
        var a = this.data.textRemark, s = (0, i.default)(a, {
            type: 0,
            textFilter: [ "电話", "電話", "聯系人", "手机号" ]
        });
        console.log(s, "智能结果。。。。。。。。。。。。"), this.setData((e = {}, (0, t.default)(e, "detail.realname", s.name), 
        (0, t.default)(e, "detail.mobile", s.phone), (0, t.default)(e, "detail.area", s.area), 
        (0, t.default)(e, "detail.address", s.detail), (0, t.default)(e, "detail.province", s.province), 
        (0, t.default)(e, "detail.city", s.city), e));
        var r = s.province + " " + s.city + " " + s.area, o = this.getIndex(r, this.data.areas);
        console.log(o), this.data.pval = o, this.data.pvalOld = o, this.getStreet(this.data.areas, o), 
        this.data.detail.datavalue = s.provinceCode + " " + s.cityCode + " " + s.areaCode;
    },
    bindCopy: function() {
        var e = this;
        wx.getClipboardData({
            success: function(t) {
                console.log(t.data), e.setData({
                    textRemark: t.data
                });
            }
        });
    },
    showTextarea: function() {
        "粘贴地址信息，可自动识别并填写如：姓名，电话，山东省青岛市xxx区xxx街道xxxxxxx" == this.data.textRemark && this.setData({
            textRemark: ""
        }), this.setData({
            showText: !1,
            onFacus: !0
        });
    },
    onShowText: function(e) {
        var t = e.detail.value;
        "" == t && (t = "粘贴地址信息，可自动识别并填写如：姓名，电话，山东省青岛市xxx区xxx街道xxxxxxx"), this.setData({
            textRemark: t,
            showText: !0,
            onFacus: !1
        });
    },
    chooseInpt: function() {
        var e = this;
        if (this.data.intelShow) {
            if (240 == e.data.height) {
                var t = 240;
                setInterval(function() {
                    (t -= 20) >= 0 && e.setData({
                        height: t
                    });
                }, 10);
            }
            e.setData({
                intelShow: !1,
                color: "#c8c8cd"
            });
        } else {
            if (0 == e.data.height) {
                t = 0;
                setInterval(function() {
                    (t += 20) <= 240 && e.setData({
                        height: t
                    });
                }, 10);
            }
            e.setData({
                intelShow: !0,
                color: "#f55"
            });
        }
    }
});