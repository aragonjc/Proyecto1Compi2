(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
(function (process){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var ejecucion = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,13],$V2=[1,15],$V3=[1,16],$V4=[1,17],$V5=[1,18],$V6=[1,19],$V7=[1,20],$V8=[1,21],$V9=[1,22],$Va=[5,9,10,30,42,47,48,49,57,58,81],$Vb=[1,32],$Vc=[2,15],$Vd=[1,30],$Ve=[1,31],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[1,37],$Vk=[1,38],$Vl=[5,9,10,14,30,38,39,40,42,47,48,49,53,56,57,58,81],$Vm=[2,14],$Vn=[5,9,10,14,15,25,30,38,39,40,42,47,48,49,53,56,57,58,81],$Vo=[1,60],$Vp=[1,53],$Vq=[1,61],$Vr=[1,51],$Vs=[1,52],$Vt=[1,54],$Vu=[1,55],$Vv=[1,56],$Vw=[1,57],$Vx=[1,58],$Vy=[1,59],$Vz=[1,65],$VA=[15,28],$VB=[2,95],$VC=[1,72],$VD=[1,71],$VE=[1,85],$VF=[1,86],$VG=[1,87],$VH=[2,17],$VI=[1,111],$VJ=[1,112],$VK=[1,96],$VL=[1,97],$VM=[1,98],$VN=[1,99],$VO=[1,100],$VP=[1,101],$VQ=[1,102],$VR=[1,103],$VS=[1,104],$VT=[1,105],$VU=[1,106],$VV=[1,107],$VW=[1,108],$VX=[1,109],$VY=[1,110],$VZ=[5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,76,77,81,89,90,91,92,93,94,95,96,97,98,99,100,101,102,104],$V_=[5,9,10,11,14,15,23,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,72,73,74,75,76,77,81,89,90,91,92,93,94,95,96,97,98,99,100,101,102,104],$V$=[2,76],$V01=[5,9,10,14,15,25,28,30,38,39,40,42,47,48,49,53,56,57,58,69,81],$V11=[1,126],$V21=[1,134],$V31=[1,130],$V41=[1,131],$V51=[1,132],$V61=[1,133],$V71=[10,14,38,39,40,42,47,48,49,53,56,57,58,81],$V81=[1,153],$V91=[1,154],$Va1=[1,158],$Vb1=[25,28],$Vc1=[28,69],$Vd1=[1,184],$Ve1=[1,183],$Vf1=[14,15,28],$Vg1=[11,12,14,15,25,28],$Vh1=[2,102],$Vi1=[1,192],$Vj1=[10,23,68,90,103,105,106,107,108,109,110],$Vk1=[5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,81,89,90,95,96,97,98,99,100,101,102,104],$Vl1=[5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,81,89,90,91,92,94,95,96,97,98,99,100,101,102,104],$Vm1=[5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,81,95,96,97,98,99,100,101,102,104],$Vn1=[1,235],$Vo1=[11,12,14,15,25,28,68],$Vp1=[1,257],$Vq1=[2,43],$Vr1=[1,269],$Vs1=[14,53,56];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"Bloque":4,"EOF":5,"Instruccion":6,"llamadaFuncion":7,"variables":8,"Type":9,"id":10,"igual":11,"curlyBraceOpen":12,"parsObj":13,"curlyBraceClose":14,"semicolon":15,"funciones":16,"IF":17,"WHILE":18,"DOWHILE":19,"SWITCH":20,"FOR":21,"PL":22,"bracketOpen":23,"paramFunc":24,"bracketClose":25,"varLast":26,"paramFuncList":27,"comma":28,"E":29,"function":30,"funcParam":31,"funcDec":32,"dosPuntos":33,"types":34,"STMT":35,"funcParamList":36,"InstruccionI":37,"Break":38,"Continue":39,"return":40,"OP":41,"if":42,"exp":43,"IFLAST":44,"else":45,"IFCOND":46,"while":47,"do":48,"switch":49,"FIRSTCASE":50,"LASTCASE":51,"CASE":52,"case":53,"DEFCASE":54,"ENDCASE":55,"default":56,"for":57,"let":58,"asignLast":59,"forOP":60,"in":61,"of":62,"defVarLast":63,"defVarLastP":64,"defLast":65,"defType":66,"asignLastF":67,"sqBracketOpen":68,"sqBracketClose":69,"auxP":70,"point":71,"masIgual":72,"menosIgual":73,"porIgual":74,"divisionIgual":75,"increment":76,"decrement":77,"objType":78,"opkv":79,"keyvalueT":80,"const":81,"number":82,"typesList":83,"boolean":84,"string":85,"void":86,"typesL":87,"objetoParam":88,"mas":89,"menos":90,"por":91,"division":92,"potencia":93,"modulo":94,"mayorque":95,"menorque":96,"mayorigualque":97,"menorigualque":98,"igualdad":99,"diferencia":100,"and":101,"or":102,"not":103,"question":104,"NUMBER":105,"STRING":106,"true":107,"false":108,"null":109,"undefined":110,"arrParam":111,"listArrParam":112,"objetoParamList":113,"keyvalue":114,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"Type",10:"id",11:"igual",12:"curlyBraceOpen",14:"curlyBraceClose",15:"semicolon",23:"bracketOpen",25:"bracketClose",28:"comma",30:"function",33:"dosPuntos",38:"Break",39:"Continue",40:"return",42:"if",45:"else",47:"while",48:"do",49:"switch",53:"case",56:"default",57:"for",58:"let",61:"in",62:"of",68:"sqBracketOpen",69:"sqBracketClose",71:"point",72:"masIgual",73:"menosIgual",74:"porIgual",75:"divisionIgual",76:"increment",77:"decrement",81:"const",82:"number",84:"boolean",85:"string",86:"void",89:"mas",90:"menos",91:"por",92:"division",93:"potencia",94:"modulo",95:"mayorque",96:"menorque",97:"mayorigualque",98:"menorigualque",99:"igualdad",100:"diferencia",101:"and",102:"or",103:"not",104:"question",105:"NUMBER",106:"STRING",107:"true",108:"false",109:"null",110:"undefined"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,7],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[7,6],[22,1],[22,0],[24,1],[24,0],[27,3],[27,1],[16,6],[32,5],[32,3],[31,1],[31,0],[36,5],[36,3],[35,2],[35,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,2],[37,2],[37,2],[41,2],[41,1],[17,8],[44,2],[44,0],[46,8],[46,3],[18,7],[19,9],[20,8],[50,1],[50,0],[52,5],[52,4],[51,2],[54,3],[55,1],[55,0],[21,15],[21,14],[21,12],[21,10],[21,9],[60,1],[60,1],[63,2],[63,0],[64,4],[64,2],[8,5],[8,3],[8,2],[59,2],[59,1],[26,4],[26,3],[70,1],[70,0],[67,2],[67,2],[67,2],[67,2],[67,2],[67,1],[67,1],[13,1],[13,0],[78,3],[78,1],[79,1],[79,1],[80,3],[66,1],[66,1],[65,4],[65,2],[65,0],[34,2],[34,2],[34,2],[34,2],[34,2],[83,1],[83,0],[87,3],[87,2],[29,1],[29,3],[43,3],[43,3],[43,3],[43,3],[43,2],[43,3],[43,3],[43,3],[43,3],[43,3],[43,3],[43,3],[43,3],[43,3],[43,3],[43,2],[43,3],[43,5],[43,2],[43,2],[43,1],[43,1],[43,1],[43,1],[43,1],[43,1],[43,2],[43,1],[43,5],[43,3],[111,1],[111,0],[112,3],[112,1],[88,1],[88,0],[113,3],[113,1],[114,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2: case 27:
 $$[$0-1].push($$[$0]); this.$=$$[$0-1];
break;
case 3: case 28:
 this.$ = [$$[$0]]; 
break;
case 4: case 7: case 8: case 10: case 11: case 12: case 29: case 30: case 31: case 32: case 33: case 34: case 35:
 this.$=$$[$0]; 
break;
case 5: case 9: case 16:
 this.$=$$[$0];
break;
case 6:
 this.$=new decType($$[$0-5],$$[$0-2]); 
break;
case 13:
 this.$ = new callFunction(0,0,$$[$0-5],$$[$0-4],$$[$0-2]); 
break;
case 14:
this.$= $$[$0];
break;
case 15: case 85: case 138:
this.$ = null;
break;
case 17:
 this.$=null;
break;
case 18:
$$[$0-2].push($$[$0]); this.$=$$[$0-2];
break;
case 19:
this.$ = [$$[$0]];
break;
case 20:

			this.$ = new Function($$[$0-4],$$[$0-2],$$[$0]);

break;
case 21:

			var hasType = true;
			this.$ = new FuncDec(hasType,$$[$0-3],$$[$0-1]);
		 
break;
case 22:

			var hasType = false;
			this.$ = new FuncDec(hasType,null,$$[$0-1]);
		 
break;
case 23:
 this.$ =$$[$0];
break;
case 24:
 this.$ = []; 
break;
case 25:
$$[$0-4].push({id:$$[$0-2],types:$$[$0]}); this.$=$$[$0-4];
break;
case 26:
this.$ = [{id:$$[$0-2],types:$$[$0]}];
break;
case 36:
 this.$=new EscapeExp('BREAK',null); 
break;
case 37:
 this.$=new EscapeExp('CONTINUE',null); 
break;
case 38:
 this.$=new EscapeExp('RETURN',$$[$0]); 
break;
case 39:
 this.$ = $$[$0-1];
break;
case 40: case 43: case 50: case 56: case 95: case 102:
 this.$ = null; 
break;
case 41:
 
		this.$ = new IF($$[$0-5],$$[$0-2],$$[$0]);
	 
break;
case 42: case 55: case 62: case 63: case 91: case 92: case 101: case 105: case 137: case 141:
 this.$ = $$[$0]; 
break;
case 44:

		   this.$ = new IF($$[$0-5],$$[$0-2],$$[$0]);
	   
break;
case 45:

		   this.$ = new IF(null,$$[$0-1],null);
	   
break;
case 46:

			this.$ = new While($$[$0-4],$$[$0-1]);
		
break;
case 47:

			this.$ = new doWhile($$[$0-2],$$[$0-6]);
		
break;
case 48:

			this.$ = new Switch($$[$0-5],$$[$0-2],$$[$0-1]);
		
break;
case 49:
 this.$ = new Case($$[$0]); 
break;
case 51:

		$$[$0-4].push({exp:$$[$0-2],stmt:$$[$0]});
		this.$ = $$[$0-4];
	 
break;
case 52:

		this.$ = [{exp:$$[$0-2],stmt:$$[$0]}]
	 
break;
case 53:

		this.$ = $$[$0-1];
	
break;
case 54:

	this.$ = new Defcase($$[$0]);

break;
case 57:

		this.$ = new ForNormal($$[$0-11],$$[$0-9],$$[$0-7],new asignVariable($$[$0-5],$$[$0-4]),$$[$0-1]);
	
break;
case 58:

		this.$ = new ForTwo($$[$0-11],$$[$0-9],$$[$0-7],new asignVariable($$[$0-5],$$[$0-4]),$$[$0-1]);
	
break;
case 59:

		this.$ = new ForThree($$[$0-9],$$[$0-7],new asignVariable($$[$0-5],$$[$0-4]),$$[$0-1]);
	
break;
case 60:

		this.$ = new ForEach(true,$$[$0-6],$$[$0-5],$$[$0-4],$$[$0-1]);
	
break;
case 61:

		this.$ = new ForEach(false,$$[$0-6],$$[$0-5],$$[$0-4],$$[$0-1]);
	
break;
case 64:

				this.$ = new defVarLast($$[$0]);
			
break;
case 65:
this.$=null;
break;
case 66:

				this.$ = new defVarLastP(0,0,$$[$0-3],$$[$0-1],$$[$0]);
			
break;
case 67:

				this.$ = new defVarLastP(0,0,null,$$[$0-1],$$[$0]);
			
break;
case 68:
 this.$ = new Variable(0,0,$$[$0-4],$$[$0-3],$$[$0-2],$$[$0-1]); 
break;
case 69:

			  //comprobar si es const o let
			  this.$ = new asignVariable($$[$0-2],$$[$0-1]);
		  
break;
case 70:

			  //comprobar si es const o let
			  this.$ = new asignVariable($$[$0-1],$$[$0]);
		  
break;
case 71:

				this.$ =new asignLast($$[$0-1],$$[$0]);
			
break;
case 72:

			 this.$ = new asignLast(null,$$[$0]);
		 
break;
case 73:
 this.$ = new idList(true,$$[$0-2],$$[$0]);
break;
case 74:
 this.$ = new idList(false,$$[$0-1],$$[$0]);
break;
case 75:
 this.$ = $$[$0];
break;
case 76:
 this.$ = null;
break;
case 77:

	this.$ = new asignLastF(null,$$[$0]);

break;
case 78:

	this.$ = new asignLastF("+",$$[$0]);

break;
case 79:

	this.$ = new asignLastF("-",$$[$0]);

break;
case 80:

	this.$ = new asignLastF("*",$$[$0]);

break;
case 81:

	this.$ = new asignLastF("/",$$[$0]);

break;
case 82:

	this.$ = new asignLastF("+",null);

break;
case 83:

	this.$ = new asignLastF("-",null);

break;
case 84: case 88: case 89:
this.$ = $$[$0];
break;
case 86:
  this.$ = new objType($$[$0-2],$$[$0]); 
break;
case 87:
this.$ = new objType(null,$$[$0]);
break;
case 90:
 this.$ = new typeKeyValue($$[$0-2],$$[$0]); 
break;
case 93:

			this.$ = new defLast(0,0,$$[$0-2],$$[$0]);
		
break;
case 94:
 this.$ = new defLast(0,0,null,$$[$0]);
break;
case 96:

		   this.$ = new Type("NUMBER",$$[$0]);
	   
break;
case 97:

		   this.$ = new Type("BOOLEAN",$$[$0]);
	  
break;
case 98:

		   this.$ = new Type("STRING",$$[$0]);
	   
break;
case 99:

		   this.$ = new Type("VOID",$$[$0]);
	   
break;
case 100:

		   this.$ = new Type($$[$0-1],$$[$0]);
	   
break;
case 103:

			this.$ = new typeList(0,0,$$[$0-2]);
		
break;
case 104:

			this.$ = new typeList(0,0,null);
		
break;
case 106:

		this.$ = new Obj($$[$0-1]);
	
break;
case 107:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"+"); 
break;
case 108:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"-"); 
break;
case 109:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"*"); 
break;
case 110:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"/"); 
break;
case 111:
 this.$ = new Operation(0,0,$$[$0],null,"unary"); 
break;
case 112:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"**"); 
break;
case 113:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"%"); 
break;
case 114:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],">"); 
break;
case 115:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"<"); 
break;
case 116:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],">="); 
break;
case 117:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"<="); 
break;
case 118:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"=="); 
break;
case 119:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"!="); 
break;
case 120:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"&&"); 
break;
case 121:
 this.$ = new Operation(0,0,$$[$0-2],$$[$0],"||"); 
break;
case 122:
 this.$ = new Operation(0,0,$$[$0],null,"!"); 
break;
case 123:
 this.$ = $$[$0-1]; 
break;
case 124:
 this.$ = new ternaryOp($$[$0-4],$$[$0-2],$$[$0]); 
break;
case 125:
 this.$ = new Operation(0,0,$$[$0-1],null,"INC"); 
break;
case 126:
 this.$ = new Operation(0,0,$$[$0-1],null,"DEC"); 
break;
case 127:
 this.$ = new TObject(0,0,$$[$0],"NUMBER"); 
break;
case 128:
 this.$ = new TObject(0,0,$$[$0].substring(1,$$[$0].length-1),"STRING"); 
break;
case 129:
 this.$ = new TObject(0,0,true,"BOOLEAN"); 
break;
case 130:
 this.$ = new TObject(0,0,false,"BOOLEAN"); 
break;
case 131:
 this.$ = new TObject(0,0,$$[$0],"NULL"); 
break;
case 132:
 this.$ = new TObject(0,0,$$[$0],"UNDEFINED"); 
break;
case 133:
 this.$ = new idVarlast(0,0,$$[$0-1],$$[$0]); 
break;
case 134:
 this.$ = new Id(0,0,$$[$0]); 
break;
case 135:
 this.$ = new callFunction(0,0,$$[$0-4],$$[$0-3],$$[$0-1]); 
break;
case 136:
 this.$ = new ArrList($$[$0-1]); 
break;
case 139:
 this.$ = new ArrParamList($$[$0-2],$$[$0]); 
break;
case 140:
 this.$ = new ArrParamList(null,$$[$0]); 
break;
case 142:
this.$= null;
break;
case 143:
 this.$ = new objList($$[$0-2],$$[$0]); 
break;
case 144:
 this.$ = new objList(null,$$[$0]); 
break;
case 145:

		this.$ = new objProperty($$[$0-2],$$[$0]);
	
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:$V0,10:$V1,16:7,17:8,18:9,19:10,20:11,21:12,30:$V2,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{1:[3]},{5:[1,23],6:24,7:4,8:5,9:$V0,10:$V1,16:7,17:8,18:9,19:10,20:11,21:12,30:$V2,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Va,[2,3]),o($Va,[2,4]),o($Va,[2,5]),{10:[1,25]},o($Va,[2,7]),o($Va,[2,8]),o($Va,[2,9]),o($Va,[2,10]),o($Va,[2,11]),o($Va,[2,12]),{11:$Vb,22:26,23:$Vc,26:28,59:27,67:29,68:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi,76:$Vj,77:$Vk},{10:[1,39]},{10:[1,40]},{23:[1,41]},{23:[1,42]},{12:[1,43]},{23:[1,44]},{23:[1,45]},{10:[2,91]},{10:[2,92]},{1:[2,1]},o($Va,[2,2]),{11:[1,46]},{23:[1,47]},o($Vl,[2,70],{15:[1,48]}),{11:$Vb,23:$Vm,67:49,72:$Vf,73:$Vg,74:$Vh,75:$Vi,76:$Vj,77:$Vk},o($Vn,[2,72]),{10:$Vo,23:$Vp,43:50,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:[1,62]},{10:$Vo,12:$Vz,23:$Vp,29:63,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,12:$Vz,23:$Vp,29:66,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,12:$Vz,23:$Vp,29:67,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,12:$Vz,23:$Vp,29:68,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,12:$Vz,23:$Vp,29:69,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($Vn,[2,82]),o($Vn,[2,83]),o($VA,$VB,{65:70,11:$VC,33:$VD}),{23:[1,73]},{10:$Vo,23:$Vp,43:74,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:75,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:76,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{10:$Vo,23:$Vp,43:88,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:90,58:[1,89],68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{12:[1,91]},{10:$Vo,12:$Vz,23:$Vp,24:92,25:$VH,27:93,29:94,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($Vl,[2,69]),o($Vn,[2,71]),{69:[1,95],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{10:$Vo,23:$Vp,43:113,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:114,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:115,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($VZ,[2,127]),o($VZ,[2,128]),o($VZ,[2,129]),o($VZ,[2,130]),o($VZ,[2,131]),o($VZ,[2,132]),o($VZ,[2,134],{26:116,22:117,23:$Vc,68:$Vd,71:$Ve}),{10:$Vo,12:$Vz,23:$Vp,29:120,43:64,68:$Vq,69:[2,138],90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy,111:118,112:119},o($V_,$V$,{70:121,26:122,68:$Vd,71:$Ve}),o($Vn,[2,77]),o($V01,[2,105],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY}),{10:$V11,14:[2,142],88:123,113:124,114:125},o($Vn,[2,78]),o($Vn,[2,79]),o($Vn,[2,80]),o($Vn,[2,81]),{15:[2,65],28:[1,128],63:127},{10:$V21,34:129,82:$V31,84:$V41,85:$V51,86:$V61},{10:$Vo,12:$Vz,23:$Vp,29:135,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:[1,138],25:[2,24],31:136,36:137},{25:[1,139],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{25:[1,140],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{7:78,8:79,10:$V1,14:[1,141],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($V71,[2,28]),o($V71,[2,29]),o($V71,[2,30]),o($V71,[2,31]),o($V71,[2,32]),o($V71,[2,33]),o($V71,[2,34]),o($V71,[2,35]),{15:[1,143]},{15:[1,144]},{10:$Vo,12:$Vz,15:[1,147],23:$Vp,29:146,41:145,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{25:[1,148],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{10:[1,149]},{11:[1,150],15:[1,151],60:152,61:$V81,62:$V91,76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{10:$Va1,13:155,14:[2,85],78:156,80:157},{25:[1,159]},{25:[2,16],28:[1,160]},o($Vb1,[2,19]),o($V_,$V$,{26:122,70:161,68:$Vd,71:$Ve}),{10:$Vo,23:$Vp,43:162,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:163,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:164,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:165,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:166,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:167,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:168,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:169,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:170,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:171,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:172,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:173,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:174,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:175,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:176,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($VZ,[2,125]),o($VZ,[2,126]),o($VZ,[2,111]),o($VZ,[2,122]),{25:[1,177],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},o($VZ,[2,133],{23:$Vm}),{23:[1,178]},{69:[1,179]},{28:[1,180],69:[2,137]},o($Vc1,[2,140]),o($V_,[2,74]),o($V_,[2,75]),{14:[1,181]},{14:[2,141],15:$Vd1,28:$Ve1,79:182},o($Vf1,[2,144]),{33:[1,185]},{15:[1,186]},{10:[1,188],64:187},{11:[1,189]},o($Vg1,$Vh1,{83:190,87:191,68:$Vi1}),o($Vg1,$Vh1,{87:191,83:193,68:$Vi1}),o($Vg1,$Vh1,{87:191,83:194,68:$Vi1}),o($Vg1,$Vh1,{87:191,83:195,68:$Vi1}),o($Vg1,$Vh1,{87:191,83:196,68:$Vi1}),o($VA,[2,94]),{25:[1,197]},{25:[2,23],28:[1,198]},{33:[1,199]},{12:[1,200]},{12:[1,201]},{47:[1,202]},o($V71,[2,27]),o($V71,[2,36]),o($V71,[2,37]),o($V71,[2,38]),{15:[1,203]},o($V71,[2,40]),{12:[1,204]},{11:[1,205],60:206,61:$V81,62:$V91},{10:$Vo,23:$Vp,43:207,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:208,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:209,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($Vj1,[2,62]),o($Vj1,[2,63]),{14:[1,210]},{14:[2,84],15:$Vd1,28:$Ve1,79:211},o($Vf1,[2,87]),{33:[1,212]},{15:[1,213]},{10:$Vo,12:$Vz,23:$Vp,29:214,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($V_,[2,73]),o($Vk1,[2,107],{76:$VI,77:$VJ,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vk1,[2,108],{76:$VI,77:$VJ,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vl1,[2,109],{76:$VI,77:$VJ,93:$VO}),o($Vl1,[2,110],{76:$VI,77:$VJ,93:$VO}),o($VZ,[2,112]),o($Vl1,[2,113],{76:$VI,77:$VJ,93:$VO}),o($Vm1,[2,114],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vm1,[2,115],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vm1,[2,116],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vm1,[2,117],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vm1,[2,118],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP}),o($Vm1,[2,119],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP}),o([5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,81,101,102,104],[2,120],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV}),o([5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,81,102,104],[2,121],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW}),{33:[1,215],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},o($VZ,[2,123]),{10:$Vo,12:$Vz,23:$Vp,24:216,25:$VH,27:93,29:94,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($VZ,[2,136]),{10:$Vo,12:$Vz,23:$Vp,29:217,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($V01,[2,106]),{10:$V11,114:218},{10:[2,88]},{10:[2,89]},{10:$Vo,12:$Vz,23:$Vp,29:219,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($Vl,[2,68]),{15:[2,64],28:[1,220]},o($VA,$VB,{65:221,11:$VC,33:$VD}),{10:$Vo,12:$Vz,23:$Vp,29:222,43:64,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},o($Vg1,[2,96]),o($Vg1,[2,101],{68:[1,223]}),{69:[1,224]},o($Vg1,[2,97]),o($Vg1,[2,98]),o($Vg1,[2,99]),o($Vg1,[2,100]),{12:[1,227],32:225,33:[1,226]},{10:[1,228]},{10:$V21,34:229,82:$V31,84:$V41,85:$V51,86:$V61},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:230,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:231,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{23:[1,232]},o($V71,[2,39]),{50:233,52:234,53:$Vn1,56:[2,50]},{10:$Vo,23:$Vp,43:236,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:$Vo,23:$Vp,43:237,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{15:[1,238],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{15:[1,239],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{25:[1,240],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{15:[1,241]},{10:$Va1,80:242},{10:$V21,34:243,82:$V31,84:$V41,85:$V51,86:$V61},o($Vl,[2,13]),o($Vb1,[2,18]),{10:$Vo,23:$Vp,43:244,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{25:[1,245]},o($Vc1,[2,139]),o($Vf1,[2,143]),o($Vf1,[2,145]),{10:[1,246]},o($VA,[2,67]),o($VA,[2,93]),{69:[1,247]},o($Vo1,[2,104]),o($Va,[2,20]),{10:$V21,34:248,82:$V31,84:$V41,85:$V51,86:$V61},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:249,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{33:[1,250]},o($Vb1,[2,26]),{7:78,8:79,10:$V1,14:[1,251],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,14:[1,252],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{10:$Vo,23:$Vp,43:253,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{51:254,54:255,56:[1,256]},{53:$Vp1,56:[2,49]},{10:$Vo,23:$Vp,43:258,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{15:[1,259],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{25:[1,260],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{10:$Vo,23:$Vp,43:261,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{10:[1,262]},{12:[1,263]},o($Va,[2,6]),o($Vf1,[2,86]),o($Vf1,[2,90]),o([5,9,10,11,14,15,25,28,30,33,38,39,40,42,47,48,49,53,56,57,58,61,62,69,81],[2,124],{76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY}),o($VZ,[2,135]),o($VA,$VB,{65:264,11:$VC,33:$VD}),o($Vo1,[2,103]),{12:[1,265]},{7:78,8:79,10:$V1,14:[1,266],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{10:$V21,34:267,82:$V31,84:$V41,85:$V51,86:$V61},o($Vl,$Vq1,{44:268,45:$Vr1}),o($Vl,[2,46]),{25:[1,270],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{14:[1,271]},{14:[2,56],52:273,53:$Vn1,55:272},{33:[1,274]},{10:$Vo,23:$Vp,43:275,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{33:[1,276],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{10:$Vo,23:$Vp,43:277,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{12:[1,278]},{15:[1,279],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{11:$Vb,26:281,59:280,67:29,68:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi,76:$Vj,77:$Vk},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:282,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($VA,[2,66]),{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:283,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Va,[2,22]),o($Vb1,[2,25]),o($Vl,[2,41]),{12:[1,286],42:[1,285],46:284},{15:[1,287]},o($Vl,[2,48]),{14:[2,53]},{14:[2,55],53:$Vp1},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:288,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{33:[1,289],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:290,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{15:[1,291],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:292,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{10:[1,293]},{25:[1,294]},{11:$Vb,67:49,72:$Vf,73:$Vg,74:$Vh,75:$Vi,76:$Vj,77:$Vk},{7:78,8:79,10:$V1,14:[1,295],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,14:[1,296],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Vl,[2,42]),{23:[1,297]},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:298,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Vl,[2,47]),o([14,53],[2,54],{66:14,7:78,8:79,17:80,18:81,19:82,20:83,21:84,37:142,10:$V1,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,81:$V9}),{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:299,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Vs1,[2,52],{66:14,7:78,8:79,17:80,18:81,19:82,20:83,21:84,37:142,10:$V1,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,81:$V9}),{10:[1,300]},{7:78,8:79,10:$V1,14:[1,301],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{11:$Vb,26:281,59:302,67:29,68:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi,76:$Vj,77:$Vk},{12:[1,303]},o($Vl,[2,61]),o($Va,[2,21]),{10:$Vo,23:$Vp,43:304,68:$Vq,90:$Vr,103:$Vs,105:$Vt,106:$Vu,107:$Vv,108:$Vw,109:$Vx,110:$Vy},{7:78,8:79,10:$V1,14:[1,305],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Vs1,[2,51],{66:14,7:78,8:79,17:80,18:81,19:82,20:83,21:84,37:142,10:$V1,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,81:$V9}),{11:$Vb,26:281,59:306,67:29,68:$Vd,71:$Ve,72:$Vf,73:$Vg,74:$Vh,75:$Vi,76:$Vj,77:$Vk},o($Vl,[2,60]),{25:[1,307]},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:308,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{25:[1,309],76:$VI,77:$VJ,89:$VK,90:$VL,91:$VM,92:$VN,93:$VO,94:$VP,95:$VQ,96:$VR,97:$VS,98:$VT,99:$VU,100:$VV,101:$VW,102:$VX,104:$VY},o($Vl,[2,45]),{25:[1,310]},{12:[1,311]},{7:78,8:79,10:$V1,14:[1,312],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{12:[1,313]},{12:[1,314]},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:315,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Vl,[2,59]),{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:316,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,17:80,18:81,19:82,20:83,21:84,35:317,37:77,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,14:[1,318],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,14:[1,319],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},{7:78,8:79,10:$V1,14:[1,320],17:80,18:81,19:82,20:83,21:84,37:142,38:$VE,39:$VF,40:$VG,42:$V3,47:$V4,48:$V5,49:$V6,57:$V7,58:$V8,66:14,81:$V9},o($Vl,[2,58]),o($Vl,$Vq1,{44:321,45:$Vr1}),o($Vl,[2,57]),o($Vl,[2,44])],
defaultActions: {21:[2,91],22:[2,92],23:[2,1],183:[2,88],184:[2,89],272:[2,53]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

	const defLast = require('./ejecucion/defLast.js');
	const callFunction = require('./ejecucion/callFunction.js');
    const TObject = require('./ejecucion/TObject.js');
	const Operation = require('./ejecucion/Operation.js');
	const idList = require('./ejecucion/idList.js');
	const Variable = require('./ejecucion/Variable.js');
	const Type = require('./ejecucion/Type.js');
	const decType = require('./ejecucion/decType.js');
	const objType = require('./ejecucion/objType.js');
	const typeKeyValue  = require('./ejecucion/typeKeyValue.js');
	const Id  = require('./ejecucion/Id.js');
	const typeList  = require('./ejecucion/typeList.js');
	const ArrList = require('./ejecucion/ArrList.js');
	const ArrParamList = require('./ejecucion/ArrParamList.js')
	const objList = require('./ejecucion/objList.js')
	const Obj = require('./ejecucion/Obj.js')
	const objProperty = require('./ejecucion/objProperty.js')
	const idVarlast = require('./ejecucion/idVarlast.js')
	const defVarLast = require('./ejecucion/defVarLast.js')
	const defVarLastP = require('./ejecucion/defVarLastP.js')
	const asignLastF = require('./ejecucion/asignLastF.js')
	const asignLast = require('./ejecucion/asignLast.js')
	const asignVariable = require('./ejecucion/asignVariable.js')
	const ternaryOp = require('./ejecucion/ternaryOp.js')
	const While = require('./ejecucion/While.js')
	const EscapeExp = require('./ejecucion/EscapeExp.js')
	const doWhile = require('./ejecucion/doWhile.js')
	const IF = require('./ejecucion/IF.js')

	const Defcase = require('./ejecucion/Defcase.js')
	const Case = require('./ejecucion/Case.js')
	const Switch = require('./ejecucion/Switch.js')

	const ForNormal = require('./ejecucion/ForNormal.js')
	const ForTwo = require('./ejecucion/ForTwo.js')
	const ForThree = require('./ejecucion/ForThree.js')
	const ForEach = require('./ejecucion/ForEach.js')

	const Function = require('./ejecucion/Function.js')
	const FuncDec = require('./ejecucion/FuncDec.js')
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0://Comentario Linea
break;
case 1://Comentaio Multilinea
break;
case 2:return 39;
break;
case 3:return 38;
break;
case 4:return 109;
break;
case 5:return 9;
break;
case 6:return 81;
break;
case 7:return 58;
break;
case 8:return 81;
break;
case 9:return 30;
break;
case 10:return 42;
break;
case 11:return 45;
break;
case 12:return 47;
break;
case 13:return 48;
break;
case 14:return 49;
break;
case 15:return 53;
break;
case 16:return 56;
break;
case 17:return 57;
break;
case 18:return 61;
break;
case 19:return 62;
break;
case 20:return 82;
break;
case 21:return 84;
break;
case 22:return 85;
break;
case 23:return 86;
break;
case 24:return 107;
break;
case 25:return 108;
break;
case 26:return 110;
break;
case 27:return 40;
break;
case 28:return 72;
break;
case 29:return 73;
break;
case 30:return 74;
break;
case 31:return 75;
break;
case 32:return 12;
break;
case 33:return 14;
break;
case 34:return 23;
break;
case 35:return 25;
break;
case 36:return 28;
break;
case 37:return 15;
break;
case 38:return 33;
break;
case 39:return 71;
break;
case 40:return 76;
break;
case 41:return 77;
break;
case 42:return 89;
break;
case 43:return 90;
break;
case 44:return 93;
break;
case 45:return 91;
break;
case 46:return 92;
break;
case 47:return 94;
break;
case 48:return 97;
break;
case 49:return 98;
break;
case 50:return 95;
break;
case 51:return 96;
break;
case 52:return 99;
break;
case 53:return 11;
break;
case 54:return 100;
break;
case 55:return 101;
break;
case 56:return 102;
break;
case 57:return 103;
break;
case 58:return 104;
break;
case 59:return 68;
break;
case 60:return 69;
break;
case 61:
break;
case 62:
break;
case 63:
break;
case 64:
break;
case 65:return 105;
break;
case 66:return 106;
break;
case 67:return 10;
break;
case 68:return 5;
break;
case 69: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:[\/][*][^*]*[*]+([^\/*][^*]*[*]+)*[\/])/,/^(?:continue\b)/,/^(?:break\b)/,/^(?:null\b)/,/^(?:type\b)/,/^(?:const\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:function\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:of\b)/,/^(?:number\b)/,/^(?:boolean\b)/,/^(?:string\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:undefined\b)/,/^(?:return\b)/,/^(?:\+=)/,/^(?:-=)/,/^(?:\*=)/,/^(?:\/=)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:;)/,/^(?::)/,/^(?:\.)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*\*)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:==)/,/^(?:=)/,/^(?:!=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\?)/,/^(?:\[)/,/^(?:\])/,/^(?:\s+)/,/^(?:\t+)/,/^(?:\r+)/,/^(?:\n+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:"[^\"]*"|'[^\']*'|`[^\`]*`)/,/^(?:([a-zA-Z$_])[a-zA-Z0-9_$]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = ejecucion;
exports.Parser = ejecucion.Parser;
exports.parse = function () { return ejecucion.parse.apply(ejecucion, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this,require('_process'))
},{"./ejecucion/ArrList.js":5,"./ejecucion/ArrParamList.js":6,"./ejecucion/Case.js":7,"./ejecucion/Defcase.js":8,"./ejecucion/EscapeExp.js":9,"./ejecucion/ForEach.js":10,"./ejecucion/ForNormal.js":11,"./ejecucion/ForThree.js":12,"./ejecucion/ForTwo.js":13,"./ejecucion/FuncDec.js":14,"./ejecucion/Function.js":15,"./ejecucion/IF.js":16,"./ejecucion/Id.js":17,"./ejecucion/Obj.js":19,"./ejecucion/Operation.js":20,"./ejecucion/Switch.js":22,"./ejecucion/TObject.js":23,"./ejecucion/Type.js":24,"./ejecucion/Variable.js":25,"./ejecucion/While.js":26,"./ejecucion/asignLast.js":27,"./ejecucion/asignLastF.js":28,"./ejecucion/asignVariable.js":29,"./ejecucion/callFunction.js":30,"./ejecucion/decType.js":31,"./ejecucion/defLast.js":32,"./ejecucion/defVarLast.js":33,"./ejecucion/defVarLastP.js":34,"./ejecucion/doWhile.js":35,"./ejecucion/idList.js":36,"./ejecucion/idVarlast.js":37,"./ejecucion/objList.js":38,"./ejecucion/objProperty.js":39,"./ejecucion/objType.js":40,"./ejecucion/ternaryOp.js":41,"./ejecucion/typeKeyValue.js":42,"./ejecucion/typeList.js":43,"_process":3,"fs":1,"path":2}],5:[function(require,module,exports){
class ArrList {

    constructor(arr) {
        this.arr = arr;
    }

    run(scope,console) {
        if(this.arr != null) {
            var a = this.arr.run(scope,console);
            return {value:a.arr,type:a.type,isArray:true,dim:1}
        }

        return {value:[],type:"NULL",isArray:true,dim:0}
    }
    
}

module.exports = ArrList;
},{}],6:[function(require,module,exports){
class ArrParamList {

    constructor(list,exp) {
        this.list = list;
        this.exp = exp;
    }

    run(scope, console) {

        if(this.list != null) {

            var e = this.exp.run(scope, console);
            var l = this.list.run(scope, console);
            
           
            l.arr.push(e);
            
            return l;

        } else {
            var e = this.exp.run(scope, console);
            return {arr:[e],type:e.type};
        }
    }
}

module.exports = ArrParamList;
},{}],7:[function(require,module,exports){
const Operation = require('./Operation.js');
const Scope = require('./Scope.js')
class Case {

    constructor(list) {
        this.list = list;
    }

    run(scope,cond,console) {
        for(var i = 0;i<this.list.length;i++) {
            var element = this.list[i];
            var exp = element.exp/*.run(scope)*/;
            var stmt = element.stmt;
            
            var op = new Operation(0,0,cond,exp,"==");
            var result = op.run(scope,console);

            if(result.type == 'BOOLEAN' && !result.isArray) {

                //console.log(result);
                result = Boolean(result.value);
                //console.log(result);
                if(result) {
                    var actualScope = new Scope(scope);
                    var aux = this.statement(actualScope,stmt,console);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            return aux;
                        } else if(aux.type == 'CONTINUE') {
                            return aux;
                        }
                    }
                }

            } else {
                //error
                console.log("Error 1 en Case.js")
                return;
            }
        }
    }

    statement(scope,stmt,console) {
        if(stmt!= null) {
            for(var i = 0;i<stmt.length;i++) {
                var element = stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return aux;
                    }
                }
            }     
        }
    }
}

module.exports = Case;
},{"./Operation.js":20,"./Scope.js":21}],8:[function(require,module,exports){
const Scope = require('./Scope.js');
class Defcase {

    constructor(stmt) {
        this.stmt = stmt;
    }

    run(scope,console){ 
        var actualScope = new Scope(scope);
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(actualScope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return aux;
                    }
                }
            }     
        }
    }
}

module.exports = Defcase;
},{"./Scope.js":21}],9:[function(require,module,exports){
class EscapeExp {

    constructor(type,exp) {
        this.type = type;
        this.exp = exp;
    }

    run(scope,console) {

        if(this.type == 'BREAK') {
            return {type:'BREAK'}
        } else if(this.type == 'CONTINUE') {
            return {type:'CONTINUE'}
        } else if(this.type == "RETURN"){
            //console.log(this.exp)
            if(this.exp != null) {

                var res = this.exp.run(scope,console);
                return {type:"RETURN",res:res}
            }
            return {type:"RETURN"}
        }
    }

}
module.exports = EscapeExp;
},{}],10:[function(require,module,exports){
const TObject = require("./TObject");
const Variable = require("./Variable");
const defLast = require("./defLast");
const Scope = require("./Scope");
const asignLast = require("./asignLast")
const asignLastF = require("./asignLastF")
const asignVariable = require("./asignVariable")
class ForEach{

    constructor(isDec,id,forOp,arr,stmt){
        this.isDec = isDec;
        this.id = id;
        this.forOp = forOp;
        this.arr = arr;
        this.stmt = stmt;
    }
    
    run(scope,console) {

        var obj = this.arr.run(scope,console);
        if(obj.isArray || !this.isPrimitive(obj)) {

            if(this.forOp == 'in') {
                return this.forIn(obj,scope,console);
            } else {
                return this.forOf(obj,scope,console)
            }

        } else {
            //ERROR
            console.log("Error 1 en ForEach.js")
            return;
        }
    }

    forIn(obj,scope,console) {

        if(this.isDec) {

            var id = this.id;
            var asgn = new Variable(0,0,'let',id,new defLast(0,0,null,new TObject(0,0,"null",'NULL')),null);
            
            var actualScope = new Scope(scope);
            
            asgn.run(actualScope,console);
            var array = this.arr.run(scope,console);

            if(array.constructor.name == "Map") {

                for (const key of array.keys()) {
                    
                    var newScope = new Scope(actualScope);

                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"STRING"))));
                    rasign.run(newScope,console)
                    var aux = this.statement(newScope,console);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                }

            } else {
                array = array.value;
                for (const key in array) {

                    var newScope = new Scope(actualScope);

                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"NUMBER"))));
                    rasign.run(newScope,console)
                    var aux = this.statement(newScope,console);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                }
            }

        } else {

            if(this.id.constructor.name == "Id") {

                var id = this.id.id;
                if(scope.findVariable(id)){

                    var actualScope = new Scope(scope);

                    var array = this.arr.run(scope,console);
                    if(array.constructor.name == "Map") {

                        for (const key of array.keys()) {
                            
                            var newScope = new Scope(actualScope);

                            var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"STRING"))));
                            rasign.run(newScope,console)
                            var aux = this.statement(newScope,console);
                            if(aux != null) {
            
                                if(aux.type == 'RETURN') {
                                    return aux;
                                } else if(aux.type == 'BREAK') {
                                    break;
                                } 
                            }
                        }

                    } else {
                        array = array.value;
                        
                        for (const key in array) {
                            
                            var newScope = new Scope(actualScope);
                            
                            var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"NUMBER"))));
                            rasign.run(newScope,console)
                            var aux = this.statement(newScope,console);
                            if(aux != null) {
            
                                if(aux.type == 'RETURN') {
                                    return aux;
                                } else if(aux.type == 'BREAK') {
                                    break;
                                } 
                            }
                        }
                    }


                } else {
                    //ERROR
                    console.log("Error 2 en ForEach.js")
                }

            } else {
                //Error
                console.log("Error 3 en ForEach.js")
                console.log("ERROR se esperaba un id")
            }

        }

        return null;
    }

    forOf(obj,scope,console) {

        if(this.isDec) {

            var id = this.id;
            var asgn = new Variable(0,0,'let',id,new defLast(0,0,null,new TObject(0,0,"null",'NULL')),null);
            var actualScope = new Scope(scope);
            asgn.run(actualScope,console);
            var array = this.arr.run(scope,console);
            if(array.constructor.name == "Map") {

                console.log("Error 4 en ForEach.js")
                return null;

            } else {
                array = array.value;
                for (let value of array) {

                    var newScope = new Scope(actualScope);

                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,value)));
                    rasign.run(newScope,console)
                    var aux = this.statement(newScope,console);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                }
            }

        } else {
            if(this.id.constructor.name == "Id") {

                var id = this.id.id;
                if(scope.findVariable(id)){

                    var actualScope = new Scope(scope);

                    var array = this.arr.run(scope,console);
                    if(array.constructor.name == "Map") {
                        //ERROR
                        console.log("Error 5 en ForEach.js")
                        return null;
                    } else {
                        array = array.value;
                        
                        for (const key of array) {

                            var newScope = new Scope(actualScope);

                            var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,key)));
                            rasign.run(newScope,console)
                            var aux = this.statement(newScope,console);
                            if(aux != null) {
            
                                if(aux.type == 'RETURN') {
                                    return aux;
                                } else if(aux.type == 'BREAK') {
                                    break;
                                } 
                            }
                        }
                    }


                } else {
                    //ERROR
                    console.log("Error 6 en ForEach.js")
                }

            } else {
                //Error
                console.log("Error 7 en ForEach.js")
                console.log("ERROR se esperaba un id")
            }
        }

        return null;
    }
    
    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }

    isPrimitive(obj) {
        switch(obj.type) {
            case 'NUMBER':
                return true;
            case 'BOOLEAN':
                return true;
            case 'STRING':
                return true;
            case 'NULL':
                return true;
            case 'UNDEFINED':
                return true
            default:
                return false;    
        }
    }
}

module.exports = ForEach;
},{"./Scope":21,"./TObject":23,"./Variable":25,"./asignLast":27,"./asignLastF":28,"./asignVariable":29,"./defLast":32}],11:[function(require,module,exports){
const Scope = require('./Scope.js');
class ForNormal {

    constructor(id,expAsign,cond,inc,stmt) {
        this.id = id;
        this.expAsign = expAsign;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope,console) {

        var exp = this.expAsign.run(scope,console);
        var actualScope = new Scope(scope);
        
        var objAsgn = {value:exp,type:exp.type,isArray:exp.isArray,dim:exp.dim,dectype:'let'}
        actualScope.insertVariable(this.id,objAsgn);

        var condition = this.cond.run(actualScope,console);

        if(condition.type == 'BOOLEAN') {
            condition = Boolean(condition.value);
            while(condition) {

                var newScope = new Scope(actualScope);

                var aux = this.statement(newScope,console);
                
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        break;
                    } 
                }
                
                this.inc.run(newScope,console);
                condition = this.cond.run(newScope,console);
                condition = Boolean(condition.value);
                
            }

        } else {
            //Error;
            console.log("Error 1 en ForNormal.js")
        }
        
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }
}
module.exports = ForNormal;
},{"./Scope.js":21}],12:[function(require,module,exports){
const Scope = require('./Scope.js');
const asignLast = require('./asignLast.js')
const asignLastF = require('./asignLastF.js')
const asignVariable = require('./asignVariable.js')

class ForTwo {

    constructor(id,cond,inc,stmt) {
        this.id = id;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope,console) {
        
        if(this.id.constructor.name == "Id") {
            
            var actualScope = new Scope(scope);
            var id = this.id.id;
            if(id != this.inc.id) {
                //ERROR
                console.log("Error 1 en ForThree.js")
                return;
            }
           /* var exp = this.expAsign.run(actualScope);
            var asignLast_ = new asignLast(null,new asignLastF(null,exp));
            var asign = new asignVariable(id,asignLast_);

            asign.run(actualScope);*/
            var condition = this.cond.run(actualScope,console);
            if(condition.type == 'BOOLEAN') {
                
                condition = Boolean(condition.value);
                while(condition) {

                    var newScope = new Scope(actualScope);

                    var aux = this.statement(newScope,console);
                    
                    if(aux != null) {
        
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                    
                    this.inc.run(newScope,console);
                    condition = this.cond.run(newScope,console);
                    condition = Boolean(condition.value);
                    
                }
            } else {
                console.log("No se que va aqui ForThree")
            }

        } else {
            //ERROR
            console.log("Error 2 en ForThree.js")
        }
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }
}

module.exports = ForTwo;

},{"./Scope.js":21,"./asignLast.js":27,"./asignLastF.js":28,"./asignVariable.js":29}],13:[function(require,module,exports){
const Scope = require('./Scope.js');
const asignLast = require('./asignLast.js')
const asignLastF = require('./asignLastF.js')
const asignVariable = require('./asignVariable.js')

class ForTwo {

    constructor(id,expAsign,cond,inc,stmt) {
        this.id = id;
        this.expAsign = expAsign;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope,console) {
        
        if(this.id.constructor.name == "Id") {
            
            var actualScope = new Scope(scope);
            var id = this.id.id;
            if(id != this.inc.id) {
                //ERROR
                console.log("Error 1 en ForTwo.js")
                return;
            }
            var exp = this.expAsign.run(actualScope,console);
            var asignLast_ = new asignLast(null,new asignLastF(null,exp));
            var asign = new asignVariable(id,asignLast_);

            asign.run(actualScope,console);
            var condition = this.cond.run(actualScope,console);

            if(condition.type == 'BOOLEAN') {
                
                condition = Boolean(condition.value);
                while(condition) {

                    var newScope = new Scope(actualScope);

                    var aux = this.statement(newScope,console);
                    
                    if(aux != null) {
        
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                    
                    this.inc.run(newScope,console);
                    condition = this.cond.run(newScope,console);
                    condition = Boolean(condition.value);
                    
                }
            } else {
                console.log("no se que va aqui ForTwo");
            }

        } else {
            //ERROR
            console.log("Error 2 en ForTwo.js")
        }
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }
}

module.exports = ForTwo;
},{"./Scope.js":21,"./asignLast.js":27,"./asignLastF.js":28,"./asignVariable.js":29}],14:[function(require,module,exports){

class FuncDec {

    constructor(hasType,type,STMT) {
        this.hasType = hasType;
        this.type = type;
        this.STMT = STMT;
    }

    run(scope,console) {
        
        if(this.hasType) {
            return {stmt:this.STMT,type:this.type.run(scope,console)}
        } else {
            return {stmt:this.STMT,type:undefined};
        }
    }

}

module.exports = FuncDec;
},{}],15:[function(require,module,exports){

class Function {

    constructor(id,param,funcDec) {
        this.id = id;
        this.param = param;
        this.funcDec = funcDec;
    }

    run(scope,console) {
        var obj = this.funcDec.run(scope,console);
        var func;
        if(obj.type)
            func = obj.type;
        else
            func = {type:'VOID',isArray:false,dim:0}
            
        //console.log(obj)
        func.param = this.param;
        func.stmt = obj.stmt;
        var r = scope.insertFunction(this.id,func);
        if(!r) {
            console.log("Error 1 en Function.js")
        }
    }
}

module.exports = Function;
},{}],16:[function(require,module,exports){
const Scope = require('./Scope.js') 
class IF {

    constructor(cond,stmt,iflast) {
        this.cond   = cond;
        this.stmt   = stmt;
        this.iflast = iflast;
    }

    run(scope,console) {
        
        if(this.cond != null) {
            /*console.log("IF----")
            console.log(this.cond)
            console.log("----.-----")*/
            var auxCond = this.cond.run(scope,console);
            /*console.log("cual es el resultado de la condicion")
            console.log(auxCond)
            console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")*/
            if(auxCond.type == 'BOOLEAN') {

                auxCond = Boolean(auxCond.value);
                var actualScope = new Scope(scope);

                if(auxCond) {

                    var r = this.statement(actualScope,console)
                    if(r != null && r != undefined) {
                        if(r.type == 'RETURN') {
                            return r;
                        } else if(r.type == 'BREAK') {
                            return r;
                        } else if(r.type == 'CONTINUE') {
                            return r;
                        } 
                    }

                } else {

                    if(this.iflast != null) {
                        var actualScope = new Scope(scope);
                        var ifr = this.iflast.run(actualScope,console);
                        if(ifr != null && ifr != undefined) {
                            if(ifr.type == 'RETURN') {
                                return ifr;
                            } else if(ifr.type == 'BREAK') {
                                return ifr;
                            } else if(ifr.type == 'CONTINUE') {
                                return ifr;
                            } 
                        }
                    }
                }

            } else {
                //ERROR
                console.log("ERROR 1 en IF.js")
            }

        } else {

            var actualScope = new Scope(scope);
            var r = this.statement(actualScope,console);
            if(r != null && r != undefined) {
                if(r.type == 'RETURN') {
                    return r;
                } else if(r.type == 'BREAK') {
                    return r;
                } else if(r.type == 'CONTINUE') {
                    return r;
                } 
            }

        }
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return aux;
                    }
                }
            }     
        }
    }

}
module.exports = IF;
},{"./Scope.js":21}],17:[function(require,module,exports){
const TObject = require('./TObject')
class Id {

    constructor(line,column,id) {
        this.line = line;
        this.column = column;
        this.id = id;
    }

    run(scope,console) {
        
        var r = scope.findVariable(this.id);
        /*console.log("!!!!!!!!!!OBJ!!!!!!!!!!!1")
        console.log(r)
        console.log("!!!!!!!!!!!!!!!!!!!!!1")*/
        if(r != null) {
            if(r.value == undefined || r.value == null) {
                return r;
            }
            return r.value;
        } else {
            //ERROR
            console.log("ERROR en Id.js")
            
        }
        return new TObject(0,0,"undefined","UNDEFINED")
    }
}

module.exports = Id;
},{"./TObject":23}],18:[function(require,module,exports){
class Nodo {
    constructor(line,column,value) {
        this.line = line;
        this.column = column;
        this.value = value;
    }

}
module.exports = Nodo;
},{}],19:[function(require,module,exports){
class Obj {
    
    constructor(obj) {
        this.obj = obj;
    }

    run(scope,console) {
        var ob = this.obj.run(scope,console);
        //console.log(ob)
        return { value:ob,type:"OBJ",isArray:false,dim:0 };
    }
}
module.exports = Obj;
},{}],20:[function(require,module,exports){
const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
class Operation extends Nodo{

    constructor(line,column,opIzq,opDer,operator) {
        super(line,column,null);
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.operator = operator;
    }

    

    run(scope,console) {
        let valIzq;
        let valDer;
        /*console.log("$$$$$$$$$$||AL inicio del run en operation|||$$$$$$$$$$$")
        console.log(this.opIzq)
        console.log(this.opDer)
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||")*/
        if(this.opIzq != null)
            valIzq = this.opIzq.run(scope,console);
        if(this.opDer != null)
            valDer = this.opDer.run(scope,console);
        
        /*console.log("$$$$$$$$$$--Aqui se ejecuta en operacion-$$$$$$$$$$$")
        console.log(valIzq)
        console.log(valDer)
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")*/
        if(this.operator == "+") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) + Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else if (valIzq.type === "NUMBER" && valDer.type === "STRING") {
                let res = String(valIzq.value) + String(valDer.value);
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "STRING" && valDer.type === "NUMBER") {
                let res = valIzq.value + String(valDer.value);
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "STRING" && valDer.type === "STRING") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "STRING" && valDer.type === "BOOLEAN") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "BOOLEAN" && valDer.type === "STRING") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == "-") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) - Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == '*') {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) * Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == '/') {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) / Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == 'unary') {
            if(valIzq.type === "NUMBER") {
                let res = Number(valIzq.value) * -1;
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if (this.operator == "**") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Math.pow(Number(valIzq.value),Number(valDer.value));
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if (this.operator == "%") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) % Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if (this.operator == ">") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal > opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "<") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal < opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == ">=") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal >= opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "<=") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal <= opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "==") {
           /*console.log("$$$$$$$$$$$$$$$$$$$$$")
            console.log(valIzq)
            console.log(valDer)
            console.log("$$$$$$$$$$$$$$$$$$$$$")*/
            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal == opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "!=") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal != opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "&&") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal && opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "||") {
            
            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal || opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "!") {
            
            let opIzqVal = this.convertedValue(valIzq);
            let res = !opIzqVal;
            
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "INC") {

            let opIzqVal = this.convertedValue(valIzq);
            let res = opIzqVal+1;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;

        } else if (this.operator == "DEC") {
            let opIzqVal = this.convertedValue(valIzq);
            let res = opIzqVal-1;
            
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        }
    }

}

Operation.prototype.convertedValue = function(value) {
    /*console.log("-----------------Adentro de convertedValue-----------")
    console.log(value)
    console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::")*/
    if(value) {
        if (value.type == "NUMBER") {
            return Number(value.value);
        } else if (value.type == "STRING") {
            return String(value.value);
        } else if (value.type == "BOOLEAN") {
            if(typeof(value.value) == "string") {
                if(value.value == "true")
                    return true;
                else
                    return false;
            }
            return Boolean(value.value);
        } else if(value.type == "NULL") {
            return null;
        } else if(value instanceof Map) {
            return value;
        } else if(value.type == "UNDEFINED") {
            return undefined
        }   
    }
    
    return null;
}

module.exports = Operation;

},{"./Nodo.js":18,"./TObject.js":23}],21:[function(require,module,exports){
class Scope {
    constructor(prev) {
        this.prev = prev;
        this.table = new Map();
        this.functionTable = new Map();
        this.typesTable = new Map();
    }

    getGlobalScope() {
        var sc= this;

        for(sc = this;sc.prev != null;sc = sc.prev){
        }
        return sc;
    }

    changeValueVariable(id,obj) {
        this.getObjVariable(id).set(id,obj);
    }

    getObjVariable(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.table.has(id)) {
                return sc.table;
            }
        }
        return null;
    }

    getNumOfScope() {
        var sc= this;
        var num = 0;
        for(sc = this;sc != null;sc = sc.prev){
            num++;
        }
        return num;
    }

    grapah_ts() {
        var sc= this;
        let str = "";
        let types = "";
        let func = "";
        let scopeNum = this.getNumOfScope()
        for(sc = this;sc != null;sc = sc.prev){
            scopeNum--;
            str += this.graph_tsVariables(sc.table,scopeNum);
            //console.log(sc.table)
            /*if(sc.prev == null) {
                console.log(this.functionTable)
                types = this.getTypes(this.typesTable)
                func = this.getFunctions(this.functionTable)
            }*/
            
        }

        func = "Funciones \n--------------------\n" + this.getFunctions(this.getGlobalScope().functionTable);
        types = this.getTypes(this.getGlobalScope().typesTable);
        return types + "\n" + func + "\n" + str;
    }

    getTypes(types) {
        var str = "";
        for(let obj of types) {
            str += obj[0] + "   |   "
            //str += obj[1].type +"  |" 
            str += "\n";
            //str += ambito
        }
        return str+"\n";
    }

    getFunctions(funcTable) {
        var str = "";
        for(let obj of funcTable) {
            str += obj[0] + "   |   "
            //str += obj[1].type +"  |" 
            str += "\n";
            //str += ambito
        }
        return str+"\n";

    }

    graph_tsVariables(table,scopeNum) {
        
        var str = "----------------------------\n";
        for(let obj of table) {
            str += obj[0] + "   |   "
            str += obj[1].type +"  |    " 
            str += scopeNum +"  |" 
            str += "\n";
            //str += ambito
        }
        return str+"\n";

    }

    getStrArr(obj) {
        var str = "["
        var prop = "";
        //console.log(obj)
        obj.forEach((value) => {

            //prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",";
        });
        prop = prop.substring(0,prop.length-1)
        str += prop;
        str += "]"
        return str;
    }

    getStrObj(obj,tab) {
        var str = tab+"{\n"
        var prop = "";
        obj.forEach((value,key) => {

            prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",\n";
        });
        prop = prop.substring(0,prop.length-2)
        str += prop;
        str += "\n"
        str += tab +"}"
        return str;
    }

    print() {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            console.log(sc.table)
            
        }
        
    }


    findVariable(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.table.has(id)) {
                return sc.table.get(id);
            }
        }
        return null;
    }

    getFunction(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.prev == null) {
                return sc.functionTable.get(id)
            }
        }
    }

    checkFunction(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.prev == null) {
                return sc.functionTable.has(id)
            }
        }
        return false;
        //return this.functionTable.has(id);
    }

    insertFunction(id,obj) {
        
        if(!this.checkFunction(id)) {
            this.functionTable.set(id,obj);
            return true;
        } 
        return false;
    }

    existsLocalVariable(id) {
        return this.table.has(id);
    }
    
    insertVariable(id,value) {
        
        if(!this.existsLocalVariable(id)) {
            this.table.set(id,value);
            return true;
        } 
        console.log("ERROR la variable " + id + " ya existe")
        return false;
    }

    findType(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.prev == null) {
                return sc.typesTable.has(id)
            }
        }
        return false;
    }

    existsType(id) {
        return this.typesTable.has(id)
    }

    insertType(id,value) {
        if(!this.existsType(id)) {
            this.typesTable.set(id,value);
        } else {

           if(this.typesTable.get(id) == null) {
                this.typesTable.delete(id);
                this.typesTable.set(id,value);
                return;
            }

            //ERROR

        }
        
    }
/*
    get existLocalVariable(id) {

    }

    set insertVariable(id,obj,byval) {

    }

    get searchVariable(id) {

    }
    
    get getObjectVariable(id) {

    }

    get existVariable(id) {

    }

    get existVariableNoGlobal(id) {

    }

    set changeVariableValue(id, nodeValue, byval) {

    }

    set insertFunction(id,obj) {

    }

    get searchFunction(id) {

    }

    get existFunction(id) {
        
    }

    get globalScope() {

    }*/
}
module.exports = Scope;
},{}],22:[function(require,module,exports){
const Scope = require('./Scope');
class Switch {

    constructor(cond,firstcase,lastcase) {
        this.cond = cond;
        this.firstcase = firstcase;
        this.lastcase = lastcase;
    }

    run(scope,console) {

        //this.cond.run(scope);

        if(this.firstcase != null) {
            var aux = this.firstcase.run(scope,this.cond,console);
            if(aux != null) {
    
                if(aux.type == 'RETURN') {
                    return aux;
                } else if(aux.type == 'BREAK') {
                    return null;
                } else if(aux.type == 'CONTINUE') {
                    return aux;
                }
            }
        }

        if(this.lastcase != null) {
            var aux = this.lastcase.run(scope,this.cond,console);
            if(aux != null) {
    
                if(aux.type == 'RETURN') {
                    return aux;
                } else if(aux.type == 'BREAK') {
                    return null;
                } else if(aux.type == 'CONTINUE') {
                    return aux;
                }
            }
        }
    }
}

module.exports = Switch;
},{"./Scope":21}],23:[function(require,module,exports){
const Nodo = require('./Nodo.js');
class TObject extends Nodo{

    constructor(line,column,value,type) {
        super(line,column,value);
        this.type = type;
        this.isArray = false;
        this.dimentions = 0;
    }

    run(scope,console) {
        return this;
    }
}
module.exports = TObject;
},{"./Nodo.js":18}],24:[function(require,module,exports){
const typeList = require("./typeList");

class Type {

    constructor(type,list) {
        this.type = type;
        this.list = list;
    }

    run(scope,console) {
        
        if(this.checkType(this.type)) {
            
            if(this.list != null) {
                let dim = this.list.run(scope,console);
                let isArray = dim==0?false:true;

                return {type:this.type,isArray:isArray,dim:dim}
            } 

            return {type:this.type,isArray:false,dim:0}
        } else {
            //buscar si el type existe
            if(scope.findType(this.type)) {
                //***EJECUTAR this.list
                //***validar this.list
                if(this.list != null) {
                    let dim = this.list.run(scope,console);
                    let isArray = dim==0?false:true;
    
                    return {type:this.type,isArray:isArray,dim:dim}
                } 
                return {type:this.type,isArray:false,dim:0}

            } else {

                //ERROR
                console.log("ERROR en Type.js")
            }
        }
    }

    checkType(t) {
        if(t == "NUMBER") {
            return true;
        } else if(t == "BOOLEAN") {
            return true;
        } else if(t == "STRING") {
            return true;
        } else if(t == "VOID") {
            return true;
        }
        return false;
    }
}

module.exports = Type;
},{"./typeList":43}],25:[function(require,module,exports){
const Nodo = require('./Nodo.js');
class Variable extends Nodo{
    
    constructor(line,column,type,id,deflast,defvarLast) {
        super(line,column,id)
        this.type = type;
        this.id = id;
        this.deflast = deflast;
        this.defvarLast = defvarLast;
    }

    run(scope,console) {

        var def = null;
        if(this.deflast !=null) {
            def = this.deflast.run(scope,this.type,console);
        }
        scope.insertVariable(this.id,def);

        if(this.defvarLast != null) {

            var list = this.defvarLast.run(scope,this.type,console);

            if(list.length > 0) {
                list.forEach(element => {
                    element.run(scope,console);
                });
            }
        }
    }
}

module.exports = Variable;
},{"./Nodo.js":18}],26:[function(require,module,exports){
const Scope = require('./Scope.js') 
class While {

    constructor(cond,stmt) {
        this.cond = cond;
        this.stmt = stmt;
    }
    
    run(scope,console) {
        var auxCond = this.cond.run(scope,console);
        if(auxCond.type == 'BOOLEAN') {

            auxCond = Boolean(auxCond.value);
            var actualScope = new Scope(scope);
            while(auxCond) {

                var newScope = new Scope(actualScope);

                var r = null;
                if(this.stmt!= null) {
                    for(var i = 0;i<this.stmt.length;i++) {
                        var element = this.stmt[i];
                        var aux = element.run(newScope,console);
                        if(aux != null) {
            
                            if(aux.type == 'RETURN') {
                                r= aux;
                                break;
                            } else if(aux.type == 'BREAK') {
                                r = aux;
                                break;
                            } else if(aux.type == 'CONTINUE') {
                                r = null;
                                break;
                            }
                        }
                    }     
                }

                if(r != null) {
                    if(r.type == 'RETURN') {
                        return r;
                    } else if(r.type == 'BREAK') {
                        break;
                    }
                }

                auxCond = this.cond.run(scope,console);
                auxCond = Boolean(auxCond.value);
            }

        } else {
            //ERROR
            console.log("ERROR en while.js")
        }
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return;
                    }
                }
            }     
        }
    }
}
module.exports = While;
},{"./Scope.js":21}],27:[function(require,module,exports){
const TObject = require('./TObject.js');
class asignLast {

    constructor(list,asignLastF) {
        this.list = list;
        this.asignLastF = asignLastF;
    }

    run(scope,obj, console) {

        if(this.list != null) {

            var l = this.list.get(scope,console);
            //comprobar tipos y si es arreglo tamaños
            var fobj=obj.value;
            
            if(obj instanceof Map) {
                fobj = obj
            }

            /*console.log("||||||||  Aqui estoy al inicio de asignLast    ||||||||||")
            console.log(obj)
            console.log(l)

            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
            */

            l.forEach(element => {
                if(element.isArray) {
                    if(fobj.isArray) {
                        var arrP = Number(element.exp.value);
                        var objResult = fobj.value;

                        //console.log(arrP)
                        //console.log(objResult.length)
                        if(arrP < objResult.length) {
                            fobj = objResult[arrP]
                        } else {
                            //ERRROR
                            fobj = new TObject(0,0,"undefined","UNDEFINED");
                            //console.log("Error 1 en asignLast.js")
                        }

                    } else {
                        //ERROR
                        fobj = null;
                        console.log("Error 2 en asignLast.js")
                    }
                } else {
                    if(fobj.constructor.name == "Map") {

                        if(fobj.has(element.id)) {
                            fobj = fobj.get(element.id)
                        } else {
                            //Error
                            fobj = null;
                            console.log("Error 3 en asignLast.js")
                        }

                    } else {
                        //error
                        console.log("Error 4 en asignLast.js")
                        return;
                    }
                }

            });

            if(fobj != null) {
                
                if(fobj.constructor.name == "TObject") {
                    fobj = {value:fobj}
                }

                var auxR = this.asignLastF.run(scope,null,console);
                //verificar errores aqui
                fobj=obj.value;
                if(obj instanceof Map) {
                    fobj = obj
                }
                //console.log("AQUI----->")
                //console.log(obj)
                //console.log("--------")
                //console.log(this.asignLastF.exp)
                //console.log("||||||||||||||")
                //console.log(auxR)
                //console.log(fobj);
                //console.log("**********")
                l.forEach((element,index) =>{
                    if(element.isArray) {
                        if(fobj.isArray) {
                            
                            var arrP = Number(element.exp.value);
                            
                            
                            if(index + 1 == l.length) {
                            
                                
                                fobj.value[arrP] = auxR;
                            } else {
                                fobj = fobj.value[arrP]
                            }
                            
                        }
                    } else {
                        if(fobj instanceof Map) {
                            
                            if(index + 1 == l.length) {
                                fobj.set(element.id,auxR)  
                            } else {
                                fobj = fobj.get(element.id)  
                            }
                                  
                        } else {
                            console.log("cayo aqi")
                        }
                    }
                });
                //console.log(fobj);
                return obj;
            }

        } else {
            //COMPROBAR SI ES NUMBER BOOL STRING NULL
            var dectype = obj.dectype;
            //console.log(obj);
            if(this.isPrimitive(obj)) {
                var a = new TObject(0,0,obj.value.value,obj.type)
                var obr = this.asignLastF.run(scope,{value:a},console);
                return {value:obr,type:obr.type,isArray:obr.isArray,dim:obr.dimentions,dectype:dectype}
        
            } 
            var obr = this.asignLastF.run(scope,obj,console);
            //console.log(obr)
            obr.dectype = dectype;
            obr.type = obj.type;
            return obr;
        }
    }

    isPrimitive(obj) {
        switch(obj.type) {
            case 'NUMBER':
                return true;
            case 'BOOLEAN':
                return true;
            case 'STRING':
                return true;
            case 'NULL':
                return true;
            case 'UNDEFINED':
                return true
            default:
                return false;    
        }
    }
}

module.exports = asignLast;
},{"./TObject.js":23}],28:[function(require,module,exports){
const Operation = require('./Operation.js')
const TObject   = require('./TObject.js') 
class asignLastF {

    constructor(op,exp) {
        this.op = op;
        this.exp = exp;
    }

    run(scope,obj,console) {

        if(this.op == null) {
            return this.exp.run(scope,console);
        }

        if(this.exp != null) {

            //hacer comprobacion de tipos
            //var newObject = new TObject(0,0,obj.value.value,obj.type)
            
            var operation = new Operation(0,0,obj.value,this.exp,this.op);
            //console.log(operation);
            return operation.run(scope,console);

        } else {
            var newObject = new TObject(0,0,"1","NUMBER")
            var operation = new Operation(0,0,obj.value,newObject,this.op);
            return operation.run(scope,console);
        }
    }

    
}

module.exports = asignLastF;
},{"./Operation.js":20,"./TObject.js":23}],29:[function(require,module,exports){
class asignVariable {

    constructor(id,asignLast) {
        this.id = id;
        this.asignLast = asignLast;
    }

    run(scope, console) {

        var objId = scope.findVariable(this.id);
        if(objId != null) {
            
            

            var res = this.asignLast.run(scope,objId,console);
            if(this.id == 'pivot'){
                console.log(objId);
                console.log("&&&&&&&&&&&")
                console.log(res)
            }
            //console.log("/**********Aqui estoy en run()************************/");
            ///console.log("/**********************************/");
         ///console.log("/**********************************/");
         ///console.log(this.id)
         //console.log(res.value)
        //console.log("/**********************************/");
        //console.log("/**********************************/");
        //console.log("/**********************************/");
            scope.changeValueVariable(this.id,res);

        } else {
            console.log("Error 1 en asigVariable.js")
        }
    }

    get(scope,globalScope, console) {

        var objId = scope.findVariable(this.id);
        if(objId != null) {
            //comprobar si res es null
            /*console.log(this.id)
            console.log(objId)
            console.log("%%%%%%%%%%")*/
            var res = this.asignLast.run(globalScope,objId, console);
            //console.log("/**********Aqui estoy en get()************************/");
           // console.log("/**********************************/");
         //console.log("/**********************************/");
         //console.log(this.id)
         //console.log(res)
        //console.log("/**********************************/");
        //console.log("/**********************************/");
        //console.log("/**********************************/");
        
            scope.changeValueVariable(this.id,res);

        } else {
            console.log("Error 2 en asigVariable.js")
        }
    }
}
module.exports = asignVariable;
},{}],30:[function(require,module,exports){
const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
const Scope = require('./Scope.js');
const Variable = require("./Variable");
const defLast = require("./defLast");
const idVarlast = require("./idVarlast");

const asignVariable = require('./asignVariable.js');
const asignLast = require("./asignLast");
const asignLastF = require("./asignLastF");

class callFunction extends Nodo{
    constructor(line, column,id,idList,params) {
        super(line,column,null);
        this.id = id;
        this.idList = idList;
        this.params = params;
        this.stmt = null;
    }

    run(scope,consoleT) {
        
        if(this.id == "console") {
            
            if(this.idList != null) {

                var list = this.idList.run(scope,consoleT);
                if(list.id == "log" && list.aux == null) {
                    if(this.params != null) {
                        //console.log(this.params)
                        if(this.params.length == 1) {
                            let tobj = this.params[0];
                            //console.log("----------------------");
                            let newTObj = tobj.run(scope,consoleT);
                            //console.log(newTObj);
                            //console.log(tobj)
                            if(newTObj.constructor.name == "Map") {
                                
                                if(consoleT) {
                                    consoleT.value += this.getStrObj(newTObj,"") + "\n";
                                }

                                console.log(this.getStrObj(newTObj,""));
                                
                            } else if(newTObj.isArray) {
                                /*console.log("########")
                                console.log(newTObj)
                                console.log("######################")*/
                                if(consoleT) {
                                    consoleT.value += this.getStrArr(newTObj.value) + "\n";
                                }
                                console.log(this.getStrArr(newTObj.value));
                            }else {
                                if(consoleT) {
                                    consoleT.value += newTObj.value.toString() + "\n";
                                }
                                console.log(newTObj.value.toString());
                            }

                        } else {
                            let str = "";
                            for (let i = 0; i < this.params.length; i++) {
                                let tobj = this.params[i];
                                //console.log("----------------------");
                                let newTObj = tobj.run(scope,consoleT);
                                //console.log(newTObj);
                                //console.log(tobj)
                                if(newTObj.constructor.name == "Map") {
                                    
                                    str += this.getStrObj(newTObj,"")+" ";
                                    
                                } else if(newTObj.isArray) {
                                    /*console.log("########")
                                    console.log(newTObj)
                                    console.log("######################")*/
                                    str += this.getStrArr(newTObj.value)+" ";
                                }else {
                                    str += newTObj.value.toString()+" ";
                                }
                                
                            }
                            if(consoleT) {
                                consoleT.value += str + "\n";
                            }
                            console.log(str);

                            /*new Error(this.params.line,
                                this.params.column,
                                "Semantico",
                                "Error la funcion necesita un parametro");
                                console.log("Error 1 en callFunction.js")*/
                        }
                    } else {
                        new Error(this.params.line,
                                this.params.column,
                                "Semantico",
                                "Error la funcion necesita un parametro");
                                console.log("Error 2 en callFunction.js")
                    }

                } else {
                    console.log("No se qe va aqui callFunction.js")
                }

                
            } else {

                return this.runFunction(scope,consoleT);
            }
            
        } else if(this.id == "graficar_ts") {
            if(this.idList == null) {

                var a = scope.grapah_ts();
                console.log(a);

            } else {
                console.log("Error 3 en callFunction.js")
                return new TObject(0,0,"undefined","UNDEFINED");
            }
        } else {
            if(this.idList != null) {
                var arr = scope.findVariable(this.id);
                
                if(arr) {
                    
                    var list = this.idList.get(scope,consoleT);    
                    if(list.length == 1) {
                        
                        if(arr.isArray && list[0].id) {
                            if(list[0].id == 'pop') {
                                console.log("pop")
                                return this.pop(scope,arr.value,consoleT)
                            } else if(list[0].id == 'push') {
                                var isSimple = true;
                                return this.push(scope,arr,isSimple,consoleT)
                            }
                        }

                    } else if(list.length > 1){

                        var lastItem = list.pop();
                        var array = new idVarlast(0,0,this.id,list);
                        array = array.get(scope,list,consoleT);

                        if(array.isArray) {
                            if(lastItem.id == 'pop') {
                                return this.pop(scope,array,consoleT)
                            } else if(lastItem.id == 'push') {
                                var isSimple = false;
                                return this.push(scope,array,isSimple,consoleT)
                            }
                        }
                    }
                        
                   
                }
                
                console.log("Error 4 en callFunction.js")
                var undef = new TObject(0,0,"undefined","UNDEFINED");
                return undef.run(scope,consoleT);
                

            } else {
                return this.runFunction(scope,consoleT);
            }
        }
    }

    push(scope,arr,isSimple,consoleT) {
        //comprobar tipos de matriz
        if(this.params) {
            if(this.params.length == 1) {
                var tobj = this.params[0];
                tobj = tobj.run(scope,consoleT);
                //verificar si el parametro del push es compatible con arr
                if(isSimple) {
                    arr.value.value.push(tobj);
                } else {
                    arr.value.push(tobj);
                }

            } else {
                console.log("Error 5 en callFunction.js")
            }
        } else {
            //ERROR
            console.log("Error 6 en callFunction.js")
        }
        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope,consoleT);
    }

    pop(scope,arr,consoleT) {

        if(arr.value.length > 0) {
            return arr.value.pop();
        }
        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope,consoleT);
    }


    runFunction(scope,consoleT) {
        
        if(scope.checkFunction(this.id)) {

            return this.func(scope,consoleT);

        } else {
            //error
            console.log("Error 7 en callFunction.js")
            /*console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(this.id)
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");*/
            var undef = new TObject(0,0,"undefined","UNDEFINED");
            return undef.run(scope,consoleT);
        }

    }

    func(scope,consoleT) {

        var funcObj = scope.getFunction(this.id);
        //console.log(funcObj)
        this.stmt = funcObj.stmt;
        var functionScope = new Scope(scope);
        
        for (let param of funcObj.param) {
            var asgn = new Variable(0,0,'let',param.id,new defLast(0,0,param.types,new TObject(0,0,"null",'NULL')),null);
            //var asgn = new Variable(0,0,'let',param.id,new defLast(0,0,param.types,new TObject(0,0,"undefined",'UNDEFINED')),null);
            
            asgn.run(functionScope,consoleT);
        }

        /*console.log(this.id)
        console.log(funcObj)
        console.log(this.params)*/
        
        if(this.params == null) {
            if(!funcObj.param.length == 0) {
                console.log("Error 0.8 en callFunction.js")
                console.log("ERROR en la cantidad de parametros")
            }
        } else {
            if(funcObj.param.length == this.params.length) {
                //comprobar tipos
                //console.log(funcObj.param)
                //console.log(this.params)
                for (let param in this.params) {
                    var changeValue = new asignVariable(funcObj.param[param].id,new asignLast(null,new asignLastF(null,this.params[param])));
                    changeValue.get(functionScope,scope,consoleT);
                }
            } else {
                console.log("Error 8 en callFunction.js")
                console.log("ERROR en la cantidad de parametros")
            }
        }

        
        //functionScope.print()
        //console.log("--------------------------------")
        /****DEBUG */

        

        /********* */

        functionScope.prev = scope.getGlobalScope();

        var aux = this.statement(functionScope,consoleT);
        if(aux != null) {
    
            if(aux.type == 'RETURN') {
                return aux.res;
            } 
        }

        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope,consoleT);
    }

    statement(scope,consoleT) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,consoleT);
                //console.log(aux)
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } 
                }
            }     
        }
        return null;
    }

    getStrArr(obj) {
        var str = "["
        var prop = "";
        //console.log(obj)
        obj.forEach((value) => {

            //prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",";
        });
        prop = prop.substring(0,prop.length-1)
        str += prop;
        str += "]"
        return str;
    }

    getStrObj(obj,tab) {
        var str = tab+"{\n"
        var prop = "";
        obj.forEach((value,key) => {

            prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",\n";
        });
        prop = prop.substring(0,prop.length-2)
        str += prop;
        str += "\n"
        str += tab +"}"
        return str;
    }
}

module.exports = callFunction;
},{"./Nodo.js":18,"./Scope.js":21,"./TObject.js":23,"./Variable":25,"./asignLast":27,"./asignLastF":28,"./asignVariable.js":29,"./defLast":32,"./idVarlast":37}],31:[function(require,module,exports){
class decType {

    constructor(id,obj) {
        this.id = id;
        this.obj = obj;
    }

    run(scope,console) {
        //comprobar si el type ya existe
        //comprobar si las propiedades del type no estan repetidas
        
        scope.insertType(this.id,null);

        var ob = this.obj.run(scope,console)

        scope.insertType(this.id,ob);
    }

}

module.exports = decType;
},{}],32:[function(require,module,exports){
const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
class defLast extends Nodo{

    constructor(line,column,type,exp) {
        super(line,column,null);
        this.type = type;
        this.exp = exp;
    }

    run(scope,decType,console) {
        /*falta validar que si no tiene :type la variable
          no se puede asignar un objeto
        */
        let e = null;
        let type = "NULL";
        let isArray = false;
        let dimention = 0;
    
        if(this.exp) {
            e = this.exp.run(scope,console);
            if(e){
               /* console.log("---------------")
                console.log(this.exp)
                console.log("---------------")*/
                type = e.type;
                isArray = e.isArray;
                dimention = e.dimentions;
            } else {
                e = new TObject(0,0,"null","NULL")
                type = "NULL"
                isArray = false;
                dimention = 0;
            }
        }

        if(this.type != null) {
            
            let tType = this.type.run(scope,console);
            //comprobar si exp == tType

            if(e.type != 'NULL') {

                if(e.isArray) {

                    //***Comprobar si todos los elementos del arreglo son iguales
                    //**Comprobar si los dos son arreglos de la misma dimencion */
                    
                    return {value:e,type:e.type,isArray:e.isArray,dim:tType.dim,dectype:decType}

                    
                } else if(e.type == "OBJ") {
                    
                    //1.0**evaluar que las propiedades del TYPE 
                    //1.1-**sean igual al TYPE en TS
                    //coprobar los valores de las propiedades
                    
                    return {value:e.value,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}

                }else {

                    if(e.type == tType.type) {
                        return {value:e,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}
                    } else {
                        console.log("Error 1 en defLast.js")
                        console.log("tipos incompatibles")
                        
                        return null;
                    }

                }

            }

            return {value:e,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}
 
        } 

        return {value:e,type:type,isArray:isArray,dim:dimention,dectype:decType}
        
    }
}

module.exports = defLast;
},{"./Nodo.js":18,"./TObject.js":23}],33:[function(require,module,exports){
class defVarLast {
    
    constructor(defVarLastP) {
        this.defVarLastP = defVarLastP;
    }

    run(scope,decType) {
        return this.defVarLastP.run(scope,decType,console);
    }

}

module.exports = defVarLast;
},{}],34:[function(require,module,exports){
const Variable = require('./Variable.js');
class defVarLastP {

    constructor(line,column,list,id,deflast) {
        this.line = line;
        this.column = column;
        this.list = list;
        this.id = id;
        this.deflast = deflast;        
    }

    run(scope,decType,console) {


        if(this.list != null) {

            var l = this.list.run(scope,decType,console);
            var aux = new Variable(this.line,this.column,decType,this.id,this.deflast,null);
            l.push(aux);
            return l;
        } else {
            var aux = new Variable(this.line,this.column,decType,this.id,this.deflast,null);

            return [aux];
        }
    }
}

module.exports = defVarLastP;
},{"./Variable.js":25}],35:[function(require,module,exports){
const Scope = require('./Scope.js') 
class doWhile {

    constructor(cond,stmt) {
        this.cond = cond;
        this.stmt = stmt;
    }

    run(scope,console) {
        
        var auxCond = this.cond.run(scope,console);
        if(auxCond.type == 'BOOLEAN') {

            auxCond = Boolean(auxCond.value);
            var actualScope = new Scope(scope);

            do {

                var newScope = new Scope(actualScope);
                var r = this.statement(newScope,console)

                if(r != null && r != undefined) {
                    if(r.type == 'RETURN') {
                        return r;
                    } else if(r.type == 'BREAK') {
                        //return r;
                        break;
                    }
                }

                auxCond = this.cond.run(scope,console);
                auxCond = Boolean(auxCond.value);

            } while(auxCond);

        } else {
            //ERROR
            console.log("Error 1 en doWhile.js")
        }

    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }
}

module.exports = doWhile;
},{"./Scope.js":21}],36:[function(require,module,exports){
class idList {

    constructor(isArray,expOrID,auxp) {
        this.isArray = isArray;
        this.expOrID = expOrID;
        this.auxp = auxp;
    }
    //para funciones
    run(scope,console) {

        var aux = null;

        if(this.auxp != null) {
            aux = this.auxp.run(scope,console);
        }

        if(this.isArray) {

            let exp = this.expOrID.run(scope,console);
            

        } else {

            return {id:this.expOrID,auxP:aux}
            
        }
    }

    get(scope,console) {
        if(this.isArray) {

            let exp = this.expOrID.run(scope,console);
            
            if(exp.type != "NULL") {
                
                var aux = null;

                if(this.auxp != null) {
                    aux = this.auxp.get(scope,console);
                    let r = [];
                    r.push({isArray:true,exp:exp,id:null });
                    aux.forEach(element => {
                        r.push(element);
                    });
                    return r;
                }
                return [{isArray:true,exp:exp,id:null }]

            } else {
                //ERROR
                console.log("Error 1 en idList.js")
            }
            
        } else {
            var aux = null;
            if(this.auxp != null) {
                aux = this.auxp.get(scope,console);
                let r = [];
                r.push({isArray:false,exp:null,id:this.expOrID });
                aux.forEach(element => {
                    r.push(element);
                });
                return r;
            }
            return [{isArray:false,exp:null,id:this.expOrID }]
        }
    }
}   

module.exports = idList;
},{}],37:[function(require,module,exports){
const TObject = require('./TObject.js');
class idVarlast {

    constructor(line,column,id,varlast) {
        this.id = id;
        this.varlast = varlast;
    }

    get(scope,l,console) {
        if(scope.findVariable(this.id) != null) {

            let vl = l;
            let objId = scope.findVariable(this.id);

            var vobj = objId.value;
            vl.forEach(element => {
                
                if(element.isArray) {
                    if(vobj.isArray) {

                        var arrP = Number(element.exp.value);
                        var objResult = vobj.value;

                        if(arrP < objResult.length) {
                            vobj = objResult[arrP]
                        } else {
                            //ERRROR
                            console.log("Error 1 en idVarlast.js")
                        }
                    } else {
                        //error
                        console.log("Error 2 en idVarlast.js")
                        return;
                    }
                } else {
                    if(vobj.constructor.name == "Map") {

                        if(vobj.has(element.id)) {
                            //console.log("CORRECTO")
                            vobj = vobj.get(element.id)
                        } else {
                            //Error
                            console.log("Error 3 en idVarlast.js")
                        }

                    } else {
                        //error
                        console.log("Error 4 en idVarlast.js")
                        return;
                    }
                }
            });
            return vobj;
            //console.log(objId)

        } else {
            /***#########ERROR###############*/
            console.log("Error 5 en idVarlast.js")
            return new TObject(0,0,'undefined',"UNDEFINED");
        }
    }

    run(scope,console) {

        if(scope.findVariable(this.id) != null) {

            let vl = this.varlast.get(scope,console);
            /*console.log("VARLAST")
            console.log(vl);
            console.log("Fin VarLAST")*/
            let objId = scope.findVariable(this.id);

            

            var vobj = objId.value;

            if(objId instanceof Map) {
                vobj = objId
            }

            /*
            console.log("||||||||  Aqui estoy al inicio de idVarlast      ||||||||||")
            console.log(vobj)
            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
            */
            for(let i=0;i<vl.length;i++){
           // vl.every((element,index) => {
                var element = vl[i];
                if(i+1 == vl.length) {
                    
                    if(element.id == 'length' && vobj.isArray) {
                        var r = vobj.value.length;
                        
                        var length = new TObject(0,0,r,"NUMBER");
                        return length.run(scope,console);
                        
                    }
                }

                

                if(element.isArray) {
                    if(vobj.isArray) {

                        var arrP = Number(element.exp.value);
                        var objResult = vobj.value;
                        //console.log(arrP);
                        //console.log(objResult.length)
                        if(arrP < objResult.length) {
                            //console.log("QUE ENTRO")
                            vobj = objResult[arrP]
                            if(!vobj) {
                                vobj = new TObject(0,0,"undefined","UNDEFINED");
                            }

                        } else {
                            //ERRROR
                            console.log("Error 6 en idVarlast.js")
                        }
                    } else {
                        //error
                        console.log("Error 7 en idVarlast.js")
                        return;
                    }
                } else {

                   
                    if(vobj instanceof Map) {

                        if(vobj.has(element.id)) {
                            //console.log("CORRECTO")
                            vobj = vobj.get(element.id)
                        } else {
                            //Error
                            console.log("Error 8 en idVarlast.js")
                        }

                    } else {
                        //error
                        console.log("Error 9 en idVarlast.js")
                        /*console.log(objId)
                        console.log(vl)
                        console.log(element)
                        console.log("????????????????????????")
                        console.log(vobj)*/
                        return new TObject(0,0,'null',"NULL");;
                    }
                }
            }/*);*/
            /*console.log("aqui retorna el objeto");
            console.log(vobj)*/
            return vobj;
            //console.log(objId)

        } else {
            /***#########ERROR###############*/
            console.log("Error 10 en idVarlast.js")
            return new TObject(0,0,'undefined',"UNDEFINED");
        }
    }
}
module.exports = idVarlast;
},{"./TObject.js":23}],38:[function(require,module,exports){
class objList {

    constructor(list,key) {
        this.list = list;
        this.key = key;
    }

    run(scope,console) {

        if(this.list != null) {

            var e = this.key.run(scope,console);
            var l = this.list.run(scope,console);

            e.forEach((value, key) => l.set(key, value));

            return l;

        }

        return this.key.run(scope,console);
    }
}
module.exports = objList;
},{}],39:[function(require,module,exports){
class objProperty {

    constructor(id,exp) {
        this.id = id;
        this.exp = exp;
    }

    run(scope,console) {

        var e = this.exp.run(scope,console);
        var obj = new Map();
        obj.set(this.id,e);
        return obj;
    }
}

module.exports = objProperty;
},{}],40:[function(require,module,exports){
class objType {

    constructor(list,keyvalue) {
        this.list = list;
        this.keyvalue = keyvalue;
    }

    run(scope,console) {

        if(this.list != null) {

            var l = this.list.run(scope,console);
            var kv = this.keyvalue.run(scope,console);

            l.push(kv[0]);
            return l;
        }

        return this.keyvalue.run(scope,console);
    }
}

module.exports = objType;
},{}],41:[function(require,module,exports){
class ternaryOp {

    constructor(cond,texp,fexp) {
        this.cond = cond;
        this.texp = texp;
        this.fexp = fexp;
    }

    run(scope,console) {
        //comproba el tipo
        var c = this.cond.run(scope,console);
        if(c.type == 'BOOLEAN') {
            
            var boolCond = Boolean(c.value);
            if(boolCond) {
                return this.texp.run(scope,console);
            } else {
                return this.fexp.run(scope,console);
            }

        } else {
            //ERROR
            console.log("Error en ternaryOp.js")
        }

    }
}

module.exports = ternaryOp;
},{}],42:[function(require,module,exports){
class typeKeyValue {

    constructor(id,type) {
        this.id = id;
        this.type = type;
    }

    run(scope,console) {

        var t = this.type.run(scope,console);
        
        if(t == null) {
            //error
            console.log("Error en typeKeyValue.js")
        }

        return [{id:this.id,type:t.type}]

    }
}

module.exports = typeKeyValue;
},{}],43:[function(require,module,exports){
const Nodo = require('./Nodo.js');
class typeList extends Nodo{

    constructor(line,column,list) {
        super(line,column,null)
        this.list = list;
        this.contador = 1;
    }

    run(scope,console) {

        if(this.list != null) {
            return this.list.run(scope,console) + this.contador;
        }

        return this.contador;
    }
}

module.exports = typeList;
},{"./Nodo.js":18}],44:[function(require,module,exports){
const parser = require('./ejecucion.js');
const Scope = require('./ejecucion/Scope.js');
const fs = require('fs');
//const chalk = require('chalk');

$(document).ready(function(){
	//code here...
	var code = $(".codemirror-textarea")[0];
	var editor = CodeMirror.fromTextArea(code, {
        lineNumbers : true,
        mode: 'javascript'
    });
    var consoleT = document.getElementsByClassName('console')[0];
    
    document.getElementById("ejecutar").onclick = function() {
        let entrada = editor.getValue();
        consoleT.value = "";
        ejecutar(entrada,consoleT);
    }
});

function ejecutar(entrada,consoleT) {

    //console.log(console);
    

let ast = parser.parse(entrada.toString());

let scope = new Scope(null);

ast.forEach(element => {
    if(element.constructor.name == "decType") {
        element.run(scope,consoleT);
    }
})

ast.forEach(element => {
    if(element.constructor.name == "Variable" ||element.constructor.name == "asignVariable" ) {
        element.run(scope,consoleT);
    }
})

ast.forEach(element => {
    if(element.constructor.name == "Function") {
        element.run(scope,consoleT);
    }
})

ast.forEach(element => {
    if(check(element))
        element.run(scope,consoleT)
});

}

function check(element) {
    if(element.constructor.name == "Function") {
        return false;
    } else if(element.constructor.name == "Variable" ||element.constructor.name == "asignVariable" ) {
        return false;
    } else if(element.constructor.name == "decType") {
        return false;
    } else {
        return true;
    }
}

},{"./ejecucion.js":4,"./ejecucion/Scope.js":21,"fs":1}]},{},[44]);
