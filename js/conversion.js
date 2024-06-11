(function () {
  var m, ba;
  function ca(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  var da =
    "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        };
  function ea(a) {
    a = [
      "object" == typeof globalThis && globalThis,
      a,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  }
  var fa = ea(this),
    ha = "function" === typeof Symbol && "symbol" === typeof Symbol("x"),
    q = {},
    ia = {};
  function t(a, b, c) {
    if (!c || null != a) {
      c = ia[b];
      if (null == c) return a[b];
      c = a[c];
      return void 0 !== c ? c : a[b];
    }
  }
  function v(a, b, c) {
    if (b)
      a: {
        var d = a.split(".");
        a = 1 === d.length;
        var e = d[0],
          f;
        !a && e in q ? (f = q) : (f = fa);
        for (e = 0; e < d.length - 1; e++) {
          var h = d[e];
          if (!(h in f)) break a;
          f = f[h];
        }
        d = d[d.length - 1];
        c = ha && "es6" === c ? f[d] : null;
        b = b(c);
        null != b &&
          (a
            ? da(q, d, { configurable: !0, writable: !0, value: b })
            : b !== c &&
              (void 0 === ia[d] &&
                ((a = (1e9 * Math.random()) >>> 0),
                (ia[d] = ha ? fa.Symbol(d) : "$jscp$" + a + "$" + d)),
              da(f, ia[d], { configurable: !0, writable: !0, value: b })));
      }
  }
  v(
    "Symbol",
    function (a) {
      function b(f) {
        if (this instanceof b)
          throw new TypeError("Symbol is not a constructor");
        return new c(d + (f || "") + "_" + e++, f);
      }
      function c(f, h) {
        this.g = f;
        da(this, "description", { configurable: !0, writable: !0, value: h });
      }
      if (a) return a;
      c.prototype.toString = function () {
        return this.g;
      };
      var d = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
        e = 0;
      return b;
    },
    "es6"
  );
  v(
    "Symbol.iterator",
    function (a) {
      if (a) return a;
      a = (0, q.Symbol)("Symbol.iterator");
      for (
        var b =
            "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
              " "
            ),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = fa[b[c]];
        "function" === typeof d &&
          "function" != typeof d.prototype[a] &&
          da(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
              return ma(ca(this));
            },
          });
      }
      return a;
    },
    "es6"
  );
  function ma(a) {
    a = { next: a };
    a[t(q.Symbol, "iterator")] = function () {
      return this;
    };
    return a;
  }
  function na(a) {
    return (a.raw = a);
  }
  function x(a) {
    var b =
      "undefined" != typeof q.Symbol &&
      t(q.Symbol, "iterator") &&
      a[t(q.Symbol, "iterator")];
    if (b) return b.call(a);
    if ("number" == typeof a.length) return { next: ca(a) };
    throw Error(String(a) + " is not an iterable or ArrayLike");
  }
  function y(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var oa =
    ha && "function" == typeof t(Object, "assign")
      ? t(Object, "assign")
      : function (a, b) {
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d) for (var e in d) y(d, e) && (a[e] = d[e]);
          }
          return a;
        };
  v(
    "Object.assign",
    function (a) {
      return a || oa;
    },
    "es6"
  );
  function pa() {
    for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
      b[c - a] = arguments[c];
    return b;
  }
  v(
    "WeakMap",
    function (a) {
      function b(h) {
        this.g = (f += Math.random() + 1).toString();
        if (h) {
          h = x(h);
          for (var g; !(g = h.next()).done; )
            (g = g.value), this.set(g[0], g[1]);
        }
      }
      function c() {}
      function d(h) {
        var g = typeof h;
        return ("object" === g && null !== h) || "function" === g;
      }
      if (
        (function () {
          if (!a || !Object.seal) return !1;
          try {
            var h = Object.seal({}),
              g = Object.seal({}),
              k = new a([
                [h, 2],
                [g, 3],
              ]);
            if (2 != k.get(h) || 3 != k.get(g)) return !1;
            k.delete(h);
            k.set(g, 4);
            return !k.has(h) && 4 == k.get(g);
          } catch (l) {
            return !1;
          }
        })()
      )
        return a;
      var e = "$jscomp_hidden_" + Math.random(),
        f = 0;
      b.prototype.set = function (h, g) {
        if (!d(h)) throw Error("Invalid WeakMap key");
        if (!y(h, e)) {
          var k = new c();
          da(h, e, { value: k });
        }
        if (!y(h, e)) throw Error("WeakMap key fail: " + h);
        h[e][this.g] = g;
        return this;
      };
      b.prototype.get = function (h) {
        return d(h) && y(h, e) ? h[e][this.g] : void 0;
      };
      b.prototype.has = function (h) {
        return d(h) && y(h, e) && y(h[e], this.g);
      };
      b.prototype.delete = function (h) {
        return d(h) && y(h, e) && y(h[e], this.g) ? delete h[e][this.g] : !1;
      };
      return b;
    },
    "es6"
  );
  v(
    "Map",
    function (a) {
      function b() {
        var g = {};
        return (g.m = g.next = g.head = g);
      }
      function c(g, k) {
        var l = g[1];
        return ma(function () {
          if (l) {
            for (; l.head != g[1]; ) l = l.m;
            for (; l.next != l.head; )
              return (l = l.next), { done: !1, value: k(l) };
            l = null;
          }
          return { done: !0, value: void 0 };
        });
      }
      function d(g, k) {
        var l = k && typeof k;
        "object" == l || "function" == l
          ? f.has(k)
            ? (l = f.get(k))
            : ((l = "" + ++h), f.set(k, l))
          : (l = "p_" + k);
        var n = g[0][l];
        if (n && y(g[0], l))
          for (g = 0; g < n.length; g++) {
            var p = n[g];
            if ((k !== k && p.key !== p.key) || k === p.key)
              return { id: l, list: n, index: g, j: p };
          }
        return { id: l, list: n, index: -1, j: void 0 };
      }
      function e(g) {
        this[0] = {};
        this[1] = b();
        this.size = 0;
        if (g) {
          g = x(g);
          for (var k; !(k = g.next()).done; )
            (k = k.value), this.set(k[0], k[1]);
        }
      }
      if (
        (function () {
          if (
            !a ||
            "function" != typeof a ||
            !t(a.prototype, "entries") ||
            "function" != typeof Object.seal
          )
            return !1;
          try {
            var g = Object.seal({ x: 4 }),
              k = new a(x([[g, "s"]]));
            if (
              "s" != k.get(g) ||
              1 != k.size ||
              k.get({ x: 4 }) ||
              k.set({ x: 4 }, "t") != k ||
              2 != k.size
            )
              return !1;
            var l = t(k, "entries").call(k),
              n = l.next();
            if (n.done || n.value[0] != g || "s" != n.value[1]) return !1;
            n = l.next();
            return n.done ||
              4 != n.value[0].x ||
              "t" != n.value[1] ||
              !l.next().done
              ? !1
              : !0;
          } catch (p) {
            return !1;
          }
        })()
      )
        return a;
      var f = new q.WeakMap();
      e.prototype.set = function (g, k) {
        g = 0 === g ? 0 : g;
        var l = d(this, g);
        l.list || (l.list = this[0][l.id] = []);
        l.j
          ? (l.j.value = k)
          : ((l.j = {
              next: this[1],
              m: this[1].m,
              head: this[1],
              key: g,
              value: k,
            }),
            l.list.push(l.j),
            (this[1].m.next = l.j),
            (this[1].m = l.j),
            this.size++);
        return this;
      };
      e.prototype.delete = function (g) {
        g = d(this, g);
        return g.j && g.list
          ? (g.list.splice(g.index, 1),
            g.list.length || delete this[0][g.id],
            (g.j.m.next = g.j.next),
            (g.j.next.m = g.j.m),
            (g.j.head = null),
            this.size--,
            !0)
          : !1;
      };
      e.prototype.clear = function () {
        this[0] = {};
        this[1] = this[1].m = b();
        this.size = 0;
      };
      e.prototype.has = function (g) {
        return !!d(this, g).j;
      };
      e.prototype.get = function (g) {
        return (g = d(this, g).j) && g.value;
      };
      e.prototype.entries = function () {
        return c(this, function (g) {
          return [g.key, g.value];
        });
      };
      e.prototype.keys = function () {
        return c(this, function (g) {
          return g.key;
        });
      };
      e.prototype.values = function () {
        return c(this, function (g) {
          return g.value;
        });
      };
      e.prototype.forEach = function (g, k) {
        for (var l = t(this, "entries").call(this), n; !(n = l.next()).done; )
          (n = n.value), g.call(k, n[1], n[0], this);
      };
      e.prototype[t(q.Symbol, "iterator")] = t(e.prototype, "entries");
      var h = 0;
      return e;
    },
    "es6"
  );
  function qa(a, b, c) {
    if (null == a)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          c +
          " must not be null or undefined"
      );
    if (b instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." +
          c +
          " must not be a regular expression"
      );
    return a + "";
  }
  v(
    "String.prototype.endsWith",
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = qa(this, b, "endsWith");
            void 0 === c && (c = d.length);
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var e = b.length; 0 < e && 0 < c; )
              if (d[--c] != b[--e]) return !1;
            return 0 >= e;
          };
    },
    "es6"
  );
  function ra(a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return { value: b(f, a[f]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[t(q.Symbol, "iterator")] = function () {
      return e;
    };
    return e;
  }
  v(
    "Array.prototype.keys",
    function (a) {
      return a
        ? a
        : function () {
            return ra(this, function (b) {
              return b;
            });
          };
    },
    "es6"
  );
  v(
    "Array.prototype.entries",
    function (a) {
      return a
        ? a
        : function () {
            return ra(this, function (b, c) {
              return [b, c];
            });
          };
    },
    "es6"
  );
  v(
    "globalThis",
    function (a) {
      return a || fa;
    },
    "es_2020"
  );
  v(
    "Object.values",
    function (a) {
      return a
        ? a
        : function (b) {
            var c = [],
              d;
            for (d in b) y(b, d) && c.push(b[d]);
            return c;
          };
    },
    "es8"
  );
  v(
    "Array.prototype.values",
    function (a) {
      return a
        ? a
        : function () {
            return ra(this, function (b, c) {
              return c;
            });
          };
    },
    "es8"
  );
  v(
    "Object.is",
    function (a) {
      return a
        ? a
        : function (b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
          };
    },
    "es6"
  );
  v(
    "Array.prototype.includes",
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
              var f = d[c];
              if (f === b || t(Object, "is").call(Object, f, b)) return !0;
            }
            return !1;
          };
    },
    "es7"
  );
  v(
    "String.prototype.includes",
    function (a) {
      return a
        ? a
        : function (b, c) {
            return -1 !== qa(this, b, "includes").indexOf(b, c || 0);
          };
    },
    "es6"
  );
  v(
    "Object.entries",
    function (a) {
      return a
        ? a
        : function (b) {
            var c = [],
              d;
            for (d in b) y(b, d) && c.push([d, b[d]]);
            return c;
          };
    },
    "es8"
  ); /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
  var A = this || self;
  function sa(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.na = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.ia = function (d, e, f) {
      for (
        var h = Array(arguments.length - 2), g = 2;
        g < arguments.length;
        g++
      )
        h[g - 2] = arguments[g];
      return b.prototype[e].apply(d, h);
    };
  }
  function ta(a) {
    return a;
  }
  function ua(a) {
    a = parseFloat(a);
    return isNaN(a) || 1 < a || 0 > a ? 0 : a;
  }
  function va(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, va);
    else {
      var c = Error().stack;
      c && (this.stack = c);
    }
    a && (this.message = String(a));
    void 0 !== b && (this.cause = b);
  }
  sa(va, Error);
  va.prototype.name = "CustomError";
  function wa(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++)
      c += a[e] + (e < b.length ? b[e] : "%s");
    va.call(this, c + a[d]);
  }
  sa(wa, va);
  wa.prototype.name = "AssertionError";
  function xa(a, b) {
    this.g = (a === ya && b) || "";
    this.A = Ca;
  }
  xa.prototype.toString = function () {
    return this.g;
  };
  function Da(a) {
    return a instanceof xa && a.constructor === xa && a.A === Ca
      ? a.g
      : "type_error:Const";
  }
  var Ca = {},
    ya = {};
  function Ea(a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  var Fa = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length
              ? -1
              : a.indexOf(b, 0);
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ga = Array.prototype.some
      ? function (a, b) {
          return Array.prototype.some.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = "string" === typeof a ? a.split("") : a,
              e = 0;
            e < c;
            e++
          )
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
          return !1;
        };
  var Ha, Ia;
  a: {
    for (var Ja = ["CLOSURE_FLAGS"], Ka = A, La = 0; La < Ja.length; La++)
      if (((Ka = Ka[Ja[La]]), null == Ka)) {
        Ia = null;
        break a;
      }
    Ia = Ka;
  }
  var Ma = Ia && Ia[610401301];
  Ha = null != Ma ? Ma : !1;
  function Na(a) {
    if (!Oa.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(Pa, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(Qa, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(Ra, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(Sa, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(Wa, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(Ya, "&#0;"));
    return a;
  }
  var Pa = /&/g,
    Qa = /</g,
    Ra = />/g,
    Sa = /"/g,
    Wa = /'/g,
    Ya = /\x00/g,
    Oa = /[\x00&<>"']/;
  function Za() {
    var a = A.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  var $a,
    ab = A.navigator;
  $a = ab ? ab.userAgentData || null : null;
  function bb(a) {
    return Ha
      ? $a
        ? $a.brands.some(function (b) {
            return (b = b.brand) && -1 != b.indexOf(a);
          })
        : !1
      : !1;
  }
  function E(a) {
    return -1 != Za().indexOf(a);
  }
  function G() {
    return Ha ? !!$a && 0 < $a.brands.length : !1;
  }
  function cb() {
    return G()
      ? bb("Chromium")
      : ((E("Chrome") || E("CriOS")) && !(G() ? 0 : E("Edge"))) || E("Silk");
  }
  function db(a) {
    db[" "](a);
    return a;
  }
  db[" "] = function () {};
  var eb = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  };
  var fb;
  function gb() {
    if (void 0 === fb) {
      var a = null,
        b = A.trustedTypes;
      if (b && b.createPolicy) {
        try {
          a = b.createPolicy("goog#html", {
            createHTML: ta,
            createScript: ta,
            createScriptURL: ta,
          });
        } catch (c) {
          A.console && A.console.error(c.message);
        }
        fb = a;
      } else fb = a;
    }
    return fb;
  }
  function hb(a) {
    this.g = a;
  }
  hb.prototype.toString = function () {
    return this.g + "";
  };
  function ib(a) {
    return a instanceof hb && a.constructor === hb
      ? a.g
      : "type_error:TrustedResourceUrl";
  }
  var jb = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
    kb = {};
  function lb(a) {
    var b = gb();
    a = b ? b.createScriptURL(a) : a;
    return new hb(a, kb);
  }
  function mb(a, b, c) {
    if (null == c) return b;
    if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
    for (var d in c)
      if (Object.prototype.hasOwnProperty.call(c, d)) {
        var e = c[d];
        e = Array.isArray(e) ? e : [e];
        for (var f = 0; f < e.length; f++) {
          var h = e[f];
          null != h &&
            (b || (b = a),
            (b +=
              (b.length > a.length ? "&" : "") +
              encodeURIComponent(d) +
              "=" +
              encodeURIComponent(String(h))));
        }
      }
    return b;
  } /* 
 
 SPDX-License-Identifier: Apache-2.0 
*/
  function H(a) {
    this.g = a;
  }
  H.prototype.toString = function () {
    return this.g;
  };
  var nb = new H("about:invalid#zClosurez");
  function ob(a) {
    this.P = a;
  }
  function pb(a) {
    return new ob(function (b) {
      return b.substr(0, a.length + 1).toLowerCase() === a + ":";
    });
  }
  var qb = [
    pb("data"),
    pb("http"),
    pb("https"),
    pb("mailto"),
    pb("ftp"),
    new ob(function (a) {
      return /^[^:]*([/?#]|$)/.test(a);
    }),
  ];
  function rb(a) {
    var b = void 0 === b ? qb : b;
    a: if (((b = void 0 === b ? qb : b), !(a instanceof H))) {
      for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        if (d instanceof ob && d.P(a)) {
          a = new H(a);
          break a;
        }
      }
      a = void 0;
    }
    return a || nb;
  }
  var sb = {};
  function tb(a) {
    this.g = a;
  }
  tb.prototype.toString = function () {
    return this.g.toString();
  };
  var ub = new tb("", sb);
  function vb(a) {
    if (a instanceof H)
      return (
        'url("' +
        a.toString().replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") +
        '")'
      );
    if (a instanceof xa) a = Da(a);
    else {
      a = String(a);
      var b = a.replace(wb, "$1").replace(wb, "$1").replace(xb, "url");
      if (yb.test(b)) {
        if ((b = !zb.test(a))) {
          for (var c = (b = !0), d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            "'" == e && c ? (b = !b) : '"' == e && b && (c = !c);
          }
          b = b && c && Ab(a);
        }
        a = b ? Bb(a) : "zClosurez";
      } else a = "zClosurez";
    }
    if (/[{;}]/.test(a))
      throw new wa("Value does not allow [{;}], got: %s.", [a]);
    return a;
  }
  function Ab(a) {
    for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
      var e = a.charAt(d);
      if ("]" == e) {
        if (b) return !1;
        b = !0;
      } else if ("[" == e) {
        if (!b) return !1;
        b = !1;
      } else if (!b && !c.test(e)) return !1;
    }
    return b;
  }
  var yb = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$"),
    xb = RegExp(
      "\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))",
      "g"
    ),
    wb = RegExp(
      "\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)",
      "g"
    ),
    zb = /\/\*/;
  function Bb(a) {
    return a.replace(xb, function (b, c, d, e) {
      var f = "";
      d = d.replace(/^(['"])(.*)\1$/, function (h, g, k) {
        f = g;
        return k;
      });
      b = rb(d).toString();
      return c + f + b + f + e;
    });
  }
  var Cb = {};
  function I(a) {
    this.g = a;
  }
  I.prototype.toString = function () {
    return this.g.toString();
  };
  function Db(a) {
    return a instanceof I && a.constructor === I ? a.g : "type_error:SafeHtml";
  }
  function Fb(a) {
    function b(e) {
      Array.isArray(e)
        ? e.forEach(b)
        : ((e = e instanceof I ? e : Gb(Na(String(e)))),
          d.push(Db(e).toString()));
    }
    var c = Hb;
    c = c instanceof I ? c : Gb(Na(String(c)));
    var d = [];
    a.forEach(b);
    return Gb(d.join(Db(c).toString()));
  }
  function Ib(a) {
    return Fb(Array.prototype.slice.call(arguments));
  }
  function Gb(a) {
    var b = gb();
    a = b ? b.createHTML(a) : a;
    return new I(a, Cb);
  }
  var Jb = /^[a-zA-Z0-9-]+$/,
    Kb = {
      action: !0,
      cite: !0,
      data: !0,
      formaction: !0,
      href: !0,
      manifest: !0,
      poster: !0,
      src: !0,
    },
    Lb = {
      APPLET: !0,
      BASE: !0,
      EMBED: !0,
      IFRAME: !0,
      LINK: !0,
      MATH: !0,
      META: !0,
      OBJECT: !0,
      SCRIPT: !0,
      STYLE: !0,
      SVG: !0,
      TEMPLATE: !0,
    },
    Hb = new I((A.trustedTypes && A.trustedTypes.emptyHTML) || "", Cb);
  function Mb(a) {
    var b = pa.apply(1, arguments);
    if (0 === b.length) return lb(a[0]);
    for (var c = a[0], d = 0; d < b.length; d++)
      c += encodeURIComponent(b[d]) + a[d + 1];
    return lb(c);
  }
  function Nb(a, b) {
    a.src = ib(b);
    var c, d;
    (c = (b =
      null ==
      (d = (c = ((a.ownerDocument && a.ownerDocument.defaultView) || window)
        .document).querySelector)
        ? void 0
        : d.call(c, "script[nonce]"))
      ? b.nonce || b.getAttribute("nonce") || ""
      : "") && a.setAttribute("nonce", c);
  }
  function Ob(a, b) {
    a.write(Db(b));
  }
  var Pb = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
  );
  function Qb(a) {
    var b = a.match(Pb);
    a = b[5];
    var c = b[6];
    b = b[7];
    var d = "";
    a && (d += a);
    c && (d += "?" + c);
    b && (d += "#" + b);
    return d;
  }
  function Rb(a, b, c, d) {
    for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
      var f = a.charCodeAt(b - 1);
      if (38 == f || 63 == f)
        if (((f = a.charCodeAt(b + e)), !f || 61 == f || 38 == f || 35 == f))
          return b;
      b += e + 1;
    }
    return -1;
  }
  var Sb = /#|$/;
  function Tb(a, b) {
    var c = a.search(Sb),
      d = Rb(a, 0, b, c);
    if (0 > d) return null;
    var e = a.indexOf("&", d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return decodeURIComponent(a.slice(d, -1 !== e ? e : 0).replace(/\+/g, " "));
  }
  var Ub = /[?&]($|#)/;
  function Vb(a, b, c) {
    for (var d = a.search(Sb), e = 0, f, h = []; 0 <= (f = Rb(a, e, b, d)); )
      h.push(a.substring(e, f)), (e = Math.min(a.indexOf("&", f) + 1 || d, d));
    h.push(a.slice(e));
    a = h.join("").replace(Ub, "$1");
    c = null != c ? "=" + encodeURIComponent(String(c)) : "";
    (b += c)
      ? ((c = a.indexOf("#")),
        0 > c && (c = a.length),
        (d = a.indexOf("?")),
        0 > d || d > c ? ((d = c), (e = "")) : (e = a.substring(d + 1, c)),
        (c = [a.slice(0, d), e, a.slice(c)]),
        (a = c[1]),
        (c[1] = b ? (a ? a + "&" + b : b) : a),
        (b = c[0] + (c[1] ? "?" + c[1] : "") + c[2]))
      : (b = a);
    return b;
  }
  function Wb(a) {
    try {
      var b;
      if ((b = !!a && null != a.location.href))
        a: {
          try {
            db(a.foo);
            b = !0;
            break a;
          } catch (c) {}
          b = !1;
        }
      return b;
    } catch (c) {
      return !1;
    }
  }
  function Xb() {
    if (!q.globalThis.crypto) return Math.random();
    try {
      var a = new Uint32Array(1);
      q.globalThis.crypto.getRandomValues(a);
      return a[0] / 65536 / 65536;
    } catch (b) {
      return Math.random();
    }
  }
  function Yb(a, b) {
    if (a)
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  }
  var $b = Ea(function () {
      return (
        Ga(
          [
            "Google Web Preview",
            "Mediapartners-Google",
            "Google-Read-Aloud",
            "Google-Adwords",
          ],
          Zb
        ) || 1e-4 > Math.random()
      );
    }),
    ac = Ea(function () {
      return Zb("MSIE");
    });
  function Zb(a) {
    return -1 != Za().indexOf(a);
  }
  function J(a) {
    return /^true$/.test(a);
  }
  function bc(a, b) {
    if (!a || !b.head) return null;
    var c = cc("META");
    b.head.appendChild(c);
    c.httpEquiv = "origin-trial";
    c.content = a;
    return c;
  }
  function cc(a, b) {
    b = void 0 === b ? document : b;
    return b.createElement(String(a).toLowerCase());
  }
  var dc = ua("0.20"),
    ec = ua("0.002"),
    fc = ua("1.0"),
    gc = ua("1.0"),
    hc = ua("0.00"),
    ic = ua("0.00"),
    jc = J("false"),
    kc = J("true"),
    lc = J("true"),
    mc = J("true"),
    nc = J("true"),
    oc = J("true");
  var pc = null;
  function qc() {
    if (null === pc) {
      pc = "";
      try {
        var a = "";
        try {
          a = A.top.location.hash;
        } catch (c) {
          a = A.location.hash;
        }
        if (a) {
          var b = a.match(/\bdeid=([\d,]+)/);
          pc = b ? b[1] : "";
        }
      } catch (c) {}
    }
    return pc;
  }
  function K(a, b, c) {
    var d = L;
    if (c ? d.g.hasOwnProperty(c) && "" == d.g[c] : 1) {
      var e;
      e = (e = qc())
        ? (e = e.match(new RegExp("\\b(" + a.join("|") + ")\\b")))
          ? e[0]
          : null
        : null;
      if (e) a = e;
      else
        a: {
          if (!ac() && !$b() && ((e = Math.random()), e < b)) {
            e = Xb();
            a = a[Math.floor(e * a.length)];
            break a;
          }
          a = null;
        }
      a &&
        "" != a &&
        (c ? d.g.hasOwnProperty(c) && (d.g[c] = a) : (d.A[a] = !0));
    }
  }
  function M(a) {
    var b = L;
    return b.g.hasOwnProperty(a) ? b.g[a] : "";
  }
  function rc() {
    var a = L,
      b = [];
    Yb(a.A, function (c, d) {
      b.push(d);
    });
    Yb(a.g, function (c) {
      "" != c && b.push(c);
    });
    return b;
  }
  var sc = {
      W: 2,
      ea: 13,
      ca: 14,
      Z: 16,
      Y: 17,
      X: 18,
      V: 19,
      ga: 20,
      fa: 21,
      U: 22,
    },
    L = null;
  function tc() {
    return !!L && ("466465926" == M(20) || "466465925" == M(20));
  }
  function uc() {
    return !!L && "592230571" == M(16);
  }
  function vc() {
    return !!L && ("512247839" == M(22) || "512247838" == M(22));
  }
  function wc(a) {
    var b = void 0 === b ? A : b;
    var c, d;
    return (
      (null == (c = b.performance)
        ? void 0
        : null == (d = c.timing)
        ? void 0
        : d[a]) || 0
    );
  }
  function xc(a) {
    var b = "D";
    if (a.D && a.hasOwnProperty(b)) return a.D;
    b = new a();
    return (a.D = b);
  }
  var yc = { aa: 0, R: 1, ba: 2, T: 3, S: 4 };
  function zc() {
    this.g = {};
  }
  function Ac(a, b, c) {
    "number" === typeof c && 0 < c && (a.g[b] = Math.round(c));
  }
  function Bc(a) {
    var b = xc(zc);
    var c = void 0 === c ? A : c;
    c = c.performance;
    Ac(b, a, c && c.now ? c.now() : null);
  }
  function Cc() {
    function a() {
      return Ac(b, 0, wc("loadEventStart") - wc("navigationStart"));
    }
    var b = xc(zc);
    0 != wc("loadEventStart") ? a() : window.addEventListener("load", a);
  }
  function Dc() {
    var a = xc(zc);
    return t(Object, "values")
      .call(Object, yc)
      .map(function (b) {
        return [b, a.g[b] || 0];
      });
  }
  var Ec = J("true");
  var Fc = {};
  function Gc(a) {
    Fc.TAGGING = Fc.TAGGING || [];
    Fc.TAGGING[a] = !0;
  }
  function Hc(a) {
    return "function" === typeof a;
  }
  function Ic(a) {
    return "string" === typeof a;
  }
  function Jc(a, b) {
    if (a && Array.isArray(a))
      for (var c = 0; c < a.length; c++) if (a[c] && b(a[c])) return a[c];
  }
  function Kc(a, b) {
    for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
  }
  function Lc(a) {
    a = Mc(a);
    return Gb(a);
  }
  function Mc(a) {
    return null === a ? "null" : void 0 === a ? "undefined" : a;
  }
  var N = window,
    O = document;
  function Nc(a, b) {
    b &&
      (a.addEventListener
        ? (a.onload = b)
        : (a.onreadystatechange = function () {
            a.readyState in { loaded: 1, complete: 1 } &&
              ((a.onreadystatechange = null), b());
          }));
  }
  var Oc = { async: 1, nonce: 1, onerror: 1, onload: 1, src: 1, type: 1 },
    Pc = { onload: 1, src: 1, width: 1, height: 1, style: 1 };
  function Qc(a, b, c) {
    b &&
      Kc(b, function (d, e) {
        d = d.toLowerCase();
        c.hasOwnProperty(d) || a.setAttribute(d, e);
      });
  }
  function Rc(a, b, c, d) {
    var e = O.createElement("script");
    Qc(e, c, Oc);
    e.type = "text/javascript";
    e.async = c && !1 === c.async ? !1 : !0;
    a = lb(Mc(a));
    Nb(e, a);
    Nc(e, b);
    d
      ? d.appendChild(e)
      : ((b = O.getElementsByTagName("script")[0] || O.body || O.head),
        b.parentNode.insertBefore(e, b));
  }
  function Sc(a, b, c) {
    var d = !1;
    d = void 0 === d ? !0 : d;
    var e = !1;
    c || ((c = O.createElement("iframe")), (e = !0));
    Qc(c, void 0, Pc);
    d &&
      ((c.height = "0"),
      (c.width = "0"),
      (c.style.display = "none"),
      (c.style.visibility = "hidden"));
    void 0 !== a && (c.src = a);
    e &&
      ((a = (O.body && O.body.lastChild) || O.body || O.head),
      a.parentNode.insertBefore(c, a));
    Nc(c, b);
  }
  var Tc = [];
  function P(a) {
    return void 0 === Tc[a] ? !1 : Tc[a];
  }
  function Uc() {
    var a = void 0 === a ? document : a;
    var b;
    return !(
      null == (b = a.featurePolicy) ||
      !((ba = b.allowedFeatures()), t(ba, "includes")).call(
        ba,
        "attribution-reporting"
      )
    );
  }
  function Vc(a, b, c) {
    a = Wc(a, !0);
    if (a[b]) return !1;
    a[b] = [];
    a[b][0] = c;
    return !0;
  }
  function Wc(a, b) {
    var c = a.GooglebQhCsO;
    c || ((c = {}), b && (a.GooglebQhCsO = c));
    return c;
  }
  !E("Android") || cb();
  cb();
  E("Safari") &&
    (cb() ||
      (G() ? 0 : E("Coast")) ||
      (G() ? 0 : E("Opera")) ||
      (G() ? 0 : E("Edge")) ||
      (G() ? bb("Microsoft Edge") : E("Edg/")) ||
      (G() && bb("Opera")));
  var Xc = {},
    Yc = null;
  function Zc(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      255 < e && ((b[c++] = e & 255), (e >>= 8));
      b[c++] = e;
    }
    a = 4;
    void 0 === a && (a = 0);
    if (!Yc)
      for (
        Yc = {},
          c =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
              ""
            ),
          d = ["+/=", "+/", "-_=", "-_.", "-_"],
          e = 0;
        5 > e;
        e++
      ) {
        var f = c.concat(d[e].split(""));
        Xc[e] = f;
        for (var h = 0; h < f.length; h++) {
          var g = f[h];
          void 0 === Yc[g] && (Yc[g] = h);
        }
      }
    a = Xc[a];
    c = Array(Math.floor(b.length / 3));
    d = a[64] || "";
    for (e = f = 0; f < b.length - 2; f += 3) {
      var k = b[f],
        l = b[f + 1];
      g = b[f + 2];
      h = a[k >> 2];
      k = a[((k & 3) << 4) | (l >> 4)];
      l = a[((l & 15) << 2) | (g >> 6)];
      g = a[g & 63];
      c[e++] = h + k + l + g;
    }
    h = 0;
    g = d;
    switch (b.length - f) {
      case 2:
        (h = b[f + 1]), (g = a[(h & 15) << 2] || d);
      case 1:
        (b = b[f]), (c[e] = a[b >> 2] + a[((b & 3) << 4) | (h >> 4)] + g + d);
    }
    return c.join("");
  }
  function $c(a, b, c, d, e) {
    var f = Tb(c, "fmt");
    if (d) {
      var h = Tb(c, "random"),
        g = Tb(c, "label") || "";
      if (!h) return !1;
      h = Zc(
        decodeURIComponent(g.replace(/\+/g, " ")) +
          ":" +
          decodeURIComponent(h.replace(/\+/g, " "))
      );
      if (!Vc(a, h, d)) return !1;
    }
    f && 4 != f && (c = Vb(c, "rfmt", f));
    c = Vb(c, "fmt", 4);
    Rc(
      c,
      function () {
        a.google_noFurtherRedirects &&
          d &&
          d.call &&
          ((a.google_noFurtherRedirects = null), d());
      },
      e,
      b.getElementsByTagName("script")[0].parentElement || void 0
    );
    return !0;
  }
  var ad = {},
    bd =
      ((ad.k = { H: /^[\w-]+$/ }),
      (ad.b = { H: /^[\w-]+$/, F: !0 }),
      (ad.i = { H: /^[1-9]\d*$/ }),
      ad);
  var cd = {},
    fd =
      ((cd[5] = { K: { 2: dd }, B: ["k", "i", "b"] }),
      (cd[4] = { K: { 2: dd, GCL: ed }, B: ["k", "i", "b"] }),
      cd);
  function dd(a, b) {
    var c = a.split(".");
    if (3 === c.length && ((a = {}), (b = fd[b]))) {
      b = b.B;
      c = x(c[2].split("$"));
      for (var d = c.next(); !d.done; d = c.next()) {
        d = d.value;
        var e = d[0];
        if (-1 !== b.indexOf(e))
          try {
            var f = decodeURIComponent(d.substring(1)),
              h = bd[e];
            h && (h.F ? ((a[e] = a[e] || []), a[e].push(f)) : (a[e] = f));
          } catch (g) {}
      }
      return a;
    }
  }
  function ed(a) {
    a = a.split(".");
    a.shift();
    var b = a.shift(),
      c = a.shift(),
      d = {};
    return (d.k = c), (d.i = b), (d.b = a), d;
  }
  var hd = new (function (a, b) {
    this.g = a;
    this.defaultValue = void 0 === b ? !1 : b;
  })(1933);
  function id() {
    var a = {};
    var b = N.google_tag_data;
    N.google_tag_data = void 0 === b ? a : b;
    a = N.google_tag_data;
    return (a.ics = a.ics || new jd());
  }
  function jd() {
    this.entries = {};
    this.waitPeriodTimedOut =
      this.wasSetLate =
      this.accessedAny =
      this.accessedDefault =
      this.usedImplicit =
      this.usedUpdate =
      this.usedDefault =
      this.usedDeclare =
      this.active =
        !1;
    this.g = [];
  }
  m = jd.prototype;
  m.default = function (a, b, c, d, e, f, h) {
    this.usedDefault ||
      this.usedDeclare ||
      (!this.accessedDefault && !this.accessedAny) ||
      (this.wasSetLate = !0);
    this.usedDefault = this.active = !0;
    Gc(19);
    null == b ? Gc(18) : kd(this, a, "granted" === b, c, d, e, f, h);
  };
  m.waitForUpdate = function (a, b, c) {
    for (var d = 0; d < a.length; d++)
      kd(this, a[d], void 0, void 0, "", "", b, c);
  };
  function kd(a, b, c, d, e, f, h, g) {
    var k = t(a, "entries"),
      l = k[b] || {},
      n = l.region;
    d = d && Ic(d) ? d.toUpperCase() : void 0;
    e = e.toUpperCase();
    f = f.toUpperCase();
    if ("" === e || d === f || (d === e ? n !== f : !d && !n)) {
      f = !!(h && 0 < h && void 0 === l.update);
      var p = {
        region: d,
        declare_region: l.declare_region,
        implicit: l.implicit,
        default: void 0 !== c ? c : l.default,
        declare: l.declare,
        update: l.update,
        quiet: f,
      };
      if ("" !== e || !1 !== l.default) k[b] = p;
      f &&
        N.setTimeout(function () {
          k[b] === p &&
            p.quiet &&
            (Gc(2),
            (a.waitPeriodTimedOut = !0),
            a.clearTimeout(b, void 0, g),
            a.notifyListeners());
        }, h);
    }
  }
  m.clearTimeout = function (a, b, c) {
    var d = [a],
      e = (null == c ? void 0 : c.delegatedConsentTypes) || {},
      f;
    for (f in e) e.hasOwnProperty(f) && e[f] === a && d.push(f);
    e = t(this, "entries")[a] || {};
    a = this.getConsentState(a, c);
    if (e.quiet)
      for (e.quiet = !1, b = x(d), d = b.next(); !d.done; d = b.next())
        ld(this, d.value);
    else if (void 0 !== b && a !== b)
      for (b = x(d), d = b.next(); !d.done; d = b.next()) ld(this, d.value);
  };
  m.update = function (a, b, c) {
    this.usedDefault ||
      this.usedDeclare ||
      this.usedUpdate ||
      !this.accessedAny ||
      (this.wasSetLate = !0);
    this.usedUpdate = this.active = !0;
    if (null != b) {
      var d = this.getConsentState(a, c),
        e = t(this, "entries");
      (e[a] = e[a] || {}).update = "granted" === b;
      this.clearTimeout(a, d, c);
    }
  };
  m.declare = function (a, b, c, d, e) {
    this.usedDeclare = this.active = !0;
    var f = t(this, "entries"),
      h = f[a] || {},
      g = h.declare_region;
    c = c && Ic(c) ? c.toUpperCase() : void 0;
    d = d.toUpperCase();
    e = e.toUpperCase();
    if ("" === d || c === e || (c === d ? g !== e : !c && !g))
      if (
        ((b = {
          region: h.region,
          declare_region: c,
          declare: "granted" === b,
          implicit: h.implicit,
          default: h.default,
          update: h.update,
          quiet: h.quiet,
        }),
        "" !== d || !1 !== h.declare)
      )
        f[a] = b;
  };
  m.implicit = function (a, b) {
    this.usedImplicit = !0;
    var c = t(this, "entries");
    a = c[a] = c[a] || {};
    !1 !== a.implicit && (a.implicit = "granted" === b);
  };
  m.getConsentState = function (a, b) {
    var c = t(this, "entries"),
      d = c[a] || {},
      e = d.update;
    if (void 0 !== e) return e ? 1 : 2;
    e = d.default;
    if (void 0 !== e) return e ? 1 : 2;
    if (null == b ? 0 : b.delegatedConsentTypes.hasOwnProperty(a)) {
      a = c[b.delegatedConsentTypes[a]] || {};
      e = a.update;
      if (void 0 !== e) return e ? 1 : 2;
      e = a.default;
      if (void 0 !== e) return e ? 1 : 2;
    }
    e = d.declare;
    if (void 0 !== e) return e ? 1 : 2;
    e = d.implicit;
    return void 0 !== e ? (e ? 3 : 4) : 0;
  };
  m.addListener = function (a, b) {
    this.g.push({ consentTypes: a, L: b });
  };
  function ld(a, b) {
    for (var c = 0; c < a.g.length; ++c) {
      var d = a.g[c];
      Array.isArray(d.consentTypes) &&
        -1 !== d.consentTypes.indexOf(b) &&
        (d.J = !0);
    }
  }
  m.notifyListeners = function (a, b) {
    for (var c = 0; c < this.g.length; ++c) {
      var d = this.g[c];
      if (d.J) {
        d.J = !1;
        try {
          d.L({ consentEventId: a, consentPriorityId: b });
        } catch (e) {}
      }
    }
  };
  function md() {
    var a = {};
    this.g = function () {
      var b = hd.g,
        c = hd.defaultValue;
      return null != a[b] ? a[b] : c;
    };
  }
  var nd = {
    delegatedConsentTypes: {},
    corePlatformServices: {},
    usedCorePlatformServices: !1,
  };
  function od(a) {
    var b = id();
    b.accessedAny = !0;
    return (Ic(a) ? [a] : a).every(function (c) {
      switch (b.getConsentState(c, nd)) {
        case 1:
        case 3:
          return !0;
        case 2:
        case 4:
          return !1;
        default:
          return !0;
      }
    });
  }
  function pd(a) {
    var b = id();
    b.accessedAny = !0;
    return !(t(b, "entries")[a] || {}).quiet;
  }
  function qd(a, b) {
    id().addListener(a, b);
  }
  function rd(a, b) {
    function c() {
      for (var e = 0; e < b.length; e++) if (!pd(b[e])) return !0;
      return !1;
    }
    if (c()) {
      var d = !1;
      qd(b, function (e) {
        d || c() || ((d = !0), a(e));
      });
    } else a({});
  }
  function sd(a, b) {
    function c() {
      for (var h = [], g = 0; g < e.length; g++) {
        var k = e[g];
        od(k) && !f[k] && h.push(k);
      }
      return h;
    }
    function d(h) {
      for (var g = 0; g < h.length; g++) f[h[g]] = !0;
    }
    var e = Ic(b) ? [b] : b,
      f = {};
    b = c();
    b.length !== e.length &&
      (d(b),
      qd(e, function (h) {
        function g(n) {
          0 !== n.length && (d(n), (h.consentTypes = n), a(h));
        }
        var k = c();
        if (0 !== k.length) {
          var l = t(Object, "keys").call(Object, f).length;
          k.length + l >= e.length
            ? g(k)
            : N.setTimeout(function () {
                g(c());
              }, 500);
        }
      }));
  }
  var td = /:[0-9]+$/;
  function ud(a, b) {
    a = x(a.split("&"));
    for (var c = a.next(); !c.done; c = a.next()) {
      var d = x(c.value.split("="));
      c = d.next().value;
      for (var e, f = []; !(e = d.next()).done; ) f.push(e.value);
      d = f;
      if (decodeURIComponent(c.replace(/\+/g, " ")) === b)
        return decodeURIComponent(d.join("=").replace(/\+/g, " "));
    }
  }
  function vd(a, b) {
    var c = "query";
    var d = (d = a.protocol) ? d.replace(":", "").toLowerCase() : "";
    c && (c = String(c).toLowerCase());
    switch (c) {
      case "url_no_fragment":
        b = "";
        a &&
          a.href &&
          ((b = a.href.indexOf("#")),
          (b = 0 > b ? a.href : a.href.substr(0, b)));
        a = b;
        break;
      case "protocol":
        a = d;
        break;
      case "host":
        a = a.hostname.replace(td, "").toLowerCase();
        break;
      case "port":
        a = String(
          Number(a.port) || ("http" === d ? 80 : "https" === d ? 443 : "")
        );
        break;
      case "path":
        a.pathname || a.hostname || Gc(1);
        a = "/" === a.pathname.charAt(0) ? a.pathname : "/" + a.pathname;
        a = a.split("/");
        0 <= [].indexOf(a[a.length - 1]) && (a[a.length - 1] = "");
        a = a.join("/");
        break;
      case "query":
        a = a.search.replace("?", "");
        b && (a = ud(a, b));
        break;
      case "extension":
        a = a.pathname.split(".");
        a = 1 < a.length ? a[a.length - 1] : "";
        a = a.split("/")[0];
        break;
      case "fragment":
        a = a.hash.replace("#", "");
        break;
      default:
        a = a && a.href;
    }
    return a;
  }
  var wd = {},
    xd = 0;
  function yd(a, b, c, d) {
    if (zd(d)) {
      d = [];
      b = String(b || Ad()).split(";");
      for (var e = 0; e < b.length; e++) {
        var f = b[e].split("="),
          h = f[0].replace(/^\s*|\s*$/g, "");
        h &&
          h === a &&
          ((f = f
            .slice(1)
            .join("=")
            .replace(/^\s*|\s*$/g, "")) &&
            c &&
            (f = decodeURIComponent(f)),
          d.push(f));
      }
      a = d;
    } else a = [];
    return a;
  }
  function Bd(a, b, c, d) {
    var e = Ad(),
      f = window;
    "null" !== f.origin && (f.document.cookie = a);
    a = Ad();
    return e !== a || (void 0 !== c && 0 <= yd(b, a, !1, d).indexOf(c));
  }
  function Cd(a, b, c) {
    function d(p, r, z) {
      if (null == z) return delete h[r], p;
      h[r] = z;
      return p + "; " + r + "=" + z;
    }
    function e(p, r) {
      if (null == r) return p;
      h[r] = !0;
      return p + "; " + r;
    }
    if (zd(c.u)) {
      if (null == b)
        var f = a + "=deleted; expires=" + new Date(0).toUTCString();
      else
        c.encode && (b = encodeURIComponent(b)), (b = Dd(b)), (f = a + "=" + b);
      var h = {};
      f = d(f, "path", c.path);
      if (c.expires instanceof Date) var g = c.expires.toUTCString();
      else null != c.expires && (g = c.expires);
      f = d(f, "expires", g);
      f = d(f, "max-age", c.ka);
      f = d(f, "samesite", c.la);
      c.ma && (f = e(f, "secure"));
      if ((g = c.domain) && "auto" === g.toLowerCase()) {
        g = Ed();
        for (var k = 0; k < g.length; ++k) {
          var l = "none" !== g[k] ? g[k] : void 0,
            n = d(f, "domain", l);
          n = e(n, c.flags);
          if (!Fd(l, c.path) && Bd(n, a, b, c.u)) break;
        }
      } else
        g && "none" !== g.toLowerCase() && (f = d(f, "domain", g)),
          (f = e(f, c.flags)),
          Fd(g, c.path) || Bd(f, a, b, c.u);
    }
  }
  function Gd(a, b, c) {
    null == c.path && (c.path = "/");
    c.domain || (c.domain = "auto");
    Cd(a, b, c);
  }
  function Dd(a) {
    a && 1200 < a.length && (a = a.substring(0, 1200));
    return a;
  }
  var Hd = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    Id = /(^|\.)doubleclick\.net$/i;
  function Fd(a, b) {
    return (
      void 0 !== a &&
      (Id.test(window.document.location.hostname) || ("/" === b && Hd.test(a)))
    );
  }
  function Ad() {
    return "null" !== window.origin ? window.document.cookie : "";
  }
  function zd(a) {
    return a && xc(md).g()
      ? (Array.isArray(a) ? a : [a]).every(function (b) {
          return pd(b) && od(b);
        })
      : !0;
  }
  function Ed() {
    var a = [],
      b = window.document.location.hostname.split(".");
    if (4 === b.length) {
      var c = b[b.length - 1];
      if (Number(c).toString() === c) return ["none"];
    }
    for (c = b.length - 2; 0 <= c; c--) a.push(b.slice(c).join("."));
    b = window.document.location.hostname;
    Id.test(b) || Hd.test(b) || a.push("none");
    return a;
  }
  function Jd(a, b, c, d) {
    var e,
      f = Number(null != a.I ? a.I : void 0);
    0 !== f &&
      (e = new Date(
        (b || new Date(Date.now()).getTime()) + 1e3 * (f || 7776e3)
      ));
    return {
      path: a.path,
      domain: a.domain,
      flags: a.flags,
      encode: !!c,
      expires: e,
      u: d,
    };
  }
  var Kd = new q.Map([
    [5, "ad_storage"],
    [4, ["ad_storage", "ad_user_data"]],
  ]);
  function Ld(a) {
    if (fd[5]) {
      var b = [];
      a = yd(a, void 0, void 0, Kd.get(5));
      a = x(a);
      for (var c = a.next(); !c.done; c = a.next()) {
        a: {
          c = c.value;
          var d = fd[5];
          if (d) {
            var e = c.split(".")[0];
            if (e && (d = d.K[e])) {
              c = d(c, 5);
              break a;
            }
          }
          c = void 0;
        }
        c && (Md(c), b.push(c));
      }
      return b;
    }
  }
  function Nd(a, b, c, d) {
    c = c || {};
    var e;
    (e = c.domain)
      ? ((e = 0 === e.indexOf(".") ? e.substring(1) : e),
        (e = e.split(".").length))
      : (e = 1);
    e = "" + e;
    var f;
    (f = c.path) && "/" !== f
      ? ("/" !== f[0] && (f = "/" + f),
        "/" !== f[f.length - 1] && (f += "/"),
        (f = f.split("/").length - 1))
      : (f = 1);
    1 < f && (e += "-" + f);
    var h = fd[5];
    if (h) {
      f = [];
      h = x(h.B);
      for (var g = h.next(); !g.done; g = h.next()) {
        g = g.value;
        var k = bd[g];
        if (k) {
          var l = b[g];
          if (void 0 !== l)
            if (k.F && Array.isArray(l))
              for (k = x(l), l = k.next(); !l.done; l = k.next())
                f.push(encodeURIComponent(g + l.value));
            else f.push(encodeURIComponent(g + l));
        }
      }
      b = ["2", e || "1", f.join("$")].join(".");
    } else b = void 0;
    b && ((c = Jd(c, d, void 0, Kd.get(5))), Gd(a, b, c));
  }
  function Od(a, b) {
    b = b.H;
    return "function" === typeof b ? b(a) : b.test(a);
  }
  function Md(a) {
    for (
      var b = x(t(Object, "keys").call(Object, a)), c = b.next(), d = {};
      !c.done;
      d = { o: void 0 }, c = b.next()
    ) {
      c = c.value;
      var e = a[c];
      d.o = bd[c];
      d.o
        ? d.o.F
          ? (a[c] = Array.isArray(e)
              ? e.filter(
                  (function (f) {
                    return function (h) {
                      return Od(h, f.o);
                    };
                  })(d)
                )
              : void 0)
          : ("string" === typeof e && Od(e, d.o)) || (a[c] = void 0)
        : (a[c] = void 0);
    }
  }
  function Pd(a) {
    var b = [],
      c = O.cookie.split(";");
    a = new RegExp("^\\s*" + (a || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$");
    for (var d = 0; d < c.length; d++) {
      var e = c[d].match(a);
      e &&
        b.push({
          G: e[1],
          value: e[2],
          timestamp: Number(e[2].split(".")[1]) || 0,
        });
    }
    b.sort(function (f, h) {
      return h.timestamp - f.timestamp;
    });
    return b;
  }
  function Qd(a, b) {
    a = Pd(a);
    var c = {};
    if (!a || !a.length) return c;
    for (var d = 0; d < a.length; d++) {
      var e = a[d].value.split(".");
      if (
        !("1" !== e[0] || (b && 3 > e.length) || (!b && 3 !== e.length)) &&
        Number(e[1])
      ) {
        c[a[d].G] || (c[a[d].G] = []);
        var f = { version: e[0], timestamp: 1e3 * Number(e[1]), l: e[2] };
        b && 3 < e.length && (f.labels = e.slice(3));
        c[a[d].G].push(f);
      }
    }
    return c;
  }
  var Rd = /^\w+$/,
    Sd = /^[\w-]+$/,
    R = {},
    Td =
      ((R.aw = "_aw"),
      (R.dc = "_dc"),
      (R.gf = "_gf"),
      (R.gp = "_gp"),
      (R.gs = "_gs"),
      (R.ha = "_ha"),
      (R.ag = "_ag"),
      (R.gb = "_gb"),
      R);
  function T() {
    return ["ad_storage", "ad_user_data"];
  }
  function U(a) {
    return !xc(md).g() || od(a);
  }
  function Ud(a) {
    function b() {
      var d = U(c);
      d && a();
      return d;
    }
    var c = T();
    rd(function () {
      b() || sd(b, c);
    }, c);
  }
  function Vd(a) {
    return V(a).map(function (b) {
      return b.l;
    });
  }
  function Wd(a) {
    function b(d) {
      return function (e) {
        e.type = d;
        return e;
      };
    }
    var c = Xd(a.prefix);
    a = W("gb", c);
    c = W("ag", c);
    if (!c || !a) return [];
    a = V(a).map(b("gb"));
    c = (P(6) ? Yd(c) : []).map(b("ag"));
    return a.concat(c).sort(function (d, e) {
      return e.timestamp - d.timestamp;
    });
  }
  function Zd(a, b, c, d, e) {
    var f = Jc(a, function (h) {
      return h.l === c;
    });
    f
      ? ((f.timestamp = Math.max(f.timestamp, d)),
        (f.labels = $d(f.labels || [], e || [])))
      : a.push({ version: b, l: c, timestamp: d, labels: e });
  }
  function Yd(a) {
    var b = Ld(a) || [];
    a = [];
    b = x(b);
    for (var c = b.next(); !c.done; c = b.next()) {
      var d = c.value;
      (d = (c = d) ? 1e3 * (Number(d.i) || 0) : 0) &&
        Zd(a, "2", c.k, d, c.b || []);
    }
    return a.sort(function (e, f) {
      return f.timestamp - e.timestamp;
    });
  }
  function V(a) {
    var b = [];
    a = yd(a, O.cookie, void 0, T());
    a = x(a);
    for (var c = a.next(); !c.done; c = a.next())
      (c = ae(c.value)),
        null != c && Zd(b, c.version, c.l, c.timestamp, c.labels);
    b.sort(function (d, e) {
      return e.timestamp - d.timestamp;
    });
    return be(b);
  }
  function $d(a, b) {
    if (!a.length) return b;
    if (!b.length) return a;
    var c = {};
    return a.concat(b).filter(function (d) {
      return c.hasOwnProperty(d) ? !1 : (c[d] = !0);
    });
  }
  function Xd(a) {
    return a && "string" === typeof a && a.match(Rd) ? a : "_gcl";
  }
  function ce(a, b) {
    var c = P(6),
      d = P(7),
      e = wd[a];
    if (!e) {
      e = O.createElement("a");
      a && (e.href = a);
      var f = e.pathname;
      "/" !== f[0] && (a || Gc(1), (f = "/" + f));
      var h = e.hostname.replace(td, "");
      e = {
        href: e.href,
        protocol: e.protocol,
        host: e.host,
        hostname: h,
        pathname: f,
        search: e.search,
        hash: e.hash,
        port: e.port,
      };
      5 > xd && ((wd[a] = e), xd++);
    }
    h = e;
    a = vd(h, "gclid");
    e = vd(h, "gclsrc");
    f = vd(h, "wbraid");
    if (P(8) && f) {
      var g = f.split(",");
      2 === g.length && g[0] === g[1] && (f = g[0]);
    }
    var k;
    c && (k = vd(h, "gbraid"));
    var l;
    d && (l = vd(h, "gad_source"));
    g = vd(h, "dclid");
    !b ||
      (a && e && f && (!c || k)) ||
      ((b = h.hash.replace("#", "")),
      (a = a || ud(b, "gclid")),
      (e = e || ud(b, "gclsrc")),
      (f = f || ud(b, "wbraid")),
      c && (k = k || ud(b, "gbraid")),
      d && (l = l || ud(b, "gad_source")));
    return de(a, e, g, f, k, l);
  }
  function de(a, b, c, d, e, f) {
    function h(k, l) {
      g[l] || (g[l] = []);
      g[l].push(k);
    }
    var g = {};
    g.gclid = a;
    g.gclsrc = b;
    g.dclid = c;
    if (void 0 !== a && a.match(Sd))
      switch (b) {
        case void 0:
          h(a, "aw");
          break;
        case "aw.ds":
          h(a, "aw");
          h(a, "dc");
          break;
        case "ds":
          h(a, "dc");
          break;
        case "3p.ds":
          h(a, "dc");
          break;
        case "gf":
          h(a, "gf");
          break;
        case "ha":
          h(a, "ha");
      }
    c && h(c, "dc");
    void 0 !== d && Sd.test(d) && ((g.wbraid = d), h(d, "gb"));
    P(6) && void 0 !== e && Sd.test(e) && ((g.gbraid = e), h(e, "ag"));
    P(7) && void 0 !== f && Sd.test(f) && ((g.gad_source = f), h(f, "gs"));
    return g;
  }
  function ee(a, b, c, d, e) {
    function f() {
      if (U(l)) {
        var r = Jd(c, g, !0);
        r.u = l;
        for (
          var z = function (w, B) {
              var Ta = W(w, h);
              Ta && (Gd(Ta, B, r), "gb" !== w && (n = !0));
            },
            C = function (w) {
              w = ["GCL", k, w];
              0 < e.length && w.push(e.join("."));
              return w.join(".");
            },
            ja = x(["aw", "dc", "gf", "ha", "gp"]),
            Q = ja.next();
          !Q.done;
          Q = ja.next()
        )
          (Q = Q.value), a[Q] && z(Q, C(a[Q][0]));
        if (!n && a.gb) {
          var Ua = a.gb[0];
          ja = W("gb", h);
          (!b &&
            V(ja).some(function (w) {
              return w.l === Ua && w.labels && 0 < w.labels.length;
            })) ||
            z("gb", C(Ua));
        }
      }
      if (!p && P(6) && a.gbraid && U("ad_storage") && ((p = !0), !n)) {
        var Va = a.gbraid;
        z = W("ag", h);
        if (
          b ||
          !(P(6) ? Yd(z) : []).some(function (w) {
            return w.l === Va && w.labels && 0 < w.labels.length;
          })
        )
          (C = {}),
            (C = ((C.k = Va), (C.i = "" + k), (C.b = e), C)),
            Nd(z, C, c, g);
      }
      fe(a, h, g, c);
    }
    c = c || {};
    e = e || [];
    var h = Xd(c.prefix),
      g = d || new Date(Date.now()).getTime(),
      k = Math.round(g / 1e3),
      l = T(),
      n = !1,
      p = !1;
    rd(function () {
      f();
      U(l) || sd(f, l);
    }, l);
  }
  function fe(a, b, c, d) {
    if (
      P(7) &&
      void 0 !== a.gad_source &&
      U("ad_storage") &&
      (b = W("gs", b))
    ) {
      var e = (e = N.performance) && Hc(e.now) ? e.now() : void 0;
      e = Math.round((new Date(Date.now()).getTime() - (e || 0)) / 1e3);
      var f = {};
      a = ((f.k = a.gad_source), (f.i = "" + e), f);
      Nd(b, a, d, c);
    }
  }
  function W(a, b) {
    a = Td[a];
    if (void 0 !== a) return b + a;
  }
  function ge(a) {
    return 0 !== he(a.split(".")).length
      ? 1e3 * (Number(a.split(".")[1]) || 0)
      : 0;
  }
  function ae(a) {
    a = he(a.split("."));
    return 0 === a.length
      ? null
      : {
          version: a[0],
          l: a[2],
          timestamp: 1e3 * (Number(a[1]) || 0),
          labels: a.slice(3),
        };
  }
  function he(a) {
    return 3 > a.length ||
      ("GCL" !== a[0] && "1" !== a[0]) ||
      !/^\d+$/.test(a[1]) ||
      !Sd.test(a[2])
      ? []
      : a;
  }
  function be(a) {
    return a.filter(function (b) {
      return Sd.test(b.l);
    });
  }
  function ie() {
    var a = ["aw"],
      b = {};
    if ("null" !== N.origin) {
      for (var c = Xd(b.prefix), d = {}, e = 0; e < a.length; e++)
        Td[a[e]] && (d[a[e]] = Td[a[e]]);
      Ud(function () {
        Kc(d, function (f, h) {
          h = yd(c + h, O.cookie, void 0, T());
          h.sort(function (n, p) {
            return ge(p) - ge(n);
          });
          if (h.length) {
            var g = h[0];
            h = ge(g);
            var k = 0 !== he(g.split(".")).length ? g.split(".").slice(3) : [],
              l = {};
            g = 0 !== he(g.split(".")).length ? g.split(".")[2] : void 0;
            l[f] = [g];
            ee(l, !0, b, h, k);
          }
        });
      });
    }
  }
  function je(a, b, c, d) {
    var e = [];
    c = c || {};
    if (!U(T())) return e;
    var f = V(a);
    var h = [];
    if (0 !== f.length)
      for (var g = {}, k = 0; k < f.length; k++) {
        var l = f[k],
          n = l.type ? l.type : "gcl";
        -1 === (l.labels || []).indexOf(b)
          ? (e.push(0), g[n] || h.push(l))
          : e.push(1);
        g[n] = !0;
      }
    if (h.length && !d)
      for (d = x(h), f = d.next(); !f.done; f = d.next())
        (h = f.value),
          (f = h.timestamp),
          (h = [h.version, Math.round(f / 1e3), h.l]
            .concat(h.labels || [], [b])
            .join(".")),
          (f = Jd(c, f, !0)),
          (f.u = T()),
          Gd(a, h, f);
    return e;
  }
  function ke(a, b) {
    b = Xd(b);
    b = W(a, b);
    if (!b) return 0;
    a = "ag" === a ? (P(6) ? Yd(b) : []) : V(b);
    for (var c = (b = 0); c < a.length; c++) b = Math.max(b, a[c].timestamp);
    return b;
  }
  function le(a) {
    for (
      var b = 0, c = x(t(Object, "keys").call(Object, a)), d = c.next();
      !d.done;
      d = c.next()
    ) {
      d = a[d.value];
      for (var e = 0; e < d.length; e++)
        b = Math.max(b, Number(d[e].timestamp));
    }
    return b;
  }
  var me = RegExp(
      "^UA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*(?:%3BUA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*)*$"
    ),
    ne = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
    oe = /^\d+\.fls\.doubleclick\.net$/,
    pe = /;gac=([^;?]+)/,
    qe = /;gacgb=([^;?]+)/;
  function re(a, b, c) {
    if (oe.test(a.location.host))
      return (b = a.location.href.match(c)) && 2 === b.length && b[1].match(me)
        ? decodeURIComponent(b[1])
        : "";
    a = [];
    c = x(t(Object, "keys").call(Object, b));
    for (var d = c.next(); !d.done; d = c.next()) {
      d = d.value;
      for (var e = [], f = b[d], h = 0; h < f.length; h++) e.push(f[h].l);
      a.push(d + ":" + e.join(","));
    }
    return 0 < a.length ? a.join(";") : "";
  }
  function se(a, b, c, d) {
    for (
      var e = U(T()) ? Qd("_gac_gb", !0) : {},
        f = [],
        h = !1,
        g = x(t(Object, "keys").call(Object, e)),
        k = g.next();
      !k.done;
      k = g.next()
    ) {
      k = k.value;
      var l = je("_gac_gb_" + k, b, c, d);
      h =
        h ||
        (0 !== l.length &&
          l.some(function (n) {
            return 1 === n;
          }));
      f.push(k + ":" + l.join(","));
    }
    return { N: h ? f.join(";") : "", M: re(a, e, qe) };
  }
  function te(a, b) {
    return (a = a.location.href.match(new RegExp(";" + b + "=([^;?]+)"))) &&
      2 === a.length &&
      a[1].match(ne)
      ? a[1]
      : void 0;
  }
  function ue(a, b, c, d) {
    if (oe.test(a.location.host)) {
      if ((a = te(a, d))) return [{ l: a }];
    } else {
      if ("gclid" === c) return V((b || "_gcl") + "_aw");
      if ("wbraid" === c) return V((b || "_gcl") + "_gb");
      if ("braids" === c) return Wd({ prefix: b });
    }
    return [];
  }
  function ve(a, b) {
    return ue(a, b, "gclid", "gclaw")
      .map(function (c) {
        return c.l;
      })
      .join(".");
  }
  function we(a, b) {
    return ue(a, b, "wbraid", "gclgb")
      .map(function (c) {
        return c.l;
      })
      .join(".");
  }
  function xe(a) {
    if (0 === Vd("_gcl_aw").length && (!a || 0 === Vd(a + "_aw").length)) {
      a = ce(N.location.href, !0);
      if (P(5)) {
        for (
          var b = !0, c = x(t(Object, "keys").call(Object, a)), d = c.next();
          !d.done;
          d = c.next()
        )
          if (void 0 !== a[d.value]) {
            b = !1;
            break;
          }
        b && (a = ce(N.document.referrer, !1));
      }
      ee(a, !1, {});
      ie();
    }
  }
  function ye(a, b, c) {
    a = je(((b && b.prefix) || "_gcl") + "_gb", a, b, c);
    return 0 === a.length ||
      a.every(function (d) {
        return 0 === d;
      })
      ? ""
      : a.join(".");
  }
  function ze() {
    if (Hc(N.__uspapi)) {
      var a = "";
      try {
        N.__uspapi("getUSPData", 1, function (b, c) {
          c &&
            b &&
            (b = b.uspString) &&
            RegExp("^[\\da-zA-Z-]{1,20}$").test(b) &&
            (a = b);
        });
      } catch (b) {}
      return a;
    }
  }
  function Ae() {}
  Object.freeze(new (function () {})());
  Object.freeze(new Ae());
  Object.freeze(new Ae());
  var Be =
    "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
      " "
    );
  function Ce(a) {
    var b;
    return null != (b = a.google_tag_data) ? b : (a.google_tag_data = {});
  }
  function De(a) {
    a = a.google_tag_data;
    if (null != a && a.uach) {
      a = a.uach;
      var b = t(Object, "assign").call(Object, {}, a);
      a.fullVersionList && (b.fullVersionList = a.fullVersionList.slice(0));
      a = b;
    } else a = null;
    return a;
  }
  function Ee(a) {
    var b, c;
    return (
      "function" ===
      typeof (null == (b = a.navigator)
        ? void 0
        : null == (c = b.userAgentData)
        ? void 0
        : c.getHighEntropyValues)
    );
  }
  function Fe() {
    var a = window;
    if (Ee(a)) {
      var b = Ce(a);
      b.uach_promise ||
        ((a = a.navigator.userAgentData
          .getHighEntropyValues(Be)
          .then(function (c) {
            null != b.uach || (b.uach = c);
            return c;
          })),
        (b.uach_promise = a));
    }
  }
  var Ge = /^[a-zA-Z0-9_]+$/,
    He = !1,
    Ie =
      "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_gtag_event_data google_remarketing_only google_conversion_linker google_tag_for_child_directed_treatment google_tag_for_under_age_of_consent google_allow_ad_personalization_signals google_restricted_data_processing google_conversion_items google_conversion_merchant_id google_user_id google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_gtm_url_processor google_conversion_page_url google_conversion_referrer_url google_gcl_cookie_prefix google_gcl_cookie_path google_gcl_cookie_flags google_gcl_cookie_domain google_gcl_cookie_max_age_seconds google_read_gcl_cookie_opt_out google_basket_feed_country google_basket_feed_language google_basket_discount google_basket_transaction_type google_additional_conversion_params google_additional_params google_transport_url google_gtm_experiments".split(
        " "
      ),
    Je = ["google_conversion_first_time", "google_conversion_snippets"];
  function X(a) {
    return null != a ? encodeURIComponent(String(a)) : "";
  }
  function Ke(a) {
    if (null != a) {
      a = String(a).substring(0, 512);
      var b = a.indexOf("#");
      return -1 == b ? a : a.substring(0, b);
    }
    return "";
  }
  function Y(a, b) {
    b = X(b);
    return "" != b && ((a = X(a)), "" != a) ? "&".concat(a, "=", b) : "";
  }
  function Le(a) {
    var b = typeof a;
    return null == a || "object" == b || "function" == b
      ? null
      : String(a)
          .replace(/,/g, "\\,")
          .replace(/;/g, "\\;")
          .replace(/=/g, "\\=");
  }
  function Me(a) {
    if (!a || "object" != typeof a || "function" == typeof a.join) return "";
    var b = [],
      c;
    for (c in a)
      if (Object.prototype.hasOwnProperty.call(a, c)) {
        var d = a[c];
        if (d && "function" === typeof d.join) {
          for (var e = [], f = 0; f < d.length; ++f) {
            var h = Le(d[f]);
            null != h && e.push(h);
          }
          d = 0 == e.length ? null : e.join(",");
        } else d = Le(d);
        (e = Le(c)) && null != d && b.push(e + "=" + d);
      }
    return b.join(";");
  }
  function Ne(a) {
    return "number" != typeof a && "string" != typeof a ? "" : X(a.toString());
  }
  function Oe(a, b) {
    if (
      b.google_read_gcl_cookie_opt_out ||
      b.google_remarketing_only ||
      (b.google_conversion_domain &&
        (!b.google_gcl_cookie_prefix ||
          !/^_ycl/.test(b.google_gcl_cookie_prefix)))
    )
      return "";
    var c = "";
    var d =
      b.google_gcl_cookie_prefix &&
      "_gcl" !== b.google_gcl_cookie_prefix &&
      Ge.test(b.google_gcl_cookie_prefix)
        ? b.google_gcl_cookie_prefix
        : "";
    var e = {};
    b.google_gcl_cookie_domain && (e.domain = b.google_gcl_cookie_domain);
    b.google_gcl_cookie_flags && (e.flags = b.google_gcl_cookie_flags);
    null != b.google_gcl_cookie_max_age_seconds &&
      (e.I = b.google_gcl_cookie_max_age_seconds);
    b.google_gcl_cookie_path && (e.path = b.google_gcl_cookie_path);
    d && (e.prefix = d);
    if (Pe(b) && b.C) var f = void 0 === b.v;
    else
      oe.test(a.location.host)
        ? (f = !(te(a, "gclaw") || te(a, "gac")))
        : ((f = Math.max(ke("aw", d), le(U(T()) ? Qd() : {}))),
          (f = Math.max(ke("gb", d), le(U(T()) ? Qd("_gac_gb", !0) : {})) > f));
    if (f) {
      if (void 0 !== b.v) return b.v;
      c = we(a, d || void 0);
      f = b.google_conversion_label;
      var h = ye(f, e, b.C);
      c = Y("gclgb", c) + (h ? Y("mcov", h) : "");
      if (d) return (b.v = c);
      d = se(a, f, e, b.C);
      a = d.M;
      d = d.N;
      c += (a ? Y("gacgb", a) : "") + (d ? Y("gacmcov", d) : "");
      return (b.v = c);
    }
    if (d) return (b = ve(a, d)), Y("gclaw", b);
    (b = ve(a)) && (c = Y("gclaw", b));
    b = re(a, U(T()) ? Qd() : {}, pe);
    return c + (b ? Y("gac", b) : "");
  }
  function Qe(a) {
    function b(d) {
      try {
        return decodeURIComponent(d), !0;
      } catch (e) {
        return !1;
      }
    }
    a = a ? a.title : "";
    if (void 0 == a || "" == a) return "";
    a = encodeURIComponent(a);
    for (var c = 256; !b(a.substr(0, c)); ) c--;
    return "&tiba=" + a.substr(0, c);
  }
  function Re(a, b, c, d, e) {
    var f = "https://",
      h = "landing" === d.google_conversion_type ? "/extclk" : "/";
    switch (e) {
      default:
        return "";
      case 2:
      case 3:
        var g = "googleads.g.doubleclick.net/";
        var k = "pagead/viewthroughconversion/";
        break;
      case 1:
        g = "www.google.com/";
        k = "pagead/1p-conversion/";
        break;
      case 6:
        g = "www.google.com/";
        k = "ccm/conversion/";
        break;
      case 0:
        g = d.google_conversion_domain || "www.googleadservices.com/";
        k = "pagead/conversion/";
        break;
      case 5:
        g = d.google_conversion_domain || "www.googleadservices.com/";
        k = "ccm/conversion/";
        break;
      case 4:
        g =
          (g = d.google_gtm_experiments) && g.apcm
            ? "www.google.com"
            : g && g.capiorig
            ? d.google_conversion_id + ".privacysandbox.googleadservices.com"
            : "www.google.com/";
        k = "pagead/privacysandbox/conversion/";
        break;
      case 7:
        (g = "googleads.g.doubleclick.net/"), (k = "td/rul/");
    }
    jc && d.google_transport_url && (g = d.google_transport_url);
    "/" !== g[g.length - 1] && (g += "/");
    if (0 === g.indexOf("http://") || 0 === g.indexOf("https://")) f = "";
    f = [
      f,
      g,
      k,
      X(d.google_conversion_id),
      h,
      "?random=",
      X(d.google_conversion_time),
    ].join("");
    h = Y("cv", d.google_conversion_js_version);
    g = Y("fst", d.google_conversion_first_time);
    k = Y("num", d.google_conversion_snippets);
    var l = Y("fmt", d.google_conversion_format),
      n = d.google_remarketing_only ? Y("userId", d.google_user_id) : "";
    var p = d.google_tag_for_child_directed_treatment;
    p = null == p || (0 !== p && 1 !== p) ? "" : Y("tfcd", p);
    var r = d.google_tag_for_under_age_of_consent;
    r = null == r || (0 !== r && 1 !== r) ? "" : Y("tfua", r);
    var z = d.google_allow_ad_personalization_signals;
    z = !1 === z ? Y("npa", 1) : !0 === z ? Y("npa", 0) : "";
    var C = d.google_restricted_data_processing;
    C = lc ? (!0 === C ? Y("rdp", 1) : !1 === C ? Y("rdp", 0) : "") : "";
    var ja = Y("value", d.google_conversion_value),
      Q = Y("currency_code", d.google_conversion_currency),
      Ua = Y("label", d.google_conversion_label),
      Va = Y("oid", d.google_conversion_order_id),
      w = Y("bg", d.google_conversion_color);
    a: {
      var B = d.google_conversion_language;
      if (null != B) {
        B = B.toString();
        if (2 == B.length) {
          B = Y("hl", B);
          break a;
        }
        if (5 == B.length) {
          B = Y("hl", B.substring(0, 2)) + Y("gl", B.substring(3, 5));
          break a;
        }
      }
      B = "";
    }
    var Ta = Y("guid", "ON"),
      df =
        !d.google_conversion_domain &&
        "GooglemKTybQhCsO" in A &&
        "function" == typeof A.GooglemKTybQhCsO
          ? Y("resp", "GooglemKTybQhCsO")
          : "",
      ef = Y("disvt", d.google_disable_viewthrough),
      ff = Y("eid", rc().join());
    var za = d.google_conversion_date;
    var F = [];
    if (a) {
      var S = a.screen;
      S &&
        (F.push(Y("u_h", S.height)),
        F.push(Y("u_w", S.width)),
        F.push(Y("u_ah", S.availHeight)),
        F.push(Y("u_aw", S.availWidth)),
        F.push(Y("u_cd", S.colorDepth)));
      a.history && F.push(Y("u_his", a.history.length));
    }
    za &&
      "function" == typeof za.getTimezoneOffset &&
      F.push(Y("u_tz", -za.getTimezoneOffset()));
    b &&
      ("function" == typeof b.javaEnabled &&
        F.push(Y("u_java", b.javaEnabled())),
      b.plugins && F.push(Y("u_nplug", b.plugins.length)),
      b.mimeTypes && F.push(Y("u_nmime", b.mimeTypes.length)));
    za = F.join("");
    b = b && b.sendBeacon ? Y("sendb", "1") : "";
    F = Se();
    S = Y(
      "ig",
      /googleadservices\.com/.test("www.googleadservices.com") ? 1 : 0
    );
    var aa = Me(d.google_custom_params);
    var Xa = Me();
    aa = aa.concat(0 < aa.length && 0 < Xa.length ? ";" : "", Xa);
    aa = "" == aa ? "" : "&".concat("data=", encodeURIComponent(aa));
    Xa = Oe(c, d);
    var Aa = d.google_conversion_page_url,
      hf = d.google_conversion_referrer_url,
      Ba = "";
    if (c) {
      var ka =
        a.top == a
          ? 0
          : (ka = a.location.ancestorOrigins)
          ? ka[ka.length - 1] == a.location.origin
            ? 1
            : 2
          : Wb(a.top)
          ? 1
          : 2;
      Aa = Aa ? Aa : 1 == ka ? a.top.location.href : a.location.href;
      var gd = "";
      L && K(["509562772", "509562773"], gc, 21);
      if (L && ("509562773" == M(21) || "509562772" == M(21))) {
        for (var D, u = a, la = u; u && u != u.parent; )
          (u = u.parent), Wb(u) && (la = u);
        D = la;
        u = D.location.href;
        if (D === D.top) u = { url: u, O: !0 };
        else {
          la = !1;
          var Eb = D.document;
          Eb &&
            Eb.referrer &&
            ((u = Eb.referrer), D.parent === D.top && (la = !0));
          (D = D.location.ancestorOrigins) &&
            (D = D[D.length - 1]) &&
            -1 === u.indexOf(D) &&
            ((la = !1), (u = D));
          u = { url: u, O: la };
        }
        u.url && Aa !== u.url && (gd = u.url);
      }
      Ba += Y("frm", ka);
      Ba += Y("url", Ke(Aa));
      Ba += Y("ref", Ke(hf || c.referrer));
      Ba += Y("top", Ke(gd));
    }
    a = [
      h,
      g,
      k,
      l,
      n,
      p,
      r,
      z,
      C,
      ja,
      Q,
      Ua,
      Va,
      w,
      B,
      Ta,
      df,
      ef,
      ff,
      za,
      b,
      F,
      S,
      aa,
      Xa,
      Ba,
      Qe(c),
      Te(d.google_additional_params),
      Te(
        d.google_remarketing_only ? {} : d.google_additional_conversion_params
      ),
      "&hn=" + X("www.googleadservices.com"),
      Ue(a),
      Ve(a),
    ].join("");
    c = qc();
    a += 0 < c.length ? "&debug_experiment_id=" + c : "";
    if (!d.google_remarketing_only && !d.google_conversion_domain) {
      c = [
        Y("mid", d.google_conversion_merchant_id),
        Y("fcntr", d.google_basket_feed_country),
        Y("flng", d.google_basket_feed_language),
        Y("dscnt", d.google_basket_discount),
        Y("bttype", d.google_basket_transaction_type),
      ].join("");
      if (d)
        if ((h = d.google_conversion_items)) {
          g = [];
          k = 0;
          for (l = h.length; k < l; k++)
            (n = h[k]),
              (p = []),
              n &&
                (p.push(Ne(n.value)),
                p.push(Ne(n.quantity)),
                p.push(Ne(n.item_id)),
                p.push(Ne(n.start_date)),
                p.push(Ne(n.end_date)),
                g.push("(" + p.join("*") + ")"));
          h = 0 < g.length ? "&item=" + g.join("") : "";
        } else h = "";
      else h = "";
      c = [a, c, h].join("");
      a = 4e3 < c.length ? [a, Y("item", "elngth")].join("") : c;
    }
    f += a;
    1 === e || 6 === e
      ? (f += [Y("gcp", 1), Y("sscte", 1), Y("ct_cookie_present", 1)].join(""))
      : 3 == e && ((f += Y("gcp", 1)), (f += Y("ct_cookie_present", 1)));
    kc && ((e = ze()), void 0 !== e && (f += Y("us_privacy", e || "error")));
    Pe(d) && (f = d.C ? f + Y("gbcov", 1) : f + Y("gbcov", 0));
    return f;
  }
  function We(a, b, c, d, e, f, h) {
    return (
      '<iframe name="' +
      a +
      '"' +
      (h ? ' id="' + h + '"' : "") +
      ' title="' +
      b +
      '" width="' +
      d +
      '" height="' +
      e +
      '"' +
      (c ? ' src="' + c + '"' : "") +
      ' frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true"' +
      (f ? ' style="display:none"' : "") +
      ' scrolling="no"></iframe>'
    );
  }
  function Xe(a) {
    return {
      ar: 1,
      bg: 1,
      cs: 1,
      da: 1,
      de: 1,
      el: 1,
      en_AU: 1,
      en_US: 1,
      en_GB: 1,
      es: 1,
      et: 1,
      fi: 1,
      fr: 1,
      hi: 1,
      hr: 1,
      hu: 1,
      id: 1,
      is: 1,
      it: 1,
      iw: 1,
      ja: 1,
      ko: 1,
      lt: 1,
      nl: 1,
      no: 1,
      pl: 1,
      pt_BR: 1,
      pt_PT: 1,
      ro: 1,
      ru: 1,
      sk: 1,
      sl: 1,
      sr: 1,
      sv: 1,
      th: 1,
      tl: 1,
      tr: 1,
      vi: 1,
      zh_CN: 1,
      zh_TW: 1,
    }[a]
      ? a + ".html"
      : "en_US.html";
  }
  function Ye(a, b, c, d) {
    function e(g, k, l, n, p) {
      n = n ? ' style="display:none"' : "";
      return (
        "<img " +
        (p && vc() ? "attributionsrc " : "") +
        'height="' +
        l +
        '" width="' +
        k +
        '" border="0" alt="" src="' +
        g +
        '"' +
        n +
        " />"
      );
    }
    uc() && Bc(2);
    var f = "";
    d.google_remarketing_only &&
      d.google_enable_display_cookie_match &&
      !Ec &&
      (L && K(["376635470", "376635471"], dc, 2),
      (f =
        d.google_remarketing_only &&
        d.google_enable_display_cookie_match &&
        !Ec &&
        L &&
        "376635471" == M(2)
          ? We(
              "google_cookie_match_frame",
              "Google cookie match frame",
              "https://bid.g.doubleclick.net/xbbe/pixel?d=KAE",
              1,
              1,
              !0,
              null
            )
          : ""));
    d.google_remarketing_only &&
      !d.google_conversion_domain &&
      L &&
      K(["759238990", "759238991"], ic, 13);
    !d.google_remarketing_only ||
      d.google_conversion_domain ||
      (L && ("759248991" == M(14) || "759248990" == M(14))) ||
      (L && K(["759248990", "759248991"], hc, 14));
    !1 !== d.google_conversion_linker && xe(d.google_gcl_cookie_prefix);
    b = Re(a, b, c, d, d.google_remarketing_only ? 2 : 0);
    if (0 == d.google_conversion_format && null == d.google_conversion_domain)
      return (
        '<a href="https://services.google.com/sitestats/' +
        (Xe(d.google_conversion_language) +
          "?cid=" +
          X(d.google_conversion_id)) +
        '" target="_blank">' +
        e(b, 135, 27, !1, !1) +
        "</a>" +
        f
      );
    if (
      (void 0 !== d.google_conversion_snippets &&
        1 < d.google_conversion_snippets) ||
      3 == d.google_conversion_format
    ) {
      var h = b;
      null == d.google_conversion_domain &&
        (h = 3 == d.google_conversion_format ? b : Vb(b, "fmt", 3));
      b = void 0;
      vc() && !d.google_remarketing_only && (b = { attributionsrc: "" });
      return Ze(a, c, d, h, b)
        ? f
        : e(h, 1, 1, !0, !d.google_remarketing_only) + f;
    }
    h = null;
    !d.google_conversion_domain &&
      Ze(a, c, d, b) &&
      ((h = "goog_conv_iframe"), (b = ""));
    return (
      We(
        "google_conversion_frame",
        "Google conversion frame",
        b,
        2 == d.google_conversion_format ? 200 : 300,
        2 == d.google_conversion_format ? 26 : 13,
        !1,
        h
      ) + f
    );
  }
  function Ze(a, b, c, d, e) {
    if (c.google_conversion_domain) return !1;
    try {
      return $c(a, b, d, null, e);
    } catch (f) {
      return !1;
    }
  }
  function $e(a) {
    if (
      "landing" === a.google_conversion_type ||
      !a.google_conversion_id ||
      (a.google_remarketing_only && a.google_disable_viewthrough)
    )
      return !1;
    a.google_conversion_date = new Date();
    a.google_conversion_time = a.google_conversion_date.getTime();
    a.google_conversion_snippets =
      "number" === typeof a.google_conversion_snippets &&
      0 < a.google_conversion_snippets
        ? a.google_conversion_snippets + 1
        : 1;
    void 0 === a.google_conversion_first_time &&
      (a.google_conversion_first_time = a.google_conversion_time);
    a.google_conversion_js_version = "9";
    0 != a.google_conversion_format &&
      1 != a.google_conversion_format &&
      2 != a.google_conversion_format &&
      3 != a.google_conversion_format &&
      (a.google_conversion_format = 3);
    !1 !== a.google_enable_display_cookie_match &&
      (a.google_enable_display_cookie_match = !0);
    return !0;
  }
  function af(a) {
    for (var b = 0; b < Ie.length; b++) a[Ie[b]] = null;
  }
  function bf(a) {
    for (var b = {}, c = 0; c < Ie.length; c++) b[Ie[c]] = a[Ie[c]];
    for (c = 0; c < Je.length; c++) b[Je[c]] = a[Je[c]];
    return b;
  }
  function Se() {
    var a = "";
    uc() &&
      (a = Dc()
        .map(function (b) {
          return b.join("-");
        })
        .join("_"));
    return Y("li", a);
  }
  function Ue(a) {
    if (!mc || !a.__gsaExp || !a.__gsaExp.id) return "";
    a = a.__gsaExp.id;
    if (!Hc(a)) return "";
    try {
      var b = Number(a());
      return isNaN(b) ? "" : Y("gsaexp", b);
    } catch (c) {
      return "";
    }
  }
  function Ve(a) {
    function b(d, e) {
      null != e && c.push(d + "=" + encodeURIComponent(e));
    }
    if (!tc()) return "";
    a = De(a);
    if (!a) return "";
    var c = [];
    b("&uaa", a.architecture);
    b("&uab", a.bitness);
    b("&uam", a.model);
    b("&uap", a.platform);
    b("&uapv", a.platformVersion);
    null != a.wow64 && b("&uaw", a.wow64 ? "1" : "0");
    a.fullVersionList &&
      b(
        "&uafvl",
        a.fullVersionList
          .map(function (d) {
            return (
              encodeURIComponent(d.brand || "") +
              ";" +
              encodeURIComponent(d.version || "")
            );
          })
          .join("|")
      );
    return c.join("");
  }
  function Te(a) {
    if (!a) return "";
    var b = "",
      c;
    for (c in a) a.hasOwnProperty(c) && (b += Y(c, a[c]));
    return b;
  }
  function Pe(a) {
    return (a = a.google_gtm_experiments) && a.gbcov ? !0 : !1;
  }
  function cf(a, b) {
    var c;
    if ((c = !b.google_remarketing_only))
      if (
        b.google_transport_url ||
        !L ||
        ("375603261" != M(19) && "375603260" != M(19))
      )
        c = !1;
      else {
        b: {
          if (!He) {
            bc(
              "AzMBwcG8UIaKM1GV43UaxMDFsS7hsiLx0FXw9ULTOHJRGxkUVw+UPCxlzz5CudOm+WnidygXLcAHmad6rC6C9QEAAACUeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZWFkc2VydmljZXMuY29tOjQ0MyIsImZlYXR1cmUiOiJBdHRyaWJ1dGlvblJlcG9ydGluZ0Nyb3NzQXBwV2ViIiwiZXhwaXJ5IjoxNzE0NTIxNTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ\x3d\x3d",
              a
            );
            if (
              !Uc() &&
              !bc(
                t("www.googleadservices.com", "endsWith").call(
                  "www.googleadservices.com",
                  "google.com"
                )
                  ? ""
                  : "A2kc5o2ErHAbqJvF2MHSdYtnc2Bp3n6Jn2kNeko6SgHH6zXBHn0+4BbAW2No9ylVJMkzJAPwMqCVHqXm+IF1DgQAAACKeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZWFkc2VydmljZXMuY29tOjQ0MyIsImZlYXR1cmUiOiJQcml2YWN5U2FuZGJveEFkc0FQSXMiLCJleHBpcnkiOjE2OTUxNjc5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9",
                a
              )
            ) {
              a = !1;
              break b;
            }
            He = !0;
          }
          a = Uc();
        }
        c = a;
      }
    c &&
      ((a = b.google_additional_conversion_params || {}),
      (c = b.google_gtm_experiments),
      (a.capi = c && c.apcm ? "2" : "1"),
      (b.google_additional_conversion_params = a));
  }
  var gf = na(["https://www.googletagmanager.com/debug/bootstrap"]),
    jf = !1,
    kf = (document.currentScript && document.currentScript.src) || "";
  function lf(a, b, c) {
    try {
      if (!jf && ((jf = !0), !c.google_gtm)) {
        var d = void 0,
          e = void 0,
          f = Tb(a.location.href, "gtm_debug");
        mf(f) && (d = 2);
        d ||
          0 !== b.referrer.indexOf("https://tagassistant.google.com/") ||
          (d = 3);
        !d && 0 <= Fa(b.cookie.split("; "), "__TAG_ASSISTANT=x") && (d = 4);
        d ||
          ((e = b.documentElement.getAttribute("data-tag-assistant-present")),
          mf(e) && (d = 5));
        if (d) {
          var h = "AW-" + (c.google_conversion_id || "");
          if (!a["google.tagmanager.debugui2.queue"]) {
            a["google.tagmanager.debugui2.queue"] = [];
            var g = Mb(gf);
            c = { id: h, src: "LEGACY", cond: d };
            var k = jb.exec(ib(g).toString()),
              l = k[3] || "";
            var n = lb(k[1] + mb("?", k[2] || "", c) + mb("#", l));
            var p = cc("SCRIPT", b);
            Nb(p, n);
            var r = b.getElementsByTagName("script")[0];
            r && r.parentNode && r.parentNode.insertBefore(p, r);
          }
          a["google.tagmanager.debugui2.queue"].push({
            messageType: "LEGACY_CONTAINER_STARTING",
            data: { id: h, scriptSource: kf },
          });
        }
      }
    } catch (z) {}
  }
  function mf(a) {
    if (null == a || 0 === a.length) return !1;
    a = Number(a);
    var b = Date.now();
    return a < b + 3e5 && a > b - 9e5;
  }
  function nf(a) {
    return a.prerendering
      ? 3
      : { visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5 }[
          a.visibilityState ||
            a.webkitVisibilityState ||
            a.mozVisibilityState ||
            ""
        ] || 0;
  }
  function of(a) {
    var b;
    a.visibilityState
      ? (b = "visibilitychange")
      : a.mozVisibilityState
      ? (b = "mozvisibilitychange")
      : a.webkitVisibilityState && (b = "webkitvisibilitychange");
    return b;
  }
  function pf(a, b) {
    if (3 == nf(b)) return !1;
    a();
    return !0;
  }
  function qf(a, b) {
    var c = void 0 === c ? !1 : c;
    if (!pf(a, b))
      if (c) {
        var d = function () {
          b.removeEventListener &&
            b.removeEventListener("prerenderingchange", d, !1);
          a();
        };
        b.addEventListener && b.addEventListener("prerenderingchange", d, !1);
      } else {
        var e = !1,
          f = of(b),
          h = function () {
            !e &&
              pf(a, b) &&
              ((e = !0),
              b.removeEventListener && b.removeEventListener(f, h, !1));
          };
        f && b.addEventListener && b.addEventListener(f, h, !1);
      }
  }
  function rf(a) {
    var b = t(Object, "assign").call(Object, {}, a);
    a = a.id;
    b = (delete b.id, b);
    if (t(Object, "keys").call(Object, b).length)
      throw Error("Invalid attribute(s): " + t(Object, "keys").call(Object, b));
    a = { id: a };
    if (!Jb.test("span")) throw Error("");
    if ("SPAN" in Lb) throw Error("");
    b = void 0;
    var c = "";
    if (a)
      for (k in a)
        if (Object.prototype.hasOwnProperty.call(a, k)) {
          if (!Jb.test(k)) throw Error("");
          var d = a[k];
          if (null != d) {
            var e = void 0;
            var f = k;
            if (d instanceof xa) d = Da(d);
            else if ("style" == f.toLowerCase()) {
              var h = typeof d;
              h = ("object" == h && null != d) || "function" == h;
              if (!h) throw Error("");
              if (!(d instanceof tb)) {
                h = "";
                for (e in d)
                  if (Object.prototype.hasOwnProperty.call(d, e)) {
                    if (!/^[-_a-zA-Z0-9]+$/.test(e))
                      throw Error("Name allows only [-_a-zA-Z0-9], got: " + e);
                    var g = d[e];
                    null != g &&
                      ((g = Array.isArray(g) ? g.map(vb).join(" ") : vb(g)),
                      (h += e + ":" + g + ";"));
                  }
                d = h ? new tb(h, sb) : ub;
              }
              d =
                d instanceof tb && d.constructor === tb
                  ? d.g
                  : "type_error:SafeStyle";
            } else {
              if (/^on/i.test(f)) throw Error("");
              if (f.toLowerCase() in Kb)
                if (d instanceof hb) d = ib(d).toString();
                else if (d instanceof H)
                  if (d instanceof H) d = d.g;
                  else throw Error("");
                else if ("string" === typeof d) d = rb(d).toString();
                else throw Error("");
            }
            e = f + '="' + Na(String(d)) + '"';
            c += " " + e;
          }
        }
    var k = "<span" + c;
    null == b ? (b = []) : Array.isArray(b) || (b = [b]);
    !0 === eb.span
      ? (k += ">")
      : ((b = Ib(b)), (k += ">" + Db(b).toString() + "</span>"));
    return Gb(k);
  }
  L = new (function () {
    var a = [];
    var b = 0,
      c;
    for (c in sc) a[b++] = sc[c];
    a = void 0 === a ? [] : a;
    this.A = {};
    this.g = {};
    for (b = 0; b < a.length; ++b) this.g[a[b]] = "";
  })();
  K(["466465925", "466465926"], fc, 20);
  tc() && Fe();
  L && K(["592230570", "592230571"], ec, 16);
  uc() && (Bc(1), Cc());
  function sf(a, b, c) {
    function d(l, n) {
      var p = new Image();
      p.onload = l;
      p.src = n;
    }
    function e() {
      --f;
      if (0 >= f) {
        var l = Wc(a, !1),
          n = l[b];
        n && (delete l[b], (l = n[0]) && l.call && l());
      }
    }
    var f = c.length + 1;
    if (2 === c.length) {
      var h = c[0],
        g = c[1];
      0 <= Rb(h, 0, "rmt_tld", h.search(Sb)) &&
        0 <= Rb(h, 0, "ipr", h.search(Sb)) &&
        !g.match(Pb)[6] &&
        ((g += Qb(h)), (c[1] = Vb(g, "rmt_tld", "1")));
    }
    for (h = 0; h < c.length; h++) {
      g = c[h];
      var k = Tb(g, "fmt");
      switch (Number(k)) {
        case 1:
        case 2:
          (k = a.document.getElementById("goog_conv_iframe")) && !k.src
            ? Sc(g, e, k)
            : d(e, g);
          break;
        case 4:
          $c(a, a.document, g, e);
          break;
        case 5:
          if (a.navigator && a.navigator.sendBeacon)
            if (a.navigator.sendBeacon(g, "")) {
              e();
              break;
            } else g = Vb(g, "sendb", 2);
          g = Vb(g, "fmt", 3);
          d(e, g);
          break;
        default:
          d(e, g);
      }
    }
    e();
  }
  var tf = ["GooglemKTybQhCsO"],
    Z = A;
  tf[0] in Z ||
    "undefined" == typeof Z.execScript ||
    Z.execScript("var " + tf[0]);
  for (var uf; tf.length && (uf = tf.shift()); )
    tf.length || void 0 === sf
      ? Z[uf] && Z[uf] !== Object.prototype[uf]
        ? (Z = Z[uf])
        : (Z = Z[uf] = {})
      : (Z[uf] = sf);
  (function (a, b, c) {
    if (a) {
      lf(a, c, a);
      try {
        if ($e(a)) {
          var d = bf(a);
          L && K(["375603260", "375603261"], nc ? 1 : 0, 19);
          L && K(["512247838", "512247839"], oc ? 1 : 0, 22);
          if (3 == nf(c)) {
            var e = "google_conversion_" + Math.floor(1e9 * Math.random());
            Ob(c, rf({ id: e }));
            qf(function () {
              try {
                cf(c, d);
                var f = c.getElementById(e);
                if (f) {
                  var h = Lc(Ye(a, b, c, d));
                  if (1 === f.nodeType) {
                    var g = f.tagName;
                    if ("SCRIPT" === g || "STYLE" === g) throw Error("");
                  }
                  f.innerHTML = Db(h);
                }
              } catch (k) {}
            }, c);
          } else cf(c, d), Ob(c, Lc(Ye(a, b, c, d)));
        }
      } catch (f) {}
      af(a);
    }
  })(window, navigator, document);
}).call(this);
