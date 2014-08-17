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
m84.asm = m84.asm || function(spec) {

    spec = spec || {};
    var self = {};
    var parser = new asm.Parser();
    var errors = [];

    parser.trace = function(err, hash) {
        errors.push(err);
    };

    parser.yy.ops = spec.ops || m84.ops();
    lookup = {};
    _.each(parser.yy.ops, function(op) {
        if ( op.illegal ) {
            return;
        }
        lookup[op.name] = lookup[op.name] || {};
        lookup[op.name][op.mode] = op.code;
    });
    parser.yy.lookup = lookup;
    parser.yy.errors = errors;

    self.parse = function(text) {
        errors.length = 0;
        var ast = parser.parse(text);
        return { ast: ast, errors: errors };
    };

    return self;
};
