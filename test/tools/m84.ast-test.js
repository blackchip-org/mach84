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

    self["And"] = function() {
        ast = { op: "&", val: [0x0f, 0xf0] };
        buster.assert.equals(0x00, m84.ast.evaluate(ast));
    };

    self["Or"] = function() {
        ast = { op: "|", val: [0x0f, 0xf0] };
        buster.assert.equals(0xff, m84.ast.evaluate(ast));
    };

    self["Exclusive or"] = function() {
        ast = { op: "^", val: [0xff, 0xff] };
        buster.assert.equals(0x00, m84.ast.evaluate(ast));
    };

    self["Floor"] = function() {
        ast = { op: "floor", val: 1.3 };
        buster.assert.equals(1, m84.ast.evaluate(ast));
    };

    self["Negate"] = function() {
        ast = { op: "negate", val: 2 };
        buster.assert.equals(-2, m84.ast.evaluate(ast));
    };
    
    self["Precedence"] = function() {
        ast = { op: "*", val: [2, { op: "-", val: [3, 1] }] };
        buster.assert.equals(4, m84.ast.evaluate(ast));
    };

    /* FIXME: This will change
    self["Symbol lookup"] = function() {
        ast = { op: "+", val: [4, {symbol: "two"}] };
        buster.assert.equals(6, m84.ast.evaluate(ast, symbols));
    };

    self["Undefined symbols"] = function() {
        ast = { op: "+", val: [{symbol: "foo"}, {symbol: "bar"}] };
        var result = m84.ast.evaluate(ast, symbols);
        buster.assert.equals("foo", result.references[0].symbol)
        buster.assert.equals("bar", result.references[1].symbol);
    };
    */

    return self;

})());
