const tscope = require('./translateScope');
class tFor4 {

    constructor(id,op,exp,stmt) {
        this.id = id;
        this.op = op;
        this.exp = exp;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var newScope = new tscope(scope);

        newScope.insertVariable(this.id,"","");

        var e = this.exp.translate(newScope,cond,sTable,funcId);
        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });

        return "for( let " + this.id + " " + this.op + " " + e +") {\n" + st + "}\n";
    }
}
module.exports = tFor4;