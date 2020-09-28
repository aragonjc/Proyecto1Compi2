class objList {

    constructor(list,key) {
        this.list = list;
        this.key = key;
    }

    run(scope,consoleT) {

        if(this.list != null) {

            var e = this.key.run(scope,consoleT);
            var l = this.list.run(scope,consoleT);

            e.forEach((value, key) => l.set(key, value));

            return l;

        }

        return this.key.run(scope,consoleT);
    }
}
module.exports = objList;