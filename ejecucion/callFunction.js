const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
const Scope = require('./Scope.js');
const Variable = require("./Variable");
const defLast = require("./defLast");
const idVarlast = require("./idVarlast");

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

    run(scope,consoleT) {
        
        if(this.id == "console") {
            
            if(this.idList != null) {

                var list = this.idList.run(scope,consoleT);
                if(list.id == "log" && list.aux == null) {
                    if(this.params != null) {
                        //console.log(this.params)
                        if(this.params.length == 1) {
                            let tobj = this.params[0];
                            //console.log("----------------------");
                            let newTObj = tobj.run(scope,consoleT);
                            //console.log(newTObj);
                            //console.log(tobj)
                            if(newTObj.constructor.name == "Map") {
                                
                                if(consoleT) {
                                    consoleT.value += this.getStrObj(newTObj,"") + "\n";
                                }

                                console.log(this.getStrObj(newTObj,""));
                                
                            } else if(newTObj.isArray) {
                                /*console.log("########")
                                console.log(newTObj)
                                console.log("######################")*/
                                if(consoleT) {
                                    consoleT.value += this.getStrArr(newTObj.value) + "\n";
                                }
                                console.log(this.getStrArr(newTObj.value));
                            }else {
                                if(consoleT) {
                                    consoleT.value += newTObj.value.toString() + "\n";
                                }
                                console.log(newTObj.value.toString());
                            }

                        } else {
                            let str = "";
                            for (let i = 0; i < this.params.length; i++) {
                                let tobj = this.params[i];
                                //console.log("----------------------");
                                let newTObj = tobj.run(scope,consoleT);
                                //console.log(newTObj);
                                //console.log(tobj)
                                if(newTObj.constructor.name == "Map") {
                                    
                                    str += this.getStrObj(newTObj,"")+" ";
                                    
                                } else if(newTObj.isArray) {
                                    /*console.log("########")
                                    console.log(newTObj)
                                    console.log("######################")*/
                                    str += this.getStrArr(newTObj.value)+" ";
                                }else {
                                    str += newTObj.value.toString()+" ";
                                }
                                
                            }
                            if(consoleT) {
                                consoleT.value += str + "\n";
                            }
                            console.log(str);

                            /*new Error(this.params.line,
                                this.params.column,
                                "Semantico",
                                "Error la funcion necesita un parametro");
                                console.log("Error 1 en callFunction.js")*/
                        }
                    } else {
                        new Error(this.params.line,
                                this.params.column,
                                "Semantico",
                                "Error la funcion necesita un parametro");
                                console.log("Error 2 en callFunction.js")
                    }

                } else {
                    console.log("No se qe va aqui callFunction.js")
                }

                
            } else {

                return this.runFunction(scope,consoleT);
            }
            
        } else if(this.id == "graficar_ts") {
            if(this.idList == null) {

                var a = scope.grapah_ts();
                console.log(a);

            } else {
                console.log("Error 3 en callFunction.js")
                return new TObject(0,0,"undefined","UNDEFINED");
            }
        } else {
            if(this.idList != null) {
                var arr = scope.findVariable(this.id);
                
                if(arr) {
                    
                    var list = this.idList.get(scope,consoleT);    
                    if(list.length == 1) {
                        
                        if(arr.isArray && list[0].id) {
                            if(list[0].id == 'pop') {
                                console.log("pop")
                                return this.pop(scope,arr.value,consoleT)
                            } else if(list[0].id == 'push') {
                                var isSimple = true;
                                return this.push(scope,arr,isSimple,consoleT)
                            }
                        }

                    } else if(list.length > 1){

                        var lastItem = list.pop();
                        var array = new idVarlast(0,0,this.id,list);
                        array = array.get(scope,list,consoleT);

                        if(array.isArray) {
                            if(lastItem.id == 'pop') {
                                return this.pop(scope,array,consoleT)
                            } else if(lastItem.id == 'push') {
                                var isSimple = false;
                                return this.push(scope,array,isSimple,consoleT)
                            }
                        }
                    }
                        
                   
                }
                
                console.log("Error 4 en callFunction.js")
                var undef = new TObject(0,0,"undefined","UNDEFINED");
                return undef.run(scope,consoleT);
                

            } else {
                return this.runFunction(scope,consoleT);
            }
        }
    }

    push(scope,arr,isSimple,consoleT) {
        //comprobar tipos de matriz
        if(this.params) {
            if(this.params.length == 1) {
                var tobj = this.params[0];
                tobj = tobj.run(scope,consoleT);
                //verificar si el parametro del push es compatible con arr
                if(isSimple) {
                    arr.value.value.push(tobj);
                } else {
                    arr.value.push(tobj);
                }

            } else {
                console.log("Error 5 en callFunction.js")
            }
        } else {
            //ERROR
            console.log("Error 6 en callFunction.js")
        }
        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope,consoleT);
    }

    pop(scope,arr,consoleT) {

        if(arr.value.length > 0) {
            return arr.value.pop();
        }
        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope,consoleT);
    }


    runFunction(scope,consoleT) {
        
        if(scope.checkFunction(this.id)) {

            return this.func(scope,consoleT);

        } else {
            //error
            console.log(scope)
            console.log("Error 7 en callFunction.js no existe la funcion:" + this.id +";")
            /*console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(this.id)
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");*/
            var undef = new TObject(0,0,"undefined","UNDEFINED");
            return undef.run(scope,consoleT);
        }

    }

    func(scope,consoleT) {

        var funcObj = scope.getFunction(this.id);
        //console.log(funcObj)
        this.stmt = funcObj.stmt;
        var functionScope = new Scope(scope);
        
        for (let param of funcObj.param) {
            var asgn = new Variable(0,0,'let',param.id,new defLast(0,0,param.types,new TObject(0,0,"null",'NULL')),null);
            //var asgn = new Variable(0,0,'let',param.id,new defLast(0,0,param.types,new TObject(0,0,"undefined",'UNDEFINED')),null);
            
            asgn.run(functionScope,consoleT);
        }

        /*console.log(this.id)
        console.log(funcObj)
        console.log(this.params)*/
        
        if(this.params == null) {
            if(!funcObj.param.length == 0) {
                console.log("Error 0.8 en callFunction.js")
                console.log("ERROR en la cantidad de parametros")
            }
        } else {
            if(funcObj.param.length == this.params.length) {
                //comprobar tipos
                //console.log(funcObj.param)
                //console.log(this.params)
                for (let param in this.params) {
                    var changeValue = new asignVariable(funcObj.param[param].id,new asignLast(null,new asignLastF(null,this.params[param])));
                    changeValue.get(functionScope,scope,consoleT);
                }
            } else {
                console.log("Error 8 en callFunction.js")
                console.log("ERROR en la cantidad de parametros")
            }
        }

        
        //functionScope.print()
        //console.log("--------------------------------")
        /****DEBUG */

        

        /********* */

        functionScope.prev = scope.getGlobalScope();

        var aux = this.statement(functionScope,consoleT);
        if(aux != null) {
    
            if(aux.type == 'RETURN') {
                return aux.res;
            } 
        }

        var undef = new TObject(0,0,"undefined","UNDEFINED");
        return undef.run(scope,consoleT);
    }

    statement(scope,consoleT) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,consoleT);
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