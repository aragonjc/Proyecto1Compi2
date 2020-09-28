const TObject = require('./TObject')
class Id {

    constructor(line,column,id) {
        this.line = line;
        this.column = column;
        this.id = id;
    }

    run(scope,consoleT) {
        
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
            consoleT.value += "Error el Id: " + this.id+" no existe\n";
            console.log("ERROR en Id.js")
            
        }
        return new TObject(0,0,"undefined","UNDEFINED")
    }
}

module.exports = Id;