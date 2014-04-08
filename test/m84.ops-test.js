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

buster.testCase("m84.ops", (function() {

    var self = {};
    var executor;

    self.setUp = function() {
        executor = function() {
            return "answer";
        };
    };

    self["Correct opcode table"] = function() {
        var ops = [
            { name: "lda", mode: "imm", code: 0x89, execute: executor }
        ];
        var lookup = m84.ops({ops: ops});
        var i = lookup[0x89];
        buster.assert(i);
        buster.assert.equals(i.name, "lda");
        buster.assert.equals(i.mode, "imm");
        buster.assert.equals(i.code, 0x89);
        buster.assert.equals(i.execute(), "answer");
        buster.assert.equals(i.length, 1);
    };

    self["Duplicate opcode"] = function() {
        var ops = [
            { name: "lda", mode: "imm", code: 0x89, execute: executor },
            { name: "ldx", mode: "imm", code: 0x89, execute: executor }
        ];
        buster.assert.exception(function() {
            m84.ops({ops: ops});
        });
    };

    self["Invalid addressing mode"] = function() {
        var ops = [
            { name: "lda", mode: "xxx", code: 0x89, execute: executor },
        ];
        buster.assert.exception(function() {
            m84.ops({ops: ops});
        });
    };

    self["Illegal instruction"] = function() {
        var lookup = m84.ops({ops: []});
        var i = lookup[0xab];
        buster.assert(i);
        buster.assert.equals(i.name, "?ab");
        buster.assert.equals(i.mode, "imp");
        buster.assert.equals(i.code, 0xab);
        buster.assert.equals(i.length, 0);
        buster.assert(i.illegal);
    };

    self["No-op on illegal instruction"] = function() {
        var lookup = m84.ops({ops: []});
        var i = lookup[0xab];
        i.execute();
        buster.assert(true);
    };

    self["Exception on illegal instruction"] = function() {
        var lookup = m84.ops({ops: [], debug: true});
        var i = lookup[0xab];
        buster.assert.exception(function() {
            i.execute();
        });
    };

    return self;

})());
