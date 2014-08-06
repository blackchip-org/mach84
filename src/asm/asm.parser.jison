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
    : assembly
    |
    ;

assembly
    : ADC abs { ; }
    ;

abs
    : address
        { $$ = $1; }
    ;

address
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
