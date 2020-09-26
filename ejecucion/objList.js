class objList {

    constructor(list,key) {
        this.list = list;
        this.key = key;
    }

    run(scope,console) {

        if(this.list != null) {

            var e = this.key.run(scope,console);
            var l = this.list.run(scope,console);

            e.forEach((value, key) => l.set(key, value));

            return l;

        }

        return this.key.run(scope,console);
    }
}
module.exports = objList;