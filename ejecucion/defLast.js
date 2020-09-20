const Nodo = require('./Nodo.js');
class defLast extends Nodo{

    constructor(line,column,type,exp) {
        super(line,column,null);
        this.type = type;
        this.exp = exp;
    }

    run(scope,decType) {
        /*falta validar que si no tiene :type la variable
          no se puede asignar un objeto
        */
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

            if(e.type != 'NULL') {

                if(e.isArray) {

                    //***Comprobar si todos los elementos del arreglo son iguales
                    //**Comprobar si los dos son arreglos de la misma dimencion */
                    
                    return {value:e,type:e.type,isArray:e.isArray,dim:tType.dim,dectype:decType}

                    
                } else if(e.type == "OBJ") {
                    
                    //1.0**evaluar que las propiedades del TYPE 
                    //1.1-**sean igual al TYPE en TS
                    //coprobar los valores de las propiedades
                    
                    return {value:e.value,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}

                }else {

                    if(e.type == tType.type) {
                        return {value:e,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}
                    } else {
                        console.log("-----------ERROR------------")
                        console.log("tipos incompatibles")
                        //console.log(e)
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