class Id {

    constructor(line,column,id) {
        this.line = line;
        this.column = column;
        this.id = id;
    }

    run(scope) {
        
        var r = scope.findVariable(this.id);
        if(r != null) {
            return r.value;
        } else {
            //ERROR
        }
    }
}

module.exports = Id;