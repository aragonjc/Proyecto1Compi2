const Scope = require('./Scope.js');
class Defcase {

    constructor(stmt) {
        this.stmt = stmt;
    }

    run(scope){ 
        var actualScope = new Scope(scope);
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(actualScope);
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

module.exports = Defcase;