class expArrList {

    constructor(arrParam,sqBEnd) {
        this.arrParam = arrParam;
        this.sqBEnd = sqBEnd;
    }

    translate(scope,cond,sTable,funcId) {
        var arr = "";
        if(this.arrParam != null) {
            arr = this.arrParam.translate(scope,cond,sTable,funcId);
        }
        var sq = "";
        if(this.sqBEnd != null) {
            sq = this.sqBEnd.translate(scope,cond,sTable,funcId);
        }
        return "[" + arr + "]" + sq;
    }
}

module.exports = expArrList;