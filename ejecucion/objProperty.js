class objProperty {

    constructor(id,exp) {
        this.id = id;
        this.exp = exp;
    }

    run(scope,consoleT) {

        var e = this.exp.run(scope,consoleT);
        var obj = new Map();
        obj.set(this.id,e);
        return obj;
    }
}

module.exports = objProperty;