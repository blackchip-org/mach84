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
 * 6502 central processing unit.
 *
 * @class m84.cpu
 * @uses m84.pc
 */
m84.cpu = m84.cpu || function(spec) {

    spec = spec || {};
    var mem = spec.mem || m84.mem(spec);
    var op = spec.op || m84.op(spec);

    var self = {};

    self = m84.pc(spec);

    /**
     * Accumulator register.
     *
     * @property a
     * @type byte
     */
    self.a = 0;

    /**
     * X index register.
     *
     * @property x
     * @type byte
     */
    self.x = 0;

    /**
     * Y index register.
     *
     * @property y
     * @type byte
     */
    self.y = 0;

    /**
     * Stack pointer.
     *
     * @property sp
     * @type byte
     */
    self.sp = 0;

    /**
     * Carry flag, bit 0.
     *
     * - Addition: Set if there a left over carry bit after performing the
     *   operation. This flag should be cleared before starting
     *   addition. If set, this adds one to the result.
     * - Subtraction: Acts as the 'borrow' flag and is the inverse of the
     *   carry. Clear if there is a bit that needs to be borrowed after
     *   performing the operation. This flag should be set before starting
     *   subtraction. If clear, this subtracts one from the result.
     * - Shifting: Holds the value of the bit that was shifted out.
     *
     * @property c
     * @type boolean
     */
    self.c = false;

    /**
     * Zero flag, bit 1.
     *
     * Set when a reigster is loaded with a zero value.
     *
     * @property z
     * @type boolean
     */
    self.z = false;

    /**
     * Interrupt disable flag, bit 2.
     *
     * If set, the IRQ line is ignored.
     *
     * @property i
     * @type boolean
     */
    self.i = false;

    /**
     * Decimal math (BCD) flag, bit 3.
     *
     * When set, addition and subtraction is based on BCD numbers instead
     * of binary numbers. When clear, ``$09 + $01 = $0A``, and when set,
     * ``$09 + $01 = $10``.
     *
     * @property d
     * @type boolean
     */
    self.d = false;

    /**
     * Break flag, bit 4.
     *
     * In the Mach-84, this flag is set when a break instruction is
     * encountered and the CPU is stopped. On a real 6502, this generates
     * an interrupt.
     *
     * @property b
     * @type boolean
     */
    self.b = false;

    /**
     * Overflow flag, bit 6.
     *
     * This flag is set when an arithmetic operation causes an overflow on
     * a signed value. For example, the operation ``$7F + $01`` sets the
     * bit since the answer, 128, is too large to fit in a single signed
     * byte.
     *
     * @property v
     * @type boolean
     */
    self.v = false;

    /**
     * Sign (negative) flag, bit 7.
     *
     * Set if the value loaded into a register has bit 7 set.
     *
     * @property n
     * @type boolean
     */
    self.n = false;

    /**
     * Sets or gets all flag values via the status register.
     *
     * @method sr
     * @param {byte} [value] if specified, sets the value of the status
     * register to the value
     * @return {byte|undefined} if ```value``` is not specified, gets the value
     * of the status register
     */
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

    self.execute = function() {
        op[self.fetchb()].execute(self, mem);
    };

    /**
     * String representation of the CPU status.
     *
     * @method status
     * @return {string} in the form of:
     * <pre>
     *  pc  sr ac xr yr sp  n v - b d i z c
     * 0000 20 00 00 00 00  . . * . . . . .
     * </pre>
     */
    self.status = function() {
        var bit = function(b) { return b ? "*" : "."; };

        return " pc  sr ac xr yr sp  n v - b d i z c\n" +
            m84.util.hexw(self.pc)  + " " +
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

    return self;
};

