/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var asm = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"statements":4,"statement":5,"line":6,"EOLN":7,"EOF":8,"instruction":9,"INSTRUCTION":10,"addressing_mode":11,"address":12,"address_x":13,"address_y":14,"accumulator":15,"indirect":16,"immediate":17,"implied":18,"indexed_indirect":19,"indirect_indexed":20,"value":21,",":22,"X":23,"Y":24,"A":25,"(":26,")":27,"#":28,"expression":29,"+":30,"-":31,"*":32,"/":33,"&":34,"|":35,"^":36,"integer":37,"BINARY_INTEGER":38,"DECIMAL_INTEGER":39,"HEXADECIMAL_INTEGER":40,"$accept":0,"$end":1},
terminals_: {2:"error",7:"EOLN",8:"EOF",10:"INSTRUCTION",22:",",23:"X",24:"Y",25:"A",26:"(",27:")",28:"#",30:"+",31:"-",32:"*",33:"/",34:"&",35:"|",36:"^",38:"BINARY_INTEGER",39:"DECIMAL_INTEGER",40:"HEXADECIMAL_INTEGER"},
productions_: [0,[3,1],[4,2],[4,1],[5,2],[5,2],[6,1],[6,0],[9,2],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[12,1],[13,3],[14,3],[15,1],[16,3],[17,2],[18,0],[19,5],[20,5],[21,1],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,1],[37,1],[37,1],[37,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 5: return []; 
break;
case 8:
        ;
    
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0-2]; 
break;
case 20: this.$ = $$[$0-2]; 
break;
case 22: this.$ = $$[$0-1]; 
break;
case 23: this.$ = $$[$0]; 
break;
case 25: this.$ = $$[$0-3]; 
break;
case 26: this.$ = $$[$0-3]; 
break;
case 27:
        try {
            this.$ = m84.ast.evaluate($$[$0]);
        } catch ( err ) {
            if ( err.symbol ) {
                this.$ = 0;
            } else {
                throw err;
            }
        }
    
break;
case 28: this.$ = { op: "+", val: [$$[$0-2], $$[$0]] }; 
break;
case 29: this.$ = { op: "-", val: [$$[$0-2], $$[$0]] }; 
break;
case 30: this.$ = { op: "*", val: [$$[$0-2], $$[$0]] }; 
break;
case 31: this.$ = { op: "floor", val: { op: "/", val: [$$[$0-2], $$[$0]] } }; 
break;
case 32: this.$ = { op: "&", val: [$$[$0-2], $$[$0]] }; 
break;
case 33: this.$ = { op: "|", val: [$$[$0-2], $$[$0]] }; 
break;
case 34: this.$ = { op: "^", val: [$$[$0-2], $$[$0]] }; 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = parseInt(yytext.substring(1), 2); 
break;
case 37: this.$ = parseInt(yytext, 10); 
break;
case 38: this.$ = parseInt(yytext.substring(1), 16); 
break;
}
},
table: [{3:1,4:2,5:3,6:4,7:[2,7],8:[2,7],9:5,10:[1,6]},{1:[3]},{1:[2,1],5:7,6:4,7:[2,7],8:[2,7],9:5,10:[1,6]},{1:[2,3],7:[2,3],8:[2,3],10:[2,3]},{7:[1,8],8:[1,9]},{7:[2,6],8:[2,6]},{7:[2,24],8:[2,24],11:10,12:11,13:12,14:13,15:14,16:15,17:16,18:17,19:18,20:19,21:20,25:[1,21],26:[1,22],28:[1,23],29:24,37:25,38:[1,26],39:[1,27],40:[1,28]},{1:[2,2],7:[2,2],8:[2,2],10:[2,2]},{1:[2,4],7:[2,4],8:[2,4],10:[2,4]},{1:[2,5],7:[2,5],8:[2,5],10:[2,5]},{7:[2,8],8:[2,8]},{7:[2,9],8:[2,9]},{7:[2,10],8:[2,10]},{7:[2,11],8:[2,11]},{7:[2,12],8:[2,12]},{7:[2,13],8:[2,13]},{7:[2,14],8:[2,14]},{7:[2,15],8:[2,15]},{7:[2,16],8:[2,16]},{7:[2,17],8:[2,17]},{7:[2,18],8:[2,18],22:[1,29]},{7:[2,21],8:[2,21]},{21:30,29:24,37:25,38:[1,26],39:[1,27],40:[1,28]},{21:31,29:24,37:25,38:[1,26],39:[1,27],40:[1,28]},{7:[2,27],8:[2,27],22:[2,27],27:[2,27],30:[1,32],31:[1,33],32:[1,34],33:[1,35],34:[1,36],35:[1,37],36:[1,38]},{7:[2,35],8:[2,35],22:[2,35],27:[2,35],30:[2,35],31:[2,35],32:[2,35],33:[2,35],34:[2,35],35:[2,35],36:[2,35]},{7:[2,36],8:[2,36],22:[2,36],27:[2,36],30:[2,36],31:[2,36],32:[2,36],33:[2,36],34:[2,36],35:[2,36],36:[2,36]},{7:[2,37],8:[2,37],22:[2,37],27:[2,37],30:[2,37],31:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37]},{7:[2,38],8:[2,38],22:[2,38],27:[2,38],30:[2,38],31:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38]},{23:[1,39],24:[1,40]},{22:[1,42],27:[1,41]},{7:[2,23],8:[2,23]},{29:43,37:25,38:[1,26],39:[1,27],40:[1,28]},{29:44,37:25,38:[1,26],39:[1,27],40:[1,28]},{29:45,37:25,38:[1,26],39:[1,27],40:[1,28]},{29:46,37:25,38:[1,26],39:[1,27],40:[1,28]},{29:47,37:25,38:[1,26],39:[1,27],40:[1,28]},{29:48,37:25,38:[1,26],39:[1,27],40:[1,28]},{29:49,37:25,38:[1,26],39:[1,27],40:[1,28]},{7:[2,19],8:[2,19]},{7:[2,20],8:[2,20]},{7:[2,22],8:[2,22],22:[1,50]},{23:[1,51]},{7:[2,28],8:[2,28],22:[2,28],27:[2,28],30:[2,28],31:[2,28],32:[1,34],33:[1,35],34:[1,36],35:[1,37],36:[1,38]},{7:[2,29],8:[2,29],22:[2,29],27:[2,29],30:[2,29],31:[2,29],32:[1,34],33:[1,35],34:[1,36],35:[1,37],36:[1,38]},{7:[2,30],8:[2,30],22:[2,30],27:[2,30],30:[2,30],31:[2,30],32:[2,30],33:[2,30],34:[1,36],35:[1,37],36:[1,38]},{7:[2,31],8:[2,31],22:[2,31],27:[2,31],30:[2,31],31:[2,31],32:[2,31],33:[2,31],34:[1,36],35:[1,37],36:[1,38]},{7:[2,32],8:[2,32],22:[2,32],27:[2,32],30:[2,32],31:[2,32],32:[2,32],33:[2,32],34:[2,32],35:[2,32],36:[2,32]},{7:[2,33],8:[2,33],22:[2,33],27:[2,33],30:[2,33],31:[2,33],32:[2,33],33:[2,33],34:[2,33],35:[2,33],36:[2,33]},{7:[2,34],8:[2,34],22:[2,34],27:[2,34],30:[2,34],31:[2,34],32:[2,34],33:[2,34],34:[2,34],35:[2,34],36:[2,34]},{24:[1,52]},{27:[1,53]},{7:[2,26],8:[2,26]},{7:[2,25],8:[2,25]}],
defaultActions: {},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return "EOLN";
break;
case 2:return "(";
break;
case 3:return ")";
break;
case 4:return "+";
break;
case 5:return "-";
break;
case 6:return "*";
break;
case 7:return "/";
break;
case 8:return "&";
break;
case 9:return "|";
break;
case 10:return "^";
break;
case 11:return ",";
break;
case 12:return "#";
break;
case 13:return "A";
break;
case 14:return "X";
break;
case 15:return "Y";
break;
case 16:return "INSTRUCTION";
break;
case 17:return "INSTRUCTION";
break;
case 18:return "INSTRUCTION";
break;
case 19:return "INSTRUCTION";
break;
case 20:return "INSTRUCTION";
break;
case 21:return "INSTRUCTION";
break;
case 22:return "INSTRUCTION";
break;
case 23:return "INSTRUCTION";
break;
case 24:return "INSTRUCTION";
break;
case 25:return "INSTRUCTION";
break;
case 26:return "INSTRUCTION";
break;
case 27:return "INSTRUCTION";
break;
case 28:return "INSTRUCTION";
break;
case 29:return "INSTRUCTION";
break;
case 30:return "INSTRUCTION";
break;
case 31:return "INSTRUCTION";
break;
case 32:return "INSTRUCTION";
break;
case 33:return "INSTRUCTION";
break;
case 34:return "INSTRUCTION";
break;
case 35:return "INSTRUCTION";
break;
case 36:return "INSTRUCTION";
break;
case 37:return "INSTRUCTION";
break;
case 38:return "INSTRUCTION";
break;
case 39:return "INSTRUCTION";
break;
case 40:return "INSTRUCTION";
break;
case 41:return "INSTRUCTION";
break;
case 42:return "INSTRUCTION";
break;
case 43:return "INSTRUCTION";
break;
case 44:return "INSTRUCTION";
break;
case 45:return "INSTRUCTION";
break;
case 46:return "INSTRUCTION";
break;
case 47:return "INSTRUCTION";
break;
case 48:return "INSTRUCTION";
break;
case 49:return "INSTRUCTION";
break;
case 50:return "INSTRUCTION";
break;
case 51:return "INSTRUCTION";
break;
case 52:return "INSTRUCTION";
break;
case 53:return "INSTRUCTION";
break;
case 54:return "INSTRUCTION";
break;
case 55:return "INSTRUCTION";
break;
case 56:return "INSTRUCTION";
break;
case 57:return "INSTRUCTION";
break;
case 58:return "INSTRUCTION";
break;
case 59:return "INSTRUCTION";
break;
case 60:return "INSTRUCTION";
break;
case 61:return "INSTRUCTION";
break;
case 62:return "INSTRUCTION";
break;
case 63:return "INSTRUCTION";
break;
case 64:return "INSTRUCTION";
break;
case 65:return "INSTRUCTION";
break;
case 66:return "INSTRUCTION";
break;
case 67:return "INSTRUCTION";
break;
case 68:return "INSTRUCTION";
break;
case 69:return "INSTRUCTION";
break;
case 70:return "INSTRUCTION";
break;
case 71:return "INSTRUCTION";
break;
case 72:return "INSTRUCTION";
break;
case 73:return "INSTRUCTION";
break;
case 74:return "INSTRUCTION";
break;
case 75:return "INSTRUCTION";
break;
case 76:return "INSTRUCTION";
break;
case 77:return "INSTRUCTION";
break;
case 78:return "INSTRUCTION";
break;
case 79:return "BINARY_INTEGER";
break;
case 80:return "DECIMAL_INTEGER";
break;
case 81:return "HEXADECIMAL_INTEGER";
break;
case 82:return "SYMBOL";
break;
case 83:return "EOF";
break;
}
},
rules: [/^(?:[ \t]+)/,/^(?:\n)/,/^(?:\()/,/^(?:\))/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:&)/,/^(?:\|)/,/^(?:\^)/,/^(?:,)/,/^(?:#)/,/^(?:a\b)/,/^(?:x\b)/,/^(?:y\b)/,/^(?:adc\b)/,/^(?:and\b)/,/^(?:asl\b)/,/^(?:bit\b)/,/^(?:brk\b)/,/^(?:bcc\b)/,/^(?:bcs\b)/,/^(?:beq\b)/,/^(?:bmi\b)/,/^(?:bne\b)/,/^(?:bpl\b)/,/^(?:bra\b)/,/^(?:bvc\b)/,/^(?:bvs\b)/,/^(?:cmp\b)/,/^(?:bvs\b)/,/^(?:cmp\b)/,/^(?:dec\b)/,/^(?:dex\b)/,/^(?:dey\b)/,/^(?:cpx\b)/,/^(?:cpy\b)/,/^(?:eor\b)/,/^(?:clc\b)/,/^(?:cld\b)/,/^(?:cli\b)/,/^(?:clv\b)/,/^(?:sec\b)/,/^(?:sed\b)/,/^(?:sei\b)/,/^(?:inc\b)/,/^(?:inx\b)/,/^(?:iny\b)/,/^(?:jmp\b)/,/^(?:jsr\b)/,/^(?:lda\b)/,/^(?:ldx\b)/,/^(?:ldy\b)/,/^(?:lsr\b)/,/^(?:nop\b)/,/^(?:ora\b)/,/^(?:rol\b)/,/^(?:ror\b)/,/^(?:rts\b)/,/^(?:rti\b)/,/^(?:sbc\b)/,/^(?:sta\b)/,/^(?:pha\b)/,/^(?:php\b)/,/^(?:phx\b)/,/^(?:phy\b)/,/^(?:pla\b)/,/^(?:plp\b)/,/^(?:plx\b)/,/^(?:ply\b)/,/^(?:tsx\b)/,/^(?:txs\b)/,/^(?:stx\b)/,/^(?:sty\b)/,/^(?:tax\b)/,/^(?:tay\b)/,/^(?:txa\b)/,/^(?:tya\b)/,/^(?:%[01]+\b)/,/^(?:[0-9]+\b)/,/^(?:\$[0-9a-fA-F]+\b)/,/^(?:[a-zA-z\._\:][a-zA-z\._\:0-9])/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();