class tOperation {

    constructor(exp1,op,exp2,str) {
        this.exp1 = exp1;
        this.op = op;
        this.exp2 = exp2;
        this.str = str;
    }

    translate(scope) {
        var a1 = this.exp1.translate(scope);
        var a2 = this.exp2.translate(scope);
        
        
        return String(a1 + this.op + a2);
    }

}

module.exports = tOperation;