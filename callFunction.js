const Node = require('./Node.js');
const TObject = require('./TObject.js');
class callFunction extends Node{
    constructor(line, column,id,params) {
        super(line,column,id);
        this.params = params;
    }

    run(scope) {
        
        if(id == "console.log") {
            if(this.params != null) {
                if(this.params.length == 1) {
                    
                    let tobj = this.params.pop();
                    console.log("----------------------");
                    console.log(tobj.value)

                } else {
                    new Error(this.params.line,
                        this.params.column,
                        "Semantico",
                        "Error la funcion necesita un parametro");
                    console.log("-------ERROR----------");
                }
            } else {
                new Error(this.params.line,
                        this.params.column,
                        "Semantico",
                        "Error la funcion necesita un parametro");
                console.log("-------ERROR----------");
            }
        } else {

        }

    }
}

module.exports = callFunction;