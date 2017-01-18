%lex

%{
	// pre-lexer
	console.log(yy);
	console.log(yy_);
	console.log(this);
	console.log(yytext);
	console.log(YY_START);
	console.log($avoiding_name_collisions);
%}

%%

[\r\n]+                                      return 'NL';
\s+                                          /* skip whitespace */
\#[^\r\n]*                                   /* skip comments */
"-"                                          return 'LINE';
"--"                                         return 'DOTLINE';
[^\->:,\r\n"]+                               return 'PVALUE';
-([^\-:,\r\n"]+)                             return 'PVALUE';
:[^\r\n]+                                    return 'MESSAGE';
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
	: actor linetype actor msg
	{ $$ = new Diagram.Entry($1, null, null, $2, $3, null, null, $4); }
	;

actor
	: PVALUE 
	{ $$ = $1; }
	;

linetype
	: LINE    { $$ = Diagram.LINETYPE.SOLID; }
	| DOTLINE { $$ = Diagram.LINETYPE.DOTTED; }
	;

msg
	: MESSAGE { $$ = $1; }
	;


%%