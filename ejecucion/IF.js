const Scope = require('./Scope.js') 
class IF {

    constructor(cond,stmt,iflast) {
        this.cond   = cond;
        this.stmt   = stmt;
        this.iflast = iflast;
    }

    run(scope) {
        
        if(this.cond != null) {

            var auxCond = this.cond.run(scope);

            if(auxCond.type == 'BOOLEAN') {

                auxCond = Boolean(auxCond.value);
                var actualScope = new Scope(scope);

                if(auxCond) {

                    var r = this.statement(actualScope)
                    if(r != null && r != undefined) {
                        if(r.type == 'RETURN') {
                            return r;
                        } else if(r.type == 'BREAK') {
                            return r;
                        } else if(r.type == 'CONTINUE') {
                            return r;
                        } 
                    }

                } else {

                    if(this.iflast != null) {
                        var actualScope = new Scope(scope);
                        var ifr = this.iflast.run(actualScope);
                        if(ifr != null && ifr != undefined) {
                            if(ifr.type == 'RETURN') {
                                return ifr;
                            } else if(ifr.type == 'BREAK') {
                                return ifr;
                            } else if(ifr.type == 'CONTINUE') {
                                return ifr;
                            } 
                        }
                    }
                }

            } else {
                //ERROR
                console.log("ERROR en la condicion del if")
            }

        } else {

            var actualScope = new Scope(scope);
            var r = this.statement(actualScope);
            if(r != null && r != undefined) {
                if(r.type == 'RETURN') {
                    return r;
                } else if(r.type == 'BREAK') {
                    return r;
                } else if(r.type == 'CONTINUE') {
                    return r;
                } 
            }

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
                        return aux;
                    }
                }
            }     
        }
    }

}
module.exports = IF;