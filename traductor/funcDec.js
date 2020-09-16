class funcDec {

    constructor(STMT,type) {
        this.STMT = STMT;
        this.type = type;
    }

    translate(scope,cond,sTable,funcId) {
        var f = "";
        if(this.type != null) {
            f = " : " + this.type.translate(scope,cond,sTable,funcId);
        }
         var r = "";
         this.STMT.forEach(element => {
             r += element.translate(scope,cond,sTable,funcId) + "\n";
         });
         return f + "{\n"+ r + "\n}\n";
    }

}

module.exports = funcDec;