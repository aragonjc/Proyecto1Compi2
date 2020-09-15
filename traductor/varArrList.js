class varArrList {

    constructor(exp,auxP) {
        this.exp = exp;
        this.auxP = auxP;
    }

    translate(scope,cond,sTable,funcId){
        var aux = "";
        if(this.auxP != null) {
            aux = this.auxP.translate(scope,cond,sTable,funcId);
        }
        var ex = this.exp.translate(scope,cond,sTable,funcId);
        return "[" + ex + "]" + aux;
    }
}
module.exports = varArrList;