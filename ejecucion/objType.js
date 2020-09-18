class objType {

    constructor(list,keyvalue) {
        this.list = list;
        this.keyvalue = keyvalue;
    }

    run(scope) {

        if(this.list != null) {

            var l = this.list.run(scope);
            var kv = this.keyvalue.run(scope);

            l.push(kv[0]);
            return l;
        }

        return this.keyvalue.run(scope);
    }
}

module.exports = objType;