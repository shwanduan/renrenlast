var e = require("./dict");

module.exports = function(n) {
    var r = {}, t = [], i = 0, o = 0;
    new Date();
    n.forEach(function(n) {
        var t = n.nickname.trim();
        n.head_img_url && -1 === n.head_img_url.indexOf("http") && (n.head_img_url = "https://wx.qlogo.cn/mmhead/" + n.head_img_url + "/132"), 
        n.singleWord = t.split(""), n.pinyin = e.convertToPinyin(t, " ").split(" ");
        var s = Date.now();
        n.wordsStructure = e.nameToWordsStructureNew(t);
        var a = Date.now();
        i += a - s, n.newIndexes = e.wordsStructureToIndexesNew(n.wordsStructure), delete n.wordsStructure;
        var u = Date.now();
        o += u - a;
        var c = n.pinyin.length && n.pinyin[0] && n.pinyin[0][0] || n.pinyin[0][0] || "#";
        c = /[a-zA-Z]/.test(c) ? c.toUpperCase() : "#", r.hasOwnProperty(c) ? r[c].push(n) : r[c] = [ n ];
    });
    for (var s in r) r[s].sort(function(n, r) {
        return -e.comparePinyinArray(n.pinyin, r.pinyin);
    }), t.push({
        sectionName: s,
        users: r[s]
    });
    t.sort(function(e, n) {
        return e.sectionName > n.sectionName ? 1 : -1;
    }), t.push(t[0]), t.splice(0, 1);
    Date.now();
    var a = new Map();
    t.forEach(function(e, n) {
        e.users.forEach(function(e, n) {
            e.newIndexes.forEach(function(n) {
                a.has(n) ? a.get(n).push(e.encrypt_user_uin) : a.set(n, [ e.encrypt_user_uin ]);
            }), delete e.pinyin, delete e.singleWord, delete e.newIndexes;
        });
    });
    Date.now();
    return {
        list: t,
        indexMap: a
    };
};