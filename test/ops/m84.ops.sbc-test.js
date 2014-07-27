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

buster.testCase("m84.ops.sbc", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = test.asm({mem: mem});
    };

    self["sbc_imm"] = function() {
        cpu.a = 0x0a;
        cpu.c = true;
        a.sbc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x08, cpu.a);
        buster.assert(cpu.c);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["sbc_imm, with borrow"] = function() {
        cpu.a = 0x0a;
        cpu.c = false;
        a.sbc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x07, cpu.a);
        buster.assert(cpu.c);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["sbc_imm, borrow result"] = function() {
        cpu.a = 0x01;
        cpu.c = true;
        a.sbc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0xff, cpu.a);
        buster.refute(cpu.c);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["sbc_imm, zero"] = function() {
        cpu.a = 0x01;
        cpu.c = true;
        a.sbc_imm(0x01);
        cpu.execute();
        buster.assert.equals(0x00, cpu.a);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["sbc_imm, signed"] = function() {
        cpu.a = 0xff;
        cpu.c = true;
        a.sbc_imm(0x01);
        cpu.execute();
        buster.assert.equals(0xfe, cpu.a);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["sbc_imm, overflow set"] = function() {
        cpu.a = 0x80;
        cpu.c = true;
        a.sbc_imm(0x01);
        cpu.execute();
        buster.assert(cpu.v);
    };

    self["sdc_imm, overflow clear"] = function() {
        cpu.a = 0x82;
        cpu.v = true;
        cpu.c = true;
        a.sbc_imm(0xff);
        cpu.execute();
        buster.assert.equals(0x83, cpu.a);
        buster.refute(cpu.v);
    };

    self["sbc_imm, bcd"] = function() {
        cpu.d = true;
        cpu.c = true;
        cpu.a = 0x10;
        a.sbc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x08, cpu.a);
        buster.assert(cpu.c);
        buster.refute(cpu.z);
    };

    self["sbc_imm, bcd with borrow"] = function() {
        cpu.d = true;
        cpu.c = false;
        cpu.a = 0x10;
        a.sbc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x07, cpu.a);
        buster.assert(cpu.c);
        buster.refute(cpu.z);
    };

    self["sbc_imm, bcd borrow result"] = function() {
        cpu.d = true;
        cpu.c = true;
        cpu.a = 0x01;
        a.sbc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x99, cpu.a);
        buster.refute(cpu.c);
        buster.refute(cpu.z);
    };

    self["sbc_imm, bcd invalid"] = function() {
        cpu.d = true;
        cpu.c = true;
        cpu.a = 0xaa;
        a.sbc_imm(0x02);
        buster.assert.exception(cpu.execute);
    };

    self["sbc_abs"] = function() {
        cpu.a = 0x08;
        mem.storeb(0xabcd, 0x02);
        cpu.c = true;
        a.sbc_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    self["sbc_abx"] = function() {
        cpu.a = 0x08;
        mem.storeb(0xabcd, 0x02);
        cpu.x = 0x0d;
        cpu.c = true;
        a.sbc_abx(0xabc0);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    self["sbc_aby"] = function() {
        cpu.a = 0x08;
        mem.storeb(0xabcd, 0x02);
        cpu.y = 0x0d;
        cpu.c = true;
        a.sbc_aby(0xabc0);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    self["sbc_izx"] = function() {
        cpu.a = 0x08;
        mem.storeb(0xdddd, 0x02);
        mem.storew_zp(0x0f, 0xdddd);
        cpu.x = 0x0f;
        cpu.c = true;
        a.sbc_izx(0x00);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    self["sbc_izy"] = function() {
        cpu.a = 0x08;
        mem.storeb(0xdddd, 0x02);
        mem.storew_zp(0x0f, 0xdd00);
        cpu.y = 0xdd;
        cpu.c = true;
        a.sbc_izy(0x0f);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    self["sbc_zp"] = function() {
        cpu.a = 0x08;
        mem.storeb_zp(0xdd, 0x02);
        cpu.c = true;
        a.sbc_zp(0xdd);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    self["sbc_zpx"] = function() {
        cpu.a = 0x08;
        mem.storeb_zp(0xdd, 0x02);
        cpu.x = 0x0d;
        cpu.c = true;
        a.sbc_zpx(0xd0);
        cpu.execute();
        buster.assert.equals(0x06, cpu.a);
    };

    return self;

})());
