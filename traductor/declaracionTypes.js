class declaracionTypes {

    constructor(id,obj) {
        this.id = id;
        this.obj = obj;
    }

    translate(scope,cond,sTable,funcId) {
        var ob = "";
        if(this.obj != null) {
            ob = this.obj.translate(scope,cond,sTable,funcId);
        }

        return "Type " + this.id + " = {\n"+ob+"}\n"; 

    }
}
module.exports = declaracionTypes;