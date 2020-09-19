
%lex

%options case-sensitive

%%
"//".*   //Comentario Linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] //Comentaio Multilinea

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
\s+                     {}
\t+                     {}
\r+                     {}
\n+                     {}

[0-9]+("."[0-9]+)?\b            return 'NUMBER';
\"[^\"]*\"|\'[^\']*\'|\`[^\`]*\`        return 'STRING';
([a-zA-Z$_])[a-zA-Z0-9_$]*	return 'id';



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
	const defLast = require('./ejecucion/defLast.js');
	const callFunction = require('./ejecucion/callFunction.js');
    const TObject = require('./ejecucion/TObject.js');
	const Operation = require('./ejecucion/Operation.js');
	const idList = require('./ejecucion/idList.js');
	const Variable = require('./ejecucion/Variable.js');
	const Type = require('./ejecucion/Type.js');
	const decType = require('./ejecucion/decType.js');
	const objType = require('./ejecucion/objType.js');
	const typeKeyValue  = require('./ejecucion/typeKeyValue.js');
	const Id  = require('./ejecucion/Id.js');
	const typeList  = require('./ejecucion/typeList.js');
	const ArrList = require('./ejecucion/ArrList.js');
	const ArrParamList = require('./ejecucion/ArrParamList.js')
	const objList = require('./ejecucion/objList.js')
	const Obj = require('./ejecucion/Obj.js')
	const objProperty = require('./ejecucion/objProperty.js')
%}

%start S

%%

S: Bloque EOF
{ return $1; }
;

Bloque: Bloque Instruccion { $1.push($2); $$=$1;}
	| Instruccion          { $$ = [$1]; }
;

Instruccion: llamadaFuncion
			{ $$ = $1; }
            |variables
			{ $$ = $1;}
            |Type id igual curlyBraceOpen parsObj curlyBraceClose semicolon/*; o no*/
			{ $$ =new decType($2,$5); }
			|funciones
			|IF
			|WHILE
			|DOWHILE
			|SWITCH
			|FOR
;

llamadaFuncion: id PL bracketOpen paramFunc bracketClose semicolon
                { $$ = new callFunction(0,0,$1,$2,$4);}
;
 PL:varLast {$$= $1;}
	|{$$ = null;}
;

paramFunc: paramFuncList { $$ = $1;} 
		|                { $$ = null;}                
;

paramFuncList: paramFuncList comma E
                  {$1.push($3); $$=$1;}
			  |E  {$$ = [$1];}
;

funciones: function id bracketOpen funcParam bracketClose funcDec
;

funcDec: dosPuntos types curlyBraceOpen STMT curlyBraceClose
		|curlyBraceOpen STMT curlyBraceClose
;

funcParam: funcParamList
		  |{ $$ = null; }
;

funcParamList: funcParamList comma id dosPuntos types
			  |id dosPuntos types
;

STMT: STMT InstruccionI   { $1.push($2); $$=$1;}
	 |InstruccionI        { $$ = [$1]; }
;

InstruccionI: llamadaFuncion
			{ $$=$1; }
            |variables
			{ $$=$1; }
            |IF
            |WHILE
            |DOWHILE
            |SWITCH
            |FOR
            |Break semicolon
            |Continue semicolon
            |return OP
;

OP: E semicolon { $$ = $1;}
	|semicolon  { $$ = null; }
	;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
;

IFLAST: else IFCOND
	  |{ $$ = null; }
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

FIRSTCASE: CASE { $$ = $1; }
		  | { $$ = null; }
;

CASE: CASE case exp dosPuntos STMT
	 |case exp dosPuntos STMT
;

LASTCASE: DEFCASE ENDCASE
;

DEFCASE: default dosPuntos STMT
;

ENDCASE: CASE { $$ = $1; }
		|{ $$ = null; }
;


FOR: for bracketOpen let id igual exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	|for bracketOpen exp igual exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	|for bracketOpen exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	|for bracketOpen let id forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	|for bracketOpen exp forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
;

forOP: in { $$ = $1; }
	  |of { $$ = $1; }
;

defVarLast: comma defVarLastP
			|{$$=null;}
;

defVarLastP: defVarLastP comma id defLast
			|id defLast
;

variables: defType id defLast defVarLast semicolon
            { $$ = new Variable(0,0,$1,$2,$3,$4); }
		  |id asignLast semicolon
		  |id asignLast
;

/*
scNot: semicolon {$$=$1;}
		|{$$ = "";};*/

asignLast: varLast asignLastF
		 | asignLastF
;

varLast: sqBracketOpen exp sqBracketClose  auxP
        { $$ = new idList(true,$2,$4);}
		| point id  auxP
        { $$ = new idList(false,$2,$3);}
;
		
auxP:varLast { $$ = $1;}
	| { $$ = null;}
	;

asignLastF:  igual E
			|masIgual E
			|menosIgual E
			|porIgual E
			|divisionIgual E
			|increment
			|decrement
;

parsObj: objType {$$ = $1;}
		|{$$ = null;}
;

objType: objType opkv keyvalueT
		{  $$ = new objType($1,$3); }
		|keyvalueT {$$ = new objType(null,$1);}
;


opkv: comma      {$$ = $1;}
	 | semicolon {$$ = $1;}
;

keyvalueT: id dosPuntos types
		{ $$ = new typeKeyValue($1,$3); }
;

defType: let   { $$ = $1; }
	    |const { $$ = $1; }
;

defLast: dosPuntos types igual E 
		{
			$$ = new defLast(0,0,$2,$4);
		}
        | igual E { $$ = new defLast(0,0,null,$2);}
        | { $$ = null; }
;

types: number  typesList
	   {
		   $$ = new Type("NUMBER",$2);
	   }
      |boolean typesList
	  {
		   $$ = new Type("BOOLEAN",$2);
	  }
      |string  typesList
	  {
		   $$ = new Type("STRING",$2);
	   }
      |void  typesList
	  {
		   $$ = new Type("VOID",$2);
	   }
      |id  typesList
	  {
		   $$ = new Type($1,$2);
	   }
;

typesList: typesL  { $$ = $1; }
		  |{ $$ = null; }
;

typesL: typesL sqBracketOpen sqBracketClose
		{
			$$ = new typeList(0,0,$1);
		}
		|sqBracketOpen sqBracketClose
		{
			$$ = new typeList(0,0,null);
		}
;

E: exp { $$ = $1; }
	| curlyBraceOpen objetoParam curlyBraceClose
	{
		$$ = new Obj($2);
	}
	;

exp:  exp mas exp
    { $$ = new Operation(0,0,$1,$3,"+"); }
	| exp menos exp
    { $$ = new Operation(0,0,$1,$3,"-"); }
	| exp por exp
    { $$ = new Operation(0,0,$1,$3,"*"); }
	| exp division exp
    { $$ = new Operation(0,0,$1,$3,"/"); }
	| menos exp %prec unary
    { $$ = new Operation(0,0,$2,null,"unary"); }
	| exp potencia exp
    { $$ = new Operation(0,0,$1,$3,"**"); }
	| exp modulo exp
    { $$ = new Operation(0,0,$1,$3,"%"); }
	| exp mayorque exp
    { $$ = new Operation(0,0,$1,$3,">"); }
	| exp menorque exp
    { $$ = new Operation(0,0,$1,$3,"<"); }
	| exp mayorigualque exp
    { $$ = new Operation(0,0,$1,$3,">="); }
	| exp menorigualque exp
    { $$ = new Operation(0,0,$1,$3,"<="); }
	| exp igualdad exp
    { $$ = new Operation(0,0,$1,$3,"=="); }
	| exp diferencia exp
    { $$ = new Operation(0,0,$1,$3,"!="); }
	| exp and exp
    { $$ = new Operation(0,0,$1,$3,"&&"); }
	| exp or exp
    { $$ = new Operation(0,0,$1,$3,"||"); }
	| not exp
    { $$ = new Operation(0,0,$2,null,"!"); }
	| bracketOpen exp bracketClose
    { $$ = $2; }
	| exp question exp dosPuntos exp
	| exp increment
    { $$ = new Operation(0,0,$1,null,"INC"); }
	| exp decrement
    { $$ = new Operation(0,0,$1,null,"DEC"); }
	| NUMBER
    { $$ = new TObject(0,0,$1,"NUMBER"); }
	| STRING
    { $$ = new TObject(0,0,$1/*.substring(1,$1.length-1)*/,"STRING"); }
	| true
    { $$ = new TObject(0,0,$1,"BOOLEAN"); }
	| false
    { $$ = new TObject(0,0,$1,"BOOLEAN"); }
	| null
    { $$ = new TObject(0,0,$1,"NULL"); }
	| undefined
    { $$ = new TObject(0,0,$1,"UNDEFINED"); }
	| id varLast
	| id
	{
		$$ = new Id(0,0,$1);
	}
	| id PL bracketOpen paramFunc bracketClose
	| sqBracketOpen arrParam sqBracketClose /*sqBCKFIN*/
	{
		$$ = new ArrList($2);
	}
;

sqBCKFIN: sqBckList { $$ = $1; }
		|           { $$ = null; }
;

sqBckList: sqBckList sqBracketOpen arrParam sqBracketClose
		|sqBracketOpen arrParam sqBracketClose
		;
/*
POI: POI point id
	{ $$ = $1 + $2 + $3;}
	|point id
	{ $$ = $1 + $2;}
	;*/

arrParam: listArrParam { $$ = $1; }
		 |{$$ = null;}
;

listArrParam: listArrParam comma E
			   { $$ = new ArrParamList($1,$3); }
			|E { $$ = new ArrParamList(null,$1); }
;

objetoParam: objetoParamList { $$ = $1; }
			|                {$$= null;}
;

objetoParamList: objetoParamList opkv keyvalue
				{ $$ = new objList($1,$3); }
		  		|keyvalue
				{ $$ = new objList(null,$1); }
;

keyvalue: id dosPuntos E
	{
		$$ = new objProperty($1,$3);
	}
;