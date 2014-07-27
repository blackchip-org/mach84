define("ace/mode/assembly_6502_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop",
    "ace/mode/text_highlight_rules"],
    function(require, exports, module) {

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var Assembly6502HighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start:
       [ { token: 'keyword.control.assembly',
           regex: '\\b(?:' + [
               'adc', 'and', 'asl',
               'bcc', 'bcs', 'beq', 'bit', 'bmi', 'bne', 'bpl', 'bra', 'brk',
                      'bvc', 'bvs',
               'clc', 'cld', 'cli', 'clv', 'cmp', 'cpx', 'cpy',
               'dec', 'dex', 'dey',
               'eor',
               'inc', 'inx', 'iny',
               'jmp', 'jsr',
               'lda', 'ldx', 'ldy', 'lsr',
               'nop',
               'ora',
               'pha', 'php', 'phx', 'phy', 'pla', 'plp', 'plx', 'ply',
               'rol', 'ror', 'rti', 'rts',
               'sbc', 'sec', 'sed', 'sei', 'sta', 'stx', 'sty',
               'tax', 'tay', 'tsx', 'txa', 'txs', 'tya'
           ].join("|") + ')\\b',
           caseInsensitive: true },
         { token: 'variable.parameter.register.assembly',
           regex: '\\b(?:a|x|y)\\b',
           caseInsensitive: true },
         { token: 'constant.character.decimal.assembly',
           regex: '\\b[0-9]+\\b' },
         { token: 'constant.character.binary.assembly',
           regex: '%[01]+\\b' },
         { token: 'constant.character.hexadecimal.assembly',
           regex: '\\$[A-F0-9]+\\b',
           caseInsensitive: true },
         { token: 'constant.character',
           regex: '\'[A-Z]' },
         { token: 'string.assembly', regex: /'([^\\']|\\.)*'/ },
         { token: 'string.assembly', regex: /"([^\\"]|\\.)*"/ },
         { token: 'support.function.directive.assembly',
           regex: '\\.(?:' + [
               'advance',
               'alias',
               'byte',
               'checkpc',
               'data',
               'dword',
               'dwordbe',
               'invoke',
               'macro',
               'macend',
               'scope',
               'scend',
               'space',
               'text',
               'org',
               'word',
               'wordbe'
           ].join('|') + ')\\b' },
         { token: 'entity.name.function.assembly',
           regex: '\\`[A-Z_][A-Z0-9_\\.]*\\b',
           caseInsensitive: true },
         { token: 'comment.assembly', regex: ';.*$' },
         { token: 'variable.assembly',
           regex: '[A-Z_][A-Z0-9_\\.]*\\b',
           caseInsensitve: true },
         { token: 'variable.assembly',
           regex: '(?:\\*|\\-+|\\++)'}
         ],
    };

    this.normalizeRules();
};

Assembly6502HighlightRules.metaData = { fileTypes: [ 'asm' ],
      name: 'Assembly 6502',
      scopeName: 'source.assembly' };


oop.inherits(Assembly6502HighlightRules, TextHighlightRules);

exports.Assembly6502HighlightRules = Assembly6502HighlightRules;
});

define("ace/mode/assembly_6502",
     ["require","exports","module","ace/lib/oop","ace/mode/text",
     "ace/mode/assembly_6502_highlight_rules"],
     function(require, exports, module) {

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Assembly6502HighlightRules = require("./assembly_6502_highlight_rules").Assembly6502HighlightRules;

var Mode = function() {
    this.HighlightRules = Assembly6502HighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = ";";
    this.$id = "ace/mode/assembly_6502";
}).call(Mode.prototype);

exports.Mode = Mode;
});
