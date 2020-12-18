function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var r, n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), i = require("./PassTicketManager"), o = require("./report"), a = "https://wxa.weixin.qq.com/shoppinglist", E = {
    COMMIT_SHARE: "COMMIT_SHARE",
    GET_RECOMMEND_STAUTS: "GET_RECOMMEND_STAUTS",
    DELETE_RECOMMEND: "DELETE_RECOMMEND",
    GET_FRIEND_RECOMMEND: "GET_FRIEND_RECOMMEND",
    GET_FRIEND_LIST: "GET_FRIEND_LIST",
    GET_ABOUT_CONFIG: "GET_ABOUT_CONFIG",
    GET_TIMELINE: "GET_TIMELINE",
    CHECK_ACCOUNT_AUTH: "CHECK_ACCOUNT_AUTH"
}, u = (r = {}, t(r, E.COMMIT_SHARE, a + "/friendbuy/set_favor_in_3rd"), t(r, E.GET_RECOMMEND_STAUTS, a + "/friendbuy/get_product_favor"), 
t(r, E.DELETE_RECOMMEND, a + "/friendbuy/do_favor"), t(r, E.GET_FRIEND_RECOMMEND, a + "/friendbuy/get_friend_favor"), 
t(r, E.GET_FRIEND_LIST, a + "/friendbuy/get_friend_list"), t(r, E.GET_ABOUT_CONFIG, a + "/storage/sysget"), 
t(r, E.GET_TIMELINE, a + "/timeline/getbypage"), t(r, E.CHECK_ACCOUNT_AUTH, a + "/friendbuy/check_account_auth"), 
r), c = function() {
    function t() {
        e(this, t);
    }
    return n(t, null, [ {
        key: "get",
        value: function(e) {
            if (!u[e.cgi]) throw "没有这个CGI啊，去RequestManager.js加一个吧！";
            "function" != typeof e.success && (e.success = function() {}), "function" != typeof e.fail && (e.fail = function() {}), 
            "function" != typeof e.complete && (e.complete = function() {}), i.getPassTicket(function(t) {
                var r = u[e.cgi] + "?pass_ticket=" + t;
                e.doNotShowLoading || wx.showLoading(), wx.request({
                    url: r,
                    data: e.param,
                    method: e.method || "POST",
                    success: function(t) {
                        0 === t.data.errcode ? e.success(t.data) : (e.fail(), o.reportErrorMsg("wx.request success but errcode: " + t.data.errcode + ", errmsg: " + t.data.msg + ". URL: " + r + ", PARAM: " + JSON.stringify(e.param) + ")")), 
                        wx.hideLoading();
                    },
                    fail: function() {
                        e.fail(), o.reportErrorMsg("wx.request fail. URL: " + r + ", PARAM: " + JSON.stringify(e.param) + ")"), 
                        wx.hideLoading();
                    },
                    complete: e.complete
                });
            }, e.fail);
        }
    } ]), t;
}();

c.CGI_MAP = u, c.CGIS = E, module.exports = c;