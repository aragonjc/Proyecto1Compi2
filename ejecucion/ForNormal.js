const Scope = require('./Scope.js');
class ForNormal {

    constructor(id,expAsign,cond,inc,stmt) {
        this.id = id;
        this.expAsign = expAsign;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope) {

        var exp = this.expAsign.run(scope);
        var actualScope = new Scope(scope);
        
        var objAsgn = {value:exp,type:exp.type,isArray:exp.isArray,dim:exp.dim,dectype:'let'}
        actualScope.insertVariable(this.id,objAsgn);

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
            //Error;
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
module.exports = ForNormal;