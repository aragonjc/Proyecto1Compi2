class Scope {
    constructor(prev) {
        this.prev = prev;
        this.table = new Map();
        this.functionTable = new Map();
        this.typesTable = new Map();
    }

    getTable() {
        return this.table;
    }

    getTypesTable() {
        if(this.typesTable)
            return this.typesTable;
        return null;
    }

    getFunctionTable() {
        return this.functionTable;
    }

    getGlobalScope() {
        var sc= this;

        for(sc = this;sc.prev != null;sc = sc.prev){
        }
        return sc;
    }

    changeValueVariable(id,obj) {
        this.getObjVariable(id).set(id,obj);
    }

    getObjVariable(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.table.has(id)) {
                return sc.table;
            }
        }
        return null;
    }

    getNumOfScope() {
        var sc= this;
        var num = 0;
        for(sc = this;sc != null;sc = sc.prev){
            num++;
        }
        return num;
    }

    grapah_ts() {
        var sc= this;
        let str = "";
        let types = "";
        let func = "";
        let scopeNum = this.getNumOfScope()
        for(sc = this;sc != null;sc = sc.prev){
            scopeNum--;
            str += this.graph_tsVariables(sc.table,scopeNum);
            //console.log(sc.table)
            /*if(sc.prev == null) {
                console.log(this.functionTable)
                types = this.getTypes(this.typesTable)
                func = this.getFunctions(this.functionTable)
            }*/
            
        }

        func = "Funciones \n--------------------\n" + this.getFunctions(this.getGlobalScope().functionTable);
        types = this.getTypes(this.getGlobalScope().typesTable);
        return types + "\n" + func + "\n" + str;
    }

    getTypes(types) {
        var str = "";
        for(let obj of types) {
            str += obj[0] + "   |   "
            //str += obj[1].type +"  |" 
            str += "\n";
            //str += ambito
        }
        return str+"\n";
    }

    getFunctions(funcTable) {
        var str = "";
        for(let obj of funcTable) {
            str += obj[0] + "   |   "
            //str += obj[1].type +"  |" 
            str += "\n";
            //str += ambito
        }
        return str+"\n";

    }

    graph_tsVariables(table,scopeNum) {
        
        var str = "----------------------------\n";
        for(let obj of table) {
            str += obj[0] + "   |   "
            str += obj[1].type +"  |    " 
            str += scopeNum +"  |" 
            str += "\n";
            //str += ambito
        }
        return str+"\n";

    }

    getStrArr(obj) {
        var str = "["
        var prop = "";
        //console.log(obj)
        obj.forEach((value) => {

            //prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",";
        });
        prop = prop.substring(0,prop.length-1)
        str += prop;
        str += "]"
        return str;
    }

    getStrObj(obj,tab) {
        var str = tab+"{\n"
        var prop = "";
        obj.forEach((value,key) => {

            prop += tab + "\t"+ key + ": ";
            if(value.constructor.name == "TObject") {
                prop += value.value;
            } else if(value.isArray) {
                prop += this.getStrArr(value.value)
            } else if(value.constructor.name == "Map"){
                prop += this.getStrObj(value,"\t");
            }
            prop += ",\n";
        });
        prop = prop.substring(0,prop.length-2)
        str += prop;
        str += "\n"
        str += tab +"}"
        return str;
    }

    print() {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            console.log(sc.table)
            
        }
        
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

    getFunction(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.prev == null) {
                return sc.functionTable.get(id)
            }
        }
    }

    checkFunction(id) {
        var sc= this;

        for(sc = this;sc != null;sc = sc.prev){
            if(sc.prev == null) {
                return sc.functionTable.has(id)
            }
        }
        return false;
        //return this.functionTable.has(id);
    }

    insertFunction(id,obj) {
        
        if(!this.checkFunction(id)) {
            this.functionTable.set(id,obj);
            return true;
        } 
        return false;
    }

    existsLocalVariable(id) {
        return this.table.has(id);
    }
    
    insertVariable(id,value) {
        
        if(!this.existsLocalVariable(id)) {
            this.table.set(id,value);
            return true;
        } 
        console.log("ERROR la variable " + id + " ya existe")
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