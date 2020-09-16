class scapeT {

    constructor(op) {
        this.op = op;
    }

    translate(scope,cond,sTable,funcId) {
        return this.op + ";";
    }
}
module.exports = scapeT;