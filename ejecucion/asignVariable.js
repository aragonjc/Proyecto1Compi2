class asignVariable {

    constructor(id,asignLast) {
        this.id = id;
        this.asignLast = asignLast;
    }

    run(scope) {

        var objId = scope.findVariable(this.id);
        if(objId != null) {
            //comprobar si res es null
            var res = this.asignLast.run(scope,objId);
            scope.changeValueVariable(this.id,res);

        } else {
            console.log("######-ERROR-#########");
        }
    }
}
module.exports = asignVariable;