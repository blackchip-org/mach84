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

buster.testCase("m84.ops.rol", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = test.asm({mem: mem});
    };

    self["rol_acc"] = function() {
        cpu.a = 4;
        a.rol_acc();
        cpu.execute();
        buster.assert.equals(8, cpu.a);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
        buster.refute(cpu.c);
    };

    self["rol_acc, rotate"] = function() {
        cpu.a = Math.pow(2, 7);
        cpu.c = true;
        a.rol_acc();
        cpu.execute();
        buster.assert.equals(1, cpu.a);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
        buster.assert(cpu.c);
    };

    self["rol_acc, signed"] = function() {
        cpu.a = Math.pow(2, 6);
        a.rol_acc();
        cpu.execute();
        buster.assert.equals(Math.pow(2, 7), cpu.a);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
        buster.refute(cpu.c);
    };

    self["rol_abs"] = function() {
        mem.storeb(0xabcd, 4);
        a.rol_abs(0xabcd);
        cpu.execute();
        buster.assert.equals(8, mem.loadb(0xabcd));
    };

    self["rol_abx"] = function() {
        mem.storeb(0xabcd, 4);
        cpu.x = 0xcd;
        a.rol_abx(0xab00);
        cpu.execute();
        buster.assert.equals(8, mem.loadb(0xabcd));
    };

    self["rol_zp"] = function() {
        mem.storeb_zp(0xab, 4);
        a.rol_zp(0xab);
        cpu.execute();
        buster.assert.equals(8, mem.loadb_zp(0xab));
    };

    self["rol_zpx"] = function() {
        mem.storeb_zp(0xab, 4);
        cpu.x = 0x0b;
        a.rol_zpx(0xa0);
        cpu.execute();
        buster.assert.equals(8, mem.loadb_zp(0xab));
    };

    return self;

})());
