class tLlamadaFunciones {

    constructor(id , varlast, paramFunc,str) {
        this.id = id;
        this.varlast = varlast;
        this.paramFunc = paramFunc;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        var par = "";
        var val = "";
        if(this.varlast != null) {
            val = this.varlast.translate(scope,cond,sTable,funcId);
        }
        if(this.paramFunc != null) {
            par = this.paramFunc.translate(scope,cond,sTable,funcId);
        }


        if(funcId != null || funcId != undefined) {
            if(scope.searchFunction(this.id,funcId)){
                return funcId+"__"+this.id + "("+par+")" + this.str;
            }
        }
        return this.id +val+ "("+par+")" + this.str;
    }

}

module.exports = tLlamadaFunciones;