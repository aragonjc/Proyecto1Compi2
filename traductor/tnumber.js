class tnumber {

    constructor(exp ,str) {
        this.exp = exp;
        this.str = str;
    }

    translate(scope) {
        
        return this.exp;
    }

}

module.exports = tnumber;