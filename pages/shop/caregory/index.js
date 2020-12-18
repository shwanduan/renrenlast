var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));

Page({
    data: {
        expert:{},
        goods:[],
        point:[],
        route: "category",
        category: {},
        icons: t.requirejs("icons"),
        selector: 0,
        // advimg: "",
        advurl: "",
        recommands: {},
        level: 0,
        back: 0,
        child: {},
        parent: {}
    },
    more(){
        wx.navigateTo({
          url: './experts'
        })
    },
    tabCategory: function(t) {
        this.setData({
            selector: t.target.dataset.id,
            advimg: t.target.dataset.src,
            advurl: t.target.dataset.url,
            child: t.target.dataset.child,
            back: 0
        }), a.isEmptyObject(t.target.dataset.child) ? this.setData({
            level: 0
        }) : this.setData({
            level: 1
        });
    },
    cateChild: function(t) {
        this.setData({
            parent: t.currentTarget.dataset.parent,
            child: t.currentTarget.dataset.child,
            back: 1
        });
    },
    backParent: function(t) {
        this.setData({
            child: t.currentTarget.dataset.parent,
            back: 0
        });
    },
    getCategory: function() {
        var t = this;
        e.get("shop/get_category", {}, function(e) {
            t.setData({
                category: e.category,
                show: !0,
                set: e.set,
                advimg: e.set.advimg,
                recommands: e.recommands,
                child: e.recommands
            });
        });
    },
    onShow: function() {
        var _this = this
        e.get("goods.getGoodsList",{},function(res){
            console.log(JSON.stringify(res),'111111111111111111111111')
            _this.setData({
                res:res,
                expert:res.data.expert,
                goods:res.data.goods,
                point:res.data.point

            })
        })
    },
    onLoad: function(e) {
        // t.url(e), this.getCategory();
      
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    }
});