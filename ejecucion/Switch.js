const Scope = require('./Scope');
class Switch {

    constructor(cond,firstcase,lastcase) {
        this.cond = cond;
        this.firstcase = firstcase;
        this.lastcase = lastcase;
    }

    run(scope) {

        //this.cond.run(scope);

        if(this.firstcase != null) {
            var aux = this.firstcase.run(scope,this.cond);
            if(aux != null) {
    
                if(aux.type == 'RETURN') {
                    return aux;
                } else if(aux.type == 'BREAK') {
                    return null;
                } else if(aux.type == 'CONTINUE') {
                    return aux;
                }
            }
        }

        if(this.lastcase != null) {
            var aux = this.lastcase.run(scope,this.cond);
            if(aux != null) {
    
                if(aux.type == 'RETURN') {
                    return aux;
                } else if(aux.type == 'BREAK') {
                    return null;
                } else if(aux.type == 'CONTINUE') {
                    return aux;
                }
            }
        }
    }
}

module.exports = Switch;