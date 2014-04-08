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
 * @module m84
 */
var m84 = m84 || {};

/**
 * @class m84.asm
 */
m84.asm = m84.asm || function(spec) {

    var mem = spec.mem || m84.mem(spec);
    var ops = spec.ops || m84.ops(spec);

    var self = {};

    m84.pc(self);

    var init = function() {
        _.each(ops, function(op) {
            if ( op.illegal ) {
                return;
            }
            var fname = op.name + "_" + op.mode;
            self[fname] = assemblers[op.length](op);
        });
    };

    var arg0 = function(op) {
        return function() {
            self.storeb(op.code);
        };
    };

    var arg1 = function(op) {
        return function(arg) {
            self.storeb(op.code);
            self.storeb(arg);
        };
    };

    var arg2 = function(op) {
        return function(arg) {
            self.storeb(op.code);
            self.storew(arg);
        };
    };

    var assemblers = [arg0, arg1, arg2];

    init();
    return self;

};

