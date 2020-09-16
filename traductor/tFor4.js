class tFor4 {

    constructor(id,op,exp,stmt) {
        this.id = id;
        this.op = op;
        this.exp = exp;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(scope,cond,sTable,funcId);
            st += "\n";
        });

        return "for( let " + this.id + " " + this.op + " " + e +") {\n" + st + "}\n";
    }
}
module.exports = tFor4;