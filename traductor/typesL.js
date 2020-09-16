class typesL {

    constructor(list) {
        this.list = list;
    }

    translate(scope,cond,sTable,funcId) {
        
        if(this.list != null) {
            return this.list.translate(scope,cond,sTable,funcId) + "[]";
        }

        return "[]";
    }
}

module.exports = typesL;