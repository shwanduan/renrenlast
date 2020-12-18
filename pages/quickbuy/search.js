var t = getApp(), e = t.requirejs("core"), s = t.requirejs("jquery"), a = t.requirejs("biz/diyform"), i = t.requirejs("biz/goodspicker");

t.requirejs("foxui");

Page({
    data: {
        specs: [],
        options: [],
        diyform: {},
        specsTitle: "",
        total: 1,
        active: "",
        slider: "",
        tempname: "",
        buyType: "",
        icons: t.requirejs("icons"),
        isFilterShow: !1,
        listmode: "block",
        listsort: "",
        page: 1,
        loaded: !1,
        loading: !0,
        allcategory: [],
        catlevel: -1,
        opencategory: !1,
        category: {},
        category_child: [],
        category_third: [],
        filterBtns: {},
        isfilter: 0,
        list: [],
        params: {},
        count: 0,
        defaults: {
            keywords: "",
            isrecommand: "",
            ishot: "",
            isnew: "",
            isdiscount: "",
            issendfree: "",
            istime: "",
            cate: "",
            order: "",
            by: "desc",
            merchid: 0
        },
        lastcat: "",
        fromsearch: !1,
        searchRecords: [],
        areas: [],
        limits: !0,
        modelShow: !1,
        canload: !0,
        quick: "",
        pageid: ""
    },
    onLoad: function(e) {
        var a = this;
        if (a.setData({
            imgUrl: t.globalData.approot
        }), setTimeout(function() {
            a.setData({
                areas: t.getCache("cacheset").areas
            });
        }, 3e3), !s.isEmptyObject(e)) {
            var i = e.isrecommand || e.isnew || e.ishot || e.isdiscount || e.issendfree || e.istime ? 1 : 0;
            this.setData({
                params: e,
                isfilter: i,
                filterBtns: e,
                fromsearch: e.fromsearch || !1
            }), console.log(a.data.params);
        }
        e.fromsearch || this.getList(), e.quick && a.setData({
            quick: e.quick,
            pageid: e.id
        });
    },
    onShow: function() {
        this.data.fromsearch && this.setFocus();
        var t = this;
        wx.getSetting({
            success: function(e) {
                var s = e.authSetting["scope.userInfo"];
                t.setData({
                    limits: s
                });
            }
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || 1 == this.data.canload && this.getList();
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), this.data.canload = !1, t.data.params.page = t.data.page, t.data.params.id = t.data.pageid, 
        e.post("quick/index/searchgoods", t.data.params, function(e) {
            var s = {
                loading: !1,
                count: e.total,
                total: e.total,
                show: !0
            };
            e.list || (e.list = []), e.list.length > 0 && (s.page = t.data.page + 1, s.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (s.loaded = !0)), t.setData(s), t.data.canload = !0;
        });
    },
    changeMode: function() {
        "block" == this.data.listmode ? this.setData({
            listmode: ""
        }) : this.setData({
            listmode: "block"
        });
    },
    bindSort: function(t) {
        var e = t.currentTarget.dataset.order, s = this.data.params;
        if ("" == e) {
            if (s.order == e) return;
            s.order = "", this.setData({
                listorder: ""
            });
        } else if ("minprice" == e) this.setData({
            listorder: ""
        }), s.order == e ? "desc" == s.by ? s.by = "asc" : s.by = "desc" : s.by = "asc", 
        s.order = e, this.setData({
            listorder: s.by
        }); else if ("sales" == e) {
            if (s.order == e) return;
            this.setData({
                listorder: ""
            }), s.order = "sales", s.by = "desc";
        }
        this.setData({
            params: s,
            page: 1,
            list: [],
            loading: !0,
            loaded: !1,
            sort_selected: e
        }), this.getList();
    },
    showFilter: function() {
        this.setData({
            isFilterShow: !this.data.isFilterShow
        });
    },
    bindSearch: function(t) {
        t.target;
        this.setData({
            list: [],
            loading: !0,
            loaded: !1
        });
        var e = s.trim(t.detail.value), a = this.data.defaults;
        "" != e ? (a.keywords = e, this.setData({
            page: 1,
            params: a,
            fromsearch: !1
        }), this.getList(), this.setRecord(e)) : (a.keywords = "", this.setData({
            page: 1,
            params: a,
            listorder: "",
            fromsearch: !1
        }), this.getList());
    },
    bindInput: function(t) {
        var e = s.trim(t.detail.value), a = this.data.defaults;
        a.keywords = "", a.order = this.data.params.order, a.by = this.data.params.by, "" == e && (this.setData({
            page: 1,
            list: [],
            loading: !0,
            loaded: !1,
            params: a,
            listorder: a.by,
            fromsearch: !0
        }), this.getRecord());
    },
    bindFocus: function(t) {
        "" == s.trim(t.detail.value) && this.setData({
            fromsearch: !0
        });
    },
    bindback: function() {
        wx.navigateBack();
    },
    bindnav: function(t) {
        var e = s.trim(t.currentTarget.dataset.text), a = this.data.defaults;
        a.keywords = e, this.setData({
            params: a,
            page: 1,
            fromsearch: !1
        }), this.getList(), this.setRecord(e);
    },
    getRecord: function() {
        var e = t.getCache("searchRecords");
        this.setData({
            searchRecords: e
        });
    },
    setRecord: function(e) {
        if ("" != e) {
            var a = t.getCache("searchRecords");
            if (s.isArray(a)) {
                var i = [];
                for (var r in i.push(e), a) {
                    if (i.length > 20) break;
                    a[r] != e && null != a && "null" != a && i.push(a[r]);
                }
                a = i;
            } else (a = []).push(e);
            t.setCache("searchRecords", a);
        } else t.setCache("searchRecords", []);
        this.getRecord();
    },
    delRecord: function() {
        this.setRecord(""), this.setData({
            fromsearch: !0
        });
    },
    setFocus: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                focusin: !0
            });
        }, 1e3);
    },
    selectPicker: function(e) {
        t.checkAuth();
        var s = this;
        wx.getSetting({
            success: function(t) {
                if (t.authSetting["scope.userInfo"]) {
                    i.selectpicker(e, s, "goodslist");
                }
            }
        });
    },
    specsTap: function(t) {
        i.specsTap(t, this);
    },
    chooseGift: function(t) {
        i.chooseGift(t, this);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            specsTitle: ""
        });
    },
    buyNow: function(t) {
        i.buyNow(t, this);
    },
    getCart: function(t) {
        i.getCart(t, this);
    },
    select: function() {
        i.select(this);
    },
    inputNumber: function(t) {
        i.inputNumber(t, this);
    },
    number: function(t) {
        i.number(t, this);
    },
    onChange: function(t) {
        return a.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return a.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return a.selectArea(this, t);
    },
    bindChange: function(t) {
        return a.bindChange(this, t);
    },
    onCancel: function(t) {
        return a.onCancel(this, t);
    },
    onConfirm: function(t) {
        return a.onConfirm(this, t);
    },
    getIndex: function(t, e) {
        return a.getIndex(t, e);
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    }
});