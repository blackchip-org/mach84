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

m84.ops = m84.ops || function(spec) {

    // ====== adc: Add with carry

    var adc = function(cpu, load) {
        var a1 = cpu.a;
        var a2 = load();
        var carry = ( cpu.c ) ? 1 : 0;
        if ( cpu.d ) {
            a1 = m84.util.from_bcd(a1);
            a2 = m84.util.from_bcd(a2);
        }
        var total = a1 + a2 + carry;
        cpu.c = (cpu.d && total > 99) || (!cpu.d && total > 0xff);
        if ( cpu.d ) {
            total = m84.util.to_bcd(total);
        } else {
            var signed =
                m84.util.to_signed(a1) +
                m84.util.to_signed(a2) +
                carry;
            cpu.v = signed < -128 || signed > 127;
        }
        cpu.a = total & 0xff;
        flags(cpu, cpu.a);
    };

    var adc_abs = function(cpu) { adc(cpu, cpu.load_abs); };
    var adc_abx = function(cpu) { adc(cpu, cpu.load_abx); };
    var adc_aby = function(cpu) { adc(cpu, cpu.load_aby); };
    var adc_imm = function(cpu) { adc(cpu, cpu.load_imm); };
    var adc_izx = function(cpu) { adc(cpu, cpu.load_izx); };
    var adc_izy = function(cpu) { adc(cpu, cpu.load_izy); };
    var adc_zp  = function(cpu) { adc(cpu, cpu.load_zp);  };
    var adc_zpx = function(cpu) { adc(cpu, cpu.load_zpx); };

    // ====== and: And with accumulator

    var and = function(cpu, load) {
        cpu.a = cpu.a & load();
        flags(cpu, cpu.a);
    };

    var and_abs = function(cpu) { and(cpu, cpu.load_abs); };
    var and_abx = function(cpu) { and(cpu, cpu.load_abx); };
    var and_aby = function(cpu) { and(cpu, cpu.load_aby); };
    var and_imm = function(cpu) { and(cpu, cpu.load_imm); };
    var and_izx = function(cpu) { and(cpu, cpu.load_izx); };
    var and_izy = function(cpu) { and(cpu, cpu.load_izy); };
    var and_zp  = function(cpu) { and(cpu, cpu.load_zp);  };
    var and_zpx = function(cpu) { and(cpu, cpu.load_zpx); };

    // ====== asl: Arithmetic shift left

    var asl = function(cpu, load) {
        var from = {};
        var value = load(from);
        cpu.c = (value & 0x80) !== 0;
        value = (value << 1) & 0xff;
        flags(cpu, value);
        from.store(value);
    };

    var asl_abs = function(cpu) { asl(cpu, cpu.load_abs); };
    var asl_abx = function(cpu) { asl(cpu, cpu.load_abx); };
    var asl_acc = function(cpu) { asl(cpu, cpu.load_acc); };
    var asl_zp  = function(cpu) { asl(cpu, cpu.load_zp);  };
    var asl_zpx = function(cpu) { asl(cpu, cpu.load_zpx); };

    // ====== bit: Test bits

    var bit = function(cpu, load) {
        value = load();
        cpu.z = (cpu.a & value) === 0;
        cpu.n = (value & 128) !== 0;
        cpu.v = (value & 64) !== 0;
    };

    var bit_abs = function(cpu) { bit(cpu, cpu.load_abs); };
    var bit_abx = function(cpu) { bit(cpu, cpu.load_abx); };
    var bit_zp  = function(cpu) { bit(cpu, cpu.load_zp);  };
    var bit_zpx = function(cpu) { bit(cpu, cpu.load_zpx); };

    // ====== Branches

    var branch = function(cpu, flag) {
        var displacement = cpu.fetchb();
        if ( flag ) {
            cpu.pc += m84.util.to_signed(displacement);
        }
    };

    var bcc = function(cpu) { branch(cpu, !cpu.c); }; // carry clear
    var bcs = function(cpu) { branch(cpu, cpu.c);  }; // carry set
    var beq = function(cpu) { branch(cpu, cpu.z);  }; // equal
    var bmi = function(cpu) { branch(cpu, cpu.n);  }; // minus
    var bne = function(cpu) { branch(cpu, !cpu.z); }; // not equal
    var bpl = function(cpu) { branch(cpu, !cpu.n); }; // plus
    var bra = function(cpu) { branch(cpu, true);   }; // always
    var bvc = function(cpu) { branch(cpu, !cpu.v); }; // overflow clear
    var bvs = function(cpu) { branch(cpu, cpu.v);  }; // overflow set

    // ====== brk: Break

    var brk = function(cpu, mem) {
        cpu.b = true;
        cpu.exit = "break";
        // Gobble up next byte
        cpu.fetchb();
    };

    // ====== cmp, cpx, cpy: Compare

    var compare = function(cpu, register, load) {
        var result = register - load();
        // c register set as if subtraction. Clear if 'borrow', otherwise set
        cpu.c = ( result >= 0 );
        flags(cpu, result);
    };

    var cmp_abs = function(cpu) { compare(cpu, cpu.a, cpu.load_abs); };
    var cmp_abx = function(cpu) { compare(cpu, cpu.a, cpu.load_abx); };
    var cmp_aby = function(cpu) { compare(cpu, cpu.a, cpu.load_aby); };
    var cmp_imm = function(cpu) { compare(cpu, cpu.a, cpu.load_imm); };
    var cmp_izx = function(cpu) { compare(cpu, cpu.a, cpu.load_izx); };
    var cmp_izy = function(cpu) { compare(cpu, cpu.a, cpu.load_izy); };
    var cmp_zp  = function(cpu) { compare(cpu, cpu.a, cpu.load_zp);  };
    var cmp_zpx = function(cpu) { compare(cpu, cpu.a, cpu.load_zpx); };

    var cpx_abs = function(cpu) { compare(cpu, cpu.x, cpu.load_abs); };
    var cpx_imm = function(cpu) { compare(cpu, cpu.x, cpu.load_imm); };
    var cpx_zp  = function(cpu) { compare(cpu, cpu.x, cpu.load_zp);  };

    var cpy_abs = function(cpu) { compare(cpu, cpu.y, cpu.load_abs); };
    var cpy_imm = function(cpu) { compare(cpu, cpu.y, cpu.load_imm); };
    var cpy_zp  = function(cpu) { compare(cpu, cpu.y, cpu.load_zp);  };

    // ===== dec: Decrement

    var dec = function(cpu, load) {
        var from = {};
        var value = (load(from) - 1) & 0xff;
        from.store(value);
        flags(cpu, value);
    };

    var dec_abs = function(cpu) { dec(cpu, cpu.load_abs); };
    var dec_abx = function(cpu) { dec(cpu, cpu.load_abx); };
    var dec_zp  = function(cpu) { dec(cpu, cpu.load_zp ); };
    var dec_zpx = function(cpu) { dec(cpu, cpu.load_zpx); };

    // ===== flags

    var clc = function(cpu) { cpu.c = false; }; // clear carry
    var cld = function(cpu) { cpu.d = false; }; // clear decimal mode (bcd)
    var cli = function(cpu) { cpu.i = false; }; // clear interrupt disable
    var clv = function(cpu) { cpu.v = false; }; // clear overflow
    var sec = function(cpu) { cpu.c = true;  }; // set carry
    var sed = function(cpu) { cpu.d = true;  }; // set decimal mode (bcd)
    var sei = function(cpu) { cpu.i = true;  }; // set interrupt disable

    // ===== eor: Exclusive or with accumulator

    var eor = function(cpu, load) {
        cpu.a = cpu.a ^ load();
        flags(cpu, cpu.a);
    };

    var eor_abs = function(cpu) { eor(cpu, cpu.load_abs); };
    var eor_abx = function(cpu) { eor(cpu, cpu.load_abx); };
    var eor_aby = function(cpu) { eor(cpu, cpu.load_aby); };
    var eor_imm = function(cpu) { eor(cpu, cpu.load_imm); };
    var eor_izx = function(cpu) { eor(cpu, cpu.load_izx); };
    var eor_izy = function(cpu) { eor(cpu, cpu.load_izy); };
    var eor_zp  = function(cpu) { eor(cpu, cpu.load_zp);  };
    var eor_zpx = function(cpu) { eor(cpu, cpu.load_zpx); };

    // ===== inc: Increment

    var inc = function(cpu, load) {
        var from = {};
        var value = (load(from) + 1) & 0xff;
        from.store(value);
        flags(cpu, value);
    };

    var inc_abs = function(cpu) { inc(cpu, cpu.load_abs); };
    var inc_abx = function(cpu) { inc(cpu, cpu.load_abx); };
    var inc_zp  = function(cpu) { inc(cpu, cpu.load_zp ); };
    var inc_zpx = function(cpu) { inc(cpu, cpu.load_zpx); };

    // ===== jmp: Jump

    var jmp_abs = function(cpu) { cpu.pc = cpu.fetchw() - 1; };
    var jmp_ind = function(cpu, mem) { cpu.pc = mem.loadw(cpu.fetchw()) - 1; };

    // ===== jsr: Jump to subroutine

    var jsr = function(cpu) {
        var address = cpu.fetchw();
        cpu.pushw(cpu.pc);
        cpu.pc = address - 1;
    };

    // ===== lda: Load accumulator

    var lda = function(cpu, load) {
        cpu.a = load();
        flags(cpu, cpu.a);
    };

    var lda_abs = function(cpu) { lda(cpu, cpu.load_abs); };
    var lda_abx = function(cpu) { lda(cpu, cpu.load_abx); };
    var lda_aby = function(cpu) { lda(cpu, cpu.load_aby); };
    var lda_imm = function(cpu) { lda(cpu, cpu.load_imm); };
    var lda_izx = function(cpu) { lda(cpu, cpu.load_izx); };
    var lda_izy = function(cpu) { lda(cpu, cpu.load_izy); };
    var lda_zp  = function(cpu) { lda(cpu, cpu.load_zp);  };
    var lda_zpx = function(cpu) { lda(cpu, cpu.load_zpx); };

    // ===== ldx: Load x register

    var ldx = function(cpu, load) {
        cpu.x = load();
        flags(cpu, cpu.x);
    };

    var ldx_abs = function(cpu) { ldx(cpu, cpu.load_abs); };
    var ldx_aby = function(cpu) { ldx(cpu, cpu.load_aby); };
    var ldx_imm = function(cpu) { ldx(cpu, cpu.load_imm); };
    var ldx_zp  = function(cpu) { ldx(cpu, cpu.load_zp);  };
    var ldx_zpy = function(cpu) { ldx(cpu, cpu.load_zpy); };

    // ===== ldy: Load y register

    var ldy = function(cpu, load) {
        cpu.y = load();
        flags(cpu, cpu.y);
    };

    var ldy_abs = function(cpu) { ldy(cpu, cpu.load_abs); };
    var ldy_abx = function(cpu) { ldy(cpu, cpu.load_abx); };
    var ldy_imm = function(cpu) { ldy(cpu, cpu.load_imm); };
    var ldy_zp  = function(cpu) { ldy(cpu, cpu.load_zp);  };
    var ldy_zpx = function(cpu) { ldy(cpu, cpu.load_zpx); };

    // ===== lsr: Logical shift right

    var lsr = function(cpu, load) {
        var from = {};
        var value = load(from);
        cpu.c = (value & 0x01) !== 0;
        value = (value >> 1) & 0xff;
        flags(cpu, value);
        from.store(value);
    };

    var lsr_abs = function(cpu) { lsr(cpu, cpu.load_abs); };
    var lsr_abx = function(cpu) { lsr(cpu, cpu.load_abx); };
    var lsr_acc = function(cpu) { lsr(cpu, cpu.load_acc); };
    var lsr_zp  = function(cpu) { lsr(cpu, cpu.load_zp);  };
    var lsr_zpx = function(cpu) { lsr(cpu, cpu.load_zpx); };

    // ===== nop: No operation

    var nop     = function() {};

    // ===== ora: Or with accumulator

    var ora = function(cpu, load) {
        cpu.a = cpu.a | load();
        flags(cpu, cpu.a);
    };

    var ora_abs = function(cpu) { ora(cpu, cpu.load_abs); };
    var ora_abx = function(cpu) { ora(cpu, cpu.load_abx); };
    var ora_aby = function(cpu) { ora(cpu, cpu.load_aby); };
    var ora_imm = function(cpu) { ora(cpu, cpu.load_imm); };
    var ora_izx = function(cpu) { ora(cpu, cpu.load_izx); };
    var ora_izy = function(cpu) { ora(cpu, cpu.load_izy); };
    var ora_zp  = function(cpu) { ora(cpu, cpu.load_zp);  };
    var ora_zpx = function(cpu) { ora(cpu, cpu.load_zpx); };

    // ===== sta: Store accumlator

    var sta_abs = function(cpu) { cpu.store_abs(cpu.a); };
    var sta_abx = function(cpu) { cpu.store_abx(cpu.a); };
    var sta_aby = function(cpu) { cpu.store_aby(cpu.a); };
    var sta_izx = function(cpu) { cpu.store_izx(cpu.a); };
    var sta_izy = function(cpu) { cpu.store_izy(cpu.a); };
    var sta_zp  = function(cpu) { cpu.store_zp (cpu.a); };
    var sta_zpx = function(cpu) { cpu.store_zpx(cpu.a); };

    // ===== stx: Store x register

    var stx_abs = function(cpu) { cpu.store_abs(cpu.x); };
    var stx_zp  = function(cpu) { cpu.store_zp (cpu.x); };
    var stx_zpy = function(cpu) { cpu.store_zpy(cpu.x); };

    // ===== sty: Store y register

    var sty_abs = function(cpu) { cpu.store_abs(cpu.y); };
    var sty_zp  = function(cpu) { cpu.store_zp (cpu.y); };
    var sty_zpx = function(cpu) { cpu.store_zpx(cpu.y); };

    // Helper functions
    var flags = function(cpu, value) {
        cpu.z = value === 0;
        cpu.n = (value & 128) !== 0;
    };

    // Information about each instruction
    var ops = spec.ops || [
        { name: "adc", mode: "abs", code: 0x6d, execute: adc_abs },
        { name: "adc", mode: "abx", code: 0x7d, execute: adc_abx },
        { name: "adc", mode: "aby", code: 0x79, execute: adc_aby },
        { name: "adc", mode: "imm", code: 0x69, execute: adc_imm },
        { name: "adc", mode: "izx", code: 0x61, execute: adc_izx },
        { name: "adc", mode: "izy", code: 0x71, execute: adc_izy },
        { name: "adc", mode: "zp",  code: 0x65, execute: adc_zp  },
        { name: "adc", mode: "zpx", code: 0x75, execute: adc_zpx },

        { name: "and", mode: "abs", code: 0x2d, execute: and_abs },
        { name: "and", mode: "abx", code: 0x3d, execute: and_abx },
        { name: "and", mode: "aby", code: 0x39, execute: and_aby },
        { name: "and", mode: "imm", code: 0x29, execute: and_imm },
        { name: "and", mode: "izx", code: 0x21, execute: and_izx },
        { name: "and", mode: "izy", code: 0x31, execute: and_izy },
        { name: "and", mode: "zp",  code: 0x25, execute: and_zp  },
        { name: "and", mode: "zpx", code: 0x35, execute: and_zpx },

        { name: "asl", mode: "abs", code: 0x0e, execute: asl_abs },
        { name: "asl", mode: "abx", code: 0x1e, execute: asl_abx },
        { name: "asl", mode: "acc", code: 0x0a, execute: asl_acc },
        { name: "asl", mode: "zp",  code: 0x06, execute: asl_zp  },
        { name: "asl", mode: "zpx", code: 0x16, execute: asl_zpx },

        { name: "bit", mode: "abs", code: 0x2c, execute: bit_abs },
        { name: "bit", mode: "abx", code: 0x3c, execute: bit_abx },
        { name: "bit", mode: "zp",  code: 0x24, execute: bit_zp  },
        { name: "bit", mode: "zpx", code: 0x34, execute: bit_zpx },

        { name: "brk", mode: "imp", code: 0x00, execute: brk },

        // branches
        { name: "bcc", mode: "rel", code: 0x90, execute: bcc },
        { name: "bcs", mode: "rel", code: 0xb0, execute: bcs },
        { name: "beq", mode: "rel", code: 0xf0, execute: beq },
        { name: "bmi", mode: "rel", code: 0x30, execute: bmi },
        { name: "bne", mode: "rel", code: 0xd0, execute: bne },
        { name: "bpl", mode: "rel", code: 0x10, execute: bpl },
        { name: "bra", mode: "rel", code: 0x80, execute: bra },
        { name: "bvc", mode: "rel", code: 0x50, execute: bvc },
        { name: "bvs", mode: "rel", code: 0x70, execute: bvs },

        { name: "cmp", mode: "abs", code: 0xcd, execute: cmp_abs },
        { name: "cmp", mode: "abx", code: 0xdd, execute: cmp_abx },
        { name: "cmp", mode: "aby", code: 0xd9, execute: cmp_aby },
        { name: "cmp", mode: "imm", code: 0xc9, execute: cmp_imm },
        { name: "cmp", mode: "izx", code: 0xc1, execute: cmp_izx },
        { name: "cmp", mode: "izy", code: 0xd1, execute: cmp_izy },
        { name: "cmp", mode: "zp",  code: 0xc5, execute: cmp_zp  },
        { name: "cmp", mode: "zpx", code: 0xd5, execute: cmp_zpx },

        { name: "dec", mode: "abs", code: 0xce, execute: dec_abs },
        { name: "dec", mode: "abx", code: 0xde, execute: dec_abx },
        { name: "dec", mode: "zp",  code: 0xc6, execute: dec_zp  },
        { name: "dec", mode: "zpx", code: 0xd6, execute: dec_zpx },

        { name: "cpx", mode: "abs", code: 0xec, execute: cpx_abs },
        { name: "cpx", mode: "imm", code: 0xe0, execute: cpx_imm },
        { name: "cpx", mode: "zp",  code: 0xe4, execute: cpx_zp  },

        { name: "cpy", mode: "abs", code: 0xcc, execute: cpy_abs },
        { name: "cpy", mode: "imm", code: 0xc0, execute: cpy_imm },
        { name: "cpy", mode: "zp",  code: 0xc4, execute: cpy_zp  },

        { name: "eor", mode: "abs", code: 0x4d, execute: eor_abs },
        { name: "eor", mode: "abx", code: 0x5d, execute: eor_abx },
        { name: "eor", mode: "aby", code: 0x59, execute: eor_aby },
        { name: "eor", mode: "imm", code: 0x49, execute: eor_imm },
        { name: "eor", mode: "izx", code: 0x41, execute: eor_izx },
        { name: "eor", mode: "izy", code: 0x51, execute: eor_izy },
        { name: "eor", mode: "zp",  code: 0x45, execute: eor_zp  },
        { name: "eor", mode: "zpx", code: 0x55, execute: eor_zpx },

        // Flags
        { name: "clc", mode: "imp", code: 0x18, execute: clc },
        { name: "cld", mode: "imp", code: 0xd8, execute: cld },
        { name: "cli", mode: "imp", code: 0x58, execute: cli },
        { name: "clv", mode: "imp", code: 0xb8, execute: clv },
        { name: "sec", mode: "imp", code: 0x38, execute: sec },
        { name: "sed", mode: "imp", code: 0xf8, execute: sed },
        { name: "sei", mode: "imp", code: 0x78, execute: sei },

        { name: "inc", mode: "abs", code: 0xee, execute: inc_abs },
        { name: "inc", mode: "abx", code: 0xfe, execute: inc_abx },
        { name: "inc", mode: "zp",  code: 0xe6, execute: inc_zp  },
        { name: "inc", mode: "zpx", code: 0xf6, execute: inc_zpx },

        { name: "jmp", mode: "abs", code: 0x4c, execute: jmp_abs },
        { name: "jmp", mode: "ind", code: 0x6c, execute: jmp_ind },

        { name: "jsr", mode: "abs", code: 0x20, execute: jsr },

        { name: "lda", mode: "abs", code: 0xad, execute: lda_abs },
        { name: "lda", mode: "abx", code: 0xbd, execute: lda_abx },
        { name: "lda", mode: "aby", code: 0xb9, execute: lda_aby },
        { name: "lda", mode: "imm", code: 0x89, execute: lda_imm },
        { name: "lda", mode: "izx", code: 0xa1, execute: lda_izx },
        { name: "lda", mode: "izy", code: 0xb1, execute: lda_izy },
        { name: "lda", mode: "zp",  code: 0xa5, execute: lda_zp  },
        { name: "lda", mode: "zpx", code: 0xb5, execute: lda_zpx },

        { name: "ldx", mode: "abs", code: 0xae, execute: ldx_abs },
        { name: "ldx", mode: "aby", code: 0xbe, execute: ldx_aby },
        { name: "ldx", mode: "imm", code: 0xa2, execute: ldx_imm },
        { name: "ldx", mode: "zp",  code: 0xa6, execute: ldx_zp  },
        { name: "ldx", mode: "zpy", code: 0xb6, execute: ldx_zpy },

        { name: "ldy", mode: "abs", code: 0xac, execute: ldy_abs },
        { name: "ldy", mode: "abx", code: 0xbc, execute: ldy_abx },
        { name: "ldy", mode: "imm", code: 0xa0, execute: ldy_imm },
        { name: "ldy", mode: "zp",  code: 0xa4, execute: ldy_zp  },
        { name: "ldy", mode: "zpx", code: 0xb4, execute: ldy_zpx },

        { name: "lsr", mode: "abs", code: 0x4e, execute: lsr_abs },
        { name: "lsr", mode: "abx", code: 0x5e, execute: lsr_abx },
        { name: "lsr", mode: "acc", code: 0x4a, execute: lsr_acc },
        { name: "lsr", mode: "zp",  code: 0x46, execute: lsr_zp  },
        { name: "lsr", mode: "zpx", code: 0x56, execute: lsr_zpx },

        { name: "nop", mode: "imp", code: 0xea, execute: nop },

        { name: "ora", mode: "abs", code: 0x0d, execute: ora_abs },
        { name: "ora", mode: "abx", code: 0x1d, execute: ora_abx },
        { name: "ora", mode: "aby", code: 0x19, execute: ora_aby },
        { name: "ora", mode: "imm", code: 0x09, execute: ora_imm },
        { name: "ora", mode: "izx", code: 0x01, execute: ora_izx },
        { name: "ora", mode: "izy", code: 0x11, execute: ora_izy },
        { name: "ora", mode: "zp",  code: 0x05, execute: ora_zp  },
        { name: "ora", mode: "zpx", code: 0x15, execute: ora_zpx },

        { name: "sta", mode: "abs", code: 0x8d, execute: sta_abs },
        { name: "sta", mode: "abx", code: 0x9d, execute: sta_abx },
        { name: "sta", mode: "aby", code: 0x99, execute: sta_aby },
        { name: "sta", mode: "izx", code: 0x81, execute: sta_izx },
        { name: "sta", mode: "izy", code: 0x91, execute: sta_izy },
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
        acc: 0,
        ind: 2,
        imm: 1,
        imp: 0,
        izx: 1,
        izy: 1,
        rel: 1,
        zp:  1,
        zpx: 1,
        zpy: 1
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
