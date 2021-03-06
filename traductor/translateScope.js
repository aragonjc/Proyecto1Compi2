
class translateScope{

    constructor(prev) {
        this.prev = prev;
        this.table = [];
        this.varUse = [];
        this.innerFunc = [];
    }

    existVariable(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            for(let i in sc.table) {
                if(sc.table[i].id == id) {
                    return true;
                }
            }
        }
        return false;
    }

    insertVariable(id,varDec,value) {
        this.table.push({id:id,varDec,value:value});
    }

    insertVariableGlobally(id,varDec,value) {
        var sc= this;
        while(sc.prev != null || sc.prev != undefined) {
         
            sc = sc.prev;
        }
        sc.insertVariable(id,varDec,value);
    }

    printScope() {
        var sc;
        for(sc = this;sc != null;sc = sc.prev){
            console.log(sc.table);
        }
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
        if(sc.innerFunc.length > 0) {
            for(let i in sc.innerFunc) {
                var element = sc.innerFunc[i];
                if(element.parent == parent && element.id == id) {
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = translateScope;