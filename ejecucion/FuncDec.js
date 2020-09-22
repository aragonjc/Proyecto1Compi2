
class FuncDec {

    constructor(hasType,type,STMT) {
        this.hasType = hasType;
        this.type = type;
        this.STMT = STMT;
    }

    run(scope) {
        
        if(this.hasType) {
            return {stmt:this.STMT,type:this.type.run(scope)}
        } else {
            return {stmt:this.STMT,type:undefined};
        }
    }

}

module.exports = FuncDec;