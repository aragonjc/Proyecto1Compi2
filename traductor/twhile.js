class twhile {

    constructor(exp,stmt) {
        this.exp = exp;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var s = "";
        this.stmt.forEach(element => {
            s += element.translate(scope,cond,sTable,funcId);
            s += "\n";
        });

        return "while("+e+") {\n"+s+"}\n";
    }
}

module.exports = twhile;