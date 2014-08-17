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

/* jshint sub: true */

buster.testCase("m84.symbols", (function() {

    var self = {};
    var t;

    self.setUp = function() {
        t = m84.symbols();
    };

    self["Define symbol"] = function() {
        t.define("foo", 0xab);
        buster.assert.equals(0xab, t.find("foo"));
    };

    self["Duplicate symbol"] = function() {
        t.define("foo", 0xab);
        buster.assert.exception(function() {
            t.define("foo", 0xcd);
        });
    };

    self["Scope"] = function() {
        t.define("foo", 0xab);
        t.begin();
        t.define("bar", 0xcd);
        buster.assert.equals(0xab, t.find("foo"));
        buster.assert.equals(0xcd, t.find("bar"));
        t.end();
        buster.assert.equals(0xab, t.find("foo"));
        buster.refute(t.has("bar"));
    };

    return self;

})());
