const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
class callFunction extends Nodo{
    constructor(line, column,id,idList,params) {
        super(line,column,null);
        this.id = id;
        this.idList = idList;
        this.params = params;
    }

    run(scope) {
        
        if(this.id == "console") {
            
            if(this.idList != null) {

                var list = this.idList.run(scope);

                if(list.id == "log" && list.aux == null) {
                    
                    if(this.params != null) {
                        if(this.params.length == 1) {
                            
                            let tobj = this.params.pop();
                            //console.log("----------------------");
                            let newTObj = tobj.run(scope);
                            //console.log(newTObj);

                            if(newTObj.constructor.name == "Map") {
                                console.log(this.getStrObj(newTObj));
                            } else {
                                console.log(newTObj.value.toString());
                            }

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

                
            } else {

            }

            
        } else {
            console.log("ERROR");
            console.log(this.id);
        }

    }

    getStrObj(obj) {
        var str = "{\n"
        var prop = "";
        obj.forEach((value,key) => {
            
            prop += key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value);
            }
            prop += ",\n";
        });
        prop = prop.substring(0,prop.length-2)
        str += prop;
        str += "\n}"
        return str;
    }
}

module.exports = callFunction;