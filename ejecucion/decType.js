class decType {

    constructor(id,obj) {
        this.id = id;
        this.obj = obj;
    }

    run(scope,console) {
        //comprobar si el type ya existe
        //comprobar si las propiedades del type no estan repetidas
        
        scope.insertType(this.id,null);

        var ob = this.obj.run(scope,console)

        scope.insertType(this.id,ob);
    }

}

module.exports = decType;