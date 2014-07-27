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

buster.testCase("m84.ops.stack", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        map = m84.map();
        a = test.asm({mem: mem});
    };
    
    self["pha"] = function() {
        cpu.a = 0x12;
        a.pha();
        cpu.execute();
        buster.assert.equals(0x12, mem.loadb(0x01ff));
    };
    
    self["php"] = function() {
        cpu.sr(0xff);
        a.php();
        cpu.execute();
        buster.assert.equals(0xff, mem.loadb(0x01ff));
    };

    self["phx"] = function() {
        cpu.x = 0x12;
        a.phx();
        cpu.execute();
        buster.assert.equals(0x12, mem.loadb(0x01ff));
    };
    
    self["phy"] = function() {
        cpu.y = 0x12;
        a.phy();
        cpu.execute();
        buster.assert.equals(0x12, mem.loadb(0x01ff));
    };
    
    self["pla"] = function() {
        mem.storeb(0x01ff, 0x12);
        cpu.sp = 0xfe;
        a.pla();
        cpu.execute();
        buster.assert.equals(0x12, cpu.a);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["pla, zero"] = function() {
        mem.storeb(0x01ff, 0x00);
        cpu.sp = 0xfe;
        a.pla();
        cpu.execute();
        buster.assert.equals(0x00, cpu.a);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["pla, signed"] = function() {
        mem.storeb(0x01ff, 0xff);
        cpu.sp = 0xfe;
        a.pla();
        cpu.execute();
        buster.assert.equals(0xff, cpu.a);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["plp"] = function() {
        mem.storeb(0x01ff, 0xff);
        cpu.sp = 0xfe;
        a.plp();
        cpu.execute();
        buster.assert.equals(0xff, cpu.sr());
    };
    
    self["plx"] = function() {
        mem.storeb(0x01ff, 0x12);
        cpu.sp = 0xfe;
        a.plx();
        cpu.execute();
        buster.assert.equals(0x12, cpu.x);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["plx, zero"] = function() {
        mem.storeb(0x01ff, 0x00);
        cpu.sp = 0xfe;
        a.plx();
        cpu.execute();
        buster.assert.equals(0x00, cpu.x);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["plx, signed"] = function() {
        mem.storeb(0x01ff, 0xff);
        cpu.sp = 0xfe;
        a.plx();
        cpu.execute();
        buster.assert.equals(0xff, cpu.x);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["ply"] = function() {
        mem.storeb(0x01ff, 0x12);
        cpu.sp = 0xfe;
        a.ply();
        cpu.execute();
        buster.assert.equals(0x12, cpu.y);
        buster.refute(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["ply, zero"] = function() {
        mem.storeb(0x01ff, 0x00);
        cpu.sp = 0xfe;
        a.ply();
        cpu.execute();
        buster.assert.equals(0x00, cpu.y);
        buster.assert(cpu.z);
        buster.refute(cpu.n);
    };
    
    self["ply, signed"] = function() {
        mem.storeb(0x01ff, 0xff);
        cpu.sp = 0xfe;
        a.ply();
        cpu.execute();
        buster.assert.equals(0xff, cpu.y);
        buster.refute(cpu.z);
        buster.assert(cpu.n);
    };
    
    self["tsx"] = function() {
        cpu.sp = 0x12;
        a.tsx();
        cpu.execute();
        buster.assert.equals(0x12, cpu.x);
    };
    
    self["txs"] = function() {
        cpu.x = 0x12;
        a.txs();
        cpu.execute();
        buster.assert.equals(0x12, cpu.sp);
    };
    
    return self;
    
})());
