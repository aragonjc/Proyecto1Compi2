class Obj {
    
    constructor(obj) {
        this.obj = obj;
    }

    run(scope) {
        var ob = this.obj.run(scope);
        //console.log(ob)
        return { value:ob,type:"OBJ",isArray:false,dim:0 };
    }
}
module.exports = Obj;