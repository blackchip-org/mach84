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

buster.testCase("m84.ops.ora", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = test.asm({mem: mem});
    };

    self["ora_abs"] = function() {
        mem.storeb(0xabcd, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        a.ora_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_abs, zero"] = function() {
        mem.storeb(0xabcd, 0);
        cpu.a = 0;
        a.ora_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_abs, signed"] = function() {
        mem.storeb(0xabcd, 0xf0);
        cpu.a = 0x0f;
        a.ora_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["ora_abx"] = function() {
        mem.storeb(0x5432, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.x = 2;
        a.ora_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_aby"] = function() {
        mem.storeb(0x5432, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.y = 2;
        a.ora_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_imm"] = function() {
        cpu.a =   parseInt("1001", 2);
        a.ora_imm(parseInt("1010", 2));
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_izx"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.x = 0x0a;
        a.ora_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_izy"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.y = 0xdd;
        a.ora_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_zp"] = function() {
        mem.storeb(0x12, parseInt("1001", 2));
        cpu.a =          parseInt("1010", 2);
        a.ora_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["ora_zpx"] = function() {
        mem.storeb(0x14, parseInt("1001", 2));
        cpu.a =          parseInt("1010", 2);
        cpu.x = 2;
        a.ora_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("1011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    return self;

})());
