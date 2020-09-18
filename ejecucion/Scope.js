class Scope {
    constructor(prev) {
        this.prev = prev;
        this.table = new Map();
        this.functionTable = new Map();
        this.typesTable = new Map();
    }

    findVariable(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.table.has(id)) {
                return sc.table.get(id);
            }
        }
        return null;
    }

    existsLocalVariable(id) {
        return this.table.has(id);
    }
    
    insertVariable(id,value) {
        
        if(!this.existsLocalVariable(id)) {
            this.table.set(id,value);
            return true;
        } 
        return false;
    }

    findType(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.prev == null) {
                return sc.typesTable.has(id)
            }
        }
        return false;
    }

    existsType(id) {
        return this.typesTable.has(id)
    }

    insertType(id,value) {
        if(!this.existsType(id)) {
            this.typesTable.set(id,value);
        } else {

           if(this.typesTable.get(id) == null) {
                this.typesTable.delete(id);
                this.typesTable.set(id,value);
                return;
            }

            //ERROR

        }
        
    }
/*
    get existLocalVariable(id) {

    }

    set insertVariable(id,obj,byval) {

    }

    get searchVariable(id) {

    }
    
    get getObjectVariable(id) {

    }

    get existVariable(id) {

    }

    get existVariableNoGlobal(id) {

    }

    set changeVariableValue(id, nodeValue, byval) {

    }

    set insertFunction(id,obj) {

    }

    get searchFunction(id) {

    }

    get existFunction(id) {
        
    }

    get globalScope() {

    }*/
}
module.exports = Scope;