// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "expression", "symbols": [{"literal":"0"}], "postprocess": () => false},
    {"name": "expression", "symbols": [{"literal":"1"}], "postprocess": () => true},
    {"name": "expression", "symbols": [{"literal":"("}, "expression", {"literal":")"}], "postprocess": d => d[1]},
    {"name": "expression$string$1", "symbols": [{"literal":"N"}, {"literal":"O"}, {"literal":"T"}], "postprocess": (d) => d.join('')},
    {"name": "expression", "symbols": ["expression$string$1", "expression"], "postprocess": d => !d[1]},
    {"name": "expression$string$2", "symbols": [{"literal":"O"}, {"literal":"R"}], "postprocess": (d) => d.join('')},
    {"name": "expression", "symbols": ["expression", "expression$string$2", "expression"], "postprocess": d => d[0] || d[2]},
    {"name": "expression", "symbols": ["operation"], "postprocess": d => d[0] && d[2]},
    {"name": "operation$string$1", "symbols": [{"literal":"A"}, {"literal":"N"}, {"literal":"D"}], "postprocess": (d) => d.join('')},
    {"name": "operation", "symbols": ["expression", "operation$string$1", "expression"]}
  ],
  ParserStart: "expression",
};

export default grammar;
