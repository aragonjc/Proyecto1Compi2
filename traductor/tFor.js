class tFor {

    constructor(id,exp,cond,inc,stmt) {
        this.id = id;
        this.exp = exp;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var cond_ = this.cond.translate(scope,cond,sTable,funcId);
        var inc_ = this.inc.translate(scope,cond,sTable,funcId);

        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(scope,cond,sTable,funcId);
            st += "\n";
        });

        return "for( let " + this.id + " = "+ e +"; " + cond_ + "; " + inc_ +") {\n" + st + "}\n";
    }
}
module.exports = tFor;