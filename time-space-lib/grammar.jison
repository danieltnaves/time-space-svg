%lex

%{
	// pre-lexer
%}

%%

[\r\n]+                                      return 'NL';
\s+                                          /* skip whitespace */
\#[^\r\n]*                                   /* skip comments */
"-"                                          return 'LINE';
"--"                                         return 'DOTLINE';
"*"                                          return 'ERROR_LINE';
"**"                                         return 'DOT_ERROR_LINE';
">"                                          return 'ARROW';
:[^\r\n]+                                    return 'MESSAGE';
[^:\s->]+|->\s*([^->:])                      return 'PVALUE';
\s([A-Za-z0-9]+)\s\d+                        return 'EVALUE';
\s([\d]+)\s*                                 return 'TVALUE';
<<EOF>>                                      return 'EOF';

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
	: actor event time linetype actor event time message 
	{ $$ = new Entry($2, $4, $6, $7, $9, $11, $13, $14); }
	;

actor
	: PVALUE 
	{ console.log($1); $$ = yy.parser.yy.getActor($1); }
	;

event
	: EVALUE { $$ = $1; }
	;

time
	: TVALUE { $$ = $1; }
	;

linetype
	: LINE    { $$ = Diagram.LINETYPE.SOLID; }
	| DOTLINE { $$ = Diagram.LINETYPE.DOTTED; }
	;

message
	: MESSAGE { $$ = $1; }
	;


%%