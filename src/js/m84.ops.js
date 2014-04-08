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

m84.ops = m84.ops || function(spec) {

    // Executors for each instruction
    var lda_abs = function(cpu, mem) {
        cpu.a = mem.loadb(cpu.fetchw());
        cpu.z = cpu.a === 0;
        cpu.n = (cpu.a & 128) !== 0;
    };

    var lda_imm = function(cpu, mem) {
        cpu.a = cpu.fetchb();
        cpu.z = cpu.a === 0;
        cpu.n = (cpu.a & 128) !== 0;
    };

    var lda_zp = function(cpu, mem) {
        cpu.a = mem.loadb(cpu.fetchb());
        cpu.z = cpu.a === 0;
        cpu.n = (cpu.a & 128) !== 0;
    };

    var sta_abs = function(cpu, mem) {
        mem.storeb(cpu.fetchw(), cpu.a);
    };

    var sta_zp = function(cpu, mem) {
        mem.storeb(cpu.a, cpu.fetchb());
    };

    // Information about each instruction
    var ops = spec.ops || [
        { name: "lda", mode: "abs", code: 0xad, execute: lda_abs },
        { name: "lda", mode: "imm", code: 0x89, execute: lda_imm },
        { name: "lda", mode: "zp",  code: 0xa5, execute: lda_zp  },
        { name: "sta", mode: "zp",  code: 0x85, execute: sta_zp  },
        { name: "sta", mode: "abs", code: 0x8d, execute: sta_abs }
    ];

    // Length of arguments depending on addressing mode
    var lengths = {
        abs: 2,
        abx: 2,
        aby: 2,
        ind: 2,
        imm: 1,
        zp:  1,
        zpx: 1,
        zpy: 1,
        izx: 1,
        izy: 1,
        imp: 0,
        acc: 0
    };

    // Create a lookup table via opcode
    var table = {};

    _.each(ops, function(i) {
        // Make sure an opcode isn't duplicated by accident
        if ( table[i.code] ) {
            throw new Error("Duplicate opcode " + m84.util.hexb(i.code));
        }

        // Fill in the length information for each instruction
        var length = lengths[i.mode];
        if ( _.isUndefined(length) ) {
            throw new Error("Invalid addressing mode (" + i.mode + ") for " +
                    "opcode " + m84.util.hexb(i.code));
        }
        i.length = length;
        table[i.code] = i;
    });

    // For any opcodes not filled in, create either a no-op exectuor or
    // one that throws an exception
    var illegal_instruction = function(opcode) {
        return function() {
            throw new Error("Illegal instruction: " + m84.util.hexb(opcode));
        };
    };
    var noop = function() {};

    for ( var opcode = 0; opcode <= 0xff; opcode++ ) {
        if ( !table[opcode] ) {
            var executor;
            if ( spec.debug || spec.debug_illegal_instruction ) {
                executor = illegal_instruction(opcode);
            } else {
                executor = noop;
            }
            table[opcode] = {
                name: "?" + m84.util.hexb(opcode),
                mode: "imp",
                code: opcode,
                length: 0,
                execute: executor,
                illegal: true
            };
        }
    }

    return table;
};



