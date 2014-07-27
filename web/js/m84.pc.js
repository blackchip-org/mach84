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

m84.pc = m84.pc || function(self, spec) {

    spec = spec || {};
    var mem = spec.mem || m84.mem(spec);
    self = self || {};

    self.pc = 0;

    self.fetchb = function() {
        self.pc += 1;
        return mem.loadb(self.pc);
    };

    self.fetchw = function() {
        self.pc += 2;
        return mem.loadw(self.pc - 1);
    };

    self.nextb = function() {
        self.pc += 1;
        return mem.loadb(self.pc - 1);
    };

    self.nextw = function() {
        self.pc += 2;
        return mem.loadw(self.pc - 2);
    };

    self.storeb = function(value) {
        self.pc += 1;
        mem.storew(self.pc - 1, value);
    };

    self.storew = function(value) {
        self.pc += 2;
        mem.storew(self.pc - 2, value);
    };

    if ( spec.debug || spec.debug_pc ) {
        self = m84.debug.pc(self);
    }

    return self;
};
