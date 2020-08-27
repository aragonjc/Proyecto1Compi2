const parser = require('./gramatica.js');
const Scope = require('./Scope.js');
const fs = require('fs');
let entrada;

let ast = parser.parse("console.log('adios');");

let scope = new Scope(null);

ast.forEach(element => {
    let r = element.run(scope);
});