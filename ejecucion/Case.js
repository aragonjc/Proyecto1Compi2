const Operation = require('./Operation.js');
const Scope = require('./Scope.js')
class Case {

    constructor(list) {
        this.list = list;
    }

    run(scope,cond) {
        for(var i = 0;i<this.list.length;i++) {
            var element = this.list[i];
            var exp = element.exp/*.run(scope)*/;
            var stmt = element.stmt;
            
            var op = new Operation(0,0,cond,exp,"==");
            var result = op.run(scope);

            if(result.type == 'BOOLEAN' && !result.isArray) {

                //console.log(result);
                result = Boolean(result.value);
                //console.log(result);
                if(result) {
                    var actualScope = new Scope(scope);
                    var aux = this.statement(actualScope,stmt);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            return aux;
                        } else if(aux.type == 'CONTINUE') {
                            return aux;
                        }
                    }
                }

            } else {
                //error
                console.log("Error 1 en Case.js")
                return;
            }
        }
    }

    statement(scope,stmt) {
        if(stmt!= null) {
            for(var i = 0;i<stmt.length;i++) {
                var element = stmt[i];
                var aux = element.run(scope);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return aux;
                    }
                }
            }     
        }
    }
}

module.exports = Case;