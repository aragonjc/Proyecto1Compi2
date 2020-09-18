class typeKeyValue {

    constructor(id,type) {
        this.id = id;
        this.type = type;
    }

    run(scope) {

        var t = this.type.run(scope);
        
        if(t == null) {
            //error
        }

        return [{id:this.id,type:t.type}]

    }
}

module.exports = typeKeyValue;