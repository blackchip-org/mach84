%{

var assert_mode = function(lookup, op, mode) {
    var modes = lookup[op];
    if ( !modes[mode] ) {
        throw new Error("Invalid addressing mode for " + op + ": " + mode);
    }
};

%}

%left "+" "-"
%left "*" "/"
%left "&" "|" "^"

%start program

%%

program
    : statements
        { return $1; }
    ;

statements
    : statements statement
        { $$ = $1.concat($2); }
    | statement
        { $$ = [$1]; }
    | line_error
    ;

statement
    : line EOLN
        { $$ = $1; }
    | line EOF
        { $$ = $1; }
    ;

line_error
    : error EOLN
        { console.error($1); }
    | error EOF
    ;

line
    : instruction
        { $$ = $1; }
    |
    ;

instruction
    : INSTRUCTION addressing_mode {
        assert_mode(yy.lookup, $1, $2.mode);
        $$ = {
            op: $1,
            mode: $2.mode,
            arg: $2.arg
        };
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
    | ind
        { $$ = $1; }
    | imm
        { $$ = $1; }
    | imp
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

ind
    : "(" value ")"
        { $$ = { mode: "ind", arg: $2 }; }
    ;

imm
    : "#" value
        { $$ = { mode: "imm", arg: $2 }; }
    ;

imp
    :
        { $$ = { mode: "imp" }; }
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
    | integer
        { $$ = $1; }
    ;

integer
    : BINARY_INTEGER
        { $$ = parseInt(yytext.substring(1), 2); }
    | DECIMAL_INTEGER
        { $$ = parseInt(yytext, 10); }
    | HEXADECIMAL_INTEGER
        { $$ = parseInt(yytext.substring(1), 16); }
    ;

%%
