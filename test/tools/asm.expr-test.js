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

buster.testCase("asm.expr", (function() {

    var self = {};
    var a;

    self.setUp = function() {
        a = m84.asm().parse;
    };

    self["Add"] = function() {
        var result = a("lda 12 + 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "+");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Subtract"] = function() {
        var result = a("lda 12 - 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "-");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Multiply"] = function() {
        var result = a("lda 12 * 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "*");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Divide"] = function() {
        var result = a("lda 12 / 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "floor");
        arg = arg.val;
        buster.assert.equals(arg.op, "/");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["and"] = function() {
        var result = a("lda 12 & 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "&");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["or"] = function() {
        var result = a("lda 12 | 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "|");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["xor"] = function() {
        var result = a("lda 12 ^ 34");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "^");
        buster.assert.equals(arg.val[0], 12);
        buster.assert.equals(arg.val[1], 34);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Binary integer"] = function() {
        var result = a("lda #%101010");
        buster.assert.equals(result.ast[0].arg, parseInt("101010", 2));
    };

    self["Hexadecimal integer"] = function() {
        var result = a("lda #$abcd");
        buster.assert.equals(result.ast[0].arg, parseInt("abcd", 16));
    };

    self["Implicit precedence"] = function() {
        var result = a("lda #4 - 2 * 3");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "-");
        buster.assert.equals(arg.val[0], 4);
        arg = arg.val[1];
        buster.assert.equals(arg.op, "*");
        buster.assert.equals(arg.val[0], 2);
        buster.assert.equals(arg.val[1], 3);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Explicit precedence"] = function() {
        var result = a("lda #[4 - 2] * 3");
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.op, "*");
        buster.assert.equals(arg.val[1], 3);
        arg = arg.val[0];
        buster.assert.equals(arg.op, "-");
        buster.assert.equals(arg.val[0], 4);
        buster.assert.equals(arg.val[1], 2);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Symbol"] = function() {
        var result = a("jsr k.primm");
        console.log(result);
        var arg = result.ast[0].arg;
        buster.assert.equals(arg.symbol, "k.primm");
        buster.assert.equals(result.errors.length, 0);
    };

    return self;

})());
