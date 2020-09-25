class asignVariable {

    constructor(id,asignLast) {
        this.id = id;
        this.asignLast = asignLast;
    }

    run(scope) {

        var objId = scope.findVariable(this.id);
        if(objId != null) {
            
            

            var res = this.asignLast.run(scope,objId);
            if(this.id == 'pivot'){
                console.log(objId);
                console.log("&&&&&&&&&&&")
                console.log(res)
            }
            //console.log("/**********Aqui estoy en run()************************/");
            ///console.log("/**********************************/");
         ///console.log("/**********************************/");
         ///console.log(this.id)
         //console.log(res.value)
        //console.log("/**********************************/");
        //console.log("/**********************************/");
        //console.log("/**********************************/");
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
            //console.log("/**********Aqui estoy en get()************************/");
           // console.log("/**********************************/");
         //console.log("/**********************************/");
         //console.log(this.id)
         //console.log(res)
        //console.log("/**********************************/");
        //console.log("/**********************************/");
        //console.log("/**********************************/");
        
            scope.changeValueVariable(this.id,res);

        } else {
            console.log("Error 2 en asigVariable.js")
        }
    }
}
module.exports = asignVariable;