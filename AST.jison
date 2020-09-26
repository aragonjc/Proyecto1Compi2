%{
	var contador = 0;
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
	
	const ast = require('./AST/AST.js');
	
%}

%start S

%%

S: Bloque EOF
{ return $1; }
;

Bloque: Bloque Instruccion { $1.push($2); $$=$1;}
	| Instruccion          { $$ = $1; }
;

Instruccion: llamadaFuncion
			{ $$=$1; }
            |variables
			{ $$=$1;}
            |Type id igual curlyBraceOpen parsObj curlyBraceClose semicolon
			{  }
			|funciones
			{ $$=$1; }
			|IF
			{ $$=$1; }
			|WHILE
			{ $$=$1;}
			|DOWHILE
			{ $$=$1; }
			|SWITCH
			{ $$=$1; }
			|FOR
			{ $$=$1; }
;

llamadaFuncion: id PL bracketOpen paramFunc bracketClose semicolon
				//INCOMPLETO
                {  }
;
 PL:varLast {$$= $1;}
	|{$$ = null;}
;

paramFunc: paramFuncList { $$=$1;} 
		|                { $$=null;}                
;

paramFuncList: paramFuncList comma E
                  {$1.push($3); $$=$1;}
			  |E  {$$ = [$1];}
;

funciones: function id bracketOpen funcParam bracketClose funcDec
{
			
}
;

funcDec: dosPuntos types curlyBraceOpen STMT curlyBraceClose
		 {
			
		 }
		|curlyBraceOpen STMT curlyBraceClose
		{
			
		 }
;

funcParam: funcParamList { $$ =$1;}	
		  |{ $$ = []; }
;

funcParamList: funcParamList comma id dosPuntos types
				{}
			  |id dosPuntos types
			  {}
;

STMT: STMT InstruccionI   { $1.push($2); $$=$1;}
	 |InstruccionI        { $$ = [$1]; }
;

InstruccionI: llamadaFuncion
			{ $$=$1; }
            |variables
			{ $$=$1; }
            |IF
			{ $$=$1; }
            |WHILE
			{ $$=$1; }
            |DOWHILE
			{ $$=$1; }
            |SWITCH
			{ $$=$1; }
            |FOR
			{ $$=$1; }
            |Break semicolon
			{  }
            |Continue semicolon
			{ }
            |return OP
			{  }
;

OP: E semicolon { $$ = $1;}
	|semicolon  { $$ = null; }
	;

IF: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	{ 
	 }
;

IFLAST: else IFCOND { $$ = $2; }
	  |{ $$ = null; }
;

IFCOND: if bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose IFLAST
	   {
		   
	   }
	   |curlyBraceOpen STMT curlyBraceClose
	   {
		   
	   }
;

WHILE: while bracketOpen exp bracketClose curlyBraceOpen STMT curlyBraceClose
		{
			
		}
;

DOWHILE: do curlyBraceOpen STMT curlyBraceClose while bracketOpen exp bracketClose semicolon
		{
			
		}
;

SWITCH: switch bracketOpen exp bracketClose curlyBraceOpen FIRSTCASE LASTCASE curlyBraceClose
		{
			
		}
;

FIRSTCASE: CASE { }
		  | { $$ = ""; }
;

CASE: CASE case exp dosPuntos STMT
	 {
		
	 }
	 |case exp dosPuntos STMT
	 {
		
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
	
}
;

ENDCASE: CASE { $$ = $1; }
		|{ $$ = null; }
;


FOR: for bracketOpen let id igual exp semicolon exp semicolon id asignLast bracketClose curlyBraceOpen STMT curlyBraceClose
	{}
	|for bracketOpen exp igual exp semicolon exp semicolon id asignLast bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		
	}
	|for bracketOpen exp semicolon exp semicolon id asignLast bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		
	}
	|for bracketOpen let id forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		
	}
	|for bracketOpen exp forOP exp bracketClose curlyBraceOpen STMT curlyBraceClose
	{
		
	}
;

forOP: in { $$ = $1; }
	  |of { $$ = $1; }
;

defVarLast: comma defVarLastP
			{
				
			}
			|{$$=null;}
;

defVarLastP: defVarLastP comma id defLast
			{
				
			}
			|id defLast
			{
				
			}
;

variables: defType id defLast defVarLast semicolon
            {  }
		  |id asignLast semicolon
		  {
			 $$ = $2;
		  }
		  |id asignLast
		  {
			$$ = $2;
		  }
;


asignLast: varLast asignLastF
			{
				
			}
		 | asignLastF
		 {
			$$ =$1;
		 }
;

varLast: sqBracketOpen exp sqBracketClose  auxP
        { }
		| point id  auxP
        { }
;
		
auxP:varLast { $$ = $1;}
	| { $$ = null;}
	;

asignLastF:  igual E
{
	$$ = $2;
}
			|masIgual E
			{
	
}
			|menosIgual E
			{
	
}
			|porIgual E
			{
	
}
			|divisionIgual E
			{
	
}
			|increment
			{
	
}
			|decrement
			{
	
}
;

parsObj: objType {$$ = $1;}
		|{$$ = null;}
;

objType: objType opkv keyvalueT
		{   }
		|keyvalueT {}
;


opkv: comma      {$$ = $1;}
	 | semicolon {$$ = $1;}
;

keyvalueT: id dosPuntos types
		{  }
;

defType: let   { $$ = $1; }
	    |const { $$ = $1; }
;

defLast: dosPuntos types igual E 
		{
			
		}
        | igual E { }
        | { $$ = null; }
;

types: number  typesList
	   {
	   }
      |boolean typesList
	  {
		   
	  }
      |string  typesList
	  {
		   
	   }
      |void  typesList
	  {
		  
	   }
      |id  typesList
	  {
		   
	   }
;

typesList: typesL  { $$ = $1; }
		  |{ $$ = null; }
;

typesL: typesL sqBracketOpen sqBracketClose
		{
			
		}
		|sqBracketOpen sqBracketClose
		{
			
		}
;

E: exp {
		contador++;
		$$ =  ast.Node(contador,"E",$1,null);
		}
	| curlyBraceOpen objetoParam curlyBraceClose
	{
		
	}
	;

exp:  exp mas exp
	{ 
		contador++;
		var e =  ast.Node(contador,"+",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp menos exp
	{ 
		contador++;
		var e =  ast.Node(contador,"-",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp por exp
	{ 
		contador++;
		var e =  ast.Node(contador,"*",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp division exp
	{ 
		contador++;
		var e =  ast.Node(contador,"/",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| menos exp %prec unary
	| exp potencia exp
	{ 
		contador++;
		var e =  ast.Node(contador,"**",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp modulo exp
	{ 
		contador++;
		var e =  ast.Node(contador,"%",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp mayorque exp
	{ 
		contador++;
		var e =  ast.Node(contador,">",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp menorque exp
	{ 
		contador++;
		var e =  ast.Node(contador,"<",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp mayorigualque exp
	{ 
		contador++;
		var e =  ast.Node(contador,">=",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp menorigualque exp
	{ 
		contador++;
		var e =  ast.Node(contador,"<=",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp igualdad exp
	{ 
		contador++;
		var e =  ast.Node(contador,"==",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp diferencia exp
	{ 
		contador++;
		var e =  ast.Node(contador,"!=",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp and exp
	{ 
		contador++;
		var e =  ast.Node(contador,"&&",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| exp or exp
	{ 
		contador++;
		var e =  ast.Node(contador,"||",$1,$3);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| not exp
    { 
		contador++;
		var e =  ast.Node(contador,"!",$2,null);
		contador++;
		$$ = ast.Node(contador,"exp",e,null)
	}
	| bracketOpen exp bracketClose
	| exp question exp dosPuntos exp
	| exp increment
	| exp decrement
	| NUMBER
    { 
		contador++;
		$$ = ast.Leaf(contador,$1);
	}
	| STRING
    { 
		contador++;
		$$ = ast.Leaf(contador,$1);
	}
	| true
    { 
		contador++;
		$$ = ast.Leaf(contador,"true");
	}
	| false
    { 
		contador++;
		$$ = ast.Leaf(contador,"false");
	}
	| null
    { 
		contador++;
		$$ = ast.Leaf(contador,"null");
	}
	| undefined
    { 
		contador++;
		$$ = ast.Leaf(contador,"undefined");
	}
	| id varLast
	| id
	{ 
		contador++;
		$$ = ast.Leaf(contador,$1);
	}
	| id PL bracketOpen paramFunc bracketClose
	| sqBracketOpen arrParam sqBracketClose
;

arrParam: listArrParam { $$ = $1; }
		 |{$$ = null;}
;

listArrParam: listArrParam comma E
			   {  }
			|E { }
;

objetoParam: objetoParamList { $$ = $1; }
			|                {$$= null;}
;

objetoParamList: objetoParamList opkv keyvalue
				{  }
		  		|keyvalue
				{  }
;

keyvalue: id dosPuntos E
	{
		
	}
;