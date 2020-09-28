class objType {

    constructor(list,keyvalue) {
        this.list = list;
        this.keyvalue = keyvalue;
    }

    run(scope,consoleT) {

        if(this.list != null) {

            var l = this.list.run(scope,consoleT);
            var kv = this.keyvalue.run(scope,consoleT);

            l.push(kv[0]);
            return l;
        }

        return this.keyvalue.run(scope,consoleT);
    }
}

module.exports = objType;