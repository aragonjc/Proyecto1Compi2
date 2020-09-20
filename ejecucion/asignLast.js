class asignLast {

    constructor(list,asignLastF) {
        this.list = list;
        this.asignLastF = asignLastF;
    }

    run(scope,obj) {

        if(this.list != null) {

            var l = this.list.get(scope);
            //comprobar tipos y si es arreglo tamaños
            var fobj=obj.value;
            
            l.forEach(element => {
                
                if(element.isArray) {
                    if(fobj.isArray) {
                        var arrP = Number(element.exp.value);
                        var objResult = fobj.value;

                        if(arrP < objResult.length) {
                            fobj = objResult[arrP]
                        } else {
                            //ERRROR
                        }

                    } else {
                        //ERROR
                        fobj = null;
                        console.log("###########ERROR########")
                    }
                } else {
                    if(fobj.constructor.name == "Map") {

                        if(fobj.has(element.id)) {
                            fobj = fobj.get(element.id)
                        } else {
                            //Error
                            fobj = null;
                            console.log("ERROR");
                        }

                    } else {
                        //error
                        return;
                    }
                }

            });

            if(fobj != null) {
                
                if(fobj.constructor.name == "TObject") {
                    fobj = {value:fobj}
                }

                var auxR = this.asignLastF.run(scope,fobj);
                //verificar errores aqui
                fobj=obj.value;
                
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
                        if(fobj.constructor.name == "Map") {
                            
                            if(index + 1 == l.length) {
                                fobj.set(element.id,auxR)  
                            } else {
                                fobj = fobj.get(element.id)  
                            }
                                  
                        }
                    }
                });
                //console.log(fobj);
                return obj;
            }

        } else {
            return this.asignLastF.run(scope,obj);
        }
    }
}

module.exports = asignLast;