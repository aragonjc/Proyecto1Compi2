const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
const Scope = require('./Scope.js');
const Variable = require("./Variable");
const defLast = require("./defLast");

const asignVariable = require('./asignVariable.js');
const asignLast = require("./asignLast");
const asignLastF = require("./asignLastF");

class callFunction extends Nodo{
    constructor(line, column,id,idList,params) {
        super(line,column,null);
        this.id = id;
        this.idList = idList;
        this.params = params;
        this.stmt = null;
    }

    run(scope) {
        
        if(this.id == "console") {
            
            if(this.idList != null) {

                var list = this.idList.run(scope);
                if(list.id == "log" && list.aux == null) {
                    if(this.params != null) {
                        //console.log(this.params)
                        if(this.params.length == 1) {
                            let tobj = this.params[0];
                            //console.log("----------------------");
                            let newTObj = tobj.run(scope);
                            //console.log(newTObj);
                            
                            if(newTObj.constructor.name == "Map") {
                                console.log(this.getStrObj(newTObj,""));
                                
                            } else if(newTObj.isArray) {
                                /*console.log("########")
                                console.log(newTObj)
                                console.log("######################")*/
                                console.log(this.getStrArr(newTObj.value));
                            }else {
                                console.log(newTObj.value.toString());
                            }

                        } else {
                            new Error(this.params.line,
                                this.params.column,
                                "Semantico",
                                "Error la funcion necesita un parametro");
                            console.log("r-------ERROR----------r");
                        }
                    } else {
                        new Error(this.params.line,
                                this.params.column,
                                "Semantico",
                                "Error la funcion necesita un parametro");
                        console.log("a-------ERROR----------a");
                    }

                } else {

                }

                
            } else {

                return this.runFunction(scope);
            }
            
        } else if(this.id == "graficar_ts") {
            if(this.idList == null) {

                

            } else {
                console.log("Error")
                var undef = new TObject(0,0,"undefined","UNDEFINED");
                return undef.run(scope);
            }
        } else {
            if(this.idList != null) {



            } else {
                return this.runFunction(scope);
            }
        }
    }

    runFunction(scope) {
        
        if(scope.checkFunction(this.id)) {

            return this.func(scope);

        } else {
            //error
            console.log("Error")
            var undef = new TObject(0,0,"undefined","UNDEFINED");
            return undef.run(scope);
        }

    }

    func(scope) {

        var funcObj = scope.functionTable.get(this.id);
        //console.log(funcObj)
        this.stmt = funcObj.stmt;
        var functionScope = new Scope(scope);
        
        for (let param of funcObj.param) {
            var asgn = new Variable(0,0,'let',param.id,new defLast(0,0,param.types,new TObject(0,0,"null",'NULL')),null);
            asgn.run(functionScope);
        }

        if(funcObj.param.length == this.params.length) {
            //comprobar tipos
            for (let param in this.params) {
                var changeValue = new asignVariable(funcObj.param[param].id,new asignLast(null,new asignLastF(null,this.params[param])));
                changeValue.run(functionScope);
            }
        } else {
            console.log("ERROR en la cantidad de parametros")
        }

        var aux = this.statement(functionScope);
        if(aux != null) {
    
            if(aux.type == 'RETURN') {
                return aux.res;
            } 
        }

        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope);
    }

    statement(scope) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope);
                //console.log(aux)
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } 
                }
            }     
        }
        return null;
    }

    getStrArr(obj) {
        var str = "["
        var prop = "";
        //console.log(obj)
        obj.forEach((value) => {

            //prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",";
        });
        prop = prop.substring(0,prop.length-1)
        str += prop;
        str += "]"
        return str;
    }

    getStrObj(obj,tab) {
        var str = tab+"{\n"
        var prop = "";
        obj.forEach((value,key) => {

            prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",\n";
        });
        prop = prop.substring(0,prop.length-2)
        str += prop;
        str += "\n"
        str += tab +"}"
        return str;
    }
}

module.exports = callFunction;