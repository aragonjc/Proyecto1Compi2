%{let s = null;
  let st;
  let aux;
  let funcList = [];
  let callFunc=[];
  let table = [];
  const chalk = require('chalk');
  let auxTable = [];
  let innerTable = [];
  %}
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
\"[^\"]*\"|\'[^\']*\'           return 'STRING';
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

    const callFunction = require('./callFunction.js');
    const TObject = require('./TObject.js');
	const Operation = require('./Operation.js');
%}

%start S

%% /*Gramática*/

S: Bloque EOF
{ return $1; }
;

Bloque: Bloque Instruccion { $$=$1 + $2;}
	| Instruccion          { $$=$1; }
;

Instruccion: llamadaFuncion
			{ $$ = $1 + "\n"; }
            |variables
			{ $$ = $1 + "\n"; }
            |Type id igual curlyBraceOpen parsObj curlyBraceClose
			{ $$ = $1 + " " + $2 +" "+ $3 + " "+ $4 + "\n" + $5 + "\n" + $6 + "\n\n";}
			|funciones
			{ 
				callFunc = [];
				aux = funcList.length != 0?funcList.join('\n'):"";
				funcList = [];
				/*console.log(chalk.blue("este es en func------"))
				console.log(chalk.blue(aux))*/
				$$ = $1 + "\n"+aux; 
				aux = "";
			}
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
{ $$ = $1 + $2 + " " + $3 +$4 +$5 + $6; }
;
 PL:POI  { $$ = $1; }
	|    { $$ = "" };


paramFunc: paramFuncList {$$ = $1;}
		|                {$$ = "";}
;

paramFuncList: paramFuncList comma E
			  {$$ = $1 + $2 + " " + $3;}
			  |E {$$ = $1;}
;

funciones: function id bracketOpen funcParam bracketClose funcDec
		   { 
			   
			   for(let i =0;i<callFunc.length;i++) {
				   $6 = String($6).replace(callFunc[i].id,callFunc[i].new_id);
			   }
				
			   $$ = $1 + " " + $2 + $3 + $4 + $5 + $6;
			   
			   }
;

funcDec: dosPuntos types curlyBraceOpen STMT curlyBraceClose
		{ 
			s = eval('$$');
			st = s.slice(s.indexOf("function")+1,s.length);
			s = st[0]
			aux = st.indexOf("function");
			st = aux != -1?st.slice(aux,st.length):"";
			aux = st != ""?"__" + s +"__"+st[1]:"";
			if(st != "") {
				callFunc.push({id:st[1],new_id:aux});
				st[1] = aux;
				let tab = st.indexOf("{");
				st[tab] = "{\n";
				
			}
			st = st != ""?st.join(' '):"";
			funcList.push(st);
			s="";
			st = "";
			aux = "";
			console.log(chalk.green("TABLA DE SIMBOLOS"));
			console.log(table);
			$$ = $1 + " " + $2 + " " +$3 + "\n" + $4 + $5 + "\n";
				
		}
		|curlyBraceOpen STMT curlyBraceClose
		{
			s = eval('$$');
			st = s.slice(s.indexOf("function")+1,s.length);
			s = st[0]
			aux = st.indexOf("function");
			st = aux != -1?st.slice(aux,st.length):"";
			aux = st != ""?"__" + s +"__"+st[1]:"";
			if(st != "") {
				callFunc.push({id:st[1],new_id:aux});
				st[1] = aux;
				let tab = st.indexOf("{");
				st[tab] = "{\n";
				
			}
			st = st != ""?st.join(' '):"";
			funcList.push(st);
			s="";
			st = "";
			aux = "";
			$$ = " " + $1 + "\n" + $2 + "\n" +$3 +"\n";
		}
;

funcParam: funcParamList { $$ = $1; }
		  |{ $$ = ""; }
;

funcParamList: funcParamList comma id dosPuntos types
			   { $$=$1 + $2 + " " + $3 + $4 + " " + $5;}
			  |id dosPuntos types
			  { $$ = $1 + $2 + " " + $3; }
;

STMT: STMT InstruccionI   { $$ = $1 + $2;}
	 |InstruccionI        { $$ = $1; }
;

InstruccionI: llamadaFuncion
			{ $$ = $1 + "\n"; }
            |variables
			{ $$ = $1 + "\n"; }
			|funciones
			//{ $$ = $1 + "\n"; }
			{$$="";}
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
            |Break semicolon
			{ $$ = $1 + $2 + "\n"; }
            |Continue semicolon
			{ $$ = $1 + $2 + "\n"; }
            |return OP
			{ $$ = $1 + " " + $2 + "\n";}

;

OP: E semicolon { $$ = $1 + $2; }
	|semicolon  { $$ = $1; }
	;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	{ $$ = $1 + " " + $2 + $3 + $4 + " " + $5 + "\n" + $6 + $7 + $8; }
;

IFLAST: else IFCOND
		{ $$ = " " + $1 + " " + $2; }
	  |{ $$ = "\n"; }
;

IFCOND: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	   { $$ = $1 + $2 + $3 + $4 + " " + $5 + "\n" + $6 + $7 + $8;  }
	   |curlyBraceOpen STMT curlyBraceClose
	   { $$ = $1 + "\n" + $2 + "\n" + $3 + "\n";} 
;

WHILE: while bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose
	   { $$ = $1 + $2 + $3 + $4 + " " + $5 + "\n" + $6  + $7 + "\n"; }
;

DOWHILE: do curlyBraceOpen STMT curlyBraceClose while bracketOpen exp bracketClose semicolon
		{ $$ = $1 + " " + $2 + "\n" + $3  + $4 + " " + $5 + $6 + $7 + $8 + $9 + "\n" }
;

SWITCH: switch bracketOpen exp bracketClose curlyBraceOpen FIRSTCASE LASTCASE curlyBraceClose
		{ $$ = $1 + $2 + $3 + $4 + " " + $5 + "\n" + $6 + "\n" + $7 + "\n" + $8 + "\n"; }
;

FIRSTCASE: CASE { $$ = $1; }
		  | { $$ = ""; }
;

CASE: CASE case exp dosPuntos STMT
	  { $$ = $1 + $2 + " " + $3 + $4 + "\n" + $5 ; }
	 |case exp dosPuntos STMT
	 { $$ = $1 + " " + $2 + $3 + "\n" + $4 + "\n"; }
;

LASTCASE: DEFCASE ENDCASE
		 { $$ = $1 + $2; }
;

DEFCASE: default dosPuntos STMT
		{ $$ = $1 + $2 + "\n" +$3; }
;

ENDCASE: CASE { $$ = $1; }
		|{ $$ = ""; }
;


FOR: for bracketOpen let id igual exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = $1 + $2 + $3 + " " + $4+ " " +$5+ " "+$6+$7+" "+$8+$9+ " " +$10 + $11 + " " + $12 + "\n" + $13 + $14 + "\n";}
	|for bracketOpen exp igual exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = $1 + $2 + $3+ " " +$4+ " "+$5+$6+" "+$7+$8+ " " +$9 + $10 + " " + $11 + "\n" + $12 + $13 + "\n";}
	|for bracketOpen exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = $1 + $2 + $3 + $4 + " " + $5 + $6 + " " + $7 + $8 + " " + $9 +"\n" + $10 + $11 + "\n";}
	|for bracketOpen let id forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = $1 + $2 + $3 + " " + $4 + " " + $5 + " " + $6 + $7 + " " + $8 + "\n" + $9 + $10 + "\n" }
	|for bracketOpen exp forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = $1 + $2 + $3 + " " + $4 + " " + $5 + $6 + " " + $7 + "\n" + $8 + $9 + "\n" }
;
forFDeclaracion: let id igual exp
				|id igual exp
				|id
;

forOP: in { $$ = $1; }
	  |of { $$ = $1; }
;

forDec: variables { $$ = $1; }
	   |id        { $$ = $1; }
;


variables: defType id defLast semicolon
		   {  table.push({tipo:"variable",valor:$2}) ;$$ = $1 + " " + $2 + $3 + $4; }
		  |id asignLast semicolon
		  { innerTable.push({tipo:"Uso",valor:$1});$$ = $1 + $2 + $3;}
		  |id asignLast
		  { innerTable.push({tipo:"uso",valor:$1});$$ = $1 + $2;}
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
			{ $$ = " " + $1 + " " + $2;}
			|menosIgual E
			{ $$ = " " + $1 + " " + $2;}
			|porIgual E
			{ $$ = " " + $1 + " " + $2;}
			|divisionIgual E
			{ $$ = " " + $1 + " " + $2;}
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

defType: let   { $$ = String($1); }
	    |const { $$ = String($1); }
;

defLast: dosPuntos types igual E
		          { $$ = $1 + " " + $2 + " " + $3 + " " + $4}
        | igual E { $$ = " " + $1 + " " + $2; }
        |         { $$ = ""; }
;

types: number  typesList{ $$ = $1;}
      |boolean typesList{ $$ = $1;}
      |string  typesList{ $$ = $1;}
      |void    typesList{ $$ = $1;}
      |id      typesList{ $$ = $1;}
;

typesList: typesL  { $$ = $1; }
		  |{ $$ = ""; }
;

typesL: typesL sqBracketOpen sqBracketClose
		{ $$ = $1 + $2 + $3; }
		|sqBracketOpen sqBracketClose
		{ $$ = $1 + $2; }
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
	{ $$ = $1 + $2 + " " + $3 + $4 + $5; }
	| sqBracketOpen arrParam sqBracketClose sqBCKFIN
	{ $$ = $1 + $2 + $3 + $4 ; }
	
;

sqBCKFIN: sqBckList { $$ = $1; }
		|           { $$ = ""; }
;

sqBckList: sqBckList sqBracketOpen arrParam sqBracketClose
		   { $$ = $1 + $2 + $3 + $4; }
		|sqBracketOpen arrParam sqBracketClose
		{ $$ = $1 + $2 + $3; }
		;

POI: POI point id
	{ $$ = $1 + $2 + $3;}
	|point id
	{ $$ = $1 + $2;}
	;

arrParam: listArrParam { $$ = $1; }
		 |{$$ = "";}
;

listArrParam: listArrParam comma E
             { $$ = $1 + $2 + " " + $3; }
			|E { $$ = $1; }
;

objetoParam: objetoParamList { $$ = $1; }
			|                {$$="\n";}
;

objetoParamList: objetoParamList opkv keyvalue
				{ $$ = $1 + $2 + "\n" +$3; }
		  		|keyvalue
				{ $$ = $1; }
;

keyvalue: id dosPuntos E
		 { $$ = "\t" + $1 + " " + $2 + $3; }
;