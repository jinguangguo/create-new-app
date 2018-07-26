/**
 * @file
 * @author jinguangguo
 * @date 2018/7/26 上午11:30
 */

// IE兼容
(function () {
    if (window.location.href.indexOf('ie.html') < 0) {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length >= 2) {
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (browser == "Microsoft Internet Explorer" && (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0"
                || trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0")) {
                window.location.href = './ie.html';
            }
        }
    }
})();

// webp兼容
(function () {
    function addWebp() {
        var htmlClass = document.documentElement.className;
        if (htmlClass) {
            document.documentElement.className += ' webp';
        } else {
            document.documentElement.className = "webp";
        }
    }

    function detect() {
        var WebP = new Image();
        WebP.onload = WebP.onerror = function () {
            if (WebP.height != 2) {
                window.localStorage.setItem('webp', 0);
            } else {
                window.localStorage.setItem('webp', 1);
            }
        };
        WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    if (typeof window.localStorage !== 'undefined') {
        if (window.localStorage.getItem('webp') === '1') {
            addWebp();
        } else {
            detect();
        }
    }
})();

(function () {
    var remUnit = 640;//设置Rem转化基数
    !function (a, b) {
        function c() {
            var b = f.getBoundingClientRect().width;
            b / i > remUnit && (b = remUnit * i);
            var c = b / 10;
            f.style.fontSize = c + "px", f.style.width = "100%", f.style.height = "100%", k.rem = a.rem = c
        }

        var d, e = a.document, f = e.documentElement, g = e.querySelector('meta[name="viewport"]'),
            h = e.querySelector('meta[name="flexible"]'), i = 0, j = 0, k = b.flexible || (b.flexible = {});
        if (g) {
            console.warn("将根据已有的meta标签来设置缩放比例");
            var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
            l && (j = parseFloat(l[1]), i = parseInt(1 / j))
        } else if (h) {
            var m = h.getAttribute("content");
            if (m) {
                var n = m.match(/initial\-dpr=([\d\.]+)/), o = m.match(/maximum\-dpr=([\d\.]+)/);
                n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))), o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)))
            }
        }
        if (!i && !j) {
            var p = (a.navigator.appVersion.match(/android/gi), a.navigator.appVersion.match(/iphone/gi)),
                q = a.devicePixelRatio;
            i = p ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1 : 1, j = 1 / i
        }
        if (f.setAttribute("data-dpr", i), !g) if (g = e.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"), f.firstElementChild) f.firstElementChild.appendChild(g); else {
            var r = e.createElement("div");
            r.appendChild(g), e.write(r.innerHTML)
        }
        a.addEventListener("resize", function () {
            clearTimeout(d), d = setTimeout(c, 300)
        }, !1), a.addEventListener("pageshow", function (a) {
            a.persisted && (clearTimeout(d), d = setTimeout(c, 300))
        }, !1), "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function () {
            e.body.style.fontSize = 12 * i + "px"
        }, !1), c(), k.dpr = a.dpr = i, k.refreshRem = c, k.rem2px = function (a) {
            var b = parseFloat(a) * this.rem;
            return "string" == typeof a && a.match(/rem$/) && (b += "px"), b
        }, k.px2rem = function (a) {
            var b = parseFloat(a) / this.rem;
            return "string" == typeof a && a.match(/px$/) && (b += "rem"), b
        }
    }(window, window.lib || (window.lib = {}));
})();