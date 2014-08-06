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
