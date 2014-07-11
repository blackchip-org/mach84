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

buster.testCase("m84.ops.sta", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        map = m84.map();
        a = m84.asm({mem: mem});
    };

    self["sta_abs"] = function() {
        cpu.a = 0x12;
        a.sta_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(mem.loadb(0xabcd), 0x12);
    };

    self["sta_abx"] = function() {
        cpu.a = 0x12;
        cpu.x = 2;
        a.sta_abx(0x5430);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x5432), 0x12);
    };

    self["sta_abx, wrap"] = function() {
        cpu.a = 0x12;
        cpu.x = 2;
        a.sta_abx(0xffff);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x01), 0x12);
    };

    self["sta_aby"] = function() {
        cpu.a = 0x12;
        cpu.y = 2;
        a.sta_aby(0x5430);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x5432), 0x12);
    };

    self["sta_aby, wrap"] = function() {
        cpu.a = 0x12;
        cpu.y = 2;
        a.sta_aby(0xffff);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x01), 0x12);
    };

    self["sta_izx"] = function() {
        mem.storew_zp(0x0a, 0xdddd);
        cpu.a = 0x11;
        cpu.x = 0x0a;
        a.sta_izx(0x00);
        cpu.execute();
        buster.assert.equals(mem.loadb(0xdddd), 0x11);
    };

    self["sta_zp"] = function() {
        cpu.a = 0x12;
        a.sta_zp(0x34);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x34), 0x12);
    };

    self["sta_zpx"] = function() {
        cpu.a = 0x12;
        cpu.x = 0x02;
        a.sta_zpx(0x34);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x36), 0x12);
    };

    self["sta_zpx, wrap"] = function() {
        cpu.a = 0x12;
        cpu.x = 0x02;
        a.sta_zpx(0xff);
        cpu.execute();
        buster.assert.equals(mem.loadb(0x01), 0x12);
    };

    return self;

})());
