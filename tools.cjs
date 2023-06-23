(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./dist/ansi.cjs", "./dist/grid.cjs", "@ansi-art/color/color.cjs", "@ansi-art/char-subgrid/grid.cjs"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./dist/ansi.cjs"), require("./dist/grid.cjs"), require("@ansi-art/color/color.cjs"), require("@ansi-art/char-subgrid/grid.cjs"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ansi, global.grid, global.color, global.grid);
    global.tools = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _ansi, _grid, _color, _grid2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Ansi", {
    enumerable: true,
    get: function () {
      return _ansi.Ansi;
    }
  });
  Object.defineProperty(_exports, "Blocks", {
    enumerable: true,
    get: function () {
      return _grid2.Blocks;
    }
  });
  Object.defineProperty(_exports, "Braille", {
    enumerable: true,
    get: function () {
      return _grid2.Braille;
    }
  });
  Object.defineProperty(_exports, "Color", {
    enumerable: true,
    get: function () {
      return _color.Color;
    }
  });
  Object.defineProperty(_exports, "Grid", {
    enumerable: true,
    get: function () {
      return _grid.Grid;
    }
  });
  Object.defineProperty(_exports, "Slants", {
    enumerable: true,
    get: function () {
      return _grid2.Slants;
    }
  });
});

