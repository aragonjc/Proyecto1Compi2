class tReturn {

    constructor(exp ,str) {
        this.exp = exp;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        var a = this.exp.translate(scope,cond,sTable,funcId);
        return "return " + a;
    }

}

module.exports = tReturn;