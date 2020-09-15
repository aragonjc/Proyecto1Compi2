class paramFuncList {

    constructor(parFuncList,exp) {
        this.parFuncList = parFuncList;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        if(this.parFuncList != null) {
            var param = this.parFuncList.translate(scope,cond,sTable,funcId);
            return param + ", " + this.exp.translate(scope,cond,sTable,funcId);
        }
        return this.exp.translate(scope,cond,sTable,funcId);
    }
}

module.exports = paramFuncList;