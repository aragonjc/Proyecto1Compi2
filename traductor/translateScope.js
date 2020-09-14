const translateNode = require('./translateNode.js');

class translateScope{

    constructor(prev) {
        this.prev = prev;
        this.table = [];
        this.varUse = [];
        this.innerFunc = [];
    }

    existVariable(id) {
        var sc= this;
        while(sc != null || sc != undefined) {
            for(let i in this.table) {
                if(this.table[i].id == id) {
                    return true;
                }
            }
            sc = sc.prev;
        }
        return false;
    }

    insertVariable(id,varDec) {
        this.table.push({id:id,varDec});
    }

    insertVariableGlobally(id,varDec) {
        var sc= this;
        while(sc.prev != null || sc.prev != undefined) {
         
            sc = sc.prev;
        }
        sc.insertVariable(id,varDec);
    }

    insertFunctionGlobally(id,parentF) {
        var sc= this;
        while(sc.prev != null || sc.prev != undefined) {
         
            sc = sc.prev;
        }
        sc.innerFunc.push({id:id,parent:parentF});
    }

    searchFunction(id,parent) {
        var sc= this;
        while(sc.prev != null || sc.prev != undefined) {
         
            sc = sc.prev;
        }
        if(this.innerFunc.length > 0) {
            for(let i in this.innerFunc) {
                var element = this.innerFunc[i];
                if(element.parent == parent && element.id == id) {
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = translateScope;