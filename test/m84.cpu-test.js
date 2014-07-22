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

buster.testCase("m84.cpu", (function() {

    var self = {};
    var cpu;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
    };

    self["Set C flag"] = function() {
        cpu.sr(parseInt("00000001", 2));
        buster.assert(cpu.c);
    };

    self["Get C flag"] = function() {
        cpu.c = true;
        buster.assert.equals(cpu.sr(), parseInt("00100001", 2));
    };

    self["Set Z flag"] = function() {
        cpu.sr(parseInt("00000010", 2));
        buster.assert(cpu.z);
    };

    self["Get Z flag"] = function() {
        cpu.z = true;
        buster.assert.equals(cpu.sr(), parseInt("00100010", 2));
    };

    self["Set I flag"] = function() {
        cpu.sr(parseInt("00000100", 2));
        buster.assert(cpu.i);
    };

    self["Get I flag"] = function() {
        cpu.i = true;
        buster.assert.equals(cpu.sr(), parseInt("00100100", 2));
    };

    self["Set D flag"] = function() {
        cpu.sr(parseInt("00001000", 2));
        buster.assert(cpu.d);
    };

    self["Get D flag"] = function() {
        cpu.d = true;
        buster.assert.equals(cpu.sr(), parseInt("00101000", 2));
    };

    self["Set B flag"] = function() {
        cpu.sr(parseInt("00010000", 2));
        buster.assert(cpu.b);
    };

    self["Get B flag"] = function() {
        cpu.b = true;
        buster.assert.equals(cpu.sr(), parseInt("00110000", 2));
    };

    self["Set V flag"] = function() {
        cpu.sr(parseInt("01000000", 2));
        buster.assert(cpu.v);
    };

    self["Get V flag"] = function() {
        cpu.v = true;
        buster.assert.equals(cpu.sr(), parseInt("01100000", 2));
    };

    self["Set N flag"] = function() {
        cpu.sr(parseInt("10000000", 2));
        buster.assert(cpu.n);
    };

    self["Get N flag"] = function() {
        cpu.n = true;
        buster.assert.equals(cpu.sr(), parseInt("10100000", 2));
    };

    self["Valid status"] = function() {
        cpu.pc = 0x0123;
        cpu.a = 0x45;
        cpu.x = 0x67;
        cpu.y = 0x89;
        cpu.sp = 0xab;
        cpu.n = true;
        cpu.v = true;
        cpu.b = true;
        cpu.d = true;
        cpu.i = true;
        cpu.z = true;
        cpu.c = true;

        buster.assert.equals(cpu.status(),
            " pc  sr ac xr yr sp  n v - b d i z c\n" +
            "0123 ff 45 67 89 ab  * * * * * * * *");
    };

    self["Push byte on stack"] = function() {
        cpu.pushb(0x12);
        buster.assert.equals(0x12, mem.loadb(0x01ff));
        buster.assert.equals(0xfe, cpu.sp);
    };

    self["Push word on stack"] = function() {
        cpu.pushw(0x1234);
        buster.assert.equals(0x12, mem.loadb(0x01ff));
        buster.assert.equals(0x34, mem.loadb(0x01fe));
        buster.assert.equals(0xfd, cpu.sp);
    };

    self["Push word on stack, overflow"] = function() {
        cpu.sp = 0x00;
        cpu.pushw(0x1234);
        buster.assert.equals(0x12, mem.loadb(0x0100));
        buster.assert.equals(0x34, mem.loadb(0x01ff));
        buster.assert.equals(0xfe, cpu.sp);
    };

    self["Pull byte from stack"] = function() {
        mem.storeb(0x01ff, 0x12);
        cpu.sp = 0xfe;
        buster.assert.equals(0x12, cpu.pullb());
        buster.assert.equals(0xff, cpu.sp);
    };

    self["Pull word from stack"] = function() {
        mem.storeb(0x01fe, 0x34);
        mem.storeb(0x01ff, 0x12);
        cpu.sp = 0xfd;
        buster.assert.equals(0x1234, cpu.pullw());
        buster.assert.equals(0xff, cpu.sp);
    };

    self["Pull word from stack, underflow"] = function() {
        mem.storeb(0x01ff, 0x34);
        mem.storeb(0x0100, 0x12);
        cpu.sp = 0xfe;
        buster.assert.equals(0x1234, cpu.pullw());
        buster.assert.equals(0x00, cpu.sp);
    };

    return self;

})());
