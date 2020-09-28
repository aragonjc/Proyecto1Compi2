const Scope = require('./Scope.js') 
class IF {

    constructor(cond,stmt,iflast) {
        this.cond   = cond;
        this.stmt   = stmt;
        this.iflast = iflast;
    }

    run(scope,consoleT) {
        
        if(this.cond != null) {
            /*console.log("IF----")
            console.log(this.cond)
            console.log("----.-----")*/
            var auxCond = this.cond.run(scope,consoleT);
            /*console.log("cual es el resultado de la condicion")
            console.log(auxCond)
            console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")*/
            if(auxCond.type == 'BOOLEAN') {

                auxCond = Boolean(auxCond.value);
                var actualScope = new Scope(scope);

                if(auxCond) {

                    var r = this.statement(actualScope,consoleT)
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
                        var ifr = this.iflast.run(actualScope,consoleT);
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
                console.log("ERROR 1 en IF.js")
            }

        } else {

            var actualScope = new Scope(scope);
            var r = this.statement(actualScope,consoleT);
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
                        return aux;
                    }
                }
            }     
        }
    }

}
module.exports = IF;