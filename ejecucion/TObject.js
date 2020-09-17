const Nodo = require('./Nodo.js');
class TObject extends Nodo{

    constructor(line,column,value,type) {
        super(line,column,value);
        this.type = type;
        this.isArray = false;
        this.dimentions = 0;
    }

    run(scope) {
        return this;
    }
}
module.exports = TObject;