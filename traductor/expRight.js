class expRight {

    constructor(exp,op) {
        this.exp = exp;
        this.op = op;
    }

    translate(scope,cond,sTable,funcId) {
        return this.exp.translate(scope,cond,sTable,funcId) + this.op;
    }
}

module.exports = expRight;