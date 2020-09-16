class tIfLast {

    constructor(ifcond) {
        this.ifcond = ifcond;
    }

    translate(scope,cond,sTable,funcId) {
        return "else " + this.ifcond.translate(scope,cond,sTable,funcId);
    }
}

module.exports = tIfLast;