class defVarLast {

    constructor(defVarLastP) {
        this.defVarLastP = defVarLastP;
    }

    translate(scope,cond,sTable,funcId) {
        return ", " + this.defVarLastP.translate(scope,cond,sTable,funcId);
    }
}

module.exports = defVarLast;