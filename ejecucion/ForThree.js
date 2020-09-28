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

    run(scope,consoleT) {
        
        if(this.id.constructor.name == "Id") {
            
            var actualScope = new Scope(scope);
            var id = this.id.id;
            if(id != this.inc.id) {
                //ERROR
                console.log("Error 1 en ForThree.js")
                return;
            }
           /* var exp = this.expAsign.run(actualScope);
            var asignLast_ = new asignLast(null,new asignLastF(null,exp));
            var asign = new asignVariable(id,asignLast_);

            asign.run(actualScope);*/
            var condition = this.cond.run(actualScope,consoleT);
            if(condition.type == 'BOOLEAN') {
                
                condition = Boolean(condition.value);
                while(condition) {

                    var newScope = new Scope(actualScope);

                    var aux = this.statement(newScope,consoleT);
                    
                    if(aux != null) {
        
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                    
                    this.inc.run(newScope,consoleT);
                    condition = this.cond.run(newScope,consoleT);
                    condition = Boolean(condition.value);
                    
                }
            } else {
                console.log("No se que va aqui ForThree")
            }

        } else {
            //ERROR
            console.log("Error 2 en ForThree.js")
        }
    }

    statement(scope,consoleT) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,consoleT);
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
