var n = {};

module.exports = {
    on: function(o, t) {
        t = t || function() {}, void 0 === n[o] ? n[o] = [ t ] : n[o].push(t);
    },
    off: function(o) {
        delete n[o];
    },
    emit: function(o, t) {
        o && n[o] && n[o].forEach(function(n) {
            "function" == typeof n && n(t);
        });
    }
};