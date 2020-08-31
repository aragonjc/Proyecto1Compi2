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
"return"		  return 'return';
"+="              return 'masIgual';
"-="              return 'menosIgual';
"*="              return 'porIgual';
"/="              return 'divisionIgual';
"{"               return 'curlyBraceOpen';
"}"               return 'curlyBraceClose';
"("               return 'bracketOpen';
")"               return 'bracketClose';
","               return 'comma';
";"               return 'semicolon';
":"               return 'dosPuntos';
"."               return 'point';
"++"              return 'increment';
"--"              return 'decrement';
"+"               return 'mas';
"-"               return 'menos';
"**"              return 'potencia';
"*"               return 'por';
"/"               return 'division';
"%"               return 'modulo';

">="              return 'mayorigualque';
"<="              return 'menorigualque';
">"               return 'mayorque';
"<"               return 'menorque';
"=="              return 'igualdad';
"="               return 'igual';
"!="              return 'diferencia';

"&&"              return 'and';
"||"              return 'or';
"!"               return 'not';
"?"               return 'question';
"["               return 'sqBracketOpen';
"]"               return 'sqBracketClose';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)?\b            return 'NUMBER';
\"[^\"]*\"|\'[^\']*\'           return 'STRING';
([a-zA-Z$_])[a-zA-Z0-9_$]*	return 'id';

"//".*   //Comentario Linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] //Comentaio Multilinea

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
	const Operation = require('./Operation.js');
%}

%start S

%% /*Gramática*/

S: Bloque EOF
{ return $1; }
;

Bloque: Bloque Instruccion {$$=$1 + $2;}
	| Instruccion          { $$=$1; }
;

Instruccion: llamadaFuncion
			{ $$ = $1 + "\n"; }
            |variables
			{ $$ = $1 + "\n"; }
            |Type id igual curlyBraceOpen parsObj curlyBraceClose
			{ $$ = $1 + " " + $2 +" "+ $3 + " "+ $4 + "\n" + $5 + "\n" + $6 + "\n\n";}
			|funciones
			{ $$ = $1 + "\n"; }
			|IF
			{ $$ = $1 + "\n"; }
			|WHILE
			{ $$ = $1 + "\n"; }
			|DOWHILE
			{ $$ = $1 + "\n"; }
			|SWITCH
			{ $$ = $1 + "\n"; }
			|FOR
			{ $$ = $1 + "\n"; }
;

llamadaFuncion: id PL bracketOpen paramFunc bracketClose semicolon
{ $$ = $1 + $2 + $3 +$4 +$5; }
;
 PL:POI
	|;


paramFunc: paramFuncList {$$ = $1;}
		|                {$$ = "";}
;

paramFuncList: paramFuncList comma E
			  {$$ = $1 + $2 + " " + $3;}
			  |E {$$ = $1;}
;

funciones: function id bracketOpen funcParam bracketClose funcDec
;

funcDec: dosPuntos types curlyBraceOpen STMT curlyBraceClose
		|curlyBraceOpen STMT curlyBraceClose
;

funcParam: funcParamList
		  |
;

funcParamList: funcParamList comma id dosPuntos types
			  |id dosPuntos types
;

/*
Content: funciones Content
		|STMT Content
		|
;*/


STMT: STMT InstruccionI   {$$=$1 + $2;}
	 |InstruccionI        { $$=$1; }
;

InstruccionI: llamadaFuncion
			{ $$ = $1 + "\n"; }
            |variables
			{ $$ = $1 + "\n"; }
			|funciones
			{ $$ = $1 + "\n"; }
            |IF
			{ $$ = $1 + "\n"; }
            |WHILE
			{ $$ = $1 + "\n"; }
            |DOWHILE
			{ $$ = $1 + "\n"; }
            |SWITCH
			{ $$ = $1 + "\n"; }
            |FOR
			{ $$ = $1 + "\n"; }
            |Break

            |Continue
            |return OP
			{ $$ = $1 + " " + $2;}

;

OP: E semicolon
	|semicolon
	;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	{ $$ = $1 + " " + $2 + $3 + $4 + " " + $5 + "\n" + $6 + "\n" + $7 + $8; }
;

IFLAST: else IFCOND
		{ $$ = " " + $1 + " " + $2; }
	  |{ $$ = "\n\n"; }
;

IFCOND: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	   { $$ = $1 + $2 + $3 + $4 + " " + $5 + "\n" + $6 + "\n" + $7 + $8;  }
	   |curlyBraceOpen STMT curlyBraceClose
	   { $$ = $1 + "\n" + $2 + "\n" + $3 + "\n";} 
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
		   { $$ = $1 + " " + $2 + $3 + $4; }
		  |id asignLast semicolon
		  { $$ = $1 + $2 + $3;}
		 |id asignLast
		  { $$ = $1 + $2;}
;

scNot: semicolon {$$=$1;}
		|{$$ = "";};

asignLast: point id asignLastF
		  { $$ = $1 + $2 + $3;}
		 | asignLastF
		 { $$ = $1; }
;

asignLastF:  igual E
			{ $$ = " " + $1 + " " + $2;}
			|masIgual E
			|menosIgual E
			|porIgual E
			|divisionIgual E
			|increment
			{ $$ = $1; }
			|decrement
			{ $$ = $1; }	
;

parsObj: objType {$$ = $1;}
		|{$$ = "";}
;

objType: objType opkv keyvalueT {$$ = $1 + $2 + "\n" + $3;}
		|keyvalueT {$$ = $1;}
;


opkv: comma      {$$ = $1;}
	 | semicolon {$$ = $1;}
;

keyvalueT: id dosPuntos types
	      { $$ = "\t" + $1 + $2 + " "+ $3; }
;

defType: let { $$ = String($1); }
	    |const { $$ = String($1); }
;

defLast: dosPuntos types igual E
		 { $$ = $1 + " " + $2 + " " + $3 + " " + $4}
        | igual E
		 { $$ = " " + $1 + " " + $2; }
        |{ $$ = ""; }
;

types: number { $$ = $1;}
      |boolean { $$ = $1;}
      |string { $$ = $1;}
      |void { $$ = $1;}
      |id { $$ = $1;}
;

E: exp { $$ = $1; }
	| curlyBraceOpen objetoParam curlyBraceClose
	{ $$ = " " + $1 + "\n" + $2 + "\n" + $3}
	;

exp: exp mas exp
	{ $$ = String($1 + $2 + $3); }
	| exp menos exp
	{ $$ = String($1 + $2 + $3); }
	| exp por exp
	{ $$ = String($1 + $2 + $3); }
	| exp division exp
	{ $$ = String($1 + $2 + $3); }
	| menos exp %prec unary
	{ $$ = String($1 + $2); }
	| exp potencia exp
	{ $$ = String($1 + $2 + $3); }
	| exp modulo exp
	{ $$ = String($1 + $2 + $3); }
	| exp mayorque exp
	{ $$ = String($1 + $2 + $3); }
	| exp menorque exp
	{ $$ = String($1 + $2 + $3); }
	| exp mayorigualque exp
	{ $$ = String($1 + $2 + $3); }
	| exp menorigualque exp
	{ $$ = String($1 + $2 + $3); }
	| exp igualdad exp
	{ $$ = String($1 + $2 + $3); }
	| exp diferencia exp
	{ $$ = String($1 + $2 + $3); }
	| exp and exp
	{ $$ = String($1 + $2 + $3); }
	| exp or exp
	{ $$ = String($1 + $2 + $3); }
	| not exp
	{ $$ = String($1 + $2); }
	| bracketOpen exp bracketClose
	{ $$ = String($1 + $2 + $3); }
	| exp question exp dosPuntos exp
	{ $$ = String($1 + $2 + $3 + $4 + $5); }
	| exp increment
	{ $$ = String($1 + $2); }
	| exp decrement
	{ $$ = String($1 + $2); }
	| NUMBER
	{ $$ = String($1);}
	| STRING
	{ $$ = String($1);}
	| true
	{ $$ = String($1);}
	| false
	{ $$ = String($1);}
	| null
	{ $$ = String($1);}
	| undefined
	{ $$ = String($1);}
	| id POI
	{$$ = String($1 + $2);}
	| id
	{ $$ = String($1);}
	| id PL bracketOpen paramFunc bracketClose
	//AGREGAR ARREGLOS multivariable
	| sqBracketOpen arrParam sqBracketClose sqBCKFIN
	
;

sqBCKFIN: sqBckList
		|
;

sqBckList: sqBckList sqBracketOpen arrParam sqBracketClose
		|sqBracketOpen arrParam sqBracketClose
		;

POI: POI point id
	{ $$ = $1 + $2 + $3;}
	|point id
	{ $$ = $1 + $2;}
	;

arrParam: listArrParam
		 |{$$ = "";}
;

listArrParam: listArrParam comma E
			|E
;

objetoParam: objetoParamList { $$ = $1; }
			|{$$="\n";}
;

objetoParamList: objetoParamList opkv keyvalue
				{ $$ = $1 + $2 + "\n" +$3; }
		  		|keyvalue
;

keyvalue: id dosPuntos E
		 { $$ = "\t" + $1 + " " + $2 + $3; }
;