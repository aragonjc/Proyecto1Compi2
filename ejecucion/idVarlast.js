class idVarlast {

    constructor(line,column,id,varlast) {
        this.id = id;
        this.varlast = varlast;
    }

    run(scope) {

        if(scope.findVariable(this.id) != null) {

            let vl = this.varlast.get(scope);
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
                        }
                    } else {
                        //error
                        return;
                    }
                } else {
                    if(vobj.constructor.name == "Map") {

                        if(vobj.has(element.id)) {
                            console.log("CORRECTO")
                            vobj = vobj.get(element.id)
                        } else {
                            //Error
                            console.log("ERROR");
                        }

                    } else {
                        //error
                        return;
                    }
                }
            });
            return vobj;
            //console.log(objId)

        } else {
            /***#########ERROR###############*/
            console.log("ERROR")
            return new TObject(0,0,'undefined',"UNDEFINED");
        }
    }
}
module.exports = idVarlast;