%left "+" "-"
%left "*" "/"
%left "&" "|" "^"

%start program

%% /* language grammar */

program
    : statements
    ;

statements
    : statements statement
    | statement
    ;

statement
    : line EOLN
    | line EOF
        { return []; }
    ;

line
    : instruction
    |
    ;

instruction
    : INSTRUCTION addressing_mode {
        ;
    }
    ;

addressing_mode
    : address
    | address_x
    | address_y
    | accumulator
    | indirect
    | immediate
    | implied
    | indexed_indirect
    | indirect_indexed
    ;

address
    : value
        { $$ = $1; }
    ;

address_x
    : value "," "X"
        { $$ = $1; }
    ;

address_y
    : value "," "Y"
        { $$ = $1; }
    ;

accumulator
    : "A"
    ;

indirect
    : "(" value ")"
        { $$ = $2; }
    ;

immediate
    : "#" value
        { $$ = $2; }
    ;

implied:
    ;

indexed_indirect
    : "(" value "," "X" ")"
        { $$ = $2; }
    ;

indirect_indexed
    : "(" value ")" "," "Y"
        { $$ = $2; }
    ;

value
    : expression
        { $$ = $1; }
    ;

expression
    : expression "+" expression
        { $$ = $1 + $3; }
    | expression "-" expression
        { $$ = $1 + $3; }
    | expression "*" expression
        { $$ = $1 + $3; }
    | expression "/" expression
        { $$ = Math.floor($1 / $3); }
    | expression "&" expression
        { $$ = $1 & $3; }
    | expression "|" expression
        { $$ = $1 | $3; }
    | expression "^" expression
        { $$ = $1 ^ $3; }
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
