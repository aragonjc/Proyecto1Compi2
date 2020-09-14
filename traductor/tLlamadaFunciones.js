class tLlamadaFunciones {

    constructor(id ,str) {
        this.id = id;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        if(funcId != null || funcId != undefined) {
            if(scope.searchFunction(this.id,funcId)){
                return funcId+"__"+this.id + "();"
            }
        }
        return this.id + "();"
    }

}

module.exports = tLlamadaFunciones;