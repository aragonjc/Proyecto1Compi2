const parser = require('./gramatica.js');
const Scope = require('./traductor/translateScope.js');
const fs = require('fs');
let entrada;
try {
    // leemos nuestro archivo de entrada
    entrada = fs.readFileSync('./archivo.ts');
    /*console.log("---------Archivo Leido Con Exito--------------");
    console.log("-------------------------------------");*/
} catch (e) {
    console.error(e);
    return;
}
let result = parser.parse(entrada.toString());
var scopeT = new Scope(null);
var scopeST = new Scope(null);
var ast = result.ast;
var a = "";
var innerFunction = result.inner;
var innerF = "";

ast.forEach(element => {
    if(element.constructor.name == "tAsignVariables") {
        element.translate(scopeST,null,null,null);
    }
});

var usedVars = [];
if(innerFunction.length != 0) {
    innerFunction.forEach(element => {
        innerF += element.func.translate(scopeST,element.parent,usedVars,null);
        //scopeST.varUse = [];
    });
}

ast.forEach(element => {
    if(!(element.constructor.name == "tAsignVariables")) {
        a += element.translate(scopeST,null,usedVars,null);
    }
    
});

var global = "";
if(scopeST.table.length > 0) {
    scopeST.table.forEach(element => {
        global += element.varDec + " " + element.id + element.value+ ";\n";
    })
    global += "\n"
}

console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
var translateDoc = global + innerF + a;
/*console.log(global)
console.log(innerF)
console.log(a);*/
console.log(translateDoc)