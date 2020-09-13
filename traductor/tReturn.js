class tReturn {

    constructor(exp ,str) {
        this.exp = exp;
        this.str = str;
    }

    translate(scope) {
        var a = this.exp.translate(scope);
        return "return " + a;
    }

}

module.exports = tReturn;