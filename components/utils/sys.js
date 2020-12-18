function e() {
    var e = t.screenHeight, n = t.screenWidth, o = t.platform;
    return e >= 812 && ("ios" == o || "devtools" == o) ? "iPhoneX" : n <= 320 ? "iPhone5" : n <= 375 ? "iPhone6" : n <= 414 ? "iPhone6 Plus" : "";
}

var t = wx.getSystemInfoSync();

module.exports = {
    phoneModel: e,
    platform: t.platform,
    screenHeight: t.screenHeight,
    screenWidth: t.screenWidth,
    getNavigationBarHeight: function() {
        return "iPhoneX" == e() ? 88 : 64;
    }
};