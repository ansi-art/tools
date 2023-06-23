(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "maplex/maplex.cjs", "@ansi-art/color/color.cjs"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("maplex/maplex.cjs"), require("@ansi-art/color/color.cjs"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.maplex, global.color);
    global.ansi = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _maplex, _color) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Ansi = void 0;
  var AsciiArt = {};
  var parentArt;
  _maplex.Maplex.Iterable.defaultValue = ' ';
  const maplex = new _maplex.Maplex();
  maplex.convert = function (value) {
    return AsciiArt.Ansi.toArray(value);
  };
  const styleplex = new _maplex.Maplex();
  styleplex.convert = function (value) {
    return AsciiArt.Ansi.toObjectArray(value, true);
  };
  /**
   * This provides an abstraction for doing work in an ansi context
   * @module @ansi-art/tools/src/ansi
   */

  /**
   * The default constructor for Ansi
   * @class Ansi
   * @classdesc This provides an abstraction for doing work in an ansi context
   */
  const Ansi = function (options = {}) {
    if (!options.bitDepth) options.bitDepth = '4bit';
    let palette = new _color.Palette({
      medium: new _color.Medium(options.medium || 'vga'),
      space: new _color.Space(options.bitDepth),
      distance: options.distance || ((r1, g1, b1, r2, g2, b2) => {
        return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(Math.max(r1, g1, b1) - Math.max(r2, g2, b2)) / 2) / 3 + Math.abs(Math.max(r1, g1, b1) - Math.max(r2, g2, b2)) / 2;
      })
    });
    const obValue = {
      /**
       * provide the length of an ansi string (not including control codes)
       * @function length
       * @param {string} value
       * @returns {integer} ansiColorCode
       */
      length: function (value) {
        var count = 0;
        obValue.map(value, function () {
          count++;
        });
        return count;
      },
      /**
       * render an internal code into a code wrapped with the appropriate escape sequence
       * @function codeRender
       * @param {array} codes
       * @returns {array} escapedCodes
       */
      codeRender: function (codes) {
        if (codes === undefined) return '';
        var result = codes.map(function (code, index) {
          return '\u001B[' + code + 'm';
        }).join('');
        return result;
      },
      /**
       * code to clear all active ansi codes 
       * @function clear
       * @returns {integer} ansiColorCode
       */
      clear: function () {
        return obValue.codeRender(['0']);
      },
      /**
       * take a substring of an ansi string relative to its stripped positions
       * @function substring
       * @param {string} value
       * @param {integer} start
       * @param {integer} stop
       * @returns {string} ansiSubstring
       */
      substring: function (value, start, stop) {
        var previousCharPos;
        var result;
        var lowerbound = 0;
        var upperbound;
        if (stop === null) upperbound = value.length;
        var isDone = false;
        obValue.map(value, function (chr, codes, rowcol, pos, done, charPos) {
          if (start && pos === start) {
            lowerbound = previousCharPos + 1;
            if (stop === null) done();
          }
          if (stop && pos === stop) {
            upperbound = charPos;
            if (stop === null) done();
          }
          previousCharPos = charPos;
        });
        return value.substring(lowerbound, upperbound);
      },
      /**
       * truncate past a fixed size
       * @function trimTo
       * @param {string} value
       * @param {integer} length
       * @returns {string} trimmedValue
       */
      trimTo: function (value, length) {
        var result = AsciiArt.Ansi.substring(value, 0, length);
        return result;
      },
      /**
       * split sting into an array of elements, with or without styles
       * @function toArray
       * @param {string} value
       * @returns {array} charAndStyleArray
       */
      toArray: function (value, includeStyles) {
        var results = [];
        obValue.map(value, function (chr, styles) {
          var res = includeStyles ? styles.map(function (style) {
            return '' + style + 'm';
          }).join('') + chr : chr;
          results.push(res);
          return res;
        });
        return results;
      },
      /**
       * return an array of characters with injected style information
       * @function toObjectArray
       * @param {string} value
       * @param {boolean} includeStyles
       * @returns {array} charArray
       */
      toObjectArray: function (value, includeStyles) {
        var results = [];
        results = obValue.map(value, function (chr, styles) {
          chr.styles = styles;
          return chr;
        });
        return results;
      },
      /**
       * remove all ansi code from the string
       * @function strip
       * @param {string} value
       * @returns {array} asciiString
       */
      strip: function (value) {
        return obValue.map(value, function (chr) {
          return chr;
        });
      },
      /**
       * get a character, relative to the stripped string positions
       * @function charAt
       * @param {string} value
       * @param {integer} index
       * @param {boolean} includePrefix
       * @returns {array} charAndStyleArray
       */
      charAt: function (str, index, includePrefix) {
        var result;
        var previousCharPos;
        obValue.map(str, function (chr, codes, rowcol, pos, done) {
          if (index == pos) {
            if (includePrefix && previousCharPos !== undefined) {
              var prefix = str.substring(previousCharPos, pos - 1);
              result = prefix + chr;
            } else result = chr;
            return done();
          }
          previousCharPos = pos;
        });
        return result;
      },
      /**
       * intersect many strings using styles
       * @function interstyle
       * @param {...string} value
       * @param {function} [callback]
       * @returns {Promise | null} charAndStyleArray
       */
      interstyle: function () {
        var cb;
        var result;
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[args.length - 1] === 'function') {
          cb = args.pop();
        } else {
          //promise support
          var doResolve;
          var doError;
          result = new Promise(function (resolve, reject) {
            doResolve = resolve;
            doError = reject;
          });
          cb = function () {
            var args = Array.prototype.slice.call(arguments);
            var err = args.shift();
            if (err) return doError(err);
            doResolve.apply(doResolve, args);
          };
        }
        args.push(function () {
          var args = Array.prototype.slice.call(arguments);
          var cb;
          if (typeof args[args.length - 1] === 'function') cb = args.pop();
          var result = args.reduce(function (agg, item, index) {
            return agg && obValue.strip(agg).trim() ? agg : item + (item.style ? AsciiArt.Ansi.codeRender(item.style) : '');
          }, undefined);
          return result;
        });
        args.push(function (mapped) {
          cb(undefined, mapped.join(''));
        });
        styleplex.map.apply(styleplex, args);
        return result;
      },
      /**
       * intersect many strings without styles
       * @function intersect
       * @param {...string} value
       * @param {function} [callback]
       * @returns {Promise | null} charAndStyleArray
       */
      intersect: function () {
        var cb;
        var result;
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[args.length - 1] === 'function') {
          cb = args.pop();
        } else {
          //promise support
          var doResolve;
          var doError;
          result = new Promise(function (resolve, reject) {
            doResolve = resolve;
            doError = reject;
          });
          cb = function () {
            var args = Array.prototype.slice.call(arguments);
            var err = args.shift();
            if (err) return doError(err);
            doResolve.apply(doResolve, args);
          };
        }
        args.push(function () {
          var result = Array.prototype.slice.call(arguments).reduce(function (agg, item) {
            return agg === ' ' ? item : agg || item;
          }, undefined);
          return result;
        });
        args.push(function (mapped) {
          cb(undefined, mapped.join(''));
        });
        maplex.map.apply(maplex, args);
        return result;
      },
      /**
       * map through a string one character at a time with style information attached
       * @function map
       * @param {string} value
       * @param {function} handler
       * @param {boolean} includeLineEndings
       * @returns {array} mappedValuesArray
       */
      map: function (value, handler, includeLineEndings) {
        if (value === null) throw new Error('cannot map undefined!');
        var lcv = 0;
        var result = '';
        var inEscape = false;
        var lines = value.split("\n");
        var shortcircuit = false;
        var fullPos = 0;
        for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
          if (shortcircuit) continue;
          var line = lines[lineNumber];
          var pos = 0;
          var offset = lcv;
          var newLine = '';
          var code;
          var codes = [];
          for (; lcv - offset < line.length; lcv++) {
            if (shortcircuit) continue;
            if (inEscape) {
              if (line[lcv - offset] == 'm') {
                inEscape = false;
                codes = normalizeStyle([code], codes);
              }
              code += line[lcv - offset];
            } else {
              if (line[lcv - offset] == '\u001B' && line[lcv - offset + 1] == '[') {
                inEscape = true;
                code = '';
                lcv++;
                continue;
              }
              var value = handler(line[lcv - offset], codes.slice(), [lineNumber, pos], fullPos, function () {
                shortcircuit = true;
              }, lcv);
              fullPos++;
              pos++;
              if (value != undefined) {
                newLine += value;
              }
            }
          }
          if (includeLineEndings) newLine += handler("\n", [], [lineNumber, pos], fullPos, function () {
            shortcircuit = true;
          }, line.length);
          lines[lineNumber] = newLine;
        }
        return lines.join("\n");
      }
    };
    const codes = Object.assign({}, palette.space.namedColorIndices, controlIndices);
    obValue.stylesToCodes = styles => {
      if (typeof styles === 'string') return obValue.stylesToCodes(styles.split('+'));
      return styles.map(style => {
        return codes[style] || 'ERROR(' + style + ')';
      });
    };
    obValue.Codes = function (str, color, forceOff) {
      if (!color) return str;
      var color_attrs = color.split("+");
      var ansi_str = "";
      for (var i = 0, attr; attr = color_attrs[i]; i++) {
        if (false && palette.standardColorNames.indexOf(attr) != -1) {
          ansi_str += palette.named(attr);
        } else {
          if (codes[attr]) {
            //todo: deprecate and have color package handle
            ansi_str += codes[attr];
          } else {
            if (attr[0] === '#') {
              ansi_str += palette.code(attr);
            } else {}
          }
        }
      }
      ansi_str += str;
      if (forceOff) ansi_str += codes["off"];
      return ansi_str;
    };

    //will probably migrate to .codes()
    obValue.codes = obValue.Codes;
    return obValue;
  };

  // const staticAnsi = new AsciiArt.Ansi(new AnsiColors());
  /* Object.keys(staticAnsi).forEach((key)=>{
      console.log('key', key)
      if(typeof staticAnsi[key] === 'function'){
          AsciiArt.Ansi[key] = function(){
              return staticAnsi[key].apply(staticAnsi, arguments);
          };
      }
  });*/
  _exports.Ansi = Ansi;
  Ansi.len = function () {
    return staticAnsi.length.apply(staticAnsi, arguments);
  };
  Ansi.setInstance = function (art) {
    parentArt = art;
  };
  var normalizeStyle = function (newStyles, oldStyles) {
    //todo: WTF is this value???
    if (newStyles[0] === 'undefinedundefinedundefinedundefinedundefinedundefinedundefinedundefined') {
      return oldStyles;
    }
    if (!newStyles[0]) return oldStyles;
    newStyles.forEach(function (style) {
      Object.keys(is.it).forEach(function (type) {
        if (is.it[type](style)) {
          //we need to remove other styles of this type from oldStyles
          oldStyles.slice().reverse().forEach(function (style, index) {
            //backwards on a copy, because... slice
            if (is.it[type](style)) {
              oldStyles.splice(oldStyles.length - index - 1, 1); //delete it
            }
          });
        }
      });
    });

    return oldStyles.concat(newStyles);
  };
  var is = {
    it: {
      /**
       * determine whether the provided style is a foreground color
       * @function foregroundColor
       * @param {string} style
       * @returns {boolean} itIsForegroundColor
       */
      foregroundColor: function (style) {
        return style.startsWith('38;5;') ||
        //256 color
        style.startsWith('38;2;') ||
        //millions

        style.startsWith('3') && Number.isInteger(parseInt(style[1])) ||
        //16 color

        style.startsWith('9') && Number.isInteger(parseInt(style[1])); //16 color, bright
      },

      /**
       * determine whether the provided style is a background color
       * @function backgroundColor
       * @param {string} style
       * @returns {boolean} itIsBackgroundColor
       */
      backgroundColor: function (style) {
        return style.startsWith('48;5;') ||
        //256 color
        style.startsWith('48;2;') ||
        //millions

        style.startsWith('4') && Number.isInteger(parseInt(style[1])) ||
        //16 color

        style.startsWith('10') && Number.isInteger(parseInt(style[2])); //16 color, bright
        style.startsWith('4') ||
        //16 color
        style.startsWith('10'); //16 color, bright
      }
    }
  };

  const controlIndices = {
    "off": '0',
    "clear": '0',
    "reset": '0',
    "bold": '1',
    "italic": '3',
    "underline": '4',
    "blink": '5',
    "strobe": '6',
    "strikethru": '9',
    "framed": '51',
    "encircled": '52',
    "overline": '53',
    "unframed": '54',
    "double-underline": '21',
    "inverse": '7',
    "hidden": '8',
    "default-font": '10',
    "font-0": '10',
    "font-1": '11',
    "font-2": '12',
    "font-3": '13',
    "font-4": '14',
    "font-5": '15',
    "font-6": '16',
    "font-7": '17',
    "font-8": '18',
    "font-9": '19',
    "font-gothic": '20',
    "font-fraktur": '20',
    "reset-font": '10',
    "reset-intensity": '22',
    "reset-italic": '23',
    "reset-blackletter": '23',
    "reset-inverse": '27',
    "reset-underline": '24',
    "reset-blinking": '25',
    "reset-hidden": '28'
  };
  Ansi.is = is;
});