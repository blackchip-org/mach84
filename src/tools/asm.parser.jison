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

%{
%}

%left "|"
%left "^"
%left "&"
%left "+" "-"
%left "*" "/"
%left UMINUS

%start program

%%

program
    : statements
        { if ( $1 ) { return $1; } else { return []; } }
    ;

statements
    : statements statement {
        if ( $2 ) {
            $$ = $1.concat($2);
        } else {
            $$ = $1;
        }
    }
    | statement
        { if ( $1 ) { $$ = [$1]; } }
    ;

statement
    : line EOLN
        { $1.line = yylineno; $$ = $1; }
    | line EOF
        { $1.line = yylineno + 1; $$ = $1; }
    | EOLN
        { $$ = false; }
    | EOF
        { $$ = false; }
    | error EOLN
        { $$ = {error: true, line: yylineno}; }
    | error EOF
        { $$ = {error: true, line: yylineno}; }
    ;

line
    : instruction
        { $$ = $1; }
    | label instruction
        { $2.label = $1; $$ = $2; }
    | label
        { $$ = { label: $1 }; }
    ;

label
    : SYMBOL ":"
        { $$ = $1; }
    | EXPORT SYMBOL ":"
        { yy.exports[$2] = true; $$ = $2; }
    ;

instruction
    : INSTRUCTION addressing_mode {
        var op = $1;
        var mode = $2.mode;
        var modes = yy.lookup[op];
        // If the instruction supports relative addressing, it only
        // supports relative addressing
        if ( mode === "abs" && modes.rel ) {
            mode = "rel";
        }
        if ( _.isUndefined(modes[mode]) ) {
            var expected = _.keys(modes).join(", ");
            yy.errors.push("Invalid addressing mode for " + op + ": " + mode +
                "\nExpected " + expected);
            $$ = { error: true };
        } else {
            $$ = {
                op: op,
                mode: mode,
                arg: $2.arg
            };
        }
    }
    ;

addressing_mode
    : abs
        { $$ = $1; }
    | abx
        { $$ = $1; }
    | aby
        { $$ = $1; }
    | acc
        { $$ = $1; }
    | imm
        { $$ = $1; }
    | imp
        { $$ = $1; }
    | ind
        { $$ = $1; }
    | izx
        { $$ = $1; }
    | izy
        { $$ = $1; }
    ;

abs
    : value
        { $$ = { mode: "abs", arg: $1 }; }
    ;

abx
    : value "," "X"
        { $$ = { mode: "abx", arg: $1 }; }
    ;

aby
    : value "," "Y"
        { $$ = { mode: "aby", arg: $1 }; }
    ;

acc
    : "A"
        { $$ = { mode: "acc" }; }
    ;

imm
    : "#" value
        { $$ = { mode: "imm", arg: $2 }; }
    ;

imp
    :
        { $$ = { mode: "imp" }; }
    ;

ind
    : "(" value ")"
        { $$ = { mode: "ind", arg: $2 }; }
    ;

izx
    : "(" value "," "X" ")"
        { $$ = { mode: "izx", arg: $2 }; }
    ;

izy
    : "(" value ")" "," "Y"
        { $$ = { mode: "izy", arg: $2 }; }
    ;

value
    : expression
        { $$ = $1; }
    ;

expression
    : expression "+" expression
        { $$ = { op: "+", val: [$1, $3] }; }
    | expression "-" expression
        { $$ = { op: "-", val: [$1, $3] }; }
    | expression "*" expression
        { $$ = { op: "*", val: [$1, $3] }; }
    | expression "/" expression
        { $$ = { op: "floor", val: { op: "/", val: [$1, $3] } }; }
    | expression "&" expression
        { $$ = { op: "&", val: [$1, $3] }; }
    | expression "|" expression
        { $$ = { op: "|", val: [$1, $3] }; }
    | expression "^" expression
        { $$ = { op: "^", val: [$1, $3] }; }
    | "-" expression %prec UMINUS
        { $$ = { op: "negate", val: $2 }; }
    | "[" expression "]"
        { $$ = $2; }
    | integer
        { $$ = $1; }
    | SYMBOL
        { $$ = { symbol: $1}; }
    ;

integer
    : BINARY_INTEGER
        { $$ = parseInt($1.substring(1), 2); }
    | DECIMAL_INTEGER
        { $$ = parseInt($1, 10); }
    | HEXADECIMAL_INTEGER
        { $$ = parseInt($1.substring(1), 16); }
    ;

%%
