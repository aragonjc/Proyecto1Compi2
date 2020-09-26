const Operation = require('./Operation.js')
const TObject   = require('./TObject.js') 
class asignLastF {

    constructor(op,exp) {
        this.op = op;
        this.exp = exp;
    }

    run(scope,obj,console) {

        if(this.op == null) {
            return this.exp.run(scope,console);
        }

        if(this.exp != null) {

            //hacer comprobacion de tipos
            //var newObject = new TObject(0,0,obj.value.value,obj.type)
            
            var operation = new Operation(0,0,obj.value,this.exp,this.op);
            //console.log(operation);
            return operation.run(scope,console);

        } else {
            var newObject = new TObject(0,0,"1","NUMBER")
            var operation = new Operation(0,0,obj.value,newObject,this.op);
            return operation.run(scope,console);
        }
    }

    
}

module.exports = asignLastF;