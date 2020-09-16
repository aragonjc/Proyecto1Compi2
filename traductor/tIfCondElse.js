class tIfCondElse {

    constructor(stmt) {
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var st = "";
        this.stmt.forEach(element => {
            st += element.translate(scope,cond,sTable,funcId);
            st += "\n";
        });

        return " {\n" + st + "\n}\n";
    }
}
module.exports = tIfCondElse;