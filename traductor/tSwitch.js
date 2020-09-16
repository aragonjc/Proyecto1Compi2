class tSwitch {

    constructor(exp,firstcase,lastcase) {
        this.exp = exp;
        this.firstcase = firstcase;
        this.lastcase = lastcase;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var fcase = "";
        var lcase = "";
        if(this.firstcase != null) {
            fcase = this.firstcase.translate(scope,cond,sTable,funcId);

        }

        if(this.lcase != null) {
            lcase = "\n"+this.lastcase.translate(scope,cond,sTable,funcId);
        }

        return "switch(" + e + ") {\n" + fcase + lcase + "\n}\n";
    }
}
module.exports = tSwitch;