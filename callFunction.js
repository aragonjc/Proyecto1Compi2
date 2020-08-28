const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
class callFunction extends Nodo{
    constructor(line, column,id,params) {
        super(line,column,id);
        this.params = params;
    }

    run(scope) {
        
        if(this.value == "console.log") {
            if(this.params != null) {
                if(this.params.length == 1) {
                    
                    let tobj = this.params.pop();
                    console.log("----------------------");
                    console.log(tobj.run(scope).value);

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
            console.log("ERROR");
            console.log(this.value);
        }

    }
}

module.exports = callFunction;