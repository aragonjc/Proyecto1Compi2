class defVarLast {
    
    constructor(defVarLastP) {
        this.defVarLastP = defVarLastP;
    }

    run(scope,decType) {
        return this.defVarLastP.run(scope,decType,console);
    }

}

module.exports = defVarLast;