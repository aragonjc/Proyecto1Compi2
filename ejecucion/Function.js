
class Function {

    constructor(id,param,funcDec) {
        this.id = id;
        this.param = param;
        this.funcDec = funcDec;
    }

    run(scope) {
        var obj = this.funcDec.run(scope);
        var func;
        if(obj.type)
            func = obj.type;
        else
            func = {type:'VOID',isArray:false,dim:0}
            
        //console.log(obj)
        func.param = this.param;
        func.stmt = obj.stmt;
        var r = scope.insertFunction(this.id,func);
        if(!r) {
            console.log("Error 1 en Function.js")
        }
    }
}

module.exports = Function;