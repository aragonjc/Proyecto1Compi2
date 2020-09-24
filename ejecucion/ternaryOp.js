class ternaryOp {

    constructor(cond,texp,fexp) {
        this.cond = cond;
        this.texp = texp;
        this.fexp = fexp;
    }

    run(scope) {
        //comproba el tipo
        var c = this.cond.run(scope);
        if(c.type == 'BOOLEAN') {
            
            var boolCond = Boolean(c.value);
            if(boolCond) {
                return this.texp.run(scope);
            } else {
                return this.fexp.run(scope);
            }

        } else {
            //ERROR
            console.log("Error en ternaryOp.js")
        }

    }
}

module.exports = ternaryOp;