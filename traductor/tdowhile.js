class tdowhile {

    constructor(stmt,exp) {
        this.stmt = stmt;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var s = "";
        this.stmt.forEach(element => {
            s += element.translate(scope,cond,sTable,funcId);
            s += "\n";
        });

        return "do {\n"+s+"\n} while(" + e + ");";
    }
}

module.exports = tdowhile;