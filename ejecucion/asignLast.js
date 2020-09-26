const TObject = require('./TObject.js');
class asignLast {

    constructor(list,asignLastF) {
        this.list = list;
        this.asignLastF = asignLastF;
    }

    run(scope,obj, console) {

        if(this.list != null) {

            var l = this.list.get(scope,console);
            //comprobar tipos y si es arreglo tamaños
            var fobj=obj.value;
            
            if(obj instanceof Map) {
                fobj = obj
            }

            /*console.log("||||||||  Aqui estoy al inicio de asignLast    ||||||||||")
            console.log(obj)
            console.log(l)

            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
            */

            l.forEach(element => {
                if(element.isArray) {
                    if(fobj.isArray) {
                        var arrP = Number(element.exp.value);
                        var objResult = fobj.value;

                        //console.log(arrP)
                        //console.log(objResult.length)
                        if(arrP < objResult.length) {
                            fobj = objResult[arrP]
                        } else {
                            //ERRROR
                            fobj = new TObject(0,0,"undefined","UNDEFINED");
                            //console.log("Error 1 en asignLast.js")
                        }

                    } else {
                        //ERROR
                        fobj = null;
                        console.log("Error 2 en asignLast.js")
                    }
                } else {
                    if(fobj.constructor.name == "Map") {

                        if(fobj.has(element.id)) {
                            fobj = fobj.get(element.id)
                        } else {
                            //Error
                            fobj = null;
                            console.log("Error 3 en asignLast.js")
                        }

                    } else {
                        //error
                        console.log("Error 4 en asignLast.js")
                        return;
                    }
                }

            });

            if(fobj != null) {
                
                if(fobj.constructor.name == "TObject") {
                    fobj = {value:fobj}
                }

                var auxR = this.asignLastF.run(scope,null,console);
                //verificar errores aqui
                fobj=obj.value;
                if(obj instanceof Map) {
                    fobj = obj
                }
                //console.log("AQUI----->")
                //console.log(obj)
                //console.log("--------")
                //console.log(this.asignLastF.exp)
                //console.log("||||||||||||||")
                //console.log(auxR)
                //console.log(fobj);
                //console.log("**********")
                l.forEach((element,index) =>{
                    if(element.isArray) {
                        if(fobj.isArray) {
                            
                            var arrP = Number(element.exp.value);
                            
                            
                            if(index + 1 == l.length) {
                            
                                
                                fobj.value[arrP] = auxR;
                            } else {
                                fobj = fobj.value[arrP]
                            }
                            
                        }
                    } else {
                        if(fobj instanceof Map) {
                            
                            if(index + 1 == l.length) {
                                fobj.set(element.id,auxR)  
                            } else {
                                fobj = fobj.get(element.id)  
                            }
                                  
                        } else {
                            console.log("cayo aqi")
                        }
                    }
                });
                //console.log(fobj);
                return obj;
            }

        } else {
            //COMPROBAR SI ES NUMBER BOOL STRING NULL
            var dectype = obj.dectype;
            //console.log(obj);
            if(this.isPrimitive(obj)) {
                var a = new TObject(0,0,obj.value.value,obj.type)
                var obr = this.asignLastF.run(scope,{value:a},console);
                return {value:obr,type:obr.type,isArray:obr.isArray,dim:obr.dimentions,dectype:dectype}
        
            } 
            var obr = this.asignLastF.run(scope,obj,console);
            //console.log(obr)
            obr.dectype = dectype;
            obr.type = obj.type;
            return obr;
        }
    }

    isPrimitive(obj) {
        switch(obj.type) {
            case 'NUMBER':
                return true;
            case 'BOOLEAN':
                return true;
            case 'STRING':
                return true;
            case 'NULL':
                return true;
            case 'UNDEFINED':
                return true
            default:
                return false;    
        }
    }
}

module.exports = asignLast;