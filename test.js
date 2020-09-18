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

/*ast.forEach(element => {
    if(element.constructor.name == "decType") {
        element.run(scope,null);
    }
})*/

ast.forEach(element => {
    element.run(scope)
});

/*scope.typesTable.forEach(element => {
    console.log(element);
})*/
/*console.log("---TYPES---")
console.log(scope.typesTable)
console.log("---Variables---")
console.log(scope.table)*/
