%lex

%options case-sensitive

%%

"continue"        return 'Continue';
"break"           return 'Break';
"null"            return 'null';
"type"            return 'Type';
"const"           return 'const';
"let"             return 'let';
"const"           return 'const';
"function"        return 'function';
"if"              return 'if';
"else"            return 'else';
"while"           return 'while';
"do"              return 'do';
"switch"          return 'switch';
"case"            return 'case';
"default"         return 'default';
"for"             return 'for';
"in"              return 'in';
"of"              return 'of';
"number"          return 'number';
"boolean"         return 'boolean';
"string"          return 'string';
"void"            return 'void';
"true"            return 'true';
"false"           return 'false';
"undefined"       return 'undefined';
"="               return 'igual';
"{"               return 'curlyBraceOpen';
"}"               return 'curlyBraceClose';
"("               return 'bracketOpen';
")"               return 'bracketClose';
","               return 'comma';
";"               return 'semicolon';
":"               return 'dosPuntos';
"."               return 'point';
"+"               return 'mas';
"-"               return 'menos';
"*"               return 'por';
"/"               return 'division';
"**"              return 'potencia';
"%"               return 'modulo';
">"               return 'mayorque';
"<"               return 'menorque';
">="              return 'mayorigualque';
"<="              return 'menorigualque';
"=="              return 'igualdad';
"!="              return 'diferencia';
"&&"              return 'and';
"||"              return 'or';
"!"               return 'not';
"?"               return 'question';
"++"              return 'increment';
"--"              return 'decrement';
"["               return 'sqBracketOpen';
"]"               return 'sqBracketClose';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)?\b            return 'NUMBER';
\"[^\"]*\"|\'[^\']*\'           return 'STRING';
([a-zA-Z$._])[a-zA-Z0-9_$.]*	return 'id';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%right 'question'
%left 'or'
%left 'and'
%left 'mayorque' 'menorque' 'mayorigualque' 'menorigualque' 'igualdad' 'diferencia'
%left 'mas' 'menos'
%left 'por' 'division' 'modulo'
%left  'increment' 'decrement'
%left 'potencia'
%right 'unary'
%right 'not'

%{

    const callFunction = require('./callFunction.js');
    const TObject = require('./TObject.js');
%}

%start S

%% /*Gramática*/

S: Bloque EOF
{ return $1; }
;

Bloque: Bloque Instruccion {$1.push($2); $$=$1;}
	| Instruccion          { $$=[$1]; }
;

Instruccion: llamadaFuncion
			{ $$ = $1; }
            |variables
            |Type id igual curlyBraceOpen parsObj curlyBraceClose
			|funciones
			|IF
			|WHILE
			|DOWHILE
			|SWITCH
			|FOR
;

llamadaFuncion: id bracketOpen paramFunc bracketClose
{ $$ = new callFunction($1,$3); }
;

paramFunc: paramFuncList
{$$ = $1;}
		|{$$ = null;}
;

paramFuncList: paramFuncList comma exp
			  {$1.push($3); $$=$1;}
			  |exp
			  {$$ = [$1];}
;

funciones: function id funcDec
;

funcDec: dosPuntos types curlyBraceOpen STMT curlyBraceClose
		|curlyBraceOpen STMT curlyBraceClose
;

/*
Content: funciones Content
		|STMT Content
		|
;*/


STMT: STMT InstruccionI
	 |InstruccionI
;

InstruccionI: llamadFuncion
            |variables
			|funciones
            |IF
            |WHILE
            |DOWHILE
            |SWITCH
            |FOR
            |Break
            |Continue
            |return semicolon
            |return exp semicolon
;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
;

IFLAST: else IFCOND
	  |
;

IFCOND: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
		 |curlyBraceOpen STMT curlyBraceClose
;

WHILE: while bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose
;

DOWHILE: do curlyBraceOpen STMT curlyBraceClose while bracketOpen exp bracketClose semicolon
;

SWITCH: switch bracketOpen exp bracketClose curlyBraceOpen FIRSTCASE LASTCASE curlyBraceClose
;

FIRSTCASE: CASE
		  |
;

CASE: CASE case exp dosPuntos STMT
	 |case exp dosPuntos STMT
;

LASTCASE: DEFCASE ENDCASE
;

DEFCASE: default dosPuntos STMT
;

ENDCASE: CASE
		|
;

FOR: for bracketOpen variables semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	|for bracketOpen forDec forOP id bracketClose curlyBraceOpen STMT curlyBraceClose
	
;

forOP: in
	  |of
;

forDec: variables
	   |id
;


variables: defType id defLast semicolon
		  |id asgnLast semicolon
;


asignLast: point id igual exp
		 | igual exp
;

parsObj: objType
		|
;

objType: objType opkv keyvalueT
		|keyvalueT
;


opkv: comma
	 | semicolon
;

keyvalueT: id dosPuntos types
;

defType: let
	    |const
;

defLast: dosPuntos types igual exp
        | igual exp
        |
;


types: number
      |boolean
      |string
      |void
      |id
;

exp: exp mas exp
	| exp menos exp
	| exp por exp
	| exp division exp
	| menos exp %prec unary
	| exp potencia exp
	| exp modulo exp
	| exp mayorque exp
	| exp menorque exp
	| exp mayorigualque exp
	| exp menorigualque exp
	| exp igualdad exp
	| exp diferencia exp
	| exp and exp
	| exp or exp
	| not exp
	| exp question exp dosPuntos exp
	| exp increment
	| exp decrement
	| NUMBER
	| STRING
	{ $$ = new TObject(0,0,$1,"STRING"); }
	| true
	| false
	| null
	| undefined
	| id point id
	| id
	| id bracketOpen paramFunc bracketClose
	| sqBracketOpen arrParam sqBracketClose
	| curlyBraceOpen objetoParam curlyBraceClose
;

arrParam: listArrParam
		 |
;

listArrParam: listArrParam comma exp
			|exp
;

objetoParam: objetoParamList
			|
;

objetoParamList: objetoParamList opkv keyvalue
		  		|keyvalue
;

keyvalue: id dosPuntos exp
;