const tscope = require('./translateScope');
class twhile {

    constructor(exp,stmt) {
        this.exp = exp;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var s = "";

        var newScope = new tscope(scope);
        this.stmt.forEach(element => {
            s += element.translate(newScope,cond,sTable,funcId);
            s += "\n";
        });

        return "while("+e+") {\n"+s+"}\n";
    }
}

module.exports = twhile;