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

            }

            
        } else {
            console.log("ERROR");
            console.log(this.id);
        }

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