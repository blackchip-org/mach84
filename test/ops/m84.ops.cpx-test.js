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

/* jshint sub: true */

buster.testCase("m84.ops.cpx", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = test.asm({mem: mem});
    };

    self["cpx_imm, equal"] = function() {
        cpu.x = 0x40;
        a.cpx_imm(0x40);
        cpu.execute();
        buster.assert(cpu.z);
        buster.assert(cpu.c);
        buster.refute(cpu.n);
    };

    self["cpx_imm, less than"] = function() {
        cpu.x = 0x30;
        a.cpx_imm(0x40);
        cpu.execute();
        buster.refute(cpu.z);
        buster.refute(cpu.c);
        buster.assert(cpu.n); // subtraction results in negative number
    };

    self["cpx_imm, greater than"] = function() {
        cpu.x = 0x50;
        a.cpx_imm(0x40);
        cpu.execute();
        buster.refute(cpu.z);
        buster.assert(cpu.c);
        buster.refute(cpu.n);
    };

    self["cpx_abs"] = function() {
        cpu.x = 0x40;
        mem.storeb(0xabcd, 0x40);
        a.cpx_abs(0xabcd);
        cpu.execute();
        buster.assert(cpu.z);
        buster.assert(cpu.c);
        buster.refute(cpu.n);
    };

    self["cpx_zp"] = function() {
        cpu.x = 0x40;
        mem.storeb(0xab, 0x40);
        a.cpx_zp(0xab);
        cpu.execute();
        buster.assert(cpu.z);
        buster.assert(cpu.c);
        buster.refute(cpu.n);
    };

    return self;

})());
