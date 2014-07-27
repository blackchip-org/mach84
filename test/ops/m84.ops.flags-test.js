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

buster.testCase("m84.ops.flags", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = test.asm({mem: mem});
    };

    self["clc"] = function() {
        cpu.c = true;
        a.clc();
        cpu.execute();
        buster.refute(cpu.c);
    };

    self["cld"] = function() {
        cpu.d = true;
        a.cld();
        cpu.execute();
        buster.refute(cpu.d);
    };

    self["cli"] = function() {
        cpu.i = true;
        a.cli();
        cpu.execute();
        buster.refute(cpu.i);
    };

    self["clv"] = function() {
        cpu.v = true;
        a.clv();
        cpu.execute();
        buster.refute(cpu.v);
    };

    self["sec"] = function() {
        cpu.c = false;
        a.sec();
        cpu.execute();
        buster.assert(cpu.c);
    };

    self["sed"] = function() {
        cpu.d = false;
        a.sed();
        cpu.execute();
        buster.assert(cpu.d);
    };

    self["sei"] = function() {
        cpu.i = false;
        a.sei();
        cpu.execute();
        buster.assert(cpu.i);
    };

    return self;

})());
