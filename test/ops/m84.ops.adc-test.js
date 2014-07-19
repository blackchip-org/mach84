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

buster.testCase("m84.ops.adc", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = m84.asm({mem: mem});
    };

    self["adc_imm"] = function() {
        cpu.a = 0x08;
        a.adc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
        buster.refute(cpu.c);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["adc_imm, with carry"] = function() {
        cpu.a = 0x08;
        cpu.c = true;
        a.adc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x0b, cpu.a);
        buster.refute(cpu.c);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["adc_imm, carry result"] = function() {
        cpu.a = 0xff;
        a.adc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x01, cpu.a);
        buster.assert(cpu.c);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["adc_imm, zero"] = function() {
        cpu.a = 0xff;
        a.adc_imm(0x01);
        cpu.execute();
        buster.assert.equals(0x00, cpu.a);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["adc_imm, signed"] = function() {
        cpu.a = 0x7f;
        a.adc_imm(0x01);
        cpu.execute();
        buster.assert.equals(0x80, cpu.a);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["adc_imm, overflow set"] = function() {
        cpu.a = 0x7f;
        a.adc_imm(0x01);
        cpu.execute();
        buster.assert(cpu.v);
    };

    self["adc_imm, overflow clear"] = function() {
        cpu.v = true;
        cpu.a = 0x81;
        a.adc_imm(0xff); // -1
        cpu.execute();
        buster.assert.equals(0x80, cpu.a);
        buster.refute(cpu.v);
    };

    self["adc_imm, bcd"] = function() {
        cpu.d = true;
        cpu.a = 0x08;
        a.adc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x10, cpu.a);
        buster.refute(cpu.c);
        buster.refute(cpu.z);
    };

    self["adc_imm, bcd with carry"] = function() {
        cpu.d = true;
        cpu.a = 0x08;
        cpu.c = true;
        a.adc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x11, cpu.a);
        buster.refute(cpu.c);
        buster.refute(cpu.z);
    };

    self["adc_imm, bcd carry result"] = function() {
        cpu.d = true;
        cpu.a = 0x99;
        a.adc_imm(0x02);
        cpu.execute();
        buster.assert.equals(0x01, cpu.a);
        buster.assert(cpu.c);
        buster.refute(cpu.z);
    };

    self["adc_imm, bcd invalid"] = function() {
        cpu.d = true;
        cpu.a = 0xaa;
        a.adc_imm(0x02);
        buster.assert.exception(cpu.execute);
    };

    self["adc_abs"] = function() {
        mem.storeb(0xabcd, 0x08);
        cpu.a = 0x02;
        a.adc_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    self["adc_abx"] = function() {
        mem.storeb(0xabcd, 0x08);
        cpu.a = 0x02;
        cpu.x = 0x0d;
        a.adc_abx(0xabc0);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    self["adc_aby"] = function() {
        mem.storeb(0xabcd, 0x08);
        cpu.a = 0x02;
        cpu.y = 0x0d;
        a.adc_aby(0xabc0);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    self["adc_izx"] = function() {
        mem.storeb(0xdddd, 0x08);
        mem.storew_zp(0x0f, 0xdddd);
        cpu.a = 0x02;
        cpu.x = 0x0f;
        a.adc_izx(0x00);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    self["adc_izy"] = function() {
        mem.storeb(0xdddd, 0x08);
        mem.storew_zp(0x0f, 0xdd00);
        cpu.a = 0x02;
        cpu.y = 0xdd;
        a.adc_izy(0x0f);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    self["adc_zp"] = function() {
        mem.storeb_zp(0xdd, 0x08);
        cpu.a = 0x02;
        a.adc_zp(0xdd);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    self["adc_zpx"] = function() {
        mem.storeb_zp(0xdd, 0x08);
        cpu.a = 0x02;
        cpu.x = 0x0d;
        a.adc_zpx(0xd0);
        cpu.execute();
        buster.assert.equals(0x0a, cpu.a);
    };

    return self;

})());
