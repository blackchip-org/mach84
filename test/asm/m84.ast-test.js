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
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/* jshint sub: true */

buster.testCase("m84.ast", (function() {

    var self = {};
    var symbols;

    self.setUp = function() {
        symbols = m84.symbols();
        symbols.define("two", 2);
    };

    self["Add"] = function() {
        ast = { op: "+", val: [6, 2] };
        buster.assert.equals(8, m84.ast.evaluate(ast));
    };

    self["Subtract"] = function() {
        ast = { op: "-", val: [6, 2] };
        buster.assert.equals(4, m84.ast.evaluate(ast));
    };

    self["Multiply"] = function() {
        ast = { op: "*", val: [6, 2] };
        buster.assert.equals(12, m84.ast.evaluate(ast));
    };

    self["Divide"] = function() {
        ast = { op: "/", val: [6, 2] };
        buster.assert.equals(3, m84.ast.evaluate(ast));
    };

    self["Precedence"] = function() {
        ast = { op: "*", val: [2, { op: "-", val: [3, 1] }] };
        buster.assert.equals(4, m84.ast.evaluate(ast));
    };

    self["Symbol lookup"] = function() {
        ast = { op: "+", val: [4, {symbol: "two"}] };
        buster.assert.equals(6, m84.ast.evaluate(ast, symbols));
    };

    self["Undefined symbol"] = function() {
        ast = { op: "+", val: [4, {symbol: "null"}] };
        buster.assert.exception(function() {
            m84.ast.evaluate(ast, symbols);
        });
    };

    return self;

})());
