class expIdList {

    constructor(id, varLast) {
        this.id = id;
        this.varLast = varLast;
    }

    translate(scope,cond,sTable,funcId) {
        return this.id + this.varLast.translate(scope,cond,sTable,funcId);
    }
}

module.exports = expIdList;