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
            return {value:e,type:tType.type,isArray:tType.isArray,dim:tType.dim,dectype:decType}
 
        } 

        return {value:e,type:type,isArray:isArray,dim:dimention,dectype:decType}
        
    }
}

module.exports = defLast;