class objList {

    constructor(list,key) {
        this.list = list;
        this.key = key;
    }

    run(scope) {

        if(this.list != null) {

            var e = this.key.run(scope);
            var l = this.list.run(scope);

            e.forEach((value, key) => l.set(key, value));

            return l;

        }

        return this.key.run(scope);
    }
}
module.exports = objList;