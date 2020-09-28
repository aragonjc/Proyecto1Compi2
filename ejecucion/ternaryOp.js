class ternaryOp {

    constructor(cond,texp,fexp) {
        this.cond = cond;
        this.texp = texp;
        this.fexp = fexp;
    }

    run(scope,consoleT) {
        //comproba el tipo
        var c = this.cond.run(scope,consoleT);
        if(c.type == 'BOOLEAN') {
            
            var boolCond = Boolean(c.value);
            if(boolCond) {
                return this.texp.run(scope,consoleT);
            } else {
                return this.fexp.run(scope,consoleT);
            }

        } else {
            //ERROR
            console.log("Error en ternaryOp.js")
        }

    }
}

module.exports = ternaryOp;