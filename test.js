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
//console.log(ast);
/*let scope = new Scope(null);
*/
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
//console.log(scopeST.innerFunc);
//console.log(usedVars);
//console.log(innerF);
//console.log(scopeST)
ast.forEach(element => {
    if(!(element.constructor.name == "tAsignVariables")) {
        a += element.translate(scopeST,null,usedVars,null);
    }
    
});
//console.log(scopeST)
var global = "";
if(scopeST.table.length > 0) {
    scopeST.table.forEach(element => {
        global += element.varDec + " " + element.id + ";\n";
    })
}

console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
console.log(global)
console.log(innerF)
console.log(a);