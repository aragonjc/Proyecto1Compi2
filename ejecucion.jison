%{let s = null;
  let st;
  let aux;
  let funcList = [];
  let callFunc=[];
  let table = [];
  const chalk = require('chalk');
  const deepcopy = require('deepcopy');
  var auxTable = [];
  let innerTable = [];
  let functionTable = [];
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

	const callFunction = require('./callFunction.js');
    const TObject = require('./TObject.js');
	const Operation = require('./Operation.js');
	
%}

%start S

%% /*Gramática*/

S: Bloque EOF
{ return {ast:$1,inner:functionTable}; }
;

Bloque: Bloque Instruccion { $1.push($2); $$=$1;}
	| Instruccion          { $$ = [$1]; }
;

Instruccion: llamadaFuncion
			{ $$ = $1; }
            |variables
			{ $$ = $1; }
            |Type id igual curlyBraceOpen parsObj curlyBraceClose semicolon/*; o no*/
			{ $$ = new declaracionTypes($2,$5); }
			|funciones
			{ 
				/*callFunc = [];
				aux = funcList.length != 0?funcList.join('\n'):"";
				funcList = [];*/
				//ESTO NO
				/*console.log(chalk.blue("este es en func------"))
				console.log(chalk.blue(aux))*/
				/*for(let a in table)
					console.log(table[a]);
				console.log("------------------------------------");*/
				/*$$ = $1 + "\n"+aux; 
				aux = "";*/

				$$ = $1;
			}
			|IF
			{ $$ = $1; }
			|WHILE
			{ $$ = $1; }
			|DOWHILE
			{ $$ = $1; }
			|SWITCH
			{ $$ = $1; }
			|FOR
			{ $$ = $1; }
;

llamadaFuncion: id PL bracketOpen paramFunc bracketClose semicolon
{ 
	$$ = new tLlamadaFunciones($1,$2,$4,";");
}
;
 PL:varLast  { $$ = $1; }
	|    { $$ = null };


paramFunc: paramFuncList {$$ = $1;}
		|                {$$ = null;}
;

paramFuncList: paramFuncList comma E
			  {$$ = new paramFuncList($1,$3);}
			  |E {$$ = new paramFuncList(null,$1);}
;

funciones: function id bracketOpen funcParam bracketClose funcDec
		   { 
			   
			   /*for(let i =0;i<callFunc.length;i++) {
				   $6 = String($6).replace(callFunc[i].id,callFunc[i].new_id);
			   }
				
			   $$ = $1 + " " + $2 + $3 + $4 + $5 + $6;*/
			   /*var a6 = $6.tree
			  	if($6.inner != undefined) {
					  functionTable.push({parent:$2,function:$6});
				}*/	
				if(auxTable.length != 0) {
					for(var i in auxTable) {
						functionTable.push({parent:$2,func:auxTable[i]});
					}
					auxTable = [];
				}
			   $$ = new translateFunction($2,$6,$4);
			   
			}
;

funcDec: dosPuntos types curlyBraceOpen STMT curlyBraceClose
		{ 
			/*console.log(chalk.green("FUNCION"));*/
			//s = eval('$$');
			var f = eval('$$');
			//console.log(chalk.red("LA PILA"))
			var value;
			var index = 0;
			var parentId = f[2];
			for(let i in f) {
				if(Array.isArray(f[i])) {
					value = f[i];
				}
			}
			if(index != 0) {
				//console.log(chalk.blue(f[index]));
			}
			//console.log(chalk.red("-----------------------"))
			var listStmt = [];
			var innerFunctions = [];
			for(let i in value) {
				//console.log(value[i])
				if(value[i].constructor.name == "translateFunction")
					auxTable.push(value[i])
				else
					listStmt.push(value[i]);
				//console.log(chalk.green("#########"));
			}
			//console.log(chalk.red(" -----------------------------"))
			/*st = s.slice(s.indexOf("function")+1,s.length);
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
			//console.log(chalk.green("TABLA DE SIMBOLOS"));
			//console.log(table);
			$$ = $1 + " " + $2 + " " +$3 + "\n" + $4 + $5 + "\n";*/
			$$ =  new funcDec(listStmt,$2)
	
		}
		|curlyBraceOpen STMT curlyBraceClose
		{
			var f = eval('$$');
			//console.log(chalk.red("LA PILA"))
			
			var value;
			var index = 0;
			var parentId = f[2];
			for(let i in f) {
				if(Array.isArray(f[i])) {
					value = f[i];
				}
			}
			if(index != 0) {
				//console.log(chalk.blue(f[index]));
			}
			//console.log(chalk.red("-----------------------"))
			var listStmt = [];
			var innerFunctions = [];
			for(let i in value) {
				//console.log(value[i])
				if(value[i].constructor.name == "translateFunction")
					auxTable.push(value[i])
				else
					listStmt.push(value[i]);
				//console.log(chalk.green("#########"));
			}
			$$ =  new funcDec(listStmt,null)
				
		}
;

funcParam: funcParamList { $$ = $1; }
		  |{ $$ = null; }
;

funcParamList: funcParamList comma id dosPuntos types
			   { $$ = new funcPars($1,$3,$5); }
			  |id dosPuntos types
			  { $$ = new funcPars(null,$1,$3); }
;

STMT: STMT InstruccionI   { $1.push($2); $$=$1;}
	 |InstruccionI        { $$ = [$1]; }
;

InstruccionI: llamadaFuncion
			{ $$=$1; }
            |variables
			{ $$=$1; }
			|funciones
			{
				/*table.push({"func":JSON.parse(JSON.stringify(innerTable))});
				innerTable = [];
				$$="";*/
				$$ = $1;
			}
            |IF
			{ $$ = $1; }
            |WHILE
			{ $$ = $1; }
            |DOWHILE
			{ $$ = $1; }
            |SWITCH
			{ $$ = $1; }
            |FOR
			{ $$ = $1; }
            |Break semicolon
			{ $$ = new scapeT($1); }
            |Continue semicolon
			{ $$ = new scapeT($1); }
            |return OP
			{ 
				$$ = new tReturn($2);
			}

;

OP: E semicolon { $$ = $1;}
	|semicolon  { $$ = null; }
	;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	{ $$ = new tIf($3,$6,$8);}
;

IFLAST: else IFCOND
		{ $$ = new tIfLast($2); }
	  |{ $$ = null; }
;

IFCOND: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	   { $$ = new tIfCond($3,$6,$8); }
	   |curlyBraceOpen STMT curlyBraceClose
	   { $$ = new tIfCondElse($2);} 
;

WHILE: while bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose
	   	{ 
		   $$ = new twhile($3,$6);
	 	}
;

DOWHILE: do curlyBraceOpen STMT curlyBraceClose while bracketOpen exp bracketClose semicolon
		{ $$ = new tdowhile($3,$7); }
;

SWITCH: switch bracketOpen exp bracketClose curlyBraceOpen FIRSTCASE LASTCASE curlyBraceClose
		{ $$ = new tSwitch($3,$6,$7); }
;

FIRSTCASE: CASE { $$ = $1; }
		  | { $$ = null; }
;

CASE: CASE case exp dosPuntos STMT
	  { $$ = new tCase($1,$3,$5) ; }
	 |case exp dosPuntos STMT
	 { $$ = new tCase(null,$2,$4); }
;

LASTCASE: DEFCASE ENDCASE
		 { $$ = new tLastcase($1,$2); }
;

DEFCASE: default dosPuntos STMT
		{ $$ = new tDefcase($3); }
;

ENDCASE: CASE { $$ = $1; }
		|{ $$ = null; }
;


FOR: for bracketOpen let id igual exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = new tFor($4,$6,$8,$10,$13);}
	|for bracketOpen exp igual exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = new tFor2($3,$5,$7,$9,$12);}
	|for bracketOpen exp semicolon exp semicolon exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = new tFor3($3,$5,$7,$10);}
	|for bracketOpen let id forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{ $$ = new tFor4($4,$5,$6,$9); }
	|for bracketOpen exp forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{  $$ = new tForV($3,$4,$5,$8); }
;
/*
forFDeclaracion: let id igual exp
				|id igual exp
				|id
;*/

forOP: in { $$ = $1; }
	  |of { $$ = $1; }
;

forDec: variables { $$ = $1; }
	   |id        { $$ = $1; }
;

defVarLast: comma defVarLastP 
			{
				$$ = new defVarLast($2);
			}
			|{$$=null;};

defVarLastP: defVarLastP comma id defLast
			{
				$$ = new defVarLastP($1,$3,$4);
			}
			|id defLast
			{
				$$ = new defVarLastP(null,$1,$2);
			};

variables: defType id defLast defVarLast semicolon
		  {  
				$$ = new tAsignVariables($2,$3,$1,$4,";");
		  }
		  |id asignLast semicolon
		  { 
			  $$ = new tVariables($1,$2,";");
		  }
		  |id asignLast
		  { 
			  $$ = new tVariables($1,$2,"");
		  }
;

/*
scNot: semicolon {$$=$1;}
		|{$$ = "";};*/

asignLast: varLast asignLastF
		 { $$ = new asignLast($1,$2); }
		 | asignLastF
		 { $$ = $1; }
;

varLast: sqBracketOpen exp sqBracketClose  auxP { $$ = new varArrList($2,$4);}
		| point id  auxP { $$ = new varIdList($2,$3); }
;
		
auxP:varLast { $$ = $1;}
	| { $$ = null;}
	;

asignLastF:  igual E
			{ 
				$$ = new asignLastF($1,$2);
			}
			|masIgual E
			{ 
				$$ = new asignLastF($1,$2);
			}
			|menosIgual E
			{ 
				$$ = new asignLastF($1,$2);
			}
			|porIgual E
			{ 
				$$ = new asignLastF($1,$2);
			}
			|divisionIgual E
			{ 
				$$ = new asignLastF($1,$2);
			}
			|increment
			{ 
				$$ = new asignLastF($1,null);
			}
			|decrement
			{ 
				$$ = new asignLastF($1,null);
			}
;

parsObj: objType {$$ = $1;}
		|{$$ = null;}
;

objType: objType opkv keyvalueT 
		{
			$$ = new objType($1,$2,$3);
		}
		|keyvalueT {$$ = $1;}
;


opkv: comma      {$$ = $1;}
	 | semicolon {$$ = $1;}
;

keyvalueT: id dosPuntos types
	      { $$ = new tKeyvalueT($1,$3); }
;

defType: let   { $$ = $1; }
	    |const { $$ = $1; }
;

defLast: dosPuntos types igual E
		{ 
			$$ = new defLast($2,$4);
		}
        | igual E 
		{ 
			$$= new defLast(null,$2);;  
		}
        | { $$ = null; }
;

types: number  typesList{ $$ = new types($1,$2);}
      |boolean typesList{ $$ = new types($1,$2);}
      |string  typesList{ $$ = new types($1,$2);}
      |void    typesList{ $$ = new types($1,$2);}
      |id      typesList{ $$ = new types($1,$2);}
;

typesList: typesL  { $$ = $1; }
		  |{ $$ = null; }
;

typesL: typesL sqBracketOpen sqBracketClose
		{ $$ = new typesL($1); }
		|sqBracketOpen sqBracketClose
		{ $$ = new typesL(null); }
;

E: exp { $$ = $1; }
	| curlyBraceOpen objetoParam curlyBraceClose
	{    $$ = new expObject($2);	}
	;

exp: exp mas exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp menos exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp por exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp division exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| menos exp %prec unary
	{ 
		$$ = new tminus($1,$2);
	}
	| exp potencia exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp modulo exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp mayorque exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp menorque exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp mayorigualque exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp menorigualque exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp igualdad exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp diferencia exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp and exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| exp or exp
	{ 
		$$ = new tOperation($1,$2,$3,$1 + $2 + $3);
	}
	| not exp
	{ 
		$$ = new tminus($1,$2);
	}
	| bracketOpen exp bracketClose
	{ 
		$$ = new expBracket($2);
	}
	| exp question exp dosPuntos exp
	{ 
		$$ = new ternaryOp($1,$3,$5);
	}
	| exp increment
	{
		$$ = new expRight($1,$2);
	}
	| exp decrement
	{ 
		$$ = new expRight($1,$2);
	}
	| NUMBER
	{ 
		$$ = new tnumber($1,$1);
	}
	| STRING
	{ 
		$$ = new tnumber($1,$1);
	}
	| true
	{ 
		$$ = new tnumber($1,$1);
	}
	| false
	{ 
		$$ = new tnumber($1,$1);
	}
	| null
	{ 
		$$ = new tnumber($1,$1);
	}
	| undefined
	{ 
		$$ = new tnumber($1,$1);
	}
	| id varLast
	{
		$$ = new expIdList($1,$2);
	}
	| id
	{ 
		$$ = new tId($1,null,$1);
	}
	| id PL bracketOpen paramFunc bracketClose
	{ 
		$$ = new tLlamadaFunciones($1,$2,$4,"");
	}
	| sqBracketOpen arrParam sqBracketClose sqBCKFIN
	{ 
		$$ = new expArrList($2,$4);
	}
	
;

sqBCKFIN: sqBckList { $$ = $1; }
		|           { $$ = null; }
;

sqBckList: sqBckList sqBracketOpen arrParam sqBracketClose
		{ $$ = new arrList($1,$3); }
		|sqBracketOpen arrParam sqBracketClose
		{ $$ = new arrList(null,$2); }
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
             { $$ = new arrParamList($1,$2); }
			|E { $$ = $1; }
;

objetoParam: objetoParamList { $$ = $1; }
			|                {$$= null;}
;

objetoParamList: objetoParamList opkv keyvalue
				{ $$ = new tObjectParamList($1,$2,$3); }
		  		|keyvalue
				{ $$ = $1; }
;

keyvalue: id dosPuntos E
		 { $$ = new tKeyvalue($1,$3); }
;