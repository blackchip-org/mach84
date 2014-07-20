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

/* jshint sub: true */

buster.testCase("m84.ops.adc", (function() {

    var self = {};
    var mem;
    var cpu;
    var a;

    self.setUp = function() {
        mem = m84.mem();
        cpu = m84.cpu({mem: mem});
        a = m84.asm({mem: mem});
        cpu.pc = 0x7fff;
        a.pc = 0x8000;
    };

    self["bcc, yes"] = function() {
        cpu.c = false;
        a.bcc(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bcc, no"] = function() {
        cpu.c = true;
        a.bcc(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["bcs, yes"] = function() {
        cpu.c = true;
        a.bcs(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bcs, no"] = function() {
        cpu.c = false;
        a.bcs(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["beq, yes"] = function() {
        cpu.z = true;
        a.beq(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["beq, no"] = function() {
        cpu.z = false;
        a.beq(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["bmi, yes"] = function() {
        cpu.n = true;
        a.bmi(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bmi, no"] = function() {
        cpu.n = false;
        a.bmi(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["bne, yes"] = function() {
        cpu.z = false;
        a.bne(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bne, no"] = function() {
        cpu.z = true;
        a.bne(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["bpl, yes"] = function() {
        cpu.n = false;
        a.bpl(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bra"] = function() {
        a.bra(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bvc, yes"] = function() {
        cpu.v = false;
        a.bvc(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bvc, no"] = function() {
        cpu.v = true;
        a.bvc(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["bvs, yes"] = function() {
        cpu.v = true;
        a.bvs(0x8011);
        cpu.execute();
        buster.assert.equals(0x8010, cpu.pc);
    };

    self["bvs, no"] = function() {
        cpu.v = false;
        a.bvs(0x8011);
        cpu.execute();
        buster.assert.equals(0x8001, cpu.pc);
    };

    self["bra, backwards"] = function() {
        a.bra(0x7ff1);
        cpu.execute();
        buster.assert.equals(0x7ff0, cpu.pc);
    };

    return self;

})());
