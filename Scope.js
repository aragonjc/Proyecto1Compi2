class Scope {
    constructor(prev) {
        this.prev = prev;
        this.table = new Map();
        this.functionTable = new Map();
    }

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

    }
}
module.exports = Scope;