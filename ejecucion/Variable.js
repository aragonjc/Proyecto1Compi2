const Nodo = require('./Nodo.js');
class Variable extends Nodo{
    
    constructor(line,column,id,deflast,defvarLast) {
        super(line,column,id)
        this.id = id;
        this.deflast = deflast;
        this.defvarLast = defvarLast;
    }

    run(scope) {

        if(this.defvarLast != null) {

        } else {
            
        }
        
    }
}

module.exports = Variable;