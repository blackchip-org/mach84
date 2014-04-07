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
 * @module m84.mem
 */
var m84 = m84 || {};
m84.mem = m84.mem || {};

/**
 * Memory management unit.
 *
 * This currently doesn't really do anything, but can be extended in the future
 * to add support for banking.
 *
 * @class m84.mem.mmu
 */
m84.mem.mmu = m84.mem.mmu || function(mem) {

    mem = mem || [];
    var self = {};

    /**
     * Loads a byte value from memory.
     *
     * @method loadb
     * @param {word} address the memory location to load.
     * @return {byte} the value at the memory location.
     */
    self.loadb = function(address) {
        return mem[address];
    };

    /**
     * Stores a byte value to memory.
     *
     * @method storeb
     * @param {word} address the memory location to store.
     * @param {byte} value the value to store.
     */
    self.storeb = function(address, value) {
        mem[address] = value;
    };

    /**
     * Loads a word value from memory.
     *
     * @method loadw
     * @param {word} address the memory location to load.
     * @return {word} the litte endian value at the memory location.
     */
    self.loadw = function(address) {
        return mem[address] + (mem[address + 1] << 8);
    };

    /**
     * Stores a word value to memory.
     *
     * @method storew
     * @param {word} address the memory location to store.
     * @param {word} value the value to store which will be converted to
     * little endian.
     */
    self.storew = function(address, value) {
        mem[address] = value & 0xff;
        mem[address + 1] = value >> 8;
    };

    return self;
};

/**
 * Debugging memory management unit.
 *
 * Throws exceptions if either the address or value parameters are out
 * of bounds.
 *
 * @class m84.mem.mmu.debug
 * @extends m84.mem.mmu
 */
m84.mem.mmu.debug = m84.mem.mmu.debug || function(mem) {

    var parent = m84.mem.mmu(mem);
    var self = {};

    self.loadb = function(address) {
        m84.util.assertw(address);
        return parent.loadb(address);
    };

    self.storeb = function(address, value) {
        m84.util.assertw(address);
        m84.util.assertb(value);
        return parent.storeb(address, value);
    };

    self.loadw = function(address) {
        m84.util.assertw(address);
        return parent.loadw(address);
    };

    self.storew = function(address, value) {
        m84.util.assertw(address);
        m84.util.assertw(value);
        return parent.storew(address, value);
    };

    return self;
};
