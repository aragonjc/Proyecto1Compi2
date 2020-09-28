class defVarLast {
    
    constructor(defVarLastP) {
        this.defVarLastP = defVarLastP;
    }

    run(scope,decType,consoleT) {
        return this.defVarLastP.run(scope,decType,consoleT);
    }

}

module.exports = defVarLast;