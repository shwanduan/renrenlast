function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = require("../components/utils/RequestManager"), i = require("../components/utils/EventCenter"), r = {
    CACHE_KEY_FRIEND_LIST: "__FRIEND_CACHE__",
    CACHE_KEY_LAST_UPDATE_TIME: "__LAST_UPDATE_TIME__",
    LCOAL_CACHE_TIME: 36e5,
    DEFAULT_AVATAR_URL: "/pages/friend-selector/img/avatar-default.jpeg"
}, _ = function() {
    function _() {
        e(this, _);
    }
    return t(_, null, [ {
        key: "get",
        value: function() {
            function e(e, t) {
                n.get({
                    doNotShowLoading: !0,
                    cgi: n.CGIS.GET_FRIEND_LIST,
                    success: function(t) {
                        var n = t.friend_list;
                        n = n.filter(function(e) {
                            return e.nickname && "string" == typeof e.nickname && e.nickname.trim().length > 0;
                        }).map(function(e) {
                            return {
                                encrypt_user_uin: e.encrypt_user_uin,
                                head_img_url: (e.head_img_url + "/96").replace("http", "https") || r.DEFAULT_AVATAR_URL,
                                nickname: e.nickname
                            };
                        }), e(n), wx.setStorage({
                            key: r.CACHE_KEY_FRIEND_LIST,
                            data: n
                        }), wx.setStorage({
                            key: r.CACHE_KEY_LAST_UPDATE_TIME,
                            data: new Date().getTime()
                        }), i.FRIEND_LIST = n;
                    },
                    fail: t
                });
            }
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = this;
            if (t.success || (t.success = function() {}), t.fail || (t.fail = function() {}), 
            this.FRIEND_LIST && this.FRIEND_LIST.length) return t.success(this.FRIEND_LIST), 
            0;
            var _ = wx.getStorageSync(r.CACHE_KEY_LAST_UPDATE_TIME) || 0;
            if (new Date().getTime() - _ > r.LCOAL_CACHE_TIME) return e(t.success, t.fail), 
            0;
            var a = wx.getStorageSync(r.CACHE_KEY_FRIEND_LIST) || [];
            if (a && a.length) return t.success(a), 0;
            e(t.success, t.fail);
        }
    }, {
        key: "getSelectedFriends",
        value: function() {
            return this.SELECTED_FRIEND_LIST;
        }
    }, {
        key: "getHandledFriendList",
        value: function() {
            return this.HANDLED_FRIEND_LIST;
        }
    }, {
        key: "setHandledFriendList",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            this.HANDLED_FRIEND_LIST = e;
        }
    }, {
        key: "getSearchIndexMap",
        value: function() {
            return this.SEACH_INDEX_MAP;
        }
    }, {
        key: "setSearchIndexMap",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Map();
            this.SEACH_INDEX_MAP = e;
        }
    }, {
        key: "init",
        value: function() {
            var e = this;
            return this.inited || (i.on("clearSelectedUser", function() {
                e.SELECTED_FRIEND_LIST = [];
            }), this.inited = !0), this.get(), this;
        }
    } ]), _;
}();

_.FRIEND_LIST = [], _.SELECTED_FRIEND_LIST = [], _.SEACH_INDEX_MAP = new Map(), 
_.HANDLED_FRIEND_LIST = null, _.inited = !1, module.exports = _;