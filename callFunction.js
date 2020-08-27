const Node = require('./Node.js');
class callFunction extends Node{
    constructor(line, column,id,params) {
        super(line,column,id);
        this.params = params;
    }

    run(scope) {
        
        if(id == "console.log") {
            
        } else {

        }

    }
}

module.exports = callFunction;