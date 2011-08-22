var APPLICATION_NAMESPACE = "AYB";
var _global = this;

_global[APPLICATION_NAMESPACE] = {
};
_global[APPLICATION_NAMESPACE].namespace = function() {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = _global[APPLICATION_NAMESPACE];

        for (j = (d[0] == APPLICATION_NAMESPACE) ? 1 : 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }

    return o;
}

if (!console) {
    var console = {
        log: function() { },
        dir: function() { }
    };
}