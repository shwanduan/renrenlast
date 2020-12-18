var t = require("utils/core.js");
App({
	onShow: function(e) {
		
    this.getUpdate();
		console.log(JSON.stringify(e), "options");
		var a = this;
    this.onLaunch();
		try {
			"" != this.getCache("userinfo_id") && t.get("member", {},
			function(t) {
				console.log(JSON.stringify(t),'tttttttttttttttttt')
				a.setCache("userinfo_id", t.id)
			})
		} catch(t) {}
	},
	onLaunch: function() {
		var t = this;
		wx.getSystemInfo({
			success: function(e) {
				console.log(JSON.stringify(e))
				"0" == e.model.indexOf("iPhone X") ? t.setCache("isIpx", e.model) : t.setCache("isIpx", "")
			}
		});
		var e = this;
		wx.getSystemInfo({
			success: function(t) {
				wx.setStorageSync("systemInfo", t);
				var a = t.windowWidth,
				n = t.windowHeight;
				e.globalData.ww = a,
				e.globalData.hh = n,
				setTimeout(function() {
					e.scanCarts()
				},
				50),
				setInterval(function() {
					var t = wx.getStorageSync("goodnum"),
					e = wx.getStorageSync("cartNum");
				
				},
				300)
			}
		})
  },
  getUpdate: function(){
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        res.hasUpdate && (updateManager.onUpdateReady(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否马上重启小程序？",
            success: function (t) {
              t.confirm && updateManager.applyUpdate();
            }
          });
        }), updateManager.onUpdateFailed(function () {
          wx.showModal({
            title: "已经有新版本了哟~",
            content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
          });
        }));
      });
    } else wx.showModal({
      title: "提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    });
  },
	scanCarts: function() {
		t.get("member/cart/order_cart", {},
		function(t) {
			"number" == typeof t.list ? wx.setStorageSync("cartNum", t.list) : wx.setStorageSync("cartNum", 5)
		}),
		t.get("member/cart/get_cart", {},
		function(t) {
			if (t.total) {
				if (0 != t.total) {
					var e = t.total;
					wx.setStorageSync("goodnum", e)
				}
			} else if (null != t.merch_list) {
				e = 0;
				for (var a = t.merch_list,
				n = 0; n < a.length; n++) {
					for (var i = a[n].list, o = 0; o < i.length; o++) e += parseInt(i[o].total);
					wx.setStorageSync("goodnum", e)
				}
			} else wx.setStorageSync("goodnum", 0)
		})
	},
	checkAuth: function(e) {
		var a = "/pages/auth/index",
		n = getCurrentPages(),
		i = n[n.length - 1],
		o = {
			params: i.options || null,
			url: i.route
		};
		if (o.params.hasOwnProperty("scene")) {
			var r = {},
			s = decodeURIComponent(o.params.scene).split("&").shift().split("=");
			r.id = s[1],
			o.params = r
		}
		this.setCache("routeData", o);
		this.getCache("userinfo");
		wx.getSetting({
			success: function(n) {
				n.authSetting["scope.userInfo"] ? (t.get("member", {},
				function(t) {
					t.error && wx.navigateTo({
						url: a
					})
				}), e && e()) : wx.navigateTo({
					url: a
				})
			}
		})
	},
	requirejs: function(t) {
		return require("utils/" + t + ".js")
	},
	getConfig: function() {
		if (null !== this.globalData.api) return {
			api: this.globalData.api,
			approot: this.globalData.approot,
			appid: this.globalData.appid
		};
		var t = wx.getExtConfigSync();
		return this.globalData.api = t.config.api,
		this.globalData.approot = t.config.approot,
		this.globalData.appid = t.config.appid,
		t.config
	},
	getCache: function(t, e) {
		var a = +new Date / 1e3,
		n = "";
		a = parseInt(a);
		try { (n = wx.getStorageSync(t + this.globalData.appid)).expire > a || 0 == n.expire ? n = n.value: (n = "", this.removeCache(t))
		} catch(t) {
			n = void 0 === e ? "": e
		}
		return n = n || ""
	},
	setCache: function(t, e, a) {
		var n = +new Date / 1e3,
		i = !0,
		o = {
			expire: a ? n + parseInt(a) : 0,
			value: e
		};
		try {
			wx.setStorageSync(t + this.globalData.appid, o)
		} catch(t) {
			i = !1
		}
		return i
	},
	removeCache: function(t) {
		var e = !0;
		try {
			wx.removeStorageSync(t + this.globalData.appid)
		} catch(t) {
			e = !1
		}
		return e
	},
	close: function() {
		this.globalDataClose.flag = !0,
		wx.reLaunch({
			url: "/pages/index/index"
		})
	},
	getSet: function() {
		var e = this;
		"" == e.getCache("cacheset") && setTimeout(function() {
			var a = e.getCache("cacheset");
			t.get("cacheset", {
				version: a.version
			},
			function(t) {
				t.update && e.setCache("cacheset", t.data)
			})
		},
		10)
	},
	url: function(t) {
		t = t || {};
		var e, a, n = {},
		i = this.getCache("usermid");
		for (var o in e = t.mid || "",
		a = t.merchid || "",
		i) void 0 !== i[o] && (n[o] = i[o]);
		"" != i ? ("" != i.mid && void 0 !== i.mid || (n.mid = e), "" != i.merchid && void 0 !== i.merchid || (n.merchid = a)) : (n.mid = e, n.merchid = a),
		this.setCache("usermid", n)
	},
	impower: function(t, e, a) {
		wx.getSetting({
			success: function(n) {
				n.authSetting["scope." + t] || wx.showModal({
					title: "用户未授权",
					content: "您点击了拒绝授权，暂时无法" + e + "，点击去设置可重新获取授权喔~",
					confirmText: "去设置",
					success: function(t) {
						t.confirm ? wx.openSetting({
							success: function(t) {}
						}) : "route" == a ? wx.switchTab({
							url: "/pages/index/index"
						}) : "details" == a || wx.navigateTo({
							url: "/pages/index/index"
						})
					}
				})
			}
		})
	},
	globalDataClose: {
		flag: !1
	},
  globalDataClose: {
    flag: !1
  },
  globalData: require('siteinfo.js')
});