class ArrParamList {

    constructor(list,exp) {
        this.list = list;
        this.exp = exp;
    }

    run(scope) {

        if(this.list != null) {

            var e = this.exp.run(scope);
            var l = this.list.run(scope);
            
           
            l.push(e);
            
            return l;

        } else {
            var e = this.exp.run(scope);
            return [e];
        }
    }
}

module.exports = ArrParamList;