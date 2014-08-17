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

m84.cpu = m84.cpu || function(spec) {

    spec = spec || {};
    var mem = spec.mem || m84.mem(spec);
    var ops = spec.ops || m84.ops(spec).opcodes;
    var map = spec.map || m84.map(spec);

    var self = {};

    m84.pc(self, spec);

    var init = function() {
        // FIXME: Vector to cold start
        self.reset();
    };

    self.a = 0;
    self.x = 0;
    self.y = 0;
    self.sp = 0xff;
    self.c = false;
    self.z = false;
    self.i = false;
    self.d = false;
    self.b = false;
    self.v = false;
    self.n = false;

    self.sr = function(value) {
        if ( _.isUndefined(value) ) {
            return (self.c ? 1   : 0) |
                   (self.z ? 2   : 0) |
                   (self.i ? 4   : 0) |
                   (self.d ? 8   : 0) |
                   (self.b ? 16  : 0) |
                   32 |
                   (self.v ? 64  : 0) |
                   (self.n ? 128 : 0);
        } else {
            self.c = (value & 1)   !== 0;
            self.z = (value & 2)   !== 0;
            self.i = (value & 4)   !== 0;
            self.d = (value & 8)   !== 0;
            self.b = (value & 16)  !== 0;
            self.v = (value & 64)  !== 0;
            self.n = (value & 128) !== 0;
        }
    };

    self.exit = undefined;

    self.execute = function() {
        ops[self.fetchb()].execute(self, mem);
    };

    self.reset = function() {
        // FIXME: Vector to warm start
        self.pc = map.PROGRAM - 1;
    };

    self.pushb = function(value) {
        mem.storeb(self.sp + map.STACK, value);
        self.sp = (self.sp - 1) & 0xff;
    };

    self.pushw = function(value) {
        self.pushb((value & 0xff00) >> 8);
        self.pushb(value & 0x00ff);
    };

    self.pullb = function() {
        self.sp = (self.sp + 1) & 0xff;
        return mem.loadb(self.sp + map.STACK);
    };

    self.pullw = function() {
        return self.pullb() | (self.pullb() << 8);
    };

    self.status = function() {
        var bit = function(b) { return b ? "*" : "."; };

        return " pc  sr ac xr yr sp  n v - b d i z c\n" +
            m84.util.hexw(self.pc)   + " " +
            m84.util.hexb(self.sr()) + " " +
            m84.util.hexb(self.a)    + " " +
            m84.util.hexb(self.x)    + " " +
            m84.util.hexb(self.y)    + " " +
            m84.util.hexb(self.sp)   + " " +
            " " +
            bit(self.n) + " " +
            bit(self.v) + " " +
            bit(true)   + " " +
            bit(self.b) + " " +
            bit(self.d) + " " +
            bit(self.i) + " " +
            bit(self.z) + " " +
            bit(self.c);
    };

    self.load_abs = function(from) {
        var address = self.fetchw();
        if ( from ) {
            from.store = function(value) {
                mem.storeb(address, value);
            };
        }
        return mem.loadb(address);
    };

    self.load_abx = function(from) {
        var address = self.fetchw();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_i(address, self.x, value);
            };
        }
        return mem.loadb_i(address, self.x);
    };

    self.load_aby = function(from) {
        var address = self.fetchw();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_i(address, self.y, value);
            };
        }
        return mem.loadb_i(address, self.y);
    };

    self.load_acc = function(from) {
        if ( from ) {
            from.store = function(value) {
                self.a = value;
            };
        }
        return self.a;
    };

    self.load_imm = function() {
        return self.fetchb();
    };

    self.load_izx = function(from) {
        var address = self.fetchb();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_izx(address, self.x, value);
            };
        }
        return mem.loadb_izx(address, self.x);
    };

    self.load_izy = function(from) {
        var address = self.fetchb();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_izy(address, self.y);
            };
        }
        return mem.loadb_izy(address, self.y);
    };

    self.load_zp = function(from) {
        var address = self.fetchb();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_zp(address, value);
            };
        }
        return mem.loadb_zp(address);
    };

    self.load_zpx = function(from) {
        var address = self.fetchb();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_zpi(address, self.x, value);
            };
        }
        return mem.loadb_zpi(address, self.x);
    };

    self.load_zpy = function(from) {
        var address = self.fetchb();
        if ( from ) {
            from.store = function(value) {
                mem.storeb_zpi(address, self.y, value);
            };
        }
        return mem.loadb_zpi(address, self.y);
    };

    self.store_abs = function(value) {
        mem.storeb(self.fetchw(), value);
    };

    self.store_abx = function(value) {
        mem.storeb_i(self.fetchw(), self.x, value);
    };

    self.store_aby = function(value) {
        mem.storeb_i(self.fetchw(), self.y, value);
    };

    self.store_izx = function(value) {
        mem.storeb_izx(self.fetchb(), self.x, value);
    };

    self.store_izy = function(value) {
        mem.storeb_izy(self.fetchb(), self.y, value);
    };

    self.store_zp = function(value) {
        mem.storeb_zp(self.fetchb(), value);
    };

    self.store_zpx = function(value) {
        mem.storeb_zpi(self.fetchb(), self.x, value);
    };

    self.store_zpy = function(value) {
        mem.storeb_zpi(self.fetchb(), self.y, value);
    };

    init();
    return self;
};
