const parser = require('./ejecucion.js');
const Scope = require('./ejecucion/Scope.js');
const parserAST = require('./AST.js');
//const mermaid = require('mermaid');
//const chalk = require('chalk');

$(document).ready(function(){
	//code here...
	var code = $(".codemirror-textarea")[0];
	var editor = CodeMirror.fromTextArea(code, {
        lineNumbers : true,
        mode: 'javascript'
    });
    var consoleT = document.getElementsByClassName('console')[0];
    var treeDiv = document.getElementById("merTree");
    document.getElementById("ejecutar").onclick = function() {
        let entrada = editor.getValue();
        consoleT.value = "";
        ejecutar(entrada,consoleT);
    }
    document.getElementById("Arbol").onclick = function() {
        let entrada = editor.getValue();
        consoleT.value = "";
        var str = "graph TD; \n"+AST(entrada);
        //treeDiv.innerHTML = str;

        var insertSvg = function(svgCode, bindFunctions){
            treeDiv.innerHTML = svgCode;
        };
        
        var graph = mermaid.mermaidAPI.render('graphDiv', str, insertSvg);

        mermaid.initialize({startOnLoad:true});
        mermaid.init();
    }
});

function AST(entrada) {
    let ast = parserAST.parse(entrada.toString());
    console.log(ast)
    return ast.code;
}

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
