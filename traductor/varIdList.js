class varIdList {

    constructor(id, auxP) {
        this.id = id;
        this.auxP = auxP;
    }

    translate(scope,cond,sTable,funcId) {
        var aux = "";
        if(this.auxP != null) {
            aux = this.auxP.translate(scope,cond,sTable,funcId);
        }
        return "."+this.id + aux;
    }
}

module.exports = varIdList;