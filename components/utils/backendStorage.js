function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t = require("./PassTicketManager"), i = require("./idkeyReport");

module.exports = {
    batchSet: function(e) {
        t.getPassTicket(function(t) {
            var s = Object.keys(e.data).map(function(t) {
                return {
                    key: t,
                    buff: "string" == typeof e.data[t] ? e.data[t] : JSON.stringify(e.data[t])
                };
            });
            wx.request({
                url: "https://wxa.weixin.qq.com/shoppinglist/storage/batchset?pass_ticket=" + t,
                data: {
                    collection: e.collection || "MMuxShoppingListSharePlugin",
                    doc_list: s
                },
                method: "POST",
                success: function(t) {
                    0 === t.data.errcode ? (i.idkeyReport(20), e.success && e.success(t)) : (i.idkeyReport(22), 
                    e.fail && e.fail());
                },
                fail: function() {
                    i.idkeyReport(21), e.fail && e.fail();
                }
            });
        });
    },
    batchGet: function(s) {
        t.getPassTicket(function(t) {
            var c;
            wx.request((c = {
                url: "https://wxa.weixin.qq.com/shoppinglist/storage/batchget?pass_ticket=" + t,
                data: {
                    collection: s.collection || "MMuxShoppingListSharePlugin",
                    key_list: s.key_list || []
                },
                method: "POST",
                success: s.success
            }, e(c, "success", function(e) {
                0 === e.data.errcode ? (i.idkeyReport(23), s.success && s.success(e)) : (i.idkeyReport(25), 
                s.fail && s.fail());
            }), e(c, "fail", function() {
                i.idkeyReport(24), s.fail && s.fail();
            }), c));
        });
    },
    sysGet: function(e) {}
};