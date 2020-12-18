var e = "18391", t = wx.getAccountInfoSync().miniProgram.appId || "", n = "wx2b03c6e691cd7370", i = wx.getAccountInfoSync().plugin.version, a = wx.getSystemInfoSync() || {}, l = wx.getEnterOptionsSync && wx.getEnterOptionsSync().scene || -1, y = {
    wifi: "1",
    "2g": "2",
    "3g": "3",
    "4g": "4",
    "5g": "5",
    other: "6"
}, v = {
    ios: "1",
    android: "2",
    windows: "3",
    mac: "4",
    other: "-1"
};

module.exports = {
    getMmdataConfig: function() {
        var p = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            actionType: "",
            subActionType: "",
            reserves: "",
            livePlayId: "",
            liveState: "",
            goodsId: "",
            count: "",
            timestamp2: "",
            roomId: "",
            liveType: "",
            networkType: "",
            livePlayStatus: "",
            scene: "",
            lotteryId: "",
            videoCaton: "",
            videoFPS: "",
            netJitter: "",
            netSpeed: "",
            lottieFPS: "",
            verticalScreen: ""
        };
        return {
            logid: e,
            items: [ {
                type: "string",
                value: ""
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "" + (y[p.networkType] || 0)
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "" + (p.roomId || 0)
            }, {
                type: "int32",
                value: "" + (p.liveType || 1)
            }, {
                type: "int32",
                value: "" + (p.liveState || 0)
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "" + (p.subActionType || 0)
            }, {
                type: "int32",
                value: "" + (p.reserves || 0)
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "string",
                value: "" + a.model
            }, {
                type: "int32",
                value: "" + (p.count || 1)
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "" + (p.timestamp2 || 0)
            }, {
                type: "int32",
                value: "" + (p.actionType || 0)
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "string",
                value: "" + p.goodsId
            }, {
                type: "string",
                value: "" + t
            }, {
                type: "string",
                value: "" + p.livePlayId
            }, {
                type: "int32",
                value: "" + (v[a.platform] || 0)
            }, {
                type: "string",
                value: "" + a.version
            }, {
                type: "string",
                value: "" + a.brand
            }, {
                type: "string",
                value: "" + (wx.getSystemInfoSync() || {}).language
            }, {
                type: "string",
                value: "" + i
            }, {
                type: "string",
                value: "" + p.livePlayStatus
            }, {
                type: "string",
                value: "" + n
            }, {
                type: "int32",
                value: "" + p.scene
            }, {
                type: "string",
                value: ""
            }, {
                type: "int32",
                value: "" + p.lotteryId
            }, {
                type: "int32",
                value: "" + l
            }, {
                type: "int32",
                value: "" + p.videoCaton
            }, {
                type: "int32",
                value: "" + p.videoFPS
            }, {
                type: "int32",
                value: "" + p.netJitter
            }, {
                type: "int32",
                value: "" + p.netSpeed
            }, {
                type: "int32",
                value: "" + p.lottieFPS
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "0"
            }, {
                type: "int32",
                value: "" + p.verticalScreen
            } ]
        };
    }
};