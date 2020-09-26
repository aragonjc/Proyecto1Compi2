const parser = require('./ejecucion.js');
const Scope = require('./ejecucion/Scope.js');
const fs = require('fs');
//const chalk = require('chalk');

$(document).ready(function(){
	//code here...
	var code = $(".codemirror-textarea")[0];
	var editor = CodeMirror.fromTextArea(code, {
        lineNumbers : true,
        mode: 'javascript'
    });
    var consoleT = document.getElementsByClassName('console')[0];
    
    document.getElementById("ejecutar").onclick = function() {
        let entrada = editor.getValue();
        consoleT.value = "";
        ejecutar(entrada,consoleT);
    }
});

function ejecutar(entrada,consoleT) {

    //console.log(console);
    

let ast = parser.parse(entrada.toString());

let scope = new Scope(null);

ast.forEach(element => {
    if(element.constructor.name == "decType") {
        element.run(scope,consoleT);
    }
})

ast.forEach(element => {
    if(element.constructor.name == "Variable" ||element.constructor.name == "asignVariable" ) {
        element.run(scope,consoleT);
    }
})

ast.forEach(element => {
    if(element.constructor.name == "Function") {
        element.run(scope,consoleT);
    }
})

ast.forEach(element => {
    if(check(element))
        element.run(scope,consoleT)
});

}

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
