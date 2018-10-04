var MyBundle = (function (exports) {
  'use strict';

  var out_of_memory = /* tuple */[
    "Out_of_memory",
    0
  ];

  var sys_error = /* tuple */[
    "Sys_error",
    -1
  ];

  var failure = /* tuple */[
    "Failure",
    -2
  ];

  var invalid_argument = /* tuple */[
    "Invalid_argument",
    -3
  ];

  var end_of_file = /* tuple */[
    "End_of_file",
    -4
  ];

  var division_by_zero = /* tuple */[
    "Division_by_zero",
    -5
  ];

  var not_found = /* tuple */[
    "Not_found",
    -6
  ];

  var match_failure = /* tuple */[
    "Match_failure",
    -7
  ];

  var stack_overflow = /* tuple */[
    "Stack_overflow",
    -8
  ];

  var sys_blocked_io = /* tuple */[
    "Sys_blocked_io",
    -9
  ];

  var assert_failure = /* tuple */[
    "Assert_failure",
    -10
  ];

  var undefined_recursive_module = /* tuple */[
    "Undefined_recursive_module",
    -11
  ];

  out_of_memory.tag = 248;

  sys_error.tag = 248;

  failure.tag = 248;

  invalid_argument.tag = 248;

  end_of_file.tag = 248;

  division_by_zero.tag = 248;

  not_found.tag = 248;

  match_failure.tag = 248;

  stack_overflow.tag = 248;

  sys_blocked_io.tag = 248;

  assert_failure.tag = 248;

  undefined_recursive_module.tag = 248;
  /*  Not a pure module */

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function caml_array_set(xs, index, newval) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      xs[index] = newval;
      return /* () */0;
    }
  }

  function caml_array_get(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return xs[index];
    }
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var arity = f.length;
      var arity$1 = arity === 0 ? 1 : arity;
      var len = args.length;
      var d = arity$1 - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      } else if (d < 0) {
        _args = caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity$1));
        continue ;
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    }}

  function curry_1(o, a0, arity) {
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[a0]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            return o(a0);
        case 2 : 
            return (function (param) {
                return o(a0, param);
              });
        case 3 : 
            return (function (param, param$1) {
                return o(a0, param, param$1);
              });
        case 4 : 
            return (function (param, param$1, param$2) {
                return o(a0, param, param$1, param$2);
              });
        case 5 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, param, param$1, param$2, param$3);
              });
        case 6 : 
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, param, param$1, param$2, param$3, param$4);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3, param$4, param$5) {
                return o(a0, param, param$1, param$2, param$3, param$4, param$5);
              });
        
      }
    }
  }

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      return curry_1(o, a0, arity);
    }
  }

  function curry_2(o, a0, a1, arity) {
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            return app(o(a0), /* array */[a1]);
        case 2 : 
            return o(a0, a1);
        case 3 : 
            return (function (param) {
                return o(a0, a1, param);
              });
        case 4 : 
            return (function (param, param$1) {
                return o(a0, a1, param, param$1);
              });
        case 5 : 
            return (function (param, param$1, param$2) {
                return o(a0, a1, param, param$1, param$2);
              });
        case 6 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, a1, param, param$1, param$2, param$3);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, a1, param, param$1, param$2, param$3, param$4);
              });
        
      }
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      return curry_2(o, a0, a1, arity);
    }
  }
  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* node_std_output Not a pure module */

  /* No side effect */

  var imul = ( Math.imul || function (x,y) {
    y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
  }
  );
  /* imul Not a pure module */

  /* repeat Not a pure module */

  /* two_ptr_32_dbl Not a pure module */

  /* float_of_string Not a pure module */

  function get(s, i) {
    if (i < 0 || i >= s.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return s.charCodeAt(i);
    }
  }
  /* No side effect */

  var id = /* record */[/* contents */0];

  function get_id() {
    id[0] += 1;
    return id[0];
  }

  function create(str) {
    var v_001 = get_id(/* () */0);
    var v = /* tuple */[
      str,
      v_001
    ];
    v.tag = 248;
    return v;
  }
  /* No side effect */

  /* No side effect */

  /* No side effect */

  function failwith(s) {
    throw [
          failure,
          s
        ];
  }

  var Exit = create("Pervasives.Exit");

  function abs(x) {
    if (x >= 0) {
      return x;
    } else {
      return -x | 0;
    }
  }
  /* No side effect */

  function length(l) {
    var _len = 0;
    var _param = l;
    while(true) {
      var param = _param;
      var len = _len;
      if (param) {
        _param = param[1];
        _len = len + 1 | 0;
        continue ;
      } else {
        return len;
      }
    }}

  function hd(param) {
    if (param) {
      return param[0];
    } else {
      throw [
            failure,
            "hd"
          ];
    }
  }

  function tl(param) {
    if (param) {
      return param[1];
    } else {
      throw [
            failure,
            "tl"
          ];
    }
  }

  function rev_append(_l1, _l2) {
    while(true) {
      var l2 = _l2;
      var l1 = _l1;
      if (l1) {
        _l2 = /* :: */[
          l1[0],
          l2
        ];
        _l1 = l1[1];
        continue ;
      } else {
        return l2;
      }
    }}

  function rev(l) {
    return rev_append(l, /* [] */0);
  }

  function map(f, param) {
    if (param) {
      var r = _1(f, param[0]);
      return /* :: */[
              r,
              map(f, param[1])
            ];
    } else {
      return /* [] */0;
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

  function add$1(a, b) {
    return a + b | 0;
  }

  function inc(i) {
    return i + 1 | 0;
  }

  function dec(i) {
    return i - 1 | 0;
  }

  function $$double(i) {
    return (i << 1);
  }

  function incDouble(i) {
    return ((i + 1 | 0) << 1);
  }

  function sub$1(a, b) {
    return a - b | 0;
  }

  var Utils = /* module */[
    /* add */add$1,
    /* inc */inc,
    /* dec */dec,
    /* double */$$double,
    /* incDouble */incDouble,
    /* sub */sub$1
  ];

  function map$1(f, param) {
    if (param) {
      return /* :: */[
              _1(f, param[0]),
              map$1(f, param[1])
            ];
    } else {
      return /* [] */0;
    }
  }

  function forEach(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        _1(f, param[0]);
        _param = param[1];
        continue ;
      } else {
        return /* () */0;
      }
    }}

  function forEachi(f, l) {
    var _i = 0;
    var _param = l;
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        _2(f, param[0], i);
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return /* () */0;
      }
    }}

  function range(n) {
    var inner = function (_acc, _i) {
      while(true) {
        var i = _i;
        var acc = _acc;
        if (i !== 0) {
          _i = i - 1 | 0;
          _acc = /* :: */[
            i,
            acc
          ];
          continue ;
        } else {
          return acc;
        }
      }  };
    return rev(inner(/* [] */0, n));
  }

  var MyList = /* module */[
    /* map */map$1,
    /* forEach */forEach,
    /* forEachi */forEachi,
    /* range */range
  ];
  /* No side effect */

  var $$Error = create("Js_exn.Error");
  /* No side effect */

  var Bottom = create("Array.Bottom");
  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* No side effect */

  /* No side effect */

  function cmn(q, a, b, x, s, t) {
    var a$1 = ((a + q | 0) + x | 0) + t | 0;
    return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
  }

  function f(a, b, c, d, x, s, t) {
    return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
  }

  function g(a, b, c, d, x, s, t) {
    return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
  }

  function h(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function i(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
  }

  function cycle(x, k) {
    var a = x[0];
    var b = x[1];
    var c = x[2];
    var d = x[3];
    a = f(a, b, c, d, k[0], 7, -680876936);
    d = f(d, a, b, c, k[1], 12, -389564586);
    c = f(c, d, a, b, k[2], 17, 606105819);
    b = f(b, c, d, a, k[3], 22, -1044525330);
    a = f(a, b, c, d, k[4], 7, -176418897);
    d = f(d, a, b, c, k[5], 12, 1200080426);
    c = f(c, d, a, b, k[6], 17, -1473231341);
    b = f(b, c, d, a, k[7], 22, -45705983);
    a = f(a, b, c, d, k[8], 7, 1770035416);
    d = f(d, a, b, c, k[9], 12, -1958414417);
    c = f(c, d, a, b, k[10], 17, -42063);
    b = f(b, c, d, a, k[11], 22, -1990404162);
    a = f(a, b, c, d, k[12], 7, 1804603682);
    d = f(d, a, b, c, k[13], 12, -40341101);
    c = f(c, d, a, b, k[14], 17, -1502002290);
    b = f(b, c, d, a, k[15], 22, 1236535329);
    a = g(a, b, c, d, k[1], 5, -165796510);
    d = g(d, a, b, c, k[6], 9, -1069501632);
    c = g(c, d, a, b, k[11], 14, 643717713);
    b = g(b, c, d, a, k[0], 20, -373897302);
    a = g(a, b, c, d, k[5], 5, -701558691);
    d = g(d, a, b, c, k[10], 9, 38016083);
    c = g(c, d, a, b, k[15], 14, -660478335);
    b = g(b, c, d, a, k[4], 20, -405537848);
    a = g(a, b, c, d, k[9], 5, 568446438);
    d = g(d, a, b, c, k[14], 9, -1019803690);
    c = g(c, d, a, b, k[3], 14, -187363961);
    b = g(b, c, d, a, k[8], 20, 1163531501);
    a = g(a, b, c, d, k[13], 5, -1444681467);
    d = g(d, a, b, c, k[2], 9, -51403784);
    c = g(c, d, a, b, k[7], 14, 1735328473);
    b = g(b, c, d, a, k[12], 20, -1926607734);
    a = h(a, b, c, d, k[5], 4, -378558);
    d = h(d, a, b, c, k[8], 11, -2022574463);
    c = h(c, d, a, b, k[11], 16, 1839030562);
    b = h(b, c, d, a, k[14], 23, -35309556);
    a = h(a, b, c, d, k[1], 4, -1530992060);
    d = h(d, a, b, c, k[4], 11, 1272893353);
    c = h(c, d, a, b, k[7], 16, -155497632);
    b = h(b, c, d, a, k[10], 23, -1094730640);
    a = h(a, b, c, d, k[13], 4, 681279174);
    d = h(d, a, b, c, k[0], 11, -358537222);
    c = h(c, d, a, b, k[3], 16, -722521979);
    b = h(b, c, d, a, k[6], 23, 76029189);
    a = h(a, b, c, d, k[9], 4, -640364487);
    d = h(d, a, b, c, k[12], 11, -421815835);
    c = h(c, d, a, b, k[15], 16, 530742520);
    b = h(b, c, d, a, k[2], 23, -995338651);
    a = i(a, b, c, d, k[0], 6, -198630844);
    d = i(d, a, b, c, k[7], 10, 1126891415);
    c = i(c, d, a, b, k[14], 15, -1416354905);
    b = i(b, c, d, a, k[5], 21, -57434055);
    a = i(a, b, c, d, k[12], 6, 1700485571);
    d = i(d, a, b, c, k[3], 10, -1894986606);
    c = i(c, d, a, b, k[10], 15, -1051523);
    b = i(b, c, d, a, k[1], 21, -2054922799);
    a = i(a, b, c, d, k[8], 6, 1873313359);
    d = i(d, a, b, c, k[15], 10, -30611744);
    c = i(c, d, a, b, k[6], 15, -1560198380);
    b = i(b, c, d, a, k[13], 21, 1309151649);
    a = i(a, b, c, d, k[4], 6, -145523070);
    d = i(d, a, b, c, k[11], 10, -1120210379);
    c = i(c, d, a, b, k[2], 15, 718787259);
    b = i(b, c, d, a, k[9], 21, -343485551);
    x[0] = a + x[0] | 0;
    x[1] = b + x[1] | 0;
    x[2] = c + x[2] | 0;
    x[3] = d + x[3] | 0;
    return /* () */0;
  }

  var state = /* array */[
    1732584193,
    -271733879,
    -1732584194,
    271733878
  ];

  var md5blk = /* array */[
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];

  function caml_md5_string(s, start, len) {
    var s$1 = s.slice(start, len);
    var n = s$1.length;
    state[0] = 1732584193;
    state[1] = -271733879;
    state[2] = -1732584194;
    state[3] = 271733878;
    for(var i = 0; i <= 15; ++i){
      md5blk[i] = 0;
    }
    var i_end = n / 64 | 0;
    for(var i$1 = 1; i$1 <= i_end; ++i$1){
      for(var j = 0; j <= 15; ++j){
        var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
        md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
      }
      cycle(state, md5blk);
    }
    var s_tail = s$1.slice((i_end << 6));
    for(var kk = 0; kk <= 15; ++kk){
      md5blk[kk] = 0;
    }
    var i_end$1 = s_tail.length - 1 | 0;
    for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
      md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
    }
    var i$3 = i_end$1 + 1 | 0;
    md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
    if (i$3 > 55) {
      cycle(state, md5blk);
      for(var i$4 = 0; i$4 <= 15; ++i$4){
        md5blk[i$4] = 0;
      }
    }
    md5blk[14] = (n << 3);
    cycle(state, md5blk);
    return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
  }
  /* No side effect */

  function string(str) {
    return caml_md5_string(str, 0, str.length);
  }
  /* No side effect */

  /* No side effect */

  function full_init(s, seed) {
    var combine = function (accu, x) {
      return string(accu + String(x));
    };
    var extract = function (d) {
      return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
    };
    var seed$1 = seed.length === 0 ? /* array */[0] : seed;
    var l = seed$1.length;
    for(var i = 0; i <= 54; ++i){
      caml_array_set(s[/* st */0], i, i);
    }
    var accu = "x";
    for(var i$1 = 0 ,i_finish = 54 + (
        55 > l ? 55 : l
      ) | 0; i$1 <= i_finish; ++i$1){
      var j = i$1 % 55;
      var k = i$1 % l;
      accu = combine(accu, caml_array_get(seed$1, k));
      caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
    }
    s[/* idx */1] = 0;
    return /* () */0;
  }

  function bits(s) {
    s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
    var curval = caml_array_get(s[/* st */0], s[/* idx */1]);
    var newval = caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
    var newval30 = newval & 1073741823;
    caml_array_set(s[/* st */0], s[/* idx */1], newval30);
    return newval30;
  }

  function $$int(s, bound) {
    if (bound > 1073741823 || bound <= 0) {
      throw [
            invalid_argument,
            "Random.int"
          ];
    } else {
      var s$1 = s;
      var n = bound;
      while(true) {
        var r = bits(s$1);
        var v = r % n;
        if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
          continue ;
        } else {
          return v;
        }
      }  }
  }

  var $$default = /* record */[
    /* st : array */[
      987910699,
      495797812,
      364182224,
      414272206,
      318284740,
      990407751,
      383018966,
      270373319,
      840823159,
      24560019,
      536292337,
      512266505,
      189156120,
      730249596,
      143776328,
      51606627,
      140166561,
      366354223,
      1003410265,
      700563762,
      981890670,
      913149062,
      526082594,
      1021425055,
      784300257,
      667753350,
      630144451,
      949649812,
      48546892,
      415514493,
      258888527,
      511570777,
      89983870,
      283659902,
      308386020,
      242688715,
      482270760,
      865188196,
      1027664170,
      207196989,
      193777847,
      619708188,
      671350186,
      149669678,
      257044018,
      87658204,
      558145612,
      183450813,
      28133145,
      901332182,
      710253903,
      510646120,
      652377910,
      409934019,
      801085050
    ],
    /* idx */0
  ];

  function $$int$1(bound) {
    return $$int($$default, bound);
  }

  function init$3(seed) {
    return full_init($$default, /* array */[seed]);
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

  function handleKey(key_code, c_direction) {
    var switcher = key_code - 37 | 0;
    if (switcher > 3 || switcher < 0) {
      return undefined;
    } else {
      switch (switcher) {
        case 0 : 
            if (c_direction !== /* Left */3 && c_direction !== /* Right */1) {
              return /* Left */3;
            } else {
              return undefined;
            }
        case 1 : 
            if (c_direction !== /* Up */0 && c_direction !== /* Down */2) {
              return /* Up */0;
            } else {
              return undefined;
            }
        case 2 : 
            if (c_direction !== /* Right */1 && c_direction !== /* Left */3) {
              return /* Right */1;
            } else {
              return undefined;
            }
        case 3 : 
            if (c_direction !== /* Down */2 && c_direction !== /* Up */0) {
              return /* Down */2;
            } else {
              return undefined;
            }
        
      }
    }
  }

  function calcNextPos(n, param, param$1, param$2) {
    var y = param$1[1];
    var x = param$1[0];
    var max_y = param[1];
    var max_x = param[0];
    switch (param$2) {
      case 0 : 
          var new_y = y > 0 ? y - n | 0 : max_y;
          return /* tuple */[
                  x,
                  new_y
                ];
      case 1 : 
          var new_x = x < max_x ? x + n | 0 : 0;
          return /* tuple */[
                  new_x,
                  y
                ];
      case 2 : 
          var new_y$1 = y < max_y ? y + n | 0 : 0;
          return /* tuple */[
                  x,
                  new_y$1
                ];
      case 3 : 
          var new_x$1 = x > 0 ? x - n | 0 : max_x;
          return /* tuple */[
                  new_x$1,
                  y
                ];
      
    }
  }

  function updateBody(newMember, body) {
    var inner = function (m, l) {
      if (l) {
        return /* :: */[
                m,
                inner(l[0], l[1])
              ];
      } else if (m[2]) {
        return /* :: */[
                /* tuple */[
                  m[0],
                  m[1],
                  false
                ],
                /* [] */0
              ];
      } else {
        return /* [] */0;
      }
    };
    return inner(newMember, body);
  }

  function spawnRandom(param, param$1, seed) {
    init$3(seed);
    return /* tuple */[
            $$int$1(param[1]) + param[0] | 0,
            $$int$1(param$1[1]) + param$1[0] | 0
          ];
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

  var currentGame = /* record */[
    /* state : GOING */0,
    /* score */0,
    /* actor : record */[
      /* body */map((function (i) {
              return /* tuple */[
                      /* tuple */[
                        100 + imul(i, 5) | 0,
                        100
                      ],
                      /* Right */1,
                      false
                    ];
            }), MyList[/* range */3](100)),
      /* direction : Right */1
    ],
    /* superSpawn : tuple */[
      performance.now(),
      undefined
    ],
    /* spawn *//* record */[
      /* pos : tuple */[
        100,
        100
      ],
      /* symbol */"*"
    ]
  ];

  function clear_canvas(canvas) {
    var context = canvas.getContext("2d");
    var cwidth = canvas.width;
    var cheight = canvas.height;
    context.clearRect(0, 0, cwidth, cheight);
    return /* () */0;
  }

  function draw_actor(canvas, body) {
    var context = canvas.getContext("2d");
    return MyList[/* forEachi */2]((function (param, i) {
                  var match = param[0];
                  var y = match[1];
                  var x = match[0];
                  var match$1;
                  switch (param[1]) {
                    case 0 : 
                        match$1 = /* tuple */[
                          x,
                          y + 5 | 0
                        ];
                        break;
                    case 1 : 
                        match$1 = /* tuple */[
                          x - 5 | 0,
                          y
                        ];
                        break;
                    case 2 : 
                        match$1 = /* tuple */[
                          x,
                          y - 5 | 0
                        ];
                        break;
                    case 3 : 
                        match$1 = /* tuple */[
                          x + 5 | 0,
                          y
                        ];
                        break;
                    
                  }
                  var match$2 = i % 3;
                  var color;
                  if (match$2 > 2 || match$2 < 0) {
                    color = "#ffff00";
                  } else {
                    switch (match$2) {
                      case 0 : 
                          color = "#ff0066";
                          break;
                      case 1 : 
                          color = "#0066ff";
                          break;
                      case 2 : 
                          color = "#00cc00";
                          break;
                      
                    }
                  }
                  var lineWidth = param[2] ? 8 : 5;
                  context.beginPath();
                  context.strokeStyle = color;
                  context.lineWidth = lineWidth;
                  context.moveTo(match$1[0], match$1[1]);
                  context.lineTo(x, y);
                  context.stroke();
                  return context.closePath();
                }), body);
  }

  function draw_prey(canvas, prey) {
    if (prey !== undefined) {
      var match = prey[/* pos */0];
      var y = match[1];
      var x = match[0];
      var context = canvas.getContext("2d");
      context.beginPath();
      context.lineWidth = 6;
      context.moveTo(x - 6 | 0, y);
      context.lineTo(x, y);
      context.stroke();
      return context.closePath();
    } else {
      return /* () */0;
    }
  }

  function draw_debug(canvas, actor, _) {
    var context = canvas.getContext("2d");
    context.strokeStyle = "#ff0066";
    context.lineWidth = 3;
    context.rect(300, 0, 150, 100);
    context.stroke();
    var body = actor[/* body */0];
    var bodLength = length(body);
    var actorStr = "Body Length: " + String(bodLength);
    console.log(actorStr);
    context.fillText(actorStr, 310, 10);
    return /* () */0;
  }

  function checkCollision(actor, prey) {
    if (prey !== undefined) {
      var direction = actor[/* direction */1];
      var match = hd(actor[/* body */0]);
      var match$1 = match[0];
      var y = match$1[1];
      var x = match$1[0];
      var match$2 = prey[/* pos */0];
      var preyY = match$2[1];
      var preyX = match$2[0];
      var exit$$1 = 0;
      if (direction !== 1 && direction < 3) {
        if (abs(x - preyX | 0) <= 3) {
          return abs(y - preyY | 0) < 3;
        } else {
          return false;
        }
      } else {
        exit$$1 = 1;
      }
      if (exit$$1 === 1) {
        if (abs(x - preyX | 0) < 3) {
          return abs(y - preyY | 0) <= 3;
        } else {
          return false;
        }
      }
      
    } else {
      return false;
    }
  }

  function gameLoop(t) {
    var match = currentGame[/* actor */2];
    var body = match[/* body */0];
    var direction = match[/* direction */1];
    var match$1 = currentGame[/* superSpawn */3];
    var spawn = currentGame[/* spawn */4];
    var match$2 = hd(body);
    var match$3 = match$2[0];
    var newHead_000 = calcNextPos(5, /* tuple */[
          512,
          256
        ], /* tuple */[
          match$3[0],
          match$3[1]
        ], direction);
    var newHead = /* tuple */[
      newHead_000,
      direction,
      false
    ];
    currentGame[/* actor */2][/* body */0] = updateBody(newHead, body);
    var match$4 = currentGame[/* actor */2];
    var body$1 = match$4[/* body */0];
    var canvas_id = "canvas";
    var match$5 = document.getElementById(canvas_id);
    var canvas = match$5 !== null ? match$5 : (console.log("cant find canvas canvas \n"), failwith("fail"));
    var match$6;
    if (spawn !== undefined) {
      var match$7 = checkCollision(currentGame[/* actor */2], spawn);
      if (match$7) {
        var match$8 = hd(body$1);
        match$6 = /* tuple */[
          undefined,
          /* :: */[
            /* tuple */[
              match$8[0],
              match$8[1],
              true
            ],
            tl(body$1)
          ]
        ];
      } else {
        match$6 = /* tuple */[
          spawn,
          body$1
        ];
      }
    } else {
      var match$9 = spawnRandom(/* tuple */[
            12,
            500
          ], /* tuple */[
            12,
            244
          ], t | 0);
      match$6 = /* tuple */[
        /* record */[
          /* pos : tuple */[
            match$9[0],
            match$9[1]
          ],
          /* symbol */"*"
        ],
        body$1
      ];
    }
    currentGame[/* spawn */4] = match$6[0];
    currentGame[/* actor */2][/* body */0] = match$6[1];
    clear_canvas(canvas);
    draw_actor(canvas, body$1);
    draw_prey(canvas, match$1[1]);
    draw_prey(canvas, spawn);
    draw_debug(canvas, currentGame[/* actor */2], spawn);
    requestAnimationFrame(gameLoop);
    return /* () */0;
  }

  document.addEventListener("keydown", (function (evt) {
          var match = handleKey(evt.keyCode, currentGame[/* actor */2][/* direction */1]);
          currentGame[/* actor */2][/* direction */1] = match !== undefined ? match : currentGame[/* actor */2][/* direction */1];
          return true;
        }), true);

  gameLoop(performance.now());

  var Utils$1 = Utils;

  var MyList$1 = MyList;

  var windowHeight = 256;

  var windowWidth = 512;

  var memberLength = 5;

  var memberWidth = 3;
  /* currentGame Not a pure module */

  exports.Utils = Utils$1;
  exports.MyList = MyList$1;
  exports.windowHeight = windowHeight;
  exports.windowWidth = windowWidth;
  exports.memberLength = memberLength;
  exports.memberWidth = memberWidth;
  exports.currentGame = currentGame;
  exports.clear_canvas = clear_canvas;
  exports.draw_actor = draw_actor;
  exports.draw_prey = draw_prey;
  exports.draw_debug = draw_debug;
  exports.checkCollision = checkCollision;
  exports.gameLoop = gameLoop;

  return exports;

}({}));
