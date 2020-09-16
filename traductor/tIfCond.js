const tscope = require('./translateScope');
class tIfCond {

    constructor(exp,stmt,iflast) {
        this.exp = exp;
        this.stmt = stmt;
        this.iflast = iflast;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var st = "";
        var newScope = new tscope(scope);
        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });
        var last ="";
        if(this.iflast != null) {
            last = " "+this.iflast.translate(scope,cond,sTable,funcId);
        } else {
            last = "\n";
        }

        return "if(" + e +"){\n" + st +"\n}"+last;
    }
}

module.exports = tIfCond;