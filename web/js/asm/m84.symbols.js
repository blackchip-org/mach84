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

var m84 = m84 || {};
m84.symbols = m84.symbols || function() {

    var self = {};
    var scopes = [{}];

    self.has = function(symbol) {
        var result = false;
        _.each(scopes, function(scope) {
            if ( _.has(scope, symbol) ) {
                result = true;
                return false;
            }
        });
        return result;
    }

    self.find = function(symbol) {
        var result;
        _.each(scopes, function(scope) {
            if ( _.has(scope, symbol) ) {
                result = scope[symbol];
                return false;
            }
        });
        return result;
    };

    self.define = function(symbol, value) {
        if ( self.has(symbol) ) {
            throw new Error("Symbol already defined: " + symbol);
        }
        scopes[0][symbol] = value;
    };

    self.begin = function() {
        scopes.unshift({});
    };

    self.end = function() {
        scopes.shift();
    };

    return self;

};
