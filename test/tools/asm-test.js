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

buster.testCase("asm", (function() {

    var self = {};
    var a;

    self.setUp = function() {
        a = m84.asm().parse;
    };

    self["Label"] = function() {
        var result = a("foo:");
        var i = result.ast[0];
        buster.assert.equals(i.label, "foo");
    };

    self["Label with instruction"] = function() {
        var result = a("foo: lda #12");
        var i = result.ast[0];
        buster.assert.equals(i.label, "foo");
    };

    self["Exported label"] = function() {
        var result = a(".export foo: lda #12");
        buster.assert(result.exports.foo);
    };

    self["Empty"] = function() {
        var result = a("");
        buster.assert.equals(result.ast.length, 0);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Empty with new lines"] = function() {
        var result = a("\n\n\n\n\n");
        buster.assert.equals(result.ast.length, 0);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Line numbers"] = function() {
        var result = a("nop \n\n nop \n\n nop");
        buster.assert.equals(result.ast.length, 3);
        buster.assert.equals(result.ast[0].line, 1);
        buster.assert.equals(result.ast[1].line, 3);
        buster.assert.equals(result.ast[2].line, 5);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Line numbers, end with blank line"] = function() {
        var result = a("nop \n\n nop \n");
        buster.assert.equals(result.ast.length, 2);
        buster.assert.equals(result.ast[0].line, 1);
        buster.assert.equals(result.ast[1].line, 3);
        buster.assert.equals(result.errors.length, 0);
    };

    return self;

})());
