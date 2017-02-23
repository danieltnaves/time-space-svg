%lex

%{
	// pre-lexer
%}

%%

[\r\n]+                                      return 'NL';
\#[^\r\n]*                                   /* skip comments */
"->"                                         return 'LINE';
(?!-w)\d+                                    return 'WEIGHT';
^\s(.+)(?=\-\>)                              return 'NAME';
^\s(.+)(?=\-w|\-\\d)                         return 'NAME';
^([^\->\r\n\s]+?)(?=\s)                      return 'NODE';
<<EOF>>                                      return 'EOF';
.                                            return 'INVALID';

/lex

%start start

%% /* language grammar */

start
	: document 'EOF' { return yy.parser.yy; }
	;

document
	: /* empty */
	| document line
	;

line
	: statement { }
	| 'NL'
	;

statement
	: entry { yy.parser.yy.addEntry($1); }
	;

entry
	: node name line node name weight
	{ $$ = new HypervisDiagram.Entry($1, $2, $4, $5, $6); }
	;

node
	: NODE
	{ $$ = yy.parser.yy.addNode($1); }
	;

name
	: NAME
	{ $$ = $1; }
	;

line
	: LINE  { $$ = $1; }
	;

weight
	: WEIGHT
	{ $$ = $1; }
	;

%%