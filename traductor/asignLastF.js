class asignLastF {

    constructor(op,exp) {
        this.op = op;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        if(this.exp != null) {
            return " " + this.op + " " + this.exp.translate(scope,cond,sTable,funcId);
        }

        return this.op;
    }
}

module.exports = asignLastF;