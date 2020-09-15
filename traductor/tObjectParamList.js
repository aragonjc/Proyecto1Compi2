class tObjectParamList {

    constructor(list,point,keyValue) {
        this.list = list;
        this.point = point;
        this.keyValue = keyValue;
    }

    translate(scope,cond,sTable,funcId) {
        var l = this.list.translate(scope,cond,sTable,funcId);
        var key = this.keyValue.translate(scope,cond,sTable,funcId);
        return l + this.point + " "+ key;
    }
}

module.exports = tObjectParamList;