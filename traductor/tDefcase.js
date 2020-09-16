class tDefcase {

    constructor(stmt) {
        this.stmt = stmt;
    }

    translate(scope,cond,sTable,funcId) {
        var st ="";
        this.stmt.forEach(element => {
            st += element.translate(scope,cond,sTable,funcId);
            st += "\n";
        });

        return "default :" + st;
    }
}
module.exports = tDefcase;