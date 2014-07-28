/* lexical grammar */
%lex
%%
[ \t]+                {/* skip whitespace */}
\n                    {return "EOLN";}
"+"                   {return "+";}
"-"                   {return "-";}
"*"                   {return "*";}
"/"                   {return "/";}
"&"                   {return "&";}
"|"                   {return "|";}
"^"                   {return "^";}
"adc"                 {return "ADC";}
\%[01]+\b             {return "BINARY_INTEGER";}
[0-9]+\b              {return "DECIMAL_INTEGER";}
\$[0-9a-fA-F]+\b      {return "HEXADECIMAL_INTEGER";}
<<EOF>>               {return "EOF";}

/lex

%{
    ;
%}

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
        { return bytes; }
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
