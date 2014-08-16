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

 buster.testCase("asm.mode", (function() {

    var self = {};
    var a;

    self.setUp = function() {
        a = m84.asm().parse;
    };

    self["abs"] = function() {
        var result = a("adc 1234");
        var i = result.ast[0];
        buster.assert.equals(i.op, "adc");
        buster.assert.equals(i.mode, "abs");
        buster.assert.equals(i.arg, 1234);
        buster.assert.equals(result.errors.length, 0);
    };

    self["abx"] = function() {
        var result = a("adc 1234, x");
        var i = result.ast[0];
        buster.assert.equals(i.op, "adc");
        buster.assert.equals(i.mode, "abx");
        buster.assert.equals(i.arg, 1234);
        buster.assert.equals(result.errors.length, 0);
    };

    self["aby"] = function() {
        var result = a("adc 1234, y");
        var i = result.ast[0];
        buster.assert.equals(i.op, "adc");
        buster.assert.equals(i.mode, "aby");
        buster.assert.equals(i.arg, 1234);
        buster.assert.equals(result.errors.length, 0);
    };

    self["acc"] = function() {
        var result = a("asl a");
        var i = result.ast[0];
        buster.assert.equals(i.op, "asl");
        buster.assert.equals(i.mode, "acc");
        buster.assert.equals(result.errors.length, 0);
    };

    self["imm"] = function() {
        var result = a("adc #12");
        var i = result.ast[0];
        buster.assert.equals(i.op, "adc");
        buster.assert.equals(i.mode, "imm");
        buster.assert.equals(i.arg, 12);
        buster.assert.equals(result.errors.length, 0);
    };

    self["imp"] = function() {
        var result = a("brk");
        var i = result.ast[0];
        buster.assert.equals(i.op, "brk");
        buster.assert.equals(i.mode, "imp");
        buster.assert.equals(result.errors.length, 0);
    };

    self["ind"] = function() {
        var result = a("jmp (1234)");
        var i = result.ast[0];
        buster.assert.equals(i.op, "jmp");
        buster.assert.equals(i.mode, "ind");
        buster.assert.equals(i.arg, 1234);
        buster.assert.equals(result.errors.length, 0);
    };

    self["izx"] = function() {
        var result = a("adc (12, x)");
        var i = result.ast[0];
        buster.assert.equals(i.op, "adc");
        buster.assert.equals(i.mode, "izx");
        buster.assert.equals(i.arg, 12);
        buster.assert.equals(result.errors.length, 0);
    };

    self["izy"] = function() {
        var result = a("adc (12), y");
        var i = result.ast[0];
        buster.assert.equals(i.op, "adc");
        buster.assert.equals(i.mode, "izy");
        buster.assert.equals(i.arg, 12);
        buster.assert.equals(result.errors.length, 0);
    };

    /*
    self["Invalid mode"] = function() {
        var result = a("adc a");
        buster.assert.equals(results.errors.length, 1);
    };
    */
    
    return self;

})());
