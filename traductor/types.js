class types {

    constructor(type, list) {
        this.type = type;
        this.list = list;
    }

    translate(scope,cond,sTable,funcId) {
        var l = "";
        if(this.list != null) {
            l = " " +this.list.translate(scope,cond,sTable,funcId);
        }

        return this.type + l;
    }
}

module.exports = types;