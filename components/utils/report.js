function e() {
    var e = n.system, t = n.system, o = n.system.split(" ");
    return o.length >= 2 && (e = o[0], t = o.splice(1).join(" ")), [ encodeURIComponent(n.model || ""), encodeURIComponent(n.brand || ""), encodeURIComponent(e || ""), encodeURIComponent(t || ""), encodeURIComponent(n.language || ""), new Date().getTime() / 1e3 | 0, new Date().getTime() / 1e3 | 0, 1, wx.getAccountInfoSync().miniProgram.appId ];
}

var t = require("../../config"), o = require("./PassTicketManager"), n = wx.getSystemInfoSync(), r = "", i = "", s = {
    VIEW: 1,
    CLICK: 2,
    COMMIT_SUCCESS: 3,
    REPORT_INFO_LOG: 4,
    REPORT_ERROR_LOG: 5,
    COMMIT_SUCCESS_BROUGHT: 6,
    COMMIT_SHARE_STAYTIME: 7,
    COMMIT_SHARE_CLICK_ABOUT: 8,
    COMMIT_ABOUT_STAYTIME: 9
};

module.exports = {
    init: function(e) {
        i = encodeURIComponent(e.sessionId), r = encodeURIComponent(e.item_code);
    },
    report: function(s) {
        var c = r, a = i, p = new Date().getTime();
        if (!c || !a) return console.error("reportUtils not inited"), 0;
        o.getPassTicket(function(o) {
            var r = [ c, a, s.reportType, s.msg || "", s.path || "", t.version, p ], i = [ {
                logid: 16969,
                log_buffer: e().concat(r).join(",")
            } ], m = {
                clientversion: n.version,
                device: "ios" === n.platform ? 1 : 2,
                item_list: i
            };
            wx.request({
                url: "https://wxa.weixin.qq.com/shoppinglist/reportdata?pass_ticket=" + o,
                data: m,
                method: "POST"
            });
        });
    },
    reportErrorMsg: function(c) {
        var a = r, p = i, m = new Date().getTime();
        if (console.error("reportErrorMsg >>> " + c), !a || !p) return console.error("reportUtils not inited"), 
        0;
        o.getPassTicket(function(o) {
            var r = [ {
                logid: 16969,
                log_buffer: e().concat([ a, p, s.REPORT_ERROR_LOG ]).concat([ encodeURIComponent(c) ]).concat([ "", t.version, m ]).join(",")
            } ], i = {
                clientversion: n.version,
                device: "ios" === n.platform ? 1 : 2,
                item_list: r
            };
            wx.request({
                url: "https://wxa.weixin.qq.com/shoppinglist/reportdata?pass_ticket=" + o,
                data: i,
                method: "POST"
            });
        });
    },
    REPORT_TYPE: s
};