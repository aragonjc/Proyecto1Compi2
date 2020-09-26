class objType {

    constructor(list,keyvalue) {
        this.list = list;
        this.keyvalue = keyvalue;
    }

    run(scope,console) {

        if(this.list != null) {

            var l = this.list.run(scope,console);
            var kv = this.keyvalue.run(scope,console);

            l.push(kv[0]);
            return l;
        }

        return this.keyvalue.run(scope,console);
    }
}

module.exports = objType;