const tscope = require('./translateScope');
class tFor2 {

    constructor(asign,exp,cond,inc,stmt) {
        this.asign = asign;
        this.exp = exp;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var newScope = new tscope(scope);

        var asign_ = this.asign.translate(newScope,cond,sTable,funcId);
        var e = this.exp.translate(newScope,cond,sTable,funcId);
        var cond_ = this.cond.translate(newScope,cond,sTable,funcId);
        var inc_ = this.inc.translate(newScope,cond,sTable,funcId);

        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });

        return "for(" + asign_ + " = "+ e +"; " + cond_ + "; " + inc_ +") {\n" + st + "}\n";
    }
}
module.exports = tFor2;