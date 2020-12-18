var t = 115864;

module.exports = {
    idkeyReport: function(e) {
        if (!e || "number" != typeof e || e <= 0 || e > 127) return -1;
        e = parseInt(e, 10);
        var s = wx.getStorageSync("__PASS_TICKET__");
        if (!s) return 0;
        var r = {
            oss_list: [ {
                oss_id: t,
                oss_key: e,
                oss_value: 1,
                type: 0
            } ]
        };
        wx.request({
            url: "https://wxa.weixin.qq.com/shoppinglist/report-oss?pass_ticket=" + s,
            data: r,
            method: "POST"
        });
    }
};