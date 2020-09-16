class defLast {

    constructor(types,exp) {
        this.types = types;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {

        if(this.types != null) {
            var t = this.types.translate(scope,cond,sTable,funcId);
           
            return " : " + t + " = " + this.exp.translate(scope,cond,sTable,funcId);
        }

        return " = " + this.exp.translate(scope,cond,sTable,funcId);
    }
}

module.exports = defLast;