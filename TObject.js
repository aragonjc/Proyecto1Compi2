const Node = require('./Node.js');
class TObject extends Node{

    constructor(line,column,value,type) {
        super(line,column,value);
        this.type = type;
    }

    run(scope) {
        return this;
    }
}
module.exports = TObject;