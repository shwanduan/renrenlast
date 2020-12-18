function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../wxlive-components/logic/config.js")), n = e(require("../wxlive-components/logic/request.js")), o = 6e4, i = wx.getAccountInfoSync().miniProgram.appId || "";

module.exports = {
    getLiveStatus: function(e) {
        return new Promise(function(r, c) {
            if (e) {
                var u = e.room_id, s = +wx.getStorageSync("prevRequestTime-" + i + "-" + u) || 0, a = Date.now();
                a - s >= o && (wx.setStorageSync("prevRequestTime-" + i + "-" + u, a), n.default.getLiveStatus({
                    room_id: u
                }).then(function(e) {
                    r({
                        liveStatus: +e.live_status
                    });
                }).catch(function(e) {
                    if (2e4 === (e.err_code && +e.err_code || +e.errMsg.split(":")[2])) c("传入的房间id有误"); else {
                        var n = +e.inner_ret || null;
                        c(n === t.default.OPERATEWXDATA_CODE.TIMEOUT ? "网络超时" : n === t.default.OPERATEWXDATA_CODE.NO_CONCENT ? "获取数据失败" : "系统异常");
                    }
                }));
            } else c("传入的房间id有误");
        });
    },
    getShareParams: function() {
        return new Promise(function(e, t) {
            var o = wx.getEnterOptionsSync && wx.getEnterOptionsSync().path || "", i = wx.getEnterOptionsSync && wx.getEnterOptionsSync().scene || -1;
            if ("__plugin__/wx2b03c6e691cd7370/pages/live-player-plugin" !== o || 1007 !== i && 1008 !== i && 1044 !== i) t({
                err: "只能获取分享卡片入口的参数"
            }); else {
                var r = wx.getEnterOptionsSync && wx.getEnterOptionsSync().query || {}, c = r.room_id, u = r.share_openid, s = r.custom_params;
                n.default.getRoomStaticInfo({
                    room_id: c
                }).then(function(t) {
                    e({
                        room_id: c,
                        openid: t.openid,
                        share_openid: u,
                        custom_params: s && JSON.parse(decodeURIComponent(s)) || ""
                    });
                }).catch(function(e) {
                    t(e);
                });
            }
        });
    },
    getOpenid: function(e) {
        return new Promise(function(t, o) {
            e ? n.default.getRoomStaticInfo({
                room_id: e.room_id
            }).then(function(e) {
                t({
                    openid: e.openid
                });
            }).catch(function(e) {
                o(e);
            }) : o("传入的房间id有误");
        });
    }
};