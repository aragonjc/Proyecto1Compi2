class ternaryOp {

    constructor(cond,texp,fexp) {
        this.cond = cond;
        this.texp = texp;
        this.fexp = fexp;
    }

    run(scope,console) {
        //comproba el tipo
        var c = this.cond.run(scope,console);
        if(c.type == 'BOOLEAN') {
            
            var boolCond = Boolean(c.value);
            if(boolCond) {
                return this.texp.run(scope,console);
            } else {
                return this.fexp.run(scope,console);
            }

        } else {
            //ERROR
            console.log("Error en ternaryOp.js")
        }

    }
}

module.exports = ternaryOp;