const defVarLast = require("./defVarLast");

class defVarLastP {

    constructor(list,id,deflast) {
        this.list = list;
        this.id = id;
        this.deflast = deflast;
    }

    translate(scope,cond,sTable,funcId) {
        var exp = "";

        scope.insertVariable(this.id,"","");
        if(this.deflast != null) {
            exp = this.deflast.translate(scope,cond,sTable,funcId);
        }

        if(this.list != null) {
            var l = this.list.translate(scope,cond,sTable,funcId);
            return l + ", " + this.id + " " +exp;
        }

        return this.id + " "+exp;
        
    }
}

module.exports = defVarLastP;
