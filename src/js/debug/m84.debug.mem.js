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
        parent.storeb(address, value);
    };

    self.loadb_zp = function(address) {
        m84.util.assertb(address);
        return parent.loadb_zp(address);
    };

    self.storeb_zp = function(address, value) {
        m84.util.assertb(address);
        m84.util.assertb(value);
        parent.storeb_zp(address, value);
    };

    self.loadb_i = function(address, index) {
        m84.util.assertw(address + index);
        return parent.loadb_i(address, index);
    };

    self.storeb_i = function(address, index, value) {
        m84.util.assertw(address + index);
        m84.util.assertb(value);
        parent.storeb_i(address, index, value);
    };

    self.loadb_izx = function(address, index) {
        m84.util.assertb(address + index);
        return parent.loadb_izx(address, index);
    };

    self.storeb_izx = function(address, index, value) {
        m84.util.assertb(address + index);
        m84.util.assertb(value);
        parent.storeb_izx(address, index, value);
    };

    self.loadb_izy = function(address, index) {
        m84.util.assertb(address);
        m84.util.assertb(index);
        return parent.loadb_izy(address, index);
    };
    
    self.storeb_izy = function(address, index, value) {
        m84.util.assertb(address);
        m84.util.assertb(index);
        m84.util.assertb(value);
        parent.storeb_izy(address, index, value);
    };
    
    self.loadw = function(address) {
        m84.util.assertw(address);
        if ( address === 0xffff ) {
            throw new Error("Word load at memory boundary");
        }
        return parent.loadw(address);
    };

    self.loadw_zp = function(address) {
        m84.util.assertb(address);
        if ( address === 0xff ) {
            throw new Error("Word load at page zero boundary");
        }
        return parent.loadw_zp(address);
    };

    self.storew = function(address, value) {
        m84.util.assertw(address);
        m84.util.assertw(value);
        if ( address === 0xffff ) {
            throw new Error("Word store at memory boundary");
        }
        parent.storew(address, value);
    };

    self.storew_zp = function(address, value) {
        m84.util.assertb(address);
        m84.util.assertw(value);
        if ( address === 0xff ) {
            throw new Error("Word store at page zero boundary");
        }
        parent.storew_zp(address, value);
    };

    return self;
};
