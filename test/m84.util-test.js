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

buster.testCase("m84.util", (function() {

    var self = {};

    self["Repeat returns empty string when zero"] = function() {
        buster.assert.equals(m84.util.repeat("x", 0), "");
    };

    self["Repeats the string three times"] = function() {
        buster.assert.equals(m84.util.repeat("xy", 3), "xyxyxy");
    };

    self["Byte converts to a hex string"] = function() {
        buster.assert.equals(m84.util.hexb(128), "80");
    };

    self["Byte converts to a hex string with zero padding"] = function() {
        buster.assert.equals(m84.util.hexb(10), "0a");
    };

    self["Word converts to a hex string"] = function() {
        buster.assert.equals(m84.util.hexw(65244), "fedc");
    };

    self["Word converts to a hext string with zero padding"] = function() {
        buster.assert.equals(m84.util.hexw(10), "000a");
    };

    self["Valid byte in assertion"] = function() {
        m84.util.assertb(0x42);
        buster.assert(true);
    };

    self["Invalid byte in assertion"] = function() {
        buster.assert.exception(function() {
            m84.util.assertb(0x100);
        });
        buster.assert.exception(function() {
            m84.util.assertb(-1);
        });
    };

    self["Valid word in assertion"] = function() {
        m84.util.assertw(0x4242);
        buster.assert(true);
    };

    self["Invalid word in assertion"] =function() {
        buster.assert.exception(function() {
            m84.util.assertw(0x10000);
        });
        buster.assert.exception(function() {
            m84.util.assertw(-1);
        });
    };
    
    self["To BCD"] = function() {
        buster.assert.equals(0x42, m84.util.to_bcd(42));
    };

    self["From BCD"] = function() {
        buster.assert.equals(42, m84.util.from_bcd(0x42));
    };
    
    return self;

})());
