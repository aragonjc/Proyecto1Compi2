class expBracket {

    constructor(exp) {
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        return "(" + this.exp.translate(scope,cond,sTable,funcId) + ")";
    }
}

module.exports = expBracket;