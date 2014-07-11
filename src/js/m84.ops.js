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
        flags(cpu, cpu.a);
    };

    var lda_abx = function(cpu, mem) {
        cpu.a = mem.loadb_i(cpu.fetchw(), cpu.x);
        flags(cpu, cpu.a);
    };

    var lda_aby = function(cpu, mem) {
        cpu.a = mem.loadb_i(cpu.fetchw(), cpu.y);
        flags(cpu, cpu.a);
    };

    var lda_imm = function(cpu, mem) {
        cpu.a = cpu.fetchb();
        flags(cpu, cpu.a);
    };

    var lda_izx = function(cpu, mem) {
        cpu.a = mem.loadb_izx(cpu.fetchb(), cpu.x);
        flags(cpu, cpu.a);
    };

    var lda_zp = function(cpu, mem) {
        cpu.a = mem.loadb_zp(cpu.fetchb());
        flags(cpu, cpu.a);
    };

    var lda_zpx = function(cpu, mem) {
        cpu.a = mem.loadb_zpi(cpu.fetchb(), cpu.x);
        flags(cpu, cpu.a);
    };

    var sta_abs = function(cpu, mem) {
        mem.storeb(cpu.fetchw(), cpu.a);
    };

    var sta_abx = function(cpu, mem) {
        mem.storeb_i(cpu.fetchw(), cpu.x, cpu.a);
    };

    var sta_aby = function(cpu, mem) {
        mem.storeb_i(cpu.fetchw(), cpu.y, cpu.a);
    };

    var sta_izx = function(cpu, mem) {
        mem.storeb_izx(cpu.fetchb(), cpu.x, cpu.a);
    };

    var sta_zp = function(cpu, mem) {
        mem.storeb_zp(cpu.fetchb(), cpu.a);
    };

    var sta_zpx = function(cpu, mem) {
        mem.storeb_zpi(cpu.fetchb(), cpu.x, cpu.a);
    };

    var stx_abs = function(cpu, mem) {
        mem.storeb(cpu.fetchw(), cpu.x);
    };

    var stx_zp = function(cpu, mem) {
        mem.storeb_zp(cpu.fetchb(), cpu.x);
    };

    var stx_zpy = function(cpu, mem) {
        mem.storeb_zpi(cpu.fetchb(), cpu.y, cpu.x);
    };

    var sty_abs = function(cpu, mem) {
        mem.storeb(cpu.fetchw(), cpu.y);
    };

    var sty_zp = function(cpu, mem) {
        mem.storeb_zp(cpu.fetchb(), cpu.y);
    };

    var sty_zpx = function(cpu, mem) {
        mem.storeb_zpi(cpu.fetchb(), cpu.x, cpu.y);
    };

    // Helper functions
    var flags = function(cpu, value) {
        cpu.z = value === 0;
        cpu.n = (value & 128) !== 0;
    };

    // Information about each instruction
    var ops = spec.ops || [
        { name: "lda", mode: "abs", code: 0xad, execute: lda_abs },
        { name: "lda", mode: "abx", code: 0xbd, execute: lda_abx },
        { name: "lda", mode: "aby", code: 0xb9, execute: lda_aby },
        { name: "lda", mode: "imm", code: 0x89, execute: lda_imm },
        { name: "lda", mode: "izx", code: 0xa1, execute: lda_izx },
        { name: "lda", mode: "zp",  code: 0xa5, execute: lda_zp  },
        { name: "lda", mode: "zpx", code: 0xb5, execute: lda_zpx },
        { name: "sta", mode: "abs", code: 0x8d, execute: sta_abs },
        { name: "sta", mode: "abx", code: 0x9d, execute: sta_abx },
        { name: "sta", mode: "aby", code: 0x99, execute: sta_aby },
        { name: "sta", mode: "izx", code: 0x81, execute: sta_izx },
        { name: "sta", mode: "zp",  code: 0x85, execute: sta_zp  },
        { name: "sta", mode: "zpx", code: 0x95, execute: sta_zpx },
        { name: "stx", mode: "abs", code: 0x8e, execute: stx_abs },
        { name: "stx", mode: "zp",  code: 0x86, execute: stx_zp  },
        { name: "stx", mode: "zpy", code: 0x96, execute: stx_zpy },
        { name: "sty", mode: "abs", code: 0x8c, execute: sty_abs },
        { name: "sty", mode: "zp",  code: 0x84, execute: sty_zp  },
        { name: "sty", mode: "zpx", code: 0x94, execute: sty_zpx }
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
