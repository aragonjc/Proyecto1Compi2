class typeKeyValue {

    constructor(id,type) {
        this.id = id;
        this.type = type;
    }

    run(scope,console) {

        var t = this.type.run(scope,console);
        
        if(t == null) {
            //error
            console.log("Error en typeKeyValue.js")
        }

        return [{id:this.id,type:t.type}]

    }
}

module.exports = typeKeyValue;