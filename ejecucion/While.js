const Scope = require('./Scope.js') 
class While {

    constructor(cond,stmt) {
        this.cond = cond;
        this.stmt = stmt;
    }
    
    run(scope) {
        var auxCond = this.cond.run(scope);
        if(auxCond.type == 'BOOLEAN') {

            auxCond = Boolean(auxCond.value);
            var actualScope = new Scope(scope);
            while(auxCond) {

                var newScope = new Scope(actualScope);

                var r = null;
                if(this.stmt!= null) {
                    for(var i = 0;i<this.stmt.length;i++) {
                        var element = this.stmt[i];
                        var aux = element.run(newScope);
                        if(aux != null) {
            
                            if(aux.type == 'RETURN') {
                                r= aux;
                                break;
                            } else if(aux.type == 'BREAK') {
                                r = aux;
                                break;
                            } else if(aux.type == 'CONTINUE') {
                                r = null;
                                break;
                            }
                        }
                    }     
                }

                if(r != null) {
                    if(r.type == 'RETURN') {
                        return r;
                    } else if(r.type == 'BREAK') {
                        break;
                    }
                }

                auxCond = this.cond.run(scope);
                auxCond = Boolean(auxCond.value);
            }

        } else {
            //ERROR
            console.log("ERROR en while.js")
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
                        return;
                    }
                }
            }     
        }
    }
}
module.exports = While;