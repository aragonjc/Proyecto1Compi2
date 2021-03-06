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
    
    run(scope,consoleT) {

        var obj = this.arr.run(scope,consoleT);
        if(obj.isArray || !this.isPrimitive(obj)) {

            if(this.forOp == 'in') {
                return this.forIn(obj,scope,consoleT);
            } else {
                return this.forOf(obj,scope,consoleT)
            }

        } else {
            //ERROR
            console.log("Error 1 en ForEach.js")
            return;
        }
    }

    forIn(obj,scope,consoleT) {

        if(this.isDec) {

            var id = this.id;
            var asgn = new Variable(0,0,'let',id,new defLast(0,0,null,new TObject(0,0,"null",'NULL')),null);
            
            var actualScope = new Scope(scope);
            
            asgn.run(actualScope,consoleT);
            var array = this.arr.run(scope,consoleT);

            if(array.constructor.name == "Map") {

                for (const key of array.keys()) {
                    
                    var newScope = new Scope(actualScope);

                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"STRING"))));
                    rasign.run(newScope,consoleT)
                    var aux = this.statement(newScope,consoleT);
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

                    var newScope = new Scope(actualScope);

                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"NUMBER"))));
                    rasign.run(newScope,consoleT)
                    var aux = this.statement(newScope,consoleT);
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

            if(this.id.constructor.name == "Id") {

                var id = this.id.id;
                if(scope.findVariable(id)){

                    var actualScope = new Scope(scope);

                    var array = this.arr.run(scope,consoleT);
                    if(array.constructor.name == "Map") {

                        for (const key of array.keys()) {
                            
                            var newScope = new Scope(actualScope);

                            var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"STRING"))));
                            rasign.run(newScope,consoleT)
                            var aux = this.statement(newScope,consoleT);
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
                            
                            var newScope = new Scope(actualScope);
                            
                            var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,new TObject(0,0,key.toString(),"NUMBER"))));
                            rasign.run(newScope,consoleT)
                            var aux = this.statement(newScope,consoleT);
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
                    //ERROR
                    console.log("Error 2 en ForEach.js")
                }

            } else {
                //Error
                console.log("Error 3 en ForEach.js")
                console.log("ERROR se esperaba un id")
            }

        }

        return null;
    }

    forOf(obj,scope,consoleT) {

        if(this.isDec) {

            var id = this.id;
            var asgn = new Variable(0,0,'let',id,new defLast(0,0,null,new TObject(0,0,"null",'NULL')),null);
            var actualScope = new Scope(scope);
            asgn.run(actualScope,consoleT);
            var array = this.arr.run(scope,consoleT);
            if(array.constructor.name == "Map") {

                console.log("Error 4 en ForEach.js")
                return null;

            } else {
                array = array.value;
                for (let value of array) {

                    var newScope = new Scope(actualScope);

                    var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,value)));
                    rasign.run(newScope,consoleT)
                    var aux = this.statement(newScope,consoleT);
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
            if(this.id.constructor.name == "Id") {

                var id = this.id.id;
                if(scope.findVariable(id)){

                    var actualScope = new Scope(scope);

                    var array = this.arr.run(scope,consoleT);
                    if(array.constructor.name == "Map") {
                        //ERROR
                        console.log("Error 5 en ForEach.js")
                        return null;
                    } else {
                        array = array.value;
                        
                        for (const key of array) {

                            var newScope = new Scope(actualScope);

                            var rasign = new asignVariable(id,new asignLast(null,new asignLastF(null,key)));
                            rasign.run(newScope,consoleT)
                            var aux = this.statement(newScope,consoleT);
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
                    //ERROR
                    console.log("Error 6 en ForEach.js")
                }

            } else {
                //Error
                console.log("Error 7 en ForEach.js")
                console.log("ERROR se esperaba un id")
            }
        }

        return null;
    }
    
    statement(scope,consoleT) {
        if(this.stmt!= null) {
            for(var i = 0;i<this.stmt.length;i++) {
                var element = this.stmt[i];
                var aux = element.run(scope,consoleT);
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