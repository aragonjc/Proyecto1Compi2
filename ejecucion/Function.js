
class Function {

    constructor(id,param,funcDec) {
        this.id = id;
        this.param = param;
        this.funcDec = funcDec;
    }

    run(scope) {
        var obj = this.funcDec.run(scope);
        var func = obj.type;
        //console.log(func)
        func.param = this.param;
        func.stmt = obj.stmt;
        var r = scope.insertFunction(this.id,func);
        if(!r) {
            console.log("---ERROR-----");
        }
    }
}

module.exports = Function;