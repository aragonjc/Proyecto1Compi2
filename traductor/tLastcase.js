const defLast = require("./defLast");

class tLastcase {
    constructor(defcase,endcase) {
        this.defcase = defcase;
        this.endcase = endcase;
    }

    translate(scope,cond,sTable,funcId) {
        var a = this.defcase.translate(scope,cond,sTable,funcId);
        var b = this.endcase.translate(scope,cond,sTable,funcId);

        return a + "\n" +b;
    }
}

module.exports = tLastcase;