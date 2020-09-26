const parser = require('./AST.js');
const fs = require('fs');
//const chalk = require('chalk');
let entrada;
try {
    entrada = fs.readFileSync('./archivo.ts');
} catch (e) {
    console.error(e);
    return;
}
let ast = parser.parse(entrada.toString());
console.log(ast.code);

/*
scope.table.forEach(element => {
    console.log(element);
});*/
/*console.log("---TYPES---")
console.log(scope.typesTable)*/
//console.log("---Variables---")
//console.log(scope.table)
//console.log(scope.functionTable)
