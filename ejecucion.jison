
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
	const idVarlast = require('./ejecucion/idVarlast.js')
	const defVarLast = require('./ejecucion/defVarLast.js')
	const defVarLastP = require('./ejecucion/defVarLastP.js')
	const asignLastF = require('./ejecucion/asignLastF.js')
	const asignLast = require('./ejecucion/asignLast.js')
	const asignVariable = require('./ejecucion/asignVariable.js')
	const ternaryOp = require('./ejecucion/ternaryOp.js')
	const While = require('./ejecucion/While.js')
	const EscapeExp = require('./ejecucion/EscapeExp.js')
	const doWhile = require('./ejecucion/doWhile.js')
	const IF = require('./ejecucion/IF.js')

	const Defcase = require('./ejecucion/Defcase.js')
	const Case = require('./ejecucion/Case.js')
	const Switch = require('./ejecucion/Switch.js')

	const ForNormal = require('./ejecucion/ForNormal.js')
	const ForTwo = require('./ejecucion/ForTwo.js')
	const ForThree = require('./ejecucion/ForThree.js')
	const ForEach = require('./ejecucion/ForEach.js')
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
			{ $$ = $1; }
			|WHILE
			{ $$ = $1;}
			|DOWHILE
			{ $$ = $1; }
			|SWITCH
			{
				$$ = $1;
			}
			|FOR
			{
				$$ =$1;
			}
;

llamadaFuncion: id PL bracketOpen paramFunc bracketClose semicolon
				//INCOMPLETO
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
			{ $$ = $1; }
            |WHILE
			{ $$ = $1; }
            |DOWHILE
			{ $$ = $1; }
            |SWITCH
			{
				$$ =$1;
			}
            |FOR
			{
				$$ = $1;
			}
            |Break semicolon
			{
				$$ = new EscapeExp('BREAK',null);
			}
            |Continue semicolon
			{
				$$ = new EscapeExp('CONTINUE',null);
			}
            |return OP
			{
				$$ = new EscapeExp('RETURN',$1);
			}
;

OP: E semicolon { $$ = $1;}
	|semicolon  { $$ = null; }
	;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	{ 
		$$ = new IF($3,$6,$8);
	 }
;

IFLAST: else IFCOND { $$ = $2; }
	  |{ $$ = null; }
;

IFCOND: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	   {
		   $$ = new IF($3,$6,$8);
	   }
	   |curlyBraceOpen STMT curlyBraceClose
	   {
		   $$ = new IF(null,$2,null);
	   }
;

WHILE: while bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose
		{
			$$ = new While($3,$6);
		}
;

DOWHILE: do curlyBraceOpen STMT curlyBraceClose while bracketOpen exp bracketClose semicolon
		{
			$$ = new doWhile($7,$3);
		}
;

SWITCH: switch bracketOpen exp bracketClose curlyBraceOpen FIRSTCASE LASTCASE curlyBraceClose
		{
			$$ = new Switch($3,$6,$7);
		}
;

FIRSTCASE: CASE { $$ = new Case($1); }
		  | { $$ = null; }
;

CASE: CASE case exp dosPuntos STMT
	 {
		 $1.push({exp:$3,stmt:$5});
		 $$ = $1;
	 }
	 |case exp dosPuntos STMT
	 {
		 $$ = [{exp:$2,stmt:$4}]
	 }
;

//falta ENDCASE no se como hacer el funcionamiento correcto
LASTCASE: DEFCASE ENDCASE
	{
		$$ = $1;
	}
;

DEFCASE: default dosPuntos STMT
{
	$$ = new Defcase($3);
}
;

ENDCASE: CASE { $$ = $1; }
		|{ $$ = null; }
;


FOR: for bracketOpen let id igual exp semicolon exp semicolon id asignLast bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		$$ = new ForNormal($4,$6,$8,new asignVariable($10,$11),$14);
	}
	|for bracketOpen exp igual exp semicolon exp semicolon id asignLast bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		$$ = new ForTwo($3,$5,$7,new asignVariable($9,$10),$13);
	}
	|for bracketOpen exp semicolon exp semicolon id asignLast bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		$$ = new ForThree($3,$5,new asignVariable($7,$8),$11);
	}
	|for bracketOpen let id forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		$$ = new ForEach(true,$4,$5,$6,$9);
	}
	|for bracketOpen exp forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
;

forOP: in { $$ = $1; }
	  |of { $$ = $1; }
;

defVarLast: comma defVarLastP
			{
				$$ = new defVarLast($2);
			}
			|{$$=null;}
;

defVarLastP: defVarLastP comma id defLast
			{
				$$ = new defVarLastP(0,0,$1,$3,$4);
			}
			|id defLast
			{
				$$ = new defVarLastP(0,0,null,$1,$2);
			}
;

variables: defType id defLast defVarLast semicolon
            { $$ = new Variable(0,0,$1,$2,$3,$4); }
		  |id asignLast semicolon
		  {
			  //comprobar si es const o let
			  $$ = new asignVariable($1,$2);
		  }
		  |id asignLast
		  {
			  //comprobar si es const o let
			  $$ = new asignVariable($1,$2);
		  }
;

/*
scNot: semicolon {$$=$1;}
		|{$$ = "";};*/

asignLast: varLast asignLastF
			{
				$$ =new asignLast($1,$2);
			}
		 | asignLastF
		 {
			 $$ = new asignLast(null,$1);
		 }
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
{
	$$ = new asignLastF(null,$2);
}
			|masIgual E
			{
	$$ = new asignLastF("+",$2);
}
			|menosIgual E
			{
	$$ = new asignLastF("-",$2);
}
			|porIgual E
			{
	$$ = new asignLastF("*",$2);
}
			|divisionIgual E
			{
	$$ = new asignLastF("/",$2);
}
			|increment
			{
	$$ = new asignLastF("+",null);
}
			|decrement
			{
	$$ = new asignLastF("-",null);
}
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
	{
		$$ = new ternaryOp($1,$3,$5);
	}
	| exp increment
    { $$ = new Operation(0,0,$1,null,"INC"); }
	| exp decrement
    { $$ = new Operation(0,0,$1,null,"DEC"); }
	| NUMBER
    { $$ = new TObject(0,0,$1,"NUMBER"); }
	| STRING
    { $$ = new TObject(0,0,$1/*.substring(1,$1.length-1)*/,"STRING"); }
	| true
    { $$ = new TObject(0,0,true,"BOOLEAN"); }
	| false
    { $$ = new TObject(0,0,false,"BOOLEAN"); }
	| null
    { $$ = new TObject(0,0,$1,"NULL"); }
	| undefined
    { $$ = new TObject(0,0,$1,"UNDEFINED"); }
	| id varLast
	{

		$$ = new idVarlast(0,0,$1,$2);
	}
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

/*
sqBCKFIN: sqBckList { $$ = $1; }
		|           { $$ = null; }
;

sqBckList: sqBckList sqBracketOpen arrParam sqBracketClose
		|sqBracketOpen arrParam sqBracketClose
		;*/
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