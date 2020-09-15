class tVariables {

    constructor(id,exp ,str) {
        this.id = id;
        this.exp = exp;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        var ex = this.exp.translate(scope,cond,sTable,funcId)
        return this.id + " = " + ex + this.str;
    }

}

module.exports = tVariables;