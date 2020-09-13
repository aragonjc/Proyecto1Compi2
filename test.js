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
let ast = parser.parse(entrada.toString());
var scopeT = new Scope(null);

//console.log(ast);
/*let scope = new Scope(null);
*/
var a = "";
ast.forEach(element => {
    a = element.translate(scopeT);
});
//console.log(a);