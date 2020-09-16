class tKeyValueT {

    constructor(id, type) {
        this.id = id;
        this.type = type;
    }

    translate(scope,cond,sTable,funcId) {
        var t = this.type.translate(scope,cond,sTable,funcId);

        return this.id + " : " + t;
    }
}

module.exports = tKeyValueT;