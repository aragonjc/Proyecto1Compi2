class funcDec {

    constructor(STMT,str) {
        this.STMT = STMT;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        
         var r = "";
         this.STMT.forEach(element => {
             r += element.translate(scope,cond,sTable,funcId) + "\n";
         });
         return r;
    }

}

module.exports = funcDec;