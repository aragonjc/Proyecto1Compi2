const Scope = require('./Scope.js');
const asignLast = require('./asignLast.js')
const asignLastF = require('./asignLastF.js')
const asignVariable = require('./asignVariable.js')

class ForTwo {

    constructor(id,expAsign,cond,inc,stmt) {
        this.id = id;
        this.expAsign = expAsign;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope,console) {
        
        if(this.id.constructor.name == "Id") {
            
            var actualScope = new Scope(scope);
            var id = this.id.id;
            if(id != this.inc.id) {
                //ERROR
                console.log("Error 1 en ForTwo.js")
                return;
            }
            var exp = this.expAsign.run(actualScope,console);
            var asignLast_ = new asignLast(null,new asignLastF(null,exp));
            var asign = new asignVariable(id,asignLast_);

            asign.run(actualScope,console);
            var condition = this.cond.run(actualScope,console);

            if(condition.type == 'BOOLEAN') {
                
                condition = Boolean(condition.value);
                while(condition) {

                    var newScope = new Scope(actualScope);

                    var aux = this.statement(newScope,console);
                    
                    if(aux != null) {
        
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                    
                    this.inc.run(newScope,console);
                    condition = this.cond.run(newScope,console);
                    condition = Boolean(condition.value);
                    
                }
            } else {
                console.log("no se que va aqui ForTwo");
            }

        } else {
            //ERROR
            console.log("Error 2 en ForTwo.js")
        }
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }
}

module.exports = ForTwo;