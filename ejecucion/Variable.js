const Nodo = require('./Nodo.js');
class Variable extends Nodo{
    
    constructor(line,column,type,id,deflast,defvarLast) {
        super(line,column,id)
        this.type = type;
        this.id = id;
        this.deflast = deflast;
        this.defvarLast = defvarLast;
    }

    run(scope,console) {

        var def = null;
        if(this.deflast !=null) {
            def = this.deflast.run(scope,this.type,console);
        }
        scope.insertVariable(this.id,def);

        if(this.defvarLast != null) {

            var list = this.defvarLast.run(scope,this.type,console);

            if(list.length > 0) {
                list.forEach(element => {
                    element.run(scope,console);
                });
            }
        }
    }
}

module.exports = Variable;