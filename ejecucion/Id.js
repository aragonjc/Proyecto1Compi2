class Id {

    constructor(line,column,id) {
        this.line = line;
        this.column = column;
        this.id = id;
    }

    run(scope) {
        
        var r = scope.findVariable(this.id);
        /*console.log("!!!!!!!!!!OBJ!!!!!!!!!!!1")
        console.log(r)
        console.log("!!!!!!!!!!!!!!!!!!!!!1")*/
        if(r != null) {
            if(r.value == undefined || r.value == null) {
                return r;
            }
            return r.value;
        } else {
            //ERROR
            console.log("ERROR en Id.js")
        }
    }
}

module.exports = Id;