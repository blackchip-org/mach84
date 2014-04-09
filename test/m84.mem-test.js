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

buster.testCase("m84.mem", (function() {

    var self = {};
    var array;
    var mem;

    self.setUp = function() {
        array = [0, 0, 0x34, 0x12];
        mem = m84.mem({array: array});
    };

    self["Load byte"] = function() {
        buster.assert.equals(mem.loadb(2), 0x34);
    };

    self["Loaded undefined byte is zero"] = function() {
        buster.assert.equals(mem.loadb(0xff), 0);
    };

    self["Load word"] = function() {
        buster.assert.equals(mem.loadw(2), 0x1234);
    };

    self["Loaded undefined word is zero"] = function() {
        buster.assert.equals(mem.loadw(0xff), 0);
    };

    self["Store byte"] = function() {
        mem.storew(4, 0x56);
        buster.assert.equals(array[4], 0x56);
    };

    self["Store word"] = function() {
        mem.storew(4, 0x5678);
        buster.assert.equals(array[4], 0x78);
        buster.assert.equals(array[5], 0x56);
    };

    return self;

})());

buster.testCase("m84.debug.mem", (function() {

    var self = {};
    var array;
    var mem;

    self.setUp = function() {
        array = [0, 0, 0x34, 0x12];
        mem = m84.mem({array: array, debug: true});
    };

    self["Load byte"] = function() {
        buster.assert.equals(mem.loadb(2), 0x34);
    };

    self["Invalid parameters loading byte"] = function() {
        buster.assert.exception(function() {
            mem.loadb(0x10000);
        });
    };

    self["Load word"] = function() {
        buster.assert.equals(mem.loadw(2), 0x1234);
    };

    self["Invalid parameters loading word"] = function() {
        buster.assert.exception(function() {
            mem.loadw(0x10000);
        });
    };

    self["Store byte"] = function() {
        mem.storew(4, 0x56);
        buster.assert.equals(array[4], 0x56);
    };

    self["Invalid parameters storing byte"] = function() {
        buster.assert.exception(function() {
            mem.storeb(0x10000, 0);
        });
        buster.assert.exception(function() {
            mem.storeb(0, 0x100);
        });
    };

    self["Store word"] = function() {
        mem.storew(4, 0x5678);
        buster.assert.equals(array[4], 0x78);
        buster.assert.equals(array[5], 0x56);
    };

    self["Invalid parameters storing word"] = function() {
        buster.assert.exception(function() {
            mem.storew(0x10000, 0);
        });
        buster.assert.exception(function() {
            mem.storew(0, 0x10000);
        });
    };

    return self;

})());
