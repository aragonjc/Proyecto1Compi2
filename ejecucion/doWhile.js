const Scope = require('./Scope.js') 
class doWhile {

    constructor(cond,stmt) {
        this.cond = cond;
        this.stmt = stmt;
    }

    run(scope,consoleT) {
        
        var auxCond = this.cond.run(scope,consoleT);
        if(auxCond.type == 'BOOLEAN') {

            auxCond = Boolean(auxCond.value);
            var actualScope = new Scope(scope);

            do {

                var newScope = new Scope(actualScope);
                var r = this.statement(newScope,consoleT)

                if(r != null && r != undefined) {
                    if(r.type == 'RETURN') {
                        return r;
                    } else if(r.type == 'BREAK') {
                        //return r;
                        break;
                    }
                }

                auxCond = this.cond.run(scope,consoleT);
                auxCond = Boolean(auxCond.value);

            } while(auxCond);

        } else {
            //ERROR
            console.log("Error 1 en doWhile.js")
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

module.exports = doWhile;