
class FuncDec {

    constructor(hasType,type,STMT) {
        this.hasType = hasType;
        this.type = type;
        this.STMT = STMT;
    }

    run(scope,console) {
        
        if(this.hasType) {
            return {stmt:this.STMT,type:this.type.run(scope,console)}
        } else {
            return {stmt:this.STMT,type:undefined};
        }
    }

}

module.exports = FuncDec;