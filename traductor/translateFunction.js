const tscope = require('./translateScope');
class translateFunction {
    constructor(id,funcparam,str) {
        this.id = id;
        this.funcparam = funcparam;
        this.str = str;
    }
    translate(scope,cond,sTable,funcId) {

        if(cond != null || cond != undefined) {
            scope.insertFunctionGlobally(this.id,cond);
            return "function " + cond + "__" + this.id + " "+ "() {\n" + this.funcparam.translate(scope,cond,sTable,funcId) + "\n}\n";
        }

        return "function " + this.id + " "+ "() {\n" + this.funcparam.translate(scope,cond,sTable,this.id) + "\n}\n";
        
    }
}

module.exports = translateFunction;