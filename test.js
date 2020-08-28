const parser = require('./gramatica.js');
const Scope = require('./Scope.js');
const fs = require('fs');
let entrada;

let ast = parser.parse('console.log(!true);');

let scope = new Scope(null);

ast.forEach(element => {
    let r = element.run(scope);
});