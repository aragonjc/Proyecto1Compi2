class asignVariable {

    constructor(id,asignLast) {
        this.id = id;
        this.asignLast = asignLast;
    }

    run(scope) {

        var objId = scope.findVariable(this.id);
        if(objId != null) {
            
            var res = this.asignLast.run(scope,objId);
            scope.changeValueVariable(this.id,res);

        } else {
            console.log("Error 1 en asigVariable.js")
        }
    }

    get(scope,globalScope) {

        var objId = scope.findVariable(this.id);
        if(objId != null) {
            //comprobar si res es null
            /*console.log(this.id)
            console.log(objId)
            console.log("%%%%%%%%%%")*/
            var res = this.asignLast.run(globalScope,objId);
            scope.changeValueVariable(this.id,res);

        } else {
            console.log("Error 2 en asigVariable.js")
        }
    }
}
module.exports = asignVariable;