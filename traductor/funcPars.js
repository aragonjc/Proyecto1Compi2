class funcPars {

    constructor(list,id,type) {
        this.list = list;
        this.id = id;
        this.type = type;
    }

    translate(scope,cond,sTable,funcId) {

        scope.insertVariable(this.id,"","");

        var l = "";
        if(this.list != null) {
            l = this.list.translate(scope,cond,sTable,funcId);
            l = l + ", ";
        }
        var t = this.type.translate(scope,cond,sTable,funcId);
        return l + this.id + " : " + t;
    }
}
module.exports = funcPars;