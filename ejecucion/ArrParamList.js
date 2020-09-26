class ArrParamList {

    constructor(list,exp) {
        this.list = list;
        this.exp = exp;
    }

    run(scope, console) {

        if(this.list != null) {

            var e = this.exp.run(scope, console);
            var l = this.list.run(scope, console);
            
           
            l.arr.push(e);
            
            return l;

        } else {
            var e = this.exp.run(scope, console);
            return {arr:[e],type:e.type};
        }
    }
}

module.exports = ArrParamList;