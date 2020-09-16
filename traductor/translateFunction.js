const tscope = require('./translateScope');
class translateFunction {
    constructor(id,funcDec,pars) {
        this.id = id;
        this.funcDec = funcDec;
        this.pars = pars;
    }
    translate(scope,cond,sTable,funcId) {
        var newScope = new tscope(scope);

        var args = "";
        if(this.pars != null) {
            args = this.pars.translate(newScope,cond,sTable,funcId)
        }

        if(cond != null || cond != undefined) {
            scope.insertFunctionGlobally(this.id,cond);
            return "function " + cond + "__" + this.id + " "+ "("+args+") " + this.funcDec.translate(newScope,cond,sTable,funcId) + "\n";
        }

        return "function " + this.id + " "+ "("+args+") " + this.funcDec.translate(newScope,cond,sTable,this.id) + "\n";
        
    }
}

module.exports = translateFunction;