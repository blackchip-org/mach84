%lex
%%
[ \t]+                {/* skip whitespace */}
\n                    {return "EOLN";}
"("                   {return "(";}
")"                   {return ")";}
"+"                   {return "+";}
"-"                   {return "-";}
"*"                   {return "*";}
"/"                   {return "/";}
"&"                   {return "&";}
"|"                   {return "|";}
"^"                   {return "^";}
","                   {return ",";}
"#"                   {return "#";}
"a"                   {return "A";}
"x"                   {return "X";}
"y"                   {return "Y";}

"adc"                 {return "INSTRUCTION";}
"and"                 {return "INSTRUCTION";}
"asl"                 {return "INSTRUCTION";}
"bit"                 {return "INSTRUCTION";}
"brk"                 {return "INSTRUCTION";}
"bcc"                 {return "INSTRUCTION";}
"bcs"                 {return "INSTRUCTION";}
"beq"                 {return "INSTRUCTION";}
"bmi"                 {return "INSTRUCTION";}
"bne"                 {return "INSTRUCTION";}
"bpl"                 {return "INSTRUCTION";}
"bra"                 {return "INSTRUCTION";}
"bvc"                 {return "INSTRUCTION";}
"bvs"                 {return "INSTRUCTION";}
"cmp"                 {return "INSTRUCTION";}
"bvs"                 {return "INSTRUCTION";}
"cmp"                 {return "INSTRUCTION";}
"dec"                 {return "INSTRUCTION";}
"dex"                 {return "INSTRUCTION";}
"dey"                 {return "INSTRUCTION";}
"cpx"                 {return "INSTRUCTION";}
"cpy"                 {return "INSTRUCTION";}
"eor"                 {return "INSTRUCTION";}
"clc"                 {return "INSTRUCTION";}
"cld"                 {return "INSTRUCTION";}
"cli"                 {return "INSTRUCTION";}
"clv"                 {return "INSTRUCTION";}
"sec"                 {return "INSTRUCTION";}
"sed"                 {return "INSTRUCTION";}
"sei"                 {return "INSTRUCTION";}
"inc"                 {return "INSTRUCTION";}
"inx"                 {return "INSTRUCTION";}
"iny"                 {return "INSTRUCTION";}
"jmp"                 {return "INSTRUCTION";}
"jsr"                 {return "INSTRUCTION";}
"lda"                 {return "INSTRUCTION";}
"ldx"                 {return "INSTRUCTION";}
"ldy"                 {return "INSTRUCTION";}
"lsr"                 {return "INSTRUCTION";}
"nop"                 {return "INSTRUCTION";}
"ora"                 {return "INSTRUCTION";}
"rol"                 {return "INSTRUCTION";}
"ror"                 {return "INSTRUCTION";}
"rts"                 {return "INSTRUCTION";}
"rti"                 {return "INSTRUCTION";}
"sbc"                 {return "INSTRUCTION";}
"sta"                 {return "INSTRUCTION";}
"pha"                 {return "INSTRUCTION";}
"php"                 {return "INSTRUCTION";}
"phx"                 {return "INSTRUCTION";}
"phy"                 {return "INSTRUCTION";}
"pla"                 {return "INSTRUCTION";}
"plp"                 {return "INSTRUCTION";}
"plx"                 {return "INSTRUCTION";}
"ply"                 {return "INSTRUCTION";}
"tsx"                 {return "INSTRUCTION";}
"txs"                 {return "INSTRUCTION";}
"stx"                 {return "INSTRUCTION";}
"sty"                 {return "INSTRUCTION";}
"tax"                 {return "INSTRUCTION";}
"tay"                 {return "INSTRUCTION";}
"txa"                 {return "INSTRUCTION";}
"tya"                 {return "INSTRUCTION";}

\%[01]+\b             {return "BINARY_INTEGER";}
[0-9]+\b              {return "DECIMAL_INTEGER";}
\$[0-9a-fA-F]+\b      {return "HEXADECIMAL_INTEGER";}

[a-zA-z\._\:][a-zA-z\._\:0-9]
                      {return "SYMBOL";}

<<EOF>>               {return "EOF";}
