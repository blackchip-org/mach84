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

buster.testCase("m84.pc", (function() {

    var self = {};
    var array;
    var it;

    self.setUp = function() {
        array = [0, 0, 0x34, 0x12, 0x78, 0x56];
        it = m84.pc({}, {array: array});
    };

    self["Fetch byte"] = function() {
        it.pc = 1;
        buster.assert.equals(it.fetchb(), 0x34);
        buster.assert.equals(it.fetchb(), 0x12);
    };

    self["Fetch word"] = function() {
        it.pc = 1;
        buster.assert.equals(it.fetchw(), 0x1234);
        buster.assert.equals(it.fetchw(), 0x5678);
    };

    self["Next byte"] = function() {
        it.pc = 2;
        buster.assert.equals(it.nextb(), 0x34);
        buster.assert.equals(it.nextb(), 0x12);
    };

    self["Next word"] = function() {
        it.pc = 2;
        buster.assert.equals(it.nextw(), 0x1234);
        buster.assert.equals(it.nextw(), 0x5678);
    };

    self["Store byte"] = function() {
        it.pc = 2;
        it.storeb(0xbb);
        it.storeb(0xaa);
        buster.assert.equals(array[2], 0xbb);
        buster.assert.equals(array[3], 0xaa);
    };

    self["Store word"] = function() {
        it.pc = 2;
        it.storew(0xaabb);
        it.storew(0xccdd);
        buster.assert.equals(array[2], 0xbb);
        buster.assert.equals(array[3], 0xaa);
        buster.assert.equals(array[4], 0xdd);
        buster.assert.equals(array[5], 0xcc);
    };

    return self;

})());

buster.testCase("m84.debug.pc", (function() {

    var self = {};
    var array;
    var it;

    self.setUp = function() {
        array = [0, 0, 0x34, 0x12, 0x78, 0x56];
        array[0xfffe] = 0xcd;
        array[0xffff] = 0xab;
        it = m84.pc({}, {array: array, debug: true});
    };

    self["Fetch byte"] = function() {
        it.pc = 1;
        buster.assert.equals(it.fetchb(), 0x34);
        buster.assert.equals(it.fetchb(), 0x12);
    };

    self["Fetch word"] = function() {
        it.pc = 1;
        buster.assert.equals(it.fetchw(), 0x1234);
        buster.assert.equals(it.fetchw(), 0x5678);
    };

    self["Next byte"] = function() {
        it.pc = 2;
        buster.assert.equals(it.nextb(), 0x34);
        buster.assert.equals(it.nextb(), 0x12);
    };

    self["Next word"] = function() {
        it.pc = 2;
        buster.assert.equals(it.nextw(), 0x1234);
        buster.assert.equals(it.nextw(), 0x5678);
    };

    self["Fetch last byte"] = function() {
        it.pc = 0xfffe;
        buster.assert.equals(it.fetchb(), 0xab);
    };

    self["Fetch last word"] = function() {
        it.pc = 0xfffd;
        buster.assert.equals(it.fetchw(), 0xabcd);
    };

    self["Next last byte"] = function() {
        it.pc = 0xffff;
        buster.assert.equals(it.nextb(), 0xab);
    };

    self["Next last word"] = function() {
        it.pc = 0xfffe;
        buster.assert.equals(it.nextw(), 0xabcd);
    };

    self["Fetch byte at invalid address"] = function() {
        it.pc = 0xffff;
        buster.assert.exception(function() {
            buster.assert.exception(it.fetchb());
        });
    };

    self["Fetch word at invalid address"] = function() {
        it.pc = 0xfffe;
        buster.assert.exception(function() {
            buster.assert.exception(it.fetchw());
        });
    };

    self["Next byte at invalid address"] = function() {
        it.pc = 0x10000;
        buster.assert.exception(function() {
            buster.assert.exception(it.nextb());
        });
    };

    self["Next word at invalid address"] = function() {
        it.pc = 0xffff;
        buster.assert.exception(function() {
            buster.assert.exception(it.nextw());
        });
    };

    return self;

})());
