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

buster.testCase("m84.ops.eor", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = m84.asm({mem: mem});
    };

    self["eor_abs"] = function() {
        mem.storeb(0xabcd, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        a.eor_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["eor_abs, zero"] = function() {
        mem.storeb(0xabcd, 0xff);
        cpu.a = 0xff;
        a.eor_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["eor_abs, signed"] = function() {
        mem.storeb(0xabcd, 0xf0);
        cpu.a = 0x0f;
        a.eor_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["eor_abx"] = function() {
        mem.storeb(0x5432, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.x = 2;
        a.eor_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_abx, zero"] = function() {
        mem.storeb(0x5432, 0xff);
        cpu.a = 0xff;
        cpu.x = 2;
        a.eor_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_abx, signed"] = function() {
        mem.storeb(0x5432, 0xf0);
        cpu.a = 0x0f;
        cpu.x = 2;
        a.eor_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["eor_aby"] = function() {
        mem.storeb(0x5432, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.y = 2;
        a.eor_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_aby, zero"] = function() {
        mem.storeb(0x5432, 0xff);
        cpu.a = 0xff;
        cpu.y = 2;
        a.eor_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_aby, signed"] = function() {
        mem.storeb(0x5432, 0xf0);
        cpu.a = 0x0f;
        cpu.y = 2;
        a.eor_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["eor_imm"] = function() {
        cpu.a =   parseInt("1001", 2);
        a.eor_imm(parseInt("1010", 2));
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_imm, zero"] = function() {
        cpu.a = 0xff;
        a.eor_imm(0xff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_imm, signed"] = function() {
        cpu.a = 0xf0;
        a.eor_imm(0x0f);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["eor_izx"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.x = 0x0a;
        a.eor_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_izx, zero"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, 0xff);
        cpu.a = 0xff;
        cpu.x = 0x0a;
        a.eor_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_izx, signed"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, 0xf0);
        cpu.a = 0x0f;
        cpu.x = 0x0a;
        a.eor_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["eor_izy"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, parseInt("1001", 2));
        cpu.a =            parseInt("1010", 2);
        cpu.y = 0xdd;
        a.eor_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["eor_izy, zero"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, 0xff);
        cpu.a = 0xff;
        cpu.y = 0xdd;
        a.eor_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["eor_izy, signed"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, 0xf0);
        cpu.a = 0x0f;
        cpu.y = 0xdd;
        a.eor_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["eor_zp"] = function() {
        mem.storeb(0x12, parseInt("1001", 2));
        cpu.a =          parseInt("1010", 2);
        a.eor_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_zp, zero"] = function() {
        mem.storeb(0x12, 0xff);
        cpu.a = 0xff;
        a.eor_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_zp, signed"] = function() {
        mem.storeb(0x12, 0xf0);
        cpu.a = 0x0f;
        a.eor_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["eor_zpx"] = function() {
        mem.storeb(0x14, parseInt("1001", 2));
        cpu.a =          parseInt("1010", 2);
        cpu.x = 2;
        a.eor_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("0011", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_zpx, zero"] = function() {
        mem.storeb(0x14, 0xff);
        cpu.a = 0xff;
        cpu.x = 2;
        a.eor_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["eor_zpx, signed"] = function() {
        mem.storeb(0x14, 0xf0);
        cpu.a = 0x0f;
        cpu.x = 2;
        a.eor_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    return self;
    
})());
