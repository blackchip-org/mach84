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

buster.testCase("m84.jit", (function() {

    var self = {};
    var a;
    var mem;

    self.setUp = function() {
        a = m84.asm().parse;
        c = m84.jit().compile;
    };

    self["Invalid assembly"] = function() {
        buster.assert.exception(function() {
            var asm = a("foo");
            c(asm);
        });
    };

    self["abs"] = function() {
        var asm = a("adc $1234 \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x6d, 0x34, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["abx"] = function() {
        var asm = a("adc $1234, x \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x7d, 0x34, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["aby"] = function() {
        var asm = a("adc $1234, y \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x79, 0x34, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["acc"] = function() {
        var asm = a("asl a \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0xa, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["imm"] = function() {
        var asm = a("adc #$12 \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x69, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["ind"] = function() {
        var asm = a("jmp ($1234) \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x6c, 0x34, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["imp"] = function() {
        var asm = a("clc \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x18, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["izx"] = function() {
        var asm = a("adc ($12, x) \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x61, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["izy"] = function() {
        var asm = a("adc ($12), y \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x71, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["rel"] = function() {
        var asm = a("bra $0000 \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x80, 0xfe, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["zp"] = function() {
        var asm = a("adc $12 \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x65, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["zpx"] = function() {
        var asm = a("adc $12, x \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0x75, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["zpy"] = function() {
        var asm = a("ldx $12, y \n nop");
        var result = c(asm);
        buster.assert.equals(result.code, [0xb6, 0x12, 0xea]);
        buster.assert.equals(result.errors.length, 0);
    };

    self["Word overflow"] = function() {
        var asm = a("lda $10000");
        var result = c(asm);
        buster.assert.equals(result.errors.length, 1);
        var error = result.errors[0];
        buster.assert.equals(error.message, "Word overflow: $10000 (65536)");
        buster.assert.equals(error.line, 1);
    };

    self["Word overflow, negative"] = function() {
        var asm = a("lda $-1");
        var result = c(asm);
        buster.assert.equals(result.errors.length, 1);
        var error = result.errors[0];
        buster.assert.equals(error.message, "Word overflow: $-1 (-1)");
        buster.assert.equals(error.line, 1);
    };

    self["Byte overflow"] = function() {
        var asm = a("lda #$100");
        var result = c(asm);
        buster.assert.equals(result.errors.length, 1);
        var error = result.errors[0];
        buster.assert.equals(error.message, "Byte overflow: $100 (256)");
        buster.assert.equals(error.line, 1);
    };

    self["Byte overflow, negative"] = function() {
        var asm = a("lda #-129");
        var result = c(asm);
        buster.assert.equals(result.errors.length, 1);
        var error = result.errors[0];
        buster.assert.equals(error.message, "Byte overflow: $-81 (-129)");
        buster.assert.equals(error.line, 1);
    };

    return self;

})());
