function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var r = e[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(n, r.key, r);
        }
    }
    return function(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
    };
}(), t = require("../components/utils/RequestManager"), r = [], i = function() {
    function i() {
        n(this, i);
    }
    return e(i, null, [ {
        key: "get",
        value: function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (n.success || (n.success = function() {}), n.fail || (n.fail = function() {}), 
            r.length) return n.success(r), 0;
            t.get({
                doNotShowLoading: !0,
                cgi: t.CGIS.GET_TIMELINE,
                param: {
                    offset: 0,
                    limit: 20,
                    mode: 2,
                    isgetvideo: !1
                },
                success: function(e) {
                    var t = e.self_openid, i = e.recommend_list.map(function(n) {
                        return n.recommend_info.openid;
                    }).filter(function(n) {
                        return n !== t;
                    }), o = new Set();
                    i.forEach(function(n) {
                        o.add(n);
                    });
                    var u = e.userattr;
                    i = Array.from(o).slice(0, 5).map(function(n) {
                        return u.filter(function(e) {
                            return e.openid === n;
                        }).map(function(n) {
                            return {
                                nickname: n.nickname,
                                headImgUrl: n.headimgurl + "/96"
                            };
                        })[0];
                    }), r = i, n.success(i);
                }
            });
        }
    } ]), i;
}();

module.exports = i;