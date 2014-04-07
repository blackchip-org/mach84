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

/**
 * @module m84
 */
var m84 = m84 || {};

/**
 * Utility functions.
 *
 * @class m84.util
 * @static
 */
m84.util = m84.util || (function() {

    var self = {};

    /**
     * Repeats a strings a certain amount of times.
     *
     * @method repeat
     * @param {str} str the string to repeat
     * @param {int} count the amount of times to repeat the string
     * @returns the string ```str``` repeated ```count``` times. If count
     * is less than or equal to zero, an empty string is returned.
     */
    self.repeat = function(str, count) {
        if ( count <= 0 ) {
            return "";
        }
        return Array(count + 1).join(str);
    };

    var toHex = function(value, length) {
        var hex = value.toString(16);
        return self.repeat("0", length - hex.length) + hex;
    };

    /**
     * Converts a byte value to a hexadecimal string value.
     *
     * @method hexb
     * @param {byte} value value to convert
     * @return value as a hexadecimal string value padded with zeros.
     */
    self.hexb = function(value) {
        return toHex(value, 2);
    };

    /**
     * Converts a word value to a hexadecimal string value.
     *
     * @method hexw
     * @param {word} value value to convert
     * @return value as a hexadecimal string value padded with zeros.
     */
    self.hexw = function(val) {
        return toHex(val, 4);
    };

    /**
     * Throws an exception if the value is not a valid byte.
     *
     * Byte is valid if it between 0 and 0xff.
     *
     * @method assertb
     * @param {byte} value the value to check
     */
    self.assertb = function(value) {
        if ( value < 0 || value > 0xff ) {
            throw new Error("Invalid byte value: $" + parseInt(value, 16));
        }
    };

    /**
     * Throws an exception if the value is not a valid word.
     *
     * Word is valid if it is between 0 and 0xffff.
     *
     * @method assertw
     * @param {word} value the value to check
     */
    self.assertw = function(value) {
        if ( value < 0 || value > 0xffff ) {
            throw new Error("Invalid word value: $" + parseInt(value, 16));
        }
    };

    return self;

})();


