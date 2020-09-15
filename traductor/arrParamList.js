class arrParamList {

    constructor(list,exp) {
        this.list = list;
        this.exp = exp;
    }

    translate(scope,cond,sTable,funcId) {
        var l = this.list.translate(scope,cond,sTable,funcId);
        var e = this.exp.translate(scope,cond,sTable,funcId);

        return l + ", " + e;
    }
}

module.exports = arrParamList;