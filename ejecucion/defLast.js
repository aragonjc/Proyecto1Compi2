const Nodo = require('./Nodo.js');
class defLast extends Nodo{

    constructor(line,column,type,exp) {
        super(line,column,null);
        this.type = type;
        this.exp = exp;
    }

    run(scope,decType) {

        let e = null;
        let type = "NULL";
        let isArray = false;
        let dimention = 0;
    
        if(this.exp != null) {
            e = this.exp.run(scope);
            type = e.type;
            isArray = e.isArray;
            dimention = e.dimentions;
        }

        if(this.type != null) {
            
            let tType = this.type.run(scope);
            //comprobar si exp == tType

            if(e != null || e.type != "NULL") {

                if(tType.isArray) {

                } else if(tType.type = "OBJ") {
                    
                    //evaluar que las propiedades del TYPE 
                    //sean igual al TYPE en TS

                }else {

                    if(e.type == tType.type) {
                        return {value:e,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}
                    } else {
                        console.log("-----------ERROR------------")
                        console.log("tipos incompatibles")
                        console.log("----------------------------")
                        return null;
                    }

                }

            }

            return {value:e,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}
 
        } 

        return {value:e,type:type,isArray:isArray,dim:dimention,dectype:decType}
        
    }
}

module.exports = defLast;