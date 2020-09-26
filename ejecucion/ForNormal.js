const Scope = require('./Scope.js');
class ForNormal {

    constructor(id,expAsign,cond,inc,stmt) {
        this.id = id;
        this.expAsign = expAsign;
        this.cond = cond;
        this.inc = inc;
        this.stmt = stmt;
    }

    run(scope,console) {

        var exp = this.expAsign.run(scope,console);
        var actualScope = new Scope(scope);
        
        var objAsgn = {value:exp,type:exp.type,isArray:exp.isArray,dim:exp.dim,dectype:'let'}
        actualScope.insertVariable(this.id,objAsgn);

        var condition = this.cond.run(actualScope,console);

        if(condition.type == 'BOOLEAN') {
            condition = Boolean(condition.value);
            while(condition) {

                var newScope = new Scope(actualScope);

                var aux = this.statement(newScope,console);
                
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        break;
                    } 
                }
                
                this.inc.run(newScope,console);
                condition = this.cond.run(newScope,console);
                condition = Boolean(condition.value);
                
            }

        } else {
            //Error;
            console.log("Error 1 en ForNormal.js")
        }
        
    }

    statement(scope,console) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,console);
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