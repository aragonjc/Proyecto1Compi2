class expObject {

    constructor(objparams) {
        this.objparams = objparams;
    }

    translate(scope,cond,sTable,funcId) {
        if(this.objparams != null) {
            var params = this.objparams.translate(scope,cond,sTable,funcId);
            return "{ " + params+ " }"; 
        }
        return "{ }";
    }
}

module.exports = expObject;