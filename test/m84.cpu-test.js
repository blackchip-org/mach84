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

buster.testCase("m84.cpu", {

    cpu: null,

    setUp: function() {
        this.cpu = m84.cpu();
    },

    "Set C flag": function() {
        this.cpu.sr(parseInt("00000001", 2));
        self.assert(this.cpu.c);
    },

    "Get C flag": function() {
        this.cpu.c = true;
        self.assert.equals(this.cpu.sr(), parseInt("00100001", 2));
    },

    "Set Z flag": function() {
        this.cpu.sr(parseInt("00000010", 2));
        self.assert(this.cpu.z);
    },

    "Get Z flag": function() {
        this.cpu.z = true;
        self.assert.equals(this.cpu.sr(), parseInt("00100010", 2));
    },

    "Set I flag": function() {
        this.cpu.sr(parseInt("00000100", 2));
        self.assert(this.cpu.i);
    },

    "Get I flag": function() {
        this.cpu.i = true;
        self.assert.equals(this.cpu.sr(), parseInt("00100100", 2));
    },

    "Set D flag": function() {
        this.cpu.sr(parseInt("00001000", 2));
        self.assert(this.cpu.d);
    },

    "Get D flag": function() {
        this.cpu.d = true;
        self.assert.equals(this.cpu.sr(), parseInt("00101000", 2));
    },

    "Set B flag": function() {
        this.cpu.sr(parseInt("00010000", 2));
        self.assert(this.cpu.b);
    },

    "Get B flag": function() {
        this.cpu.b = true;
        self.assert.equals(this.cpu.sr(), parseInt("00110000", 2));
    },

    "Set V flag": function() {
        this.cpu.sr(parseInt("01000000", 2));
        self.assert(this.cpu.v);
    },

    "Get V flag": function() {
        this.cpu.v = true;
        self.assert.equals(this.cpu.sr(), parseInt("01100000", 2));
    },

    "Set N flag": function() {
        this.cpu.sr(parseInt("10000000", 2));
        self.assert(this.cpu.n);
    },

    "Get N flag": function() {
        this.cpu.n = true;
        self.assert.equals(this.cpu.sr(), parseInt("10100000", 2));
    },

    "Valid status": function() {
        this.cpu.pc = 0x0123;
        this.cpu.a = 0x45;
        this.cpu.x = 0x67;
        this.cpu.y = 0x89;
        this.cpu.sp = 0xab;
        this.cpu.n = true;
        this.cpu.v = true;
        this.cpu.b = true;
        this.cpu.d = true;
        this.cpu.i = true;
        this.cpu.z = true;
        this.cpu.c = true;

        self.assert.equals(this.cpu.status(),
            " pc  sr ac xr yr sp  n v - b d i z c\n" +
            "0123 ff 45 67 89 ab  * * * * * * * *");
    }

});
