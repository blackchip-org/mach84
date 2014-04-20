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

buster.testCase("m84.ops.lda", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = m84.asm({mem: mem});
    };

    self["lda_abs"] = function() {
        mem.storeb(0xabcd, 0x34);
        a.lda_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_abs, zero"] = function() {
        mem.storeb(0xabcd, 0x00);
        a.lda_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_abs, signed"] = function() {
        mem.storeb(0xabcd, 0xff);
        a.lda_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_abx"] = function() {
        mem.storeb(0x5432, 0x34);
        cpu.x = 2;
        a.lda_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_abx, zero"] = function() {
        mem.storeb(0x5432, 0x00);
        cpu.x = 2;
        a.lda_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_abx, signed"] = function() {
        mem.storeb(0x5432, 0xff);
        cpu.x = 2;
        a.lda_abx(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_abx, wrap"] = function() {
        mem.storeb(0x01, 0x12);
        cpu.x = 2;
        a.lda_abx(0xffff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x12);
    };

    self["lda_aby"] = function() {
        mem.storeb(0x5432, 0x34);
        cpu.y = 2;
        a.lda_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_aby, zero"] = function() {
        mem.storeb(0x5432, 0x00);
        cpu.y = 2;
        a.lda_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_aby, signed"] = function() {
        mem.storeb(0x5432, 0xff);
        cpu.y = 2;
        a.lda_aby(0x5430);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_aby, wrap"] = function() {
        mem.storeb(0x01, 0x12);
        cpu.y = 2;
        a.lda_aby(0xffff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x12);
    };

    self["lda_imm"] = function() {
        a.lda_imm(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x12);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_imm, zero"] = function() {
        a.lda_imm(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_imm, signed"] = function() {
        a.lda_imm(0xff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_izx"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, 0x11);
        cpu.x = 0x0a;
        a.lda_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x11);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_izx, zero"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, 0x00);
        cpu.x = 0x0a;
        a.lda_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_izx, signed"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        mem.storeb(0xdddd, 0xff);
        cpu.x = 0x0a;
        a.lda_izx(0x00);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_zp"] = function() {
        mem.storeb(0x12, 0x34);
        a.lda_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_zp, zero"] = function() {
        mem.storeb(0x12, 0x00);
        a.lda_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_zp, signed"] = function() {
        mem.storeb(0x12, 0xff);
        a.lda_zp(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_zpx"] = function() {
        mem.storeb(0x14, 0x34);
        cpu.x = 2;
        a.lda_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x34);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_zpx, zero"] = function() {
        mem.storeb(0x14, 0x00);
        cpu.x = 2;
        a.lda_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x00);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["lda_zpx, signed"] = function() {
        mem.storeb(0x14, 0xff);
        cpu.x = 2;
        a.lda_zpx(0x12);
        cpu.execute();
        buster.assert.equals(cpu.a, 0xff);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["lda_zpx, wrap"] = function() {
        mem.storeb(0x01, 0x12);
        cpu.x = 2;
        a.lda_zpx(0xff);
        cpu.execute();
        buster.assert.equals(cpu.a, 0x12);
    };

    return self;

})());
