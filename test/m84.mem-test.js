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

buster.testCase("m84.mem.mmu", {

    array: null,
    mem: null,

    setUp: function() {
        this.array = [0, 0, 0x34, 0x12];
        this.mem = m84.mem.mmu(this.array);
    },

    "Load byte": function() {
        buster.assert.equals(this.mem.loadb(2), 0x34);
    },

    "Load word": function() {
        buster.assert.equals(this.mem.loadw(2), 0x1234);
    },

    "Store byte": function() {
        this.mem.storew(4, 0x56);
        buster.assert.equals(this.array[4], 0x56);
    },

    "Store word": function() {
        this.mem.storew(4, 0x5678);
        buster.assert.equals(this.array[4], 0x78);
        buster.assert.equals(this.array[5], 0x56);
    }

});

buster.testCase("m84.mem.mmu.debug", {

    array: null,
    mem: null,

    setUp: function() {
        this.array = [0, 0, 0x34, 0x12];
        this.mem = m84.mem.mmu.debug(this.array);
    },

    "Load byte": function() {
        buster.assert.equals(this.mem.loadb(2), 0x34);
    },

    "Invalid parameters loading byte": function() {
        var self = this;
        buster.assert.exception(function() {
            self.mem.loadb(0x10000);
        });
    },

    "Load word": function() {
        buster.assert.equals(this.mem.loadw(2), 0x1234);
    },

    "Invalid parameters loading word": function() {
        var self = this;
        buster.assert.exception(function() {
            self.mem.loadw(0x10000);
        });
    },

    "Store byte": function() {
        this.mem.storew(4, 0x56);
        buster.assert.equals(this.array[4], 0x56);
    },

    "Invalid parameters storing byte": function() {
        var self = this;
        buster.assert.exception(function() {
            self.mem.storeb(0x10000, 0);
        });
        buster.assert.exception(function() {
            self.mem.storeb(0, 0x100);
        });
    },

    "Store word": function() {
        this.mem.storew(4, 0x5678);
        buster.assert.equals(this.array[4], 0x78);
        buster.assert.equals(this.array[5], 0x56);
    },

    "Invalid parameters storing word": function() {
        var self = this;
        buster.assert.exception(function() {
            self.mem.storew(0x10000, 0);
        });
        buster.assert.exception(function() {
            self.mem.storew(0, 0x10000);
        });
    }

});
