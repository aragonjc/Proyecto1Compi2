const tscope = require('./translateScope');
class tFor {

    constructor(id,exp,cond,inc,stmt) {
        this.id = id;
        this.exp = exp;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var newScope = new tscope(scope);

        newScope.insertVariable(this.id,"","");
        
        var e = this.exp.translate(newScope,cond,sTable,funcId);
        
        var cond_ = this.cond.translate(newScope,cond,sTable,funcId);
        var inc_ = this.inc.translate(newScope,cond,sTable,funcId);

        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });

        return "for( let " + this.id + " = "+ e +"; " + cond_ + "; " + inc_ +") {\n" + st + "}\n";
    }
}
module.exports = tFor;