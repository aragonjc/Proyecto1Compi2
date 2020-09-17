const typeList = require("./typeList");

class Type {

    constructor(type,list) {
        this.type = type;
        this.list = list;
    }

    run(scope) {
        
        if(this.checkType(this.type)) {
            
            if(this.list != null) {
                let dim = this.list.run(scope);
                let isArray = dim==0?false:true;

                return {type:this.type,isArray:isArray,dim:dim}
            } 

            return {type:this.type,isArray:false,dim:0}
        } else {
            //buscar si el type existe
        }
    }

    checkType(t) {
        if(t == "NUMBER") {
            return true;
        } else if(t == "BOOLEAN") {
            return true;
        } else if(t == "STRING") {
            return true;
        } else if(t == "VOID") {
            return true;
        }
        return false;
    }
}

module.exports = Type;