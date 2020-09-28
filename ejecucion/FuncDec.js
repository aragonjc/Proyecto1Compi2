
class FuncDec {

    constructor(hasType,type,STMT) {
        this.hasType = hasType;
        this.type = type;
        this.STMT = STMT;
    }

    run(scope,consoleT) {
        
        if(this.hasType) {
            return {stmt:this.STMT,type:this.type.run(scope,consoleT)}
        } else {
            return {stmt:this.STMT,type:undefined};
        }
    }

}

module.exports = FuncDec;