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

/**
 * @module m84.debug
 */
var m84 = m84 || {};
m84.debug = m84.debug || {};

/**
 * @class m84.debug.mem
 */
m84.debug.mem = m84.debug.mem || function(parent) {

    var self = {};

    self.loadb = function(address) {
        m84.util.assertw(address);
        return parent.loadb(address);
    };

    self.storeb = function(address, value) {
        m84.util.assertw(address);
        m84.util.assertb(value);
        return parent.storeb(address, value);
    };

    self.loadw = function(address) {
        m84.util.assertw(address);
        return parent.loadw(address);
    };

    self.storew = function(address, value) {
        m84.util.assertw(address);
        m84.util.assertw(value);
        return parent.storew(address, value);
    };

    return self;
};
