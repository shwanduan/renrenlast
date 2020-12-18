var e = getApp(), t = e.requirejs("core"), a = e.requirejs("wxParse/wxParse"), i = e.requirejs("biz/diypage"), n = e.requirejs("jquery");

Page({
    data: {
        route: "member",
        icons: e.requirejs("icons"),
        member: {},
        diypages: {},
        audios: {},
        audiosObj: {},
        modelShow: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        swiperheight: 0,
        iscycelbuy: !1,
        bargain: !1,
        result: {}
    },
    onLoad: function(e) {
        console.log(JSON.stringify(e))
        this.setData({
            options: e
        });
        wx.setNavigationBarColor({
          backgroundColor: '#feecd2'
        })
    },
    gojifen(){
        wx.navigateTo({
          url: '/pages/member/index/jifen',
        })
    },
    getInfo: function() {
        var e = this;
        t.get("member", {}, function(t) {
            1 == t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(t) {
                    console.log(JSON.stringify(t),'1111111111111111')
                    t.confirm && e.close(), t.cancel && e.close();
                }
            }), e.setData({
                member: t,
                show: !0,
                customer: t.customer,
                customercolor: t.customercolor || "",
                phone: t.phone,
                phonecolor: t.phonecolor || "",
                phonenumber: t.phonenumber || "",
                iscycelbuy: t.iscycelbuy,
                bargain: t.bargain
            }), t.error, a.wxParse("wxParseData", "html", t.copyright, e, "5");
        });
    },
    onShow: function() {
        var t = this;
        this.getInfo(), wx.getSystemInfo({
            success: function(e) {
                var a = e.windowWidth / 1.7;
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: a
                });
            }
        }), t.setData({
            imgUrl: e.globalData.approot
        }), i.get(this, "member", function(e) {});
    },
    onShareAppMessage: function() {
        return t.onShareAppMessage();
    },
    imagesHeight: function(e) {
        var t = e.detail.width, a = e.detail.height, i = e.target.dataset.type, n = this;
        wx.getSystemInfo({
            success: function(e) {
                n.data.result[i] = e.windowWidth / t * a, (!n.data[i] || n.data[i] && result[i] < n.data[i]) && n.setData({
                    result: n.data.result
                });
            }
        });
    },
    cancelclick: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        wx.openSetting({
            success: function(e) {}
        });
    },
    phone: function() {
        var e = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    play: function(e) {
        var t = e.target.dataset.id, a = this.data.audiosObj[t] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + t);
            var i = this.data.audiosObj;
            i[t] = a, this.setData({
                audiosObj: i
            });
        }
        var n = this;
        a.onPlay(function() {
            var e = setInterval(function() {
                var i = a.currentTime / a.duration * 100 + "%", s = Math.floor(Math.ceil(a.currentTime) / 60), o = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), r = Math.ceil(a.currentTime);
                s < 10 && (s = "0" + s);
                var u = s + ":" + o, c = n.data.audios;
                c[t].audiowidth = i, c[t].Time = e, c[t].audiotime = u, c[t].seconds = r, n.setData({
                    audios: c
                });
            }, 1e3);
        });
        var s = e.currentTarget.dataset.audio, o = e.currentTarget.dataset.time, r = e.currentTarget.dataset.pausestop, u = e.currentTarget.dataset.loopplay;
        0 == u && a.onEnded(function(e) {
            c[t].status = !1, n.setData({
                audios: c
            });
        });
        var c = n.data.audios;
        c[t] || (c[t] = {}), a.paused && 0 == o ? (a.src = s, a.play(), 1 == u && (a.loop = !0), 
        c[t].status = !0, n.pauseOther(t)) : a.paused && o > 0 ? (a.play(), 0 == r ? a.seek(o) : a.seek(0), 
        c[t].status = !0, n.pauseOther(t)) : (a.pause(), c[t].status = !1), n.setData({
            audios: c
        });
    },
    pauseOther: function(e) {
        var t = this;
        n.each(this.data.audiosObj, function(a, i) {
            if (a != e) {
                i.pause();
                var n = t.data.audios;
                n[a] && (n[a].status = !1, t.setData({
                    audios: n
                }));
            }
        });
    },
    onHide: function() {
        this.pauseOther();
    },
    onUnload: function() {
        this.pauseOther();
    },
    navigate: function(e) {
        var t = e.currentTarget.dataset.url, a = e.currentTarget.dataset.phone, i = e.currentTarget.dataset.appid, n = e.currentTarget.dataset.appurl;
        t && wx.navigateTo({
            url: t,
            fail: function() {
                wx.switchTab({
                    url: t
                });
            }
        }), a && wx.makePhoneCall({
            phoneNumber: a
        }), i && wx.navigateToMiniProgram({
            appId: i,
            path: n
        });
    },
    close: function() {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    requestGetPhone: function(a, i) {
        t.post("wxapp/getmobile", {
            encryptedData: a.detail.encryptedData,
            iv: a.detail.iv,
            sessionkey: i
        }, function(a) {
            if ("" == a) return wx.login({
                success: function(a) {
                    t.post("wxapp/login", {
                        code: a.code
                    }, function(a) {
                        a.error ? t.alert("获取用户登录态失败:" + a.message) : e.setCache("login_session_key", a.session_key);
                    });
                },
                fail: function() {
                    t.alert("获取用户手机号信息失败!");
                },
                complete: function() {
                    wx.hideLoading();
                }
            }), void t.alert("手机号走丢了！请重新获取。");
            wx.hideLoading(), wx.navigateTo({
                url: "/pages/member/bind/new_index?mobile=" + a
            });
        });
    },
    getPhoneNumber: function(a) {
        var i = this;
        a.detail.iv && (wx.showLoading({
            title: "加载中"
        }), wx.checkSession({
            success: function() {
                var t = e.getCache("login_session_key");
                console.log("sessionKey:" + t), i.requestGetPhone(a, t);
            },
            fail: function() {
                wx.login({
                    success: function(n) {
                        t.post("wxapp/login", {
                            code: n.code
                        }, function(n) {
                            n.error ? t.alert("获取用户登录态失败:" + n.message) : (e.setCache("login_session_key", n.session_key), 
                            i.requestGetPhone(a, n.session_key));
                        });
                    },
                    fail: function() {
                        t.alert("获取用户手机号信息失败!");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            }
        }));
    },
    userJump: function() {
        wx.navigateTo({
            url: "/pages/member/index/detail?avatar=" + this.data.member.avatar + "&nickname=" + this.data.member.nickname + "&mobile=" + this.data.member.mobile
        });
    }
});