class tminus {

    constructor(op,exp) {
        this.op = op;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        var a1 = this.exp.translate(scope,cond,sTable,funcId);
        
        return String(this.op + a1);
    }

}

module.exports = tminus;