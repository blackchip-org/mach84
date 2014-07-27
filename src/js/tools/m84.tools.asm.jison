/* description: Parses end evaluates mathematical expressions. */

/* lexical grammar */
%lex
%%
[ \t]+                {/* skip whitespace */}
\n                    {return 'EOLN';}
"adc"                 {return 'OP';}
<<EOF>>               {return 'EOF';}

/lex


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
    ;

line
    : assembly
    |
    ;

assembly
    : OP
    ;

%%

/*
parser.parseError = function(msg) {
    console.error("Yeah", msg);
};
*/
