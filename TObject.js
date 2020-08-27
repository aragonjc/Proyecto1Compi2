const Nodo = require('./Nodo.js');
class TObject extends Nodo{

    constructor(line,column,value,type) {
        super(line,column,value);
        this.type = type;
    }

    run(scope) {
        return this;
    }
}
module.exports = TObject;