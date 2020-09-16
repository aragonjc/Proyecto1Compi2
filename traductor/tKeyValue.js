
class tKeyValue {

    constructor(id,exp) {
        this.id = id;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        return this.id + ": " + this.exp.translate(scope,cond,sTable,funcId);
    }
}

module.exports = tKeyValue;