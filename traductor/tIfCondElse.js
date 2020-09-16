const tscope = require('./translateScope');
class tIfCondElse {

    constructor(stmt) {
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var newScope = new tscope(scope);
        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(newScope,cond,sTable,funcId);
            st += "\n";
        });

        return " {\n" + st + "\n}\n";
    }
}
module.exports = tIfCondElse;