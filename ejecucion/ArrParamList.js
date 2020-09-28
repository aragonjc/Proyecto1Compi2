class ArrParamList {

    constructor(list,exp) {
        this.list = list;
        this.exp = exp;
    }

    run(scope, consoleT) {
        if(this.list != null) {
            var e = this.exp.run(scope, consoleT);
            var l = this.list.run(scope, consoleT);
            l.arr.push(e);
            return l;
        } else {
            var e = this.exp.run(scope, consoleT);
            return {arr:[e],type:e.type};
        }
    }
}

module.exports = ArrParamList;