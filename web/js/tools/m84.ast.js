/*
 * Mach-84: The Virtual Machinery Playpen
 * Inspired by the Vintage Computer Club
 *
 * Copyright (c) 2014 blackchip.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var m84 = m84 || {};
m84.ast = m84.ast || (function() {

    var self = {};

    var find_undefined = function(ast, symbols) {
        var symbols = [];
        var _eval = function(node) {
            if ( node.symbol ) {
                if ( !symbols.has(node.symbol) ) {
                    symbols.push(node.symbol);
                }
            } else {
                if ( node.val && node.val.length ) {
                    _.each(node.val, function(val) {
                        _eval(val, symbols);
                    });
                }
            }
        };
        _eval(ast);
        return symbols;
    };

    self.evaluate = function(ast, symbols) {
        var missing = find_undefined(ast, symbols);
        if ( missing.length > 0 ) {
            return { ast: ast, symbols: missing };
        }
        var _eval = function(node) {
            if ( node.symbol ) {
                return symbols.find(node.symbol);
            }
            if ( !node.op ) {
                return node;
            }
            v = node.val;
            switch ( node.op ) {
                case "+": return _eval(v[0]) + _eval(v[1]);
                case "-": return _eval(v[0]) - _eval(v[1]);
                case "*": return _eval(v[0]) * _eval(v[1]);
                case "/": return _eval(v[0]) / _eval(v[1]);
                case "&": return _eval(v[0]) & _eval(v[1]);
                case "|": return _eval(v[0]) | _eval(v[1]);
                case "^": return _eval(v[0]) ^ _eval(v[1]);
                case "floor": return Math.floor(_eval(v));
                case "negate": return -_eval(v);
            }
        };
        return _eval(ast);
    };

    return self;

 })();
