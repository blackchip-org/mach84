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

buster.testCase("m84.ops.lda", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem({debug: true});
        cpu = m84.cpu({mem: mem, debug: true});
        a = m84.asm({mem: mem});
    };

    self["imm, not zero, not signed"] = function() {
        a.lda_imm(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x12);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["imm, zero, not signed"] = function() {
        a.lda_imm(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["imm, not zero, signed"] = function() {
        a.lda_imm(0xff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["zp, not zero, not signed"] = function() {
        mem.storeb(0x12, 0x34);
        a.lda_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["zp, zero, not signed"] = function() {
        mem.storeb(0x12, 0x00);
        a.lda_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["zp, not zero, signed"] = function() {
        mem.storeb(0x12, 0xff);
        a.lda_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["abs, not zero, not signed"] = function() {
        mem.storeb(0xabcd, 0x34);
        a.lda_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    return self;

})());
