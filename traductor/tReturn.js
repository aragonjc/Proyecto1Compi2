class tReturn {

    constructor(exp) {
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        if(this.exp != null) {
            var a = this.exp.translate(scope,cond,sTable,funcId);
            return "return " + a + ";";
        }

        return "return;"
    }

}

module.exports = tReturn;