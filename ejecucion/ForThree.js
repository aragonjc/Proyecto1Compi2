const Scope = require('./Scope.js');
const asignLast = require('./asignLast.js')
const asignLastF = require('./asignLastF.js')
const asignVariable = require('./asignVariable.js')

class ForTwo {

    constructor(id,cond,inc,stmt) {
        this.id = id;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope) {
        
        if(this.id.constructor.name == "Id") {
            
            var actualScope = new Scope(scope);
            var id = this.id.id;
            if(id != this.inc.id) {
                //ERROR
                console.log("ERROR");
                return;
            }
           /* var exp = this.expAsign.run(actualScope);
            var asignLast_ = new asignLast(null,new asignLastF(null,exp));
            var asign = new asignVariable(id,asignLast_);

            asign.run(actualScope);*/
            var condition = this.cond.run(actualScope);
            if(condition.type == 'BOOLEAN') {
                
                condition = Boolean(condition.value);
                while(condition) {
                    var aux = this.statement(actualScope);
                    
                    if(aux != null) {
        
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                    
                    this.inc.run(actualScope);
                    condition = this.cond.run(actualScope);
                    condition = Boolean(condition.value);
                    
                }
            } else {

            }

        } else {
            //ERROR
        }
    }

    statement(scope) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope);
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
