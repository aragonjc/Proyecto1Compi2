const parser = require('./gramatica.js');
const Scope = require('./Scope.js');
const fs = require('fs');
let entrada;
try {
    // leemos nuestro archivo de entrada
    entrada = fs.readFileSync('./archivo.ts');
    console.log("---------Archivo Leido Con Exito--------------");
    console.log("-------------------------------------");
} catch (e) {
    console.error(e);
    return;
}
let ast = parser.parse(entrada.toString());
//console.log(ast);
/*let scope = new Scope(null);

ast.forEach(element => {
    let r = element.run(scope);
});*/