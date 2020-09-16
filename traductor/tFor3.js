class tFor3 {

    constructor(asign,cond,inc,stmt) {
        this.asign = asign;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var asign_ = this.asign.translate(scope,cond,sTable,funcId);
        var cond_ = this.cond.translate(scope,cond,sTable,funcId);
        var inc_ = this.inc.translate(scope,cond,sTable,funcId);

        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(scope,cond,sTable,funcId);
            st += "\n";
        });

        return "for(" + asign_ + "; " + cond_ + "; " + inc_ +") {\n" + st + "}\n";
    }
}
module.exports = tFor3;