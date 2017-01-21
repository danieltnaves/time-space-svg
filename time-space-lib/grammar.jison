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
\#[^\r\n]*                                   /* skip comments */
"->"                                         return 'LINE';
"-->"                                        return 'DOTLINE';
(?!\s)([^\->:,\r\n"]+?)(?=\s)                return 'ACTOR';
(?=)\s([^\->:,\r\n"]+?)(?=\s)                return 'EVENT';
(?=)\s([0-9]+)                               return 'TIME';
:([^\r\n]+)                                  return 'MESSAGE';
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
	: actor event time linetype actor event time msg
	{ $$ = new Diagram.Entry($1, $2, $3, $4, $5, $6, $7, $8); }
	;

actor
	: ACTOR 
	{ $$ = yy.parser.yy.getActor($1); }
	;

linetype
	: LINE    { $$ = Diagram.LINETYPE.SOLID; }
	| DOTLINE { $$ = Diagram.LINETYPE.DOTTED; }
	;

event
	: EVENT   { $$ = $1; }
	;

time
	: TIME    { $$ = $1; }
	;

msg
	: MESSAGE { $$ = $1; }
	;


%%