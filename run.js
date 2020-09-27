const parser = require('./ejecucion.js');
const Scope = require('./ejecucion/Scope.js');
const translate = require('./EjecutarTraductor');
const parserAST = require('./AST.js');

let scope = null;
let tablaErrores = null;
//const mermaid = require('mermaid');
//const chalk = require('chalk');

$(document).ready(function(){
	//code here...
	var code = $(".codemirror-textarea")[0];
	var editor = CodeMirror.fromTextArea(code, {
        lineNumbers : true,
        mode: 'javascript'
    });
    
    var code_translate = $(".codemirror-translate")[0];
    var editor_translate = CodeMirror.fromTextArea(code_translate, {
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

    document.getElementById("tabla").onclick = function() {
        var table = document.getElementById("table-ts");
        table.innerHTML = "";
        if(scope != null) {

            var tab = scope.getTable();
            var type = scope.getTypesTable();
            var func = scope.getFunctionTable();

            
            var str = "<h2>Variables</h2>\n";
            str += "<table>\n"
            str += "<tr>\n" +
                   "<th>Nombre</th>\n"+
                   "<th>Tipo</th>\n" +
                   "<th>Valor</th>\n" +
                   "<th>Ambito</th>\n" +
                   "</tr>\n";
            for(let obj of tab) {
                str += "<tr>\n"
                str += "<th>" + obj[0] + "</th>\n";
                str += "<th>" + obj[1].type + "</th>\n";
                str += "<th>" + getValue(obj[1]) + "</th>\n";
                str += "<th>1</th>";
            }
            str += "</table>\n";
            str += "<h2>Funciones</h2>\n";
            str += "<table>\n"
            str += "<tr>\n" +
                   "<th>Nombre</th>\n"+
                   "<th>Tipo</th>\n" +
                   "<th>Ambito</th>\n" +
                   "</tr>\n";
            for(let obj of func) {
                str += "<tr>\n"
                str += "<th>" + obj[0] + "</th>\n";
                str += "<th>" + obj[1].type + "</th>\n";
                str += "<th>1</th>";
            }
            str += "</table>\n";
            str += "<h2>Types</h2>\n";
            str += "<table>\n"
            str += "<tr>\n" +
                   "<th>Nombre</th>\n"+
                   //"<th>Tipo</th>\n" +
                   "</tr>\n";
            for(let obj of type) {
                str += "<tr>\n"
                str += "<th>" + obj[0] + "</th>\n";
               // str += "<th>" + obj[1].type + "</th>\n";
                //str += "<th>1</th>";
            }
            str += "</table>\n";
            table.innerHTML = str;
        }
    }

    document.getElementById("traducir").onclick = function() {
        let entrada = editor_translate.getValue();
        consoleT.value = "";
        traducir(entrada,editor);
    }

    document.getElementById("traducir-ejecutar").onclick = function() {
        let entrada = editor_translate.getValue();
        consoleT.value = "";
        var traduccion = traducir(entrada,editor);
        ejecutar(traduccion,consoleT);
    }
});

function traducir(entrada,editor) {
    var r = translate(entrada);
    editor.getDoc().setValue(r);
    return r;
}

function getValue(obj) {
    //console.log(obj);
    if(obj.value instanceof Map) {
        return getStrObj(obj.value,"");
    } else if(obj.value.isArray) {
        return getStrArr(obj.value.value);
    } else {
        return obj.value.value;
    }
}

function getStrArr(obj) {
    var str = "["
    var prop = "";
    //console.log(obj)
    obj.forEach((value) => {

        //prop += tab + "\t"+ key + ": ";
        if(value.constructor.name == "TObject") {
            prop += value.value;
        } else if(value.isArray) {
            prop += getStrArr(value.value)
        } else if(value.constructor.name == "Map"){
            prop += getStrObj(value,"\t");
        }
        prop += ",";
    });
    prop = prop.substring(0,prop.length-1)
    str += prop;
    str += "]"
    return str;
}

function getStrObj(obj,tab) {
    var str = tab+"{\n"
    var prop = "";
    obj.forEach((value,key) => {

        prop += tab + "\t"+ key + ": ";
        if(value.constructor.name == "TObject") {
            prop += value.value;
        } else if(value.isArray) {
            prop += getStrArr(value.value)
        } else if(value.constructor.name == "Map"){
            prop += getStrObj(value,"\t");
        }
        prop += ",\n";
    });
    prop = prop.substring(0,prop.length-2)
    str += prop;
    str += "\n"
    str += tab +"}"
    return str;
}

function AST(entrada) {
    let ast = parserAST.parse(entrada.toString());
    console.log(ast)
    return ast.code;
}

function ejecutar(entrada,consoleT) {

    //console.log(console);
    
parser.tablaErrores = [];

let ast = parser.parse(entrada.toString());

tablaErrores = null;

scope = new Scope(null);

consoleT.value = "";

tablaErrores = ast.tabla;
ast = ast.ast;
var ts = document.getElementById("table");
ts.innerHTML = "";


if(tablaErrores.length > 0) {
    var str_ = "<table>\n";
    str_ += "<tr>\n" +
                   "<th>Linea</th>\n"+
                   "<th>Columna</th>\n" +
                   "<th>Tipo</th>\n" +
                   "<th>Mensaje</th>\n" +
                   "</tr>\n";
    tablaErrores.forEach(element => {
        str_ += "<tr>\n" +
                   "<th>"+element.line+"</th>\n"+
                   "<th>"+element.column+"</th>\n" +
                   "<th>"+element.type+"</th>\n" +
                   "<th>"+element.msg+"</th>\n" +
                   "</tr>\n";

    });
    str_ += "</table>\n";
    ts.innerHTML = str_;
    while(tablaErrores.length != 0) {
        tablaErrores.pop()
    }
    //return;
}

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
