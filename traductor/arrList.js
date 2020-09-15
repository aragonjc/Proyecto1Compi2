class arrList {

    constructor(list,arrParam) {
        this.list = list;
        this.arrParam = arrParam;
    }

    translate(scope,cond,sTable,funcId) {
        
        if(list != null) {
            var l = this.list.translate(scope,cond,sTable,funcId);
            var arr = "";
            if(this.arrParam != null) {
                arr = this.arrParam.translate(this.list.translate(scope,cond,sTable,funcId));
            }
            return l + "[" + arr +"]";
        }

        var aux = "";
        if(this.arrParam != null) {
            aux = this.arrParam.translate(this.list.translate(scope,cond,sTable,funcId));     
        }

        return "[" + aux + "]";
    }
}

module.exports = arrList;