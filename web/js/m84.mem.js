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

m84.mem = m84.mem || function(spec) {

    spec = spec || {};
    mem = spec.array || [];
    var self = {};
    self.array = mem;

    self.loadb = function(address) {
        return mem[address] || 0;
    };

    /**
     * Loads a byte from zero page memory.
     *
     * This is exactly the same as ``loadb``, but if debugging is enabled,
     * an exception is thrown if the address is not within page zero.
     *
     * @method loadb_zp
     * @param {byte} address the memory location to load.
     * @return {byte} the value at the memory location.
     */
    self.loadb_zp = self.loadb;

    /**
     * Stores a byte to memory.
     *
     * @method storeb
     * @param {word} address the memory location to store.
     * @param {byte} value the value to store.
     */
    self.storeb = function(address, value) {
        mem[address] = value;
    };

    /**
     * Stores a byte to zero page memory.
     *
     * This is exactly the same as ``storeb``, but if debugging is enabled,
     * an exception is thrown if the address is not within page zero.
     *
     * @method storeb_zp
     * @param {byte} address the memory location to store.
     * @param {byte} value the value to store.
     */
    self.storeb_zp = self.storeb;

    self.loadb_i = function(address, index) {
        return mem[(address + index) & 0xffff];
    };

    self.storeb_i = function(address, index, value) {
        mem[(address + index) & 0xffff] = value;
    };

    self.loadb_zpi = function(address, index) {
        return mem[(address + index) & 0xff];
    };

    self.storeb_zpi = function(address, index, value) {
        mem[(address + index) & 0xff] = value;
    };

    self.loadb_izx = function(address, index) {
        return mem[self.loadw_zp(address + index)];
    };

    self.storeb_izx = function(address, index, value) {
        mem[self.loadw_zp(address + index)] = value;
    };

    self.loadb_izy = function(address, index, value) {
        return mem[self.loadw_zp(address) + index];
    };

    self.storeb_izy = function(address, index, value) {
        mem[self.loadw_zp(address) + index] = value;
    };

    /**
     * Loads a word from memory.
     *
     * If the word at ``$ffff`` is loaded, the second byte wraps around to
     * ``$0000``.
     *
     * @method loadw
     * @param {word} address the memory location to load.
     * @return {word} the litte endian value at the memory location.
     */
    self.loadw = function(address) {
        return (mem[address] + (mem[(address + 1) & 0xffff] << 8)) || 0;
    };

    /**
     * Loads a word from memory in page zero.
     *
     * This is exactly like ``loadw`` except that if a word is loaded at
     * ``$ff``, the second byte wraps around to ``$00``.
     *
     * @method loadw_zp
     * @param {byte} address the memory location to load.
     * @return {word} the little endian value at the memory location.
     */
    self.loadw_zp = function(address) {
        return (mem[address] + (mem[(address + 1) & 0xff] << 8)) || 0;
    };

    /**
     * Stores a word to memory.
     *
     * If the word is stored to ``$ffff``, the second byte wraps around to
     * ``$0000``.
     *
     * @method storew
     * @param {word} address the memory location to store.
     * @param {word} value the value to store which will be converted to
     * little endian.
     */
    self.storew = function(address, value) {
        mem[address] = value & 0xff;
        mem[(address + 1) & 0xffff] = value >> 8;
    };

    /**
     * Stores a word to memory in page zero.
     *
     * This is exactly like ``storew`` except that if a word is stored at
     * ``$ff``, the second byte wraps around to ``$00``.
     *
     * @method storew_zp
     * @param {byte} address the memory location to store.
     * @param {word} value the value to store which will be converted to
     * little endian.
     */
    self.storew_zp = function(address, value) {
        mem[address] = value & 0xff;
        mem[(address + 1) & 0xff] = value >> 8;
    };

    if ( spec.debug || spec.debug_mem ) {
        self = m84.debug.mem(self);
    }

    return self;
};
