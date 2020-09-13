class tVariables {

    constructor(id,exp ,str) {
        this.id = id;
        this.exp = exp;
        this.str = str;
    }

    translate(scope) {
        var ex = this.exp.translate(scope)
        return this.id + "=" + ex;
    }

}

module.exports = tVariables;