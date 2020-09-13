const tscope = require('./translateScope');
class translateFunction {
    constructor(id,funcparam,str) {
        this.id = id;
        this.funcparam = funcparam;
        this.str = str;
    }
    translate(scope) {
        return this.id + " "+  this.funcparam.translate(scope);
        
    }
}

module.exports = translateFunction;