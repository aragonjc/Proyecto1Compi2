const TObject = require('./TObject.js');
class idVarlast {

    constructor(line,column,id,varlast) {
        this.id = id;
        this.varlast = varlast;
    }

    get(scope,l) {
        if(scope.findVariable(this.id) != null) {

            let vl = l;
            let objId = scope.findVariable(this.id);

            var vobj = objId.value;
            vl.forEach(element => {
                
                if(element.isArray) {
                    if(vobj.isArray) {

                        var arrP = Number(element.exp.value);
                        var objResult = vobj.value;

                        if(arrP < objResult.length) {
                            vobj = objResult[arrP]
                        } else {
                            //ERRROR
                            console.log("Error 1 en idVarlast.js")
                        }
                    } else {
                        //error
                        console.log("Error 2 en idVarlast.js")
                        return;
                    }
                } else {
                    if(vobj.constructor.name == "Map") {

                        if(vobj.has(element.id)) {
                            //console.log("CORRECTO")
                            vobj = vobj.get(element.id)
                        } else {
                            //Error
                            console.log("Error 3 en idVarlast.js")
                        }

                    } else {
                        //error
                        console.log("Error 4 en idVarlast.js")
                        return;
                    }
                }
            });
            return vobj;
            //console.log(objId)

        } else {
            /***#########ERROR###############*/
            console.log("Error 5 en idVarlast.js")
            return new TObject(0,0,'undefined',"UNDEFINED");
        }
    }

    run(scope) {

        if(scope.findVariable(this.id) != null) {

            let vl = this.varlast.get(scope);
            /*console.log("VARLAST")
            console.log(vl);
            console.log("Fin VarLAST")*/
            let objId = scope.findVariable(this.id);

            

            var vobj = objId.value;

            if(objId instanceof Map) {
                vobj = objId
            }

            /*
            console.log("||||||||  Aqui estoy al inicio de idVarlast      ||||||||||")
            console.log(vobj)
            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
            */
            for(let i=0;i<vl.length;i++){
           // vl.every((element,index) => {
                var element = vl[i];
                if(i+1 == vl.length) {
                    
                    if(element.id == 'length' && vobj.isArray) {
                        var r = vobj.value.length;
                        
                        var length = new TObject(0,0,r,"NUMBER");
                        return length.run(scope);
                        
                    }
                }

                

                if(element.isArray) {
                    if(vobj.isArray) {

                        var arrP = Number(element.exp.value);
                        var objResult = vobj.value;
                        //console.log(arrP);
                        //console.log(objResult.length)
                        if(arrP < objResult.length) {
                            //console.log("QUE ENTRO")
                            vobj = objResult[arrP]
                            if(!vobj) {
                                vobj = new TObject(0,0,"undefined","UNDEFINED");
                            }

                        } else {
                            //ERRROR
                            console.log("Error 6 en idVarlast.js")
                        }
                    } else {
                        //error
                        console.log("Error 7 en idVarlast.js")
                        return;
                    }
                } else {

                   
                    if(vobj instanceof Map) {

                        if(vobj.has(element.id)) {
                            //console.log("CORRECTO")
                            vobj = vobj.get(element.id)
                        } else {
                            //Error
                            console.log("Error 8 en idVarlast.js")
                        }

                    } else {
                        //error
                        console.log("Error 9 en idVarlast.js")
                        /*console.log(objId)
                        console.log(vl)
                        console.log(element)
                        console.log("????????????????????????")
                        console.log(vobj)*/
                        return new TObject(0,0,'null',"NULL");;
                    }
                }
            }/*);*/
            /*console.log("aqui retorna el objeto");
            console.log(vobj)*/
            return vobj;
            //console.log(objId)

        } else {
            /***#########ERROR###############*/
            console.log("Error 10 en idVarlast.js")
            return new TObject(0,0,'undefined',"UNDEFINED");
        }
    }
}
module.exports = idVarlast;