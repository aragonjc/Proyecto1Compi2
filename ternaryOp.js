class ternaryOp {

    constructor(exp1,exp2,exp3) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
    }

    translate(scope,cond,sTable,funcId) {
        var ex1 = this.exp1.translate(scope,cond,sTable,funcId);
        var ex2 = this.exp2.translate(scope,cond,sTable,funcId);
        var ex3 = this.exp3.translate(scope,cond,sTable,funcId);
        return ex1 + "?" + ex2 + ":" + ex3;
    }
}

module.exports = ternaryOp;