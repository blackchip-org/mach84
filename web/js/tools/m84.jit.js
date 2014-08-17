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
m84.jit = m84.jit || function(spec) {

    spec = spec || {};

    var self = {};
    var ops;
    var lengths;

    var mem = m84.mem();
    var origin = spec.origin || 0;
    var seg = {
        text: m84.pc({}, {mem: mem, origin: origin, offset: origin}),
        data: m84.pc({}, {mem: mem})
    };
    var text = seg.text;
    var line;
    var name;
    var errors = [];

    var zp = {
        abs: "zp",
        abx: "zpx",
        aby: "zpy"
    };

    var init = function() {
        var o = spec.ops || m84.ops();
        ops = o.instructions;
        lengths = o.lengths;
    };

    var error = function(message) {
        errors.push({
            name: name,
            line: line,
            message: message
        });
    };

    var storew = function(value) {
        // The only word arguments are addresses, so force to be non-negative
        if ( value > 0xffff || value < 0 ) {
            error("Word overflow: $" + value.toString(16) + " (" + value + ")");
            text.storew(0);
        } else {
            text.storew(value & 0xffff);
        }
    };

    var storeb = function(value) {
        if ( value > 0xff || value < -Math.pow(2, 8 - 1) ) {
            error("Byte overflow: $" + value.toString(16) + " (" + value + ")");
            text.storeb(0);
        } else {
            text.storeb(value & 0xff);
        }
    };

    var storer = function(value) {
        // Branch is relative to PC after instruction has been consumed.
        // Since we have consumed the opcode but not the relative address,
        // the PC has to be adjusted by one
        var abs = value;
        var rel = abs - (text.pc + 1);
        if ( rel < -Math.pow(2, 8 - 1) || rel > Math.pow(2, 8-1) - 1) {
            error("Branch out of range");
            text.storeb(0);
        } else {
            text.storeb(rel & 0xff);
        }
    };

    self.compile = function(asm) {
        name = asm.name;
        if ( asm.errors.length > 0 ) {
            throw new Error(asm.errors.join("\n"));
        }
        errors.length = 0;
        _.each(asm.ast, function(node) {
            line = node.line;
            var op = node.op;
            var mode = node.mode;
            var opcode = ops[op][mode];
            switch ( lengths[mode] ) {
                case 0:
                    storeb(opcode);
                    break;
                case 1:
                    storeb(opcode);
                    if ( mode === "rel" ) {
                        storer(m84.ast.evaluate(node.arg));
                    } else {
                        storeb(m84.ast.evaluate(node.arg));
                    }
                    break;
                case 2:
                    var value = m84.ast.evaluate(node.arg);
                    if ( mode === "abs" || mode === "aby" || mode == "abx" ) {
                        if ( value >= 0 && value <= 0xff ) {
                            mode = zp[mode];
                            opcode = ops[op][mode];
                            storeb(opcode);
                            storeb(value);
                            break;
                        }
                    }
                    storeb(opcode);
                    storew(value);
                    break;
            }
        });
        return { code: mem.array, errors: errors };
    };

    init();
    return self;

};
