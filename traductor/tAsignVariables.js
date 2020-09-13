class tAsignVariables {

    constructor(id,exp ,str) {
        this.id = id;
        this.exp = exp;
        this.str = str;
    }

    translate(scope) {
        var a = this.exp.translate(scope);
        return this.id + "=" + a;
    }

}

module.exports = tAsignVariables;