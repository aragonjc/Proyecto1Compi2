const Variable = require('./Variable.js');
class defVarLastP {

    constructor(line,column,list,id,deflast) {
        this.line = line;
        this.column = column;
        this.list = list;
        this.id = id;
        this.deflast = deflast;        
    }

    run(scope,decType,consoleT) {


        if(this.list != null) {

            var l = this.list.run(scope,decType,consoleT);
            var aux = new Variable(this.line,this.column,decType,this.id,this.deflast,null);
            l.push(aux);
            return l;
        } else {
            var aux = new Variable(this.line,this.column,decType,this.id,this.deflast,null);

            return [aux];
        }
    }
}

module.exports = defVarLastP;