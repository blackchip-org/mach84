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
 
m84.mach = m84.mach || function(spec) {
    
    spec = spec || {};
    var self = {};
    
    self.mem = spec.mem;
    self.cpu = spec.cpu;
    self.frame_cycles = spec.frame_cycles || 100;
    self.halt = true;
    self.exception = undefined;
    
    self.run = function() {
        self.halt = false;
        self.cpu.exit = undefined;
        requestAnimationFrame(service);
    };
    
    var service = function() {
        var cycles = 0;
        try {
            while ( cycles < self.frame_cycles && !self.cpu.exit ) {
                self.cpu.execute();
                cycles += 1;
            }
        } catch ( error ) {
            self.cpu.exit = "trap";
            self.exception = error;
        }
        if ( !self.halt ) {
            requestAnimationFrame(service);
        }
    };
    
    return self;
};
 
