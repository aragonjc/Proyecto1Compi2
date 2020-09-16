const tscope = require('./translateScope');
class tDefcase {

    constructor(stmt) {
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var st ="";
        var newScope = new tscope(scope);
        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });

        return "default :" + st;
    }
}
module.exports = tDefcase;