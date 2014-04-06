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

buster.testCase("m84.util", {

    "Repeat returns empty string when zero": function() {
        buster.assert.equals(m84.util.repeat("x", 0), "");
    },

    "Repeats the string three times": function() {
        buster.assert.equals(m84.util.repeat("xy", 3), "xyxyxy");
    },

    "Byte converts to a hex string": function() {
        buster.assert.equals(m84.util.x8(128), "80");
    },

    "Byte converts to a hex string with zero padding": function() {
        buster.assert.equals(m84.util.x8(10), "0a");
    },

    "Word converts to a hex string": function() {
        buster.assert.equals(m84.util.x16(65244), "fedc");
    },

    "Word converts to a hext string with zero padding": function() {
        buster.assert.equals(m84.util.x16(10), "000a");
    }

});
