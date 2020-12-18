function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("./idkeyReport"), r = function() {
    function r() {
        e(this, r);
    }
    return t(r, null, [ {
        key: "getPassTicket",
        value: function(e, t) {
            if (void 0 === wx.operateWXData) return n.idkeyReport(12), t(), -1;
            var r = parseInt(wx.getStorageSync("__PASS_TICKET_LAST_UPDATE_TIME__"), 10) || 0;
            if (new Date().getTime() - r > 6e5) wx.operateWXData({
                apiName: "getGetPasskey",
                success: function(r) {
                    var a = "";
                    try {
                        a = JSON.parse(r.rawData).pass_ticket;
                    } catch (e) {
                        n.idkeyReport(9), t && t();
                    }
                    if (!a.trim()) return t && t(), n.idkeyReport(10), -1;
                    wx.setStorageSync("__PASS_TICKET_LAST_UPDATE_TIME__", new Date().getTime()), wx.setStorageSync("__PASS_TICKET__", encodeURIComponent(a)), 
                    e && e(encodeURIComponent(a)), n.idkeyReport(8);
                },
                fail: function() {
                    n.idkeyReport(11), t && t();
                }
            }); else {
                var a = wx.getStorageSync("__PASS_TICKET__");
                e && e(a);
            }
        }
    } ]), r;
}();

module.exports = r;