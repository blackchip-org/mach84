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

buster.testCase("m84.ops.and", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = m84.asm({mem: mem});
    };

    self["and_abs"] = function() {
        mem.storeb(0xabcd, parseInt("101", 2));
        cpu.a =            parseInt("110", 2);
        a.and_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["and_abs, zero"] = function() {
        mem.storeb(0xabcd, parseInt("010", 2));
        cpu.a =            parseInt("101", 2);
        a.and_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("000", 2));
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["and_abs, signed"] = function() {
        mem.storeb(0xabcd, 0xff);
        cpu.a = 0xff;
        a.and_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["and_abx"] = function() {
        mem.storeb(0x5432, parseInt("101", 2));
        cpu.a =            parseInt("110", 2);
        cpu.x = 2;
        a.and_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_abx, zero"] = function() {
        mem.storeb(0x5432, parseInt("010", 2));
        cpu.a =            parseInt("101", 2);
        cpu.x = 2;
        a.and_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_abx, signed"] = function() {
        mem.storeb(0x5432, 0xff);
        cpu.a = 0xff;
        cpu.x = 2;
        a.and_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["and_aby"] = function() {
        mem.storeb(0x5432, parseInt("101", 2));
        cpu.a =            parseInt("100", 2);
        cpu.y = 2;
        a.and_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_aby, zero"] = function() {
        mem.storeb(0x5432, parseInt("010", 2));
        cpu.a =            parseInt("101", 2);
        cpu.y = 2;
        a.and_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_aby, signed"] = function() {
        mem.storeb(0x5432, 0xff);
        cpu.a = 0xff;
        cpu.y = 2;
        a.and_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["and_imm"] = function() {
        cpu.a =   parseInt("101", 2);
        a.and_imm(parseInt("110", 2));
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_imm, zero"] = function() {
        cpu.a =   parseInt("010", 2);
        a.and_imm(parseInt("101", 2));
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_imm, signed"] = function() {
        cpu.a = 0xff;
        a.lda_imm(0xff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["and_izx"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, parseInt("101", 2));
        cpu.a =            parseInt("110", 2);
        cpu.x = 0x0a;
        a.and_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_izx, zero"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, parseInt("010"));
        cpu.a =            parseInt("101");
        cpu.x = 0x0a;
        a.and_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_izx, signed"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, 0xff);
        cpu.a = 0xff;
        cpu.x = 0x0a;
        a.and_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["and_izy"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, parseInt("101", 2));
        cpu.a =            parseInt("110", 2);
        cpu.y = 0xdd;
        a.and_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["and_izy, zero"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, parseInt("010", 2));
        cpu.a =            parseInt("101", 2);
        cpu.y = 0xdd;
        a.and_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["and_izy, signed"] = function() {
        mem.storew_zp(0x0a, 0xdd00);
        mem.storeb(0xdddd, 0xff);
        cpu.a = 0xff;
        cpu.y = 0xdd;
        a.and_izy(0x0a);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["and_zp"] = function() {
        mem.storeb(0x12, parseInt("101", 2));
        cpu.a =          parseInt("110", 2);
        a.and_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_zp, zero"] = function() {
        mem.storeb(0x12, parseInt("010", 2));
        cpu.a =          parseInt("101", 2);
        a.and_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_zp, signed"] = function() {
        mem.storeb(0x12, 0xff);
        cpu.a = 0xff;
        a.and_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["and_zpx"] = function() {
        mem.storeb(0x14, parseInt("101", 2));
        cpu.a =          parseInt("110", 2);
        cpu.x = 2;
        a.and_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, parseInt("100", 2));
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_zpx, zero"] = function() {
        mem.storeb(0x14, parseInt("010", 2));
        cpu.a =          parseInt("101", 2);
        cpu.x = 2;
        a.and_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["and_zpx, signed"] = function() {
        mem.storeb(0x14, 0xff);
        cpu.a = 0xff;
        cpu.x = 2;
        a.and_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    return self;
    
})());
