const Nodo = require('./Nodo.js');
class Variable extends Nodo{
    
    constructor(line,column,type,id,deflast,defvarLast) {
        super(line,column,id)
        this.type = type;
        this.id = id;
        this.deflast = deflast;
        this.defvarLast = defvarLast;
    }

    run(scope) {

        if(this.defvarLast != null) {

        } else {
            
            var def = undefined;
            if(this.deflast !=null) {
                def = this.deflast.run(scope,this.type);
            }

            scope.insertVariable(this.id,def);
        }
        
    }
}

module.exports = Variable;