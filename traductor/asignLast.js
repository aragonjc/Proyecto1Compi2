class asignLast {

    constructor(list,asign) {
        this.list = list;
        this.asign = asign;
    }

    translate(scope,cond,sTable,funcId) {
        var l = this.list.translate(scope,cond,sTable,funcId);
        var a = this.asign.translate(scope,cond,sTable,funcId);

        return l + a;
    }
}

module.exports = asignLast;