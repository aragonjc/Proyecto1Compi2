class funcDec {

    constructor(STMT,str) {
        this.STMT = STMT;
        this.str = str;
    }

    translate(scope) {
        
         var r = "";
         this.STMT.forEach(element => {
             r += element.translate(scope) + "\n";
         });
         return r;
    }

}

module.exports = funcDec;