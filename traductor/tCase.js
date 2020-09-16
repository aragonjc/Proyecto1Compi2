class tCase {

    constructor(list,exp,stmt) {
        this.list = list;
        this.exp = exp;
        this.stmt = stmt;
    }
    
    translate(scope,cond,sTable,funcId) {
        var l = "";
        var e = this.exp.translate(scope,cond,sTable,funcId);
        var st = "";

        this.stmt.forEach(element => {
            st += element.translate(scope,cond,sTable,funcId);
            st += "\n";
        });

        if(this.list != null) {
            l = this.list.translate(scope,cond,sTable,funcId) + "\n";

            return l + "case " + ex + ":\n" + st;
        }

        return "case " + ex + ":\n" + st
    }
}

module.exports = tCase;