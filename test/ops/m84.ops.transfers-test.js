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

    self["tax"] = function() {
        cpu.a = 0x12;
        a.tax();
        cpu.execute();
        buster.assert.equals(0x12, cpu.x);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["tax, zero"] = function() {
        cpu.a = 0x00;
        a.tax();
        cpu.execute();
        buster.assert.equals(0x00, cpu.x);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["tax, signed"] = function() {
        cpu.a = 0xff;
        a.tax();
        cpu.execute();
        buster.assert.equals(0xff, cpu.x);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["tay"] = function() {
        cpu.a = 0x12;
        a.tay();
        cpu.execute();
        buster.assert.equals(0x12, cpu.y);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["tay, zero"] = function() {
        cpu.a = 0x00;
        a.tay();
        cpu.execute();
        buster.assert.equals(0x00, cpu.y);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["tay, signed"] = function() {
        cpu.a = 0xff;
        a.tay();
        cpu.execute();
        buster.assert.equals(0xff, cpu.y);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["txa"] = function() {
        cpu.x = 0x12;
        a.txa();
        cpu.execute();
        buster.assert.equals(0x12, cpu.a);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["txa, zero"] = function() {
        cpu.x = 0x00;
        a.txa();
        cpu.execute();
        buster.assert.equals(0x00, cpu.a);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["txa, signed"] = function() {
        cpu.x = 0xff;
        a.txa();
        cpu.execute();
        buster.assert.equals(0xff, cpu.a);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    self["tya"] = function() {
        cpu.y = 0x12;
        a.tya();
        cpu.execute();
        buster.assert.equals(0x12, cpu.a);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };

    self["tya, zero"] = function() {
        cpu.y = 0x00;
        a.tya();
        cpu.execute();
        buster.assert.equals(0x00, cpu.a);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };

    self["tya, signed"] = function() {
        cpu.y = 0xff;
        a.tya();
        cpu.execute();
        buster.assert.equals(0xff, cpu.a);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };

    return self;

})());
