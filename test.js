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
    element.run(scope)
});

scope.table.forEach(element => {
    console.log(element);
})
