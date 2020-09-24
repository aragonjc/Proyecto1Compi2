const parser = require('./ejecucion.js');
const Scope = require('./ejecucion/Scope.js');
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

let scope = new Scope(null);

ast.forEach(element => {
    if(element.constructor.name == "decType") {
        element.run(scope,null);
    }
})

ast.forEach(element => {
    if(element.constructor.name == "Variable" ||element.constructor.name == "asignVariable" ) {
        element.run(scope,null);
    }
})
console.log("/***TABLA****/")
ast.forEach(element => {
    if(element.constructor.name == "Function") {
        element.run(scope,null);
    }
})

console.log("/*******/")
console.log("/*******/")
console.log("/*******/")
console.log("/*******/")
console.log("/*******/")
console.log("/*******/")
console.log("/*******/")
console.log("/*******/")
ast.forEach(element => {
    if(check(element))
        element.run(scope)
});

function check(element) {
    if(element.constructor.name == "Function") {
        return false;
    } else if(element.constructor.name == "Variable" ||element.constructor.name == "asignVariable" ) {
        return false;
    } else if(element.constructor.name == "decType") {
        return false;
    } else {
        return true;
    }
}
/*
scope.table.forEach(element => {
    console.log(element);
});*/
/*console.log("---TYPES---")
console.log(scope.typesTable)*/
//console.log("---Variables---")
//console.log(scope.table)
//console.log(scope.functionTable)
