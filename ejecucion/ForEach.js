const TObject = require("./TObject");
const Variable = require("./Variable");
const defLast = require("./defLast");
const Scope = require("./Scope");
const asignLast = require("./asignLast")
const asignLastF = require("./asignLastF")
const asignVariable = require("./asignVariable")
class ForEach{

    constructor(isDec,id,forOp,arr,stmt){
        this.isDec = isDec;
        this.id = id;
        this.forOp = forOp;
        this.arr = arr;
        this.stmt = stmt;
    }
    
    run(scope) {

        var obj = this.arr.run(scope);
        if(obj.isArray || !this.isPrimitive(obj)) {

            if(this.forOp == 'in') {
                return this.forIn(obj,scope);
            } else {
                return this.forOf(obj,scope)
            }

        } else {
            //ERROR
            console.log("noe es un objeto iterable")
            return;
        }
    }

    forIn(obj,scope) {

        if(this.isDec) {

            var id = this.id;
            var asgn = new Variable(0,0,'let',id,new defLast(0,0,null,new TObject(0,0,"null",'NULL')),null);
            var actualScope = new Scope(scope);
            asgn.run(actualScope);
            var array = this.arr.run(scope);
            if(array.constructor.name == "Map") {

                for (const key of array.keys()) {
                    
                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"STRING"))));
                    rasign.run(actualScope)
                    var aux = this.statement(actualScope);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                }

            } else {
                array = array.value;
                for (const key in array) {
                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"NUMBER"))));
                    rasign.run(actualScope)
                    var aux = this.statement(actualScope);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                }
            }

        } else {

        }

        return null;
    }

    forOf(obj,scope) {

        if(this.isDec) {

            var id = this.id;
            var asgn = new Variable(0,0,'let',id,new defLast(0,0,null,new TObject(0,0,"null",'NULL')),null);
            var actualScope = new Scope(scope);
            asgn.run(actualScope);
            var array = this.arr.run(scope);
            if(array.constructor.name == "Map") {

                console.log("ERROR");
                return null;

            } else {
                array = array.value;
                for (let value of array) {
                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,value)));
                    rasign.run(actualScope)
                    var aux = this.statement(actualScope);
                    if(aux != null) {
    
                        if(aux.type == 'RETURN') {
                            return aux;
                        } else if(aux.type == 'BREAK') {
                            break;
                        } 
                    }
                }
            }

        } else {

        }

        return null;
    }
    
    statement(scope) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope);
                if(aux != null) {
    
                    if(aux.type == 'RETURN') {
                        return aux;
                    } else if(aux.type == 'BREAK') {
                        return aux;
                    } else if(aux.type == 'CONTINUE') {
                        return null;
                    }
                }
            }     
        }
    }

    isPrimitive(obj) {
        switch(obj.type) {
            case 'NUMBER':
                return true;
            case 'BOOLEAN':
                return true;
            case 'STRING':
                return true;
            case 'NULL':
                return true;
            case 'UNDEFINED':
                return true
            default:
                return false;    
        }
    }
}

module.exports = ForEach;