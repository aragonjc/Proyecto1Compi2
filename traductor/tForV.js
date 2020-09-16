const tscope = require('./translateScope');
class tForV {

    constructor(variable,op,exp,stmt) {
        this.variable = variable;
        this.op = op;
        this.exp = exp;
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var newScope = new tscope(scope);

        var var_ = this.variable.translate(newScope,cond,sTable,funcId);
        var ops = this.op.translate(newScope,cond,sTable,funcId);
        var e = this.exp.translate(newScope,cond,sTable,funcId);
        var st = "";

        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });

        return "for("+var_ +" " + ops + " " + e + ") {\n" + st +"}\n";
    }
}

module.exports = tForV;