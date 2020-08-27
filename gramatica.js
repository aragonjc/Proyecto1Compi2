/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,13],$V2=[1,15],$V3=[1,16],$V4=[1,17],$V5=[1,18],$V6=[1,19],$V7=[1,20],$V8=[1,21],$V9=[1,22],$Va=[5,9,10,27,38,42,43,44,52,65,66],$Vb=[1,27],$Vc=[1,46],$Vd=[1,48],$Ve=[2,15],$Vf=[1,39],$Vg=[1,40],$Vh=[1,41],$Vi=[1,42],$Vj=[1,43],$Vk=[1,44],$Vl=[1,45],$Vm=[1,47],$Vn=[1,71],$Vo=[1,60],$Vp=[1,68],$Vq=[1,69],$Vr=[1,70],$Vs=[23,25],$Vt=[1,79],$Vu=[1,80],$Vv=[1,81],$Vw=[1,82],$Vx=[1,83],$Vy=[1,84],$Vz=[1,85],$VA=[1,86],$VB=[1,87],$VC=[1,88],$VD=[1,89],$VE=[1,90],$VF=[1,91],$VG=[1,92],$VH=[1,93],$VI=[1,94],$VJ=[1,95],$VK=[14,23,25,29,37,71,72,73,74,75,76,77,78,79,80,81,82,83,84,86,87,88,96],$VL=[1,106],$VM=[5,9,10,14,27,33,34,35,36,37,38,42,43,44,48,51,52,55,56,65,66],$VN=[1,113],$VO=[1,109],$VP=[1,110],$VQ=[1,111],$VR=[1,112],$VS=[5,9,10,14,27,33,34,35,36,38,42,43,44,48,51,52,65,66],$VT=[10,14,27,33,34,35,36,38,42,43,44,48,51,52,65,66],$VU=[55,56],$VV=[1,131],$VW=[25,96],$VX=[1,154],$VY=[1,155],$VZ=[14,25,37],$V_=[11,12,14,25,37],$V$=[14,23,25,29,37,71,72,77,78,79,80,81,82,83,84,86,96],$V01=[14,23,25,29,37,71,72,73,74,76,77,78,79,80,81,82,83,84,86,96],$V11=[14,23,25,29,37,77,78,79,80,81,82,83,84,86,96],$V21=[1,182],$V31=[1,195],$V41=[2,37],$V51=[1,200],$V61=[14,48,51];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"Bloque":4,"EOF":5,"Instruccion":6,"llamadaFuncion":7,"variables":8,"Type":9,"id":10,"igual":11,"curlyBraceOpen":12,"parsObj":13,"curlyBraceClose":14,"funciones":15,"IF":16,"WHILE":17,"DOWHILE":18,"SWITCH":19,"FOR":20,"bracketOpen":21,"paramFunc":22,"bracketClose":23,"paramFuncList":24,"comma":25,"exp":26,"function":27,"funcDec":28,"dosPuntos":29,"types":30,"STMT":31,"InstruccionI":32,"llamadFuncion":33,"Break":34,"Continue":35,"return":36,"semicolon":37,"if":38,"IFLAST":39,"else":40,"IFCOND":41,"while":42,"do":43,"switch":44,"FIRSTCASE":45,"LASTCASE":46,"CASE":47,"case":48,"DEFCASE":49,"ENDCASE":50,"default":51,"for":52,"forDec":53,"forOP":54,"in":55,"of":56,"defType":57,"defLast":58,"asgnLast":59,"asignLast":60,"point":61,"objType":62,"opkv":63,"keyvalueT":64,"let":65,"const":66,"number":67,"boolean":68,"string":69,"void":70,"mas":71,"menos":72,"por":73,"division":74,"potencia":75,"modulo":76,"mayorque":77,"menorque":78,"mayorigualque":79,"menorigualque":80,"igualdad":81,"diferencia":82,"and":83,"or":84,"not":85,"question":86,"increment":87,"decrement":88,"NUMBER":89,"STRING":90,"true":91,"false":92,"null":93,"sqBracketOpen":94,"arrParam":95,"sqBracketClose":96,"objetoParam":97,"listArrParam":98,"objetoParamList":99,"keyvalue":100,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"Type",10:"id",11:"igual",12:"curlyBraceOpen",14:"curlyBraceClose",21:"bracketOpen",23:"bracketClose",25:"comma",27:"function",29:"dosPuntos",33:"llamadFuncion",34:"Break",35:"Continue",36:"return",37:"semicolon",38:"if",40:"else",42:"while",43:"do",44:"switch",48:"case",51:"default",52:"for",55:"in",56:"of",59:"asgnLast",61:"point",65:"let",66:"const",67:"number",68:"boolean",69:"string",70:"void",71:"mas",72:"menos",73:"por",74:"division",75:"potencia",76:"modulo",77:"mayorque",78:"menorque",79:"mayorigualque",80:"menorigualque",81:"igualdad",82:"diferencia",83:"and",84:"or",85:"not",86:"question",87:"increment",88:"decrement",89:"NUMBER",90:"STRING",91:"true",92:"false",93:"null",94:"sqBracketOpen",96:"sqBracketClose"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,6],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[7,4],[22,1],[22,0],[24,3],[24,1],[15,3],[28,5],[28,3],[31,2],[31,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,2],[32,3],[16,8],[39,2],[39,0],[41,8],[41,3],[17,7],[18,9],[19,8],[45,1],[45,0],[47,5],[47,4],[46,2],[49,3],[50,1],[50,0],[20,11],[20,9],[54,1],[54,1],[53,1],[53,1],[8,4],[8,3],[60,4],[60,2],[13,1],[13,0],[62,3],[62,1],[63,1],[63,1],[64,3],[57,1],[57,1],[58,4],[58,2],[58,0],[30,1],[30,1],[30,1],[30,1],[30,1],[26,3],[26,3],[26,3],[26,3],[26,2],[26,3],[26,3],[26,3],[26,3],[26,3],[26,3],[26,3],[26,3],[26,3],[26,3],[26,2],[26,5],[26,2],[26,2],[26,1],[26,1],[26,1],[26,1],[26,1],[26,3],[26,1],[26,4],[26,3],[26,3],[95,1],[95,0],[98,3],[98,1],[97,1],[97,0],[99,3],[99,1],[100,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:$V0,10:$V1,15:7,16:8,17:9,18:10,19:11,20:12,27:$V2,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{1:[3]},{5:[1,23],6:24,7:4,8:5,9:$V0,10:$V1,15:7,16:8,17:9,18:10,19:11,20:12,27:$V2,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($Va,[2,3]),o($Va,[2,4]),o($Va,[2,5]),{10:[1,25]},o($Va,[2,7]),o($Va,[2,8]),o($Va,[2,9]),o($Va,[2,10]),o($Va,[2,11]),o($Va,[2,12]),{21:[1,26],59:$Vb},{10:[1,28]},{10:[1,29]},{21:[1,30]},{21:[1,31]},{12:[1,32]},{21:[1,33]},{21:[1,34]},{10:[2,68]},{10:[2,69]},{1:[2,1]},o($Va,[2,2]),{11:[1,35]},{10:$Vc,12:$Vd,22:36,23:$Ve,24:37,26:38,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{37:[1,49]},{11:[1,52],29:[1,51],37:[2,72],58:50},{12:[1,55],28:53,29:[1,54]},{10:$Vc,12:$Vd,26:56,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:57,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:58,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{10:$Vc,12:$Vd,26:72,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{8:73,10:[1,75],53:74,57:14,65:$V8,66:$V9},{12:[1,76]},{23:[1,77]},{23:[2,14],25:[1,78]},o($Vs,[2,17],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ}),{10:$Vc,12:$Vd,26:96,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:97,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},o($VK,[2,97]),o($VK,[2,98]),o($VK,[2,99]),o($VK,[2,100]),o($VK,[2,101]),o($VK,[2,103],{21:[1,99],61:[1,98]}),{10:$Vc,12:$Vd,26:102,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm,95:100,96:[2,108],98:101},{10:$VL,14:[2,112],97:103,99:104,100:105},o($VM,[2,58]),{37:[1,107]},{10:$VN,30:108,67:$VO,68:$VP,69:$VQ,70:$VR},{10:$Vc,12:$Vd,26:114,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},o($VS,[2,18]),{10:$VN,30:115,67:$VO,68:$VP,69:$VQ,70:$VR},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:116,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{23:[1,117],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{23:[1,118],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{8:61,10:$Vn,14:[1,119],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VT,[2,22]),o($VT,[2,23]),o($VT,[2,24]),o($VT,[2,25]),o($VT,[2,26]),o($VT,[2,27]),o($VT,[2,28]),o($VT,[2,29]),o($VT,[2,30]),o($VT,[2,31]),o($VT,[2,32]),{10:$Vc,12:$Vd,26:122,37:[1,121],72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{59:$Vb},{23:[1,123],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},o($VU,[2,55],{37:[1,124]}),{54:125,55:[1,126],56:[1,127]},o($VU,[2,56],{59:$Vb}),{10:$VV,13:128,14:[2,62],62:129,64:130},o($Va,[2,13]),{10:$Vc,12:$Vd,26:132,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:133,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:134,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:135,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:136,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:137,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:138,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:139,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:140,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:141,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:142,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:143,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:144,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:145,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:146,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:147,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},o($VK,[2,95]),o($VK,[2,96]),o($VK,[2,82]),o($VK,[2,93]),{10:[1,148]},{10:$Vc,12:$Vd,22:149,23:$Ve,24:37,26:38,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{96:[1,150]},{25:[1,151],96:[2,107]},o($VW,[2,110],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ}),{14:[1,152]},{14:[2,111],25:$VX,37:$VY,63:153},o($VZ,[2,114]),{29:[1,156]},o($VM,[2,57]),{11:[1,157]},o($V_,[2,73]),o($V_,[2,74]),o($V_,[2,75]),o($V_,[2,76]),o($V_,[2,77]),{37:[2,71],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{12:[1,158]},{8:61,10:$Vn,14:[1,159],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{12:[1,160]},{12:[1,161]},{42:[1,162]},o($VT,[2,21]),o($VT,[2,33]),{37:[1,163],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{12:[1,164]},{10:$Vc,12:$Vd,26:165,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:[1,166]},{10:[2,53]},{10:[2,54]},{14:[1,167]},{14:[2,61],25:$VX,37:$VY,63:168},o($VZ,[2,64]),{29:[1,169]},o($Vs,[2,16],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ}),o($V$,[2,78],{73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V$,[2,79],{73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V01,[2,80],{75:$Vx,87:$VI,88:$VJ}),o($V01,[2,81],{75:$Vx,87:$VI,88:$VJ}),o($VK,[2,83]),o($V01,[2,84],{75:$Vx,87:$VI,88:$VJ}),o($V11,[2,85],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V11,[2,86],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V11,[2,87],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V11,[2,88],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V11,[2,89],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o($V11,[2,90],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,87:$VI,88:$VJ}),o([14,23,25,29,37,83,84,86,96],[2,91],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,87:$VI,88:$VJ}),o([14,23,25,29,37,84,86,96],[2,92],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,87:$VI,88:$VJ}),{29:[1,170],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},o($VK,[2,102]),{23:[1,171]},o($VK,[2,105]),{10:$Vc,12:$Vd,26:172,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},o($VK,[2,106]),{10:$VL,100:173},{10:[2,65]},{10:[2,66]},{10:$Vc,12:$Vd,26:174,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:175,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:176,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VS,[2,20]),{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:177,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:178,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{21:[1,179]},o($VT,[2,34]),{45:180,47:181,48:$V21,51:[2,44]},{37:[1,183],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{23:[1,184]},o($Va,[2,6]),{10:$VV,64:185},{10:$VN,30:186,67:$VO,68:$VP,69:$VQ,70:$VR},{10:$Vc,12:$Vd,26:187,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},o($VK,[2,104]),o($VW,[2,109],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ}),o($VZ,[2,113]),o($VZ,[2,115],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ}),{37:[2,70],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{8:61,10:$Vn,14:[1,188],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{8:61,10:$Vn,14:[1,189],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{8:61,10:$Vn,14:[1,190],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{10:$Vc,12:$Vd,26:191,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{46:192,49:193,51:[1,194]},{48:$V31,51:[2,43]},{10:$Vc,12:$Vd,26:196,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{10:$Vc,12:$Vd,26:197,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{12:[1,198]},o($VZ,[2,63]),o($VZ,[2,67]),o([14,23,25,29,37,96],[2,94],{71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ}),o($VS,[2,19]),o($VS,$V41,{39:199,40:$V51}),o($VS,[2,40]),{23:[1,201],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{14:[1,202]},{14:[2,50],47:204,48:$V21,50:203},{29:[1,205]},{10:$Vc,12:$Vd,26:206,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{29:[1,207],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{23:[1,208],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:209,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VS,[2,35]),{12:[1,212],38:[1,211],41:210},{37:[1,213]},o($VS,[2,42]),{14:[2,47]},{14:[2,49],48:$V31},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:214,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{29:[1,215],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:216,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{12:[1,217]},{8:61,10:$Vn,14:[1,218],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VS,[2,36]),{21:[1,219]},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:220,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VS,[2,41]),o([14,48],[2,48],{57:14,8:61,15:62,16:63,17:64,18:65,19:66,20:67,32:120,10:$Vn,27:$V2,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,65:$V8,66:$V9}),{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:221,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($V61,[2,46],{57:14,8:61,15:62,16:63,17:64,18:65,19:66,20:67,32:120,10:$Vn,27:$V2,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,65:$V8,66:$V9}),{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:222,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VS,[2,52]),{10:$Vc,12:$Vd,26:223,72:$Vf,85:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl,94:$Vm},{8:61,10:$Vn,14:[1,224],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($V61,[2,45],{57:14,8:61,15:62,16:63,17:64,18:65,19:66,20:67,32:120,10:$Vn,27:$V2,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,65:$V8,66:$V9}),{8:61,10:$Vn,14:[1,225],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{23:[1,226],71:$Vt,72:$Vu,73:$Vv,74:$Vw,75:$Vx,76:$Vy,77:$Vz,78:$VA,79:$VB,80:$VC,81:$VD,82:$VE,83:$VF,84:$VG,86:$VH,87:$VI,88:$VJ},o($VS,[2,39]),o($VS,[2,51]),{12:[1,227]},{8:61,10:$Vn,15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,31:228,32:59,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},{8:61,10:$Vn,14:[1,229],15:62,16:63,17:64,18:65,19:66,20:67,27:$V2,32:120,33:$Vo,34:$Vp,35:$Vq,36:$Vr,38:$V3,42:$V4,43:$V5,44:$V6,52:$V7,57:14,65:$V8,66:$V9},o($VS,$V41,{39:230,40:$V51}),o($VS,[2,38])],
defaultActions: {21:[2,68],22:[2,69],23:[2,1],126:[2,53],127:[2,54],154:[2,65],155:[2,66],203:[2,47]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 35;
break;
case 1:return 34;
break;
case 2:return 93;
break;
case 3:return 9;
break;
case 4:return 66;
break;
case 5:return 65;
break;
case 6:return 66;
break;
case 7:return 27;
break;
case 8:return 38;
break;
case 9:return 40;
break;
case 10:return 42;
break;
case 11:return 43;
break;
case 12:return 44;
break;
case 13:return 48;
break;
case 14:return 51;
break;
case 15:return 52;
break;
case 16:return 55;
break;
case 17:return 56;
break;
case 18:return 67;
break;
case 19:return 68;
break;
case 20:return 69;
break;
case 21:return 70;
break;
case 22:return 91;
break;
case 23:return 92;
break;
case 24:return 11;
break;
case 25:return 12;
break;
case 26:return 14;
break;
case 27:return 21;
break;
case 28:return 23;
break;
case 29:return 25;
break;
case 30:return 37;
break;
case 31:return 29;
break;
case 32:return 61;
break;
case 33:return 71;
break;
case 34:return 72;
break;
case 35:return 73;
break;
case 36:return 74;
break;
case 37:return 75;
break;
case 38:return 76;
break;
case 39:return 77;
break;
case 40:return 78;
break;
case 41:return 79;
break;
case 42:return 80;
break;
case 43:return 81;
break;
case 44:return 82;
break;
case 45:return 83;
break;
case 46:return 84;
break;
case 47:return 85;
break;
case 48:return 86;
break;
case 49:return 87;
break;
case 50:return 88;
break;
case 51:return 94;
break;
case 52:return 96;
break;
case 53:
break;
case 54:
break;
case 55:return 89;
break;
case 56:return 90;
break;
case 57:return 10;
break;
case 58:return 5;
break;
case 59: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:continue\b)/,/^(?:break\b)/,/^(?:null\b)/,/^(?:type\b)/,/^(?:const\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:function\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:of\b)/,/^(?:number\b)/,/^(?:boolean\b)/,/^(?:string\b)/,/^(?:void\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:=)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:;)/,/^(?::)/,/^(?:\.)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:\*\*)/,/^(?:%)/,/^(?:>)/,/^(?:<)/,/^(?:>=)/,/^(?:<=)/,/^(?:==)/,/^(?:!=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\?)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\[)/,/^(?:\])/,/^(?:[ \r\t]+)/,/^(?:\n)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:"[^\"]*"|'[^\']*')/,/^(?:([a-zA-Z$._])[a-zA-Z0-9_$.]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}